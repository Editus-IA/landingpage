/**
 * POST /api/waitlist
 *
 * Recebe dados do formulário, valida e salva no Supabase.
 * A service key NUNCA sai deste arquivo — fica só no servidor.
 *
 * Segurança (ver relatório SEC-02, SEC-04, SEC-07, SEC-08):
 *   - IP obtido da conexão TCP real (não de headers spoofeáveis)
 *   - Honeypot: campo _trap rejeitado silenciosamente
 *   - hashIp: SHA-256 truncado com salt (substitui hash 32-bit fraco)
 *   - source: validado contra whitelist
 */

import { createHash } from 'node:crypto'
import { checkRateLimit } from '../utils/rateLimit'
import { sendWelcomeEmail } from '../utils/sendWelcomeEmail'

interface WaitlistPayload {
  name?: string
  email: string
  company?: string
  volume?: string
  segment?: string
  source?: string
  consent?: boolean
  _trap?: string  // honeypot — bots preenchem, humanos não
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
}

// SEC-08: fonte origem validada contra whitelist
const VALID_SOURCES = ['landing', 'hero', 'waitlist-section', 'cta', 'footer'] as const


// SEC-07: SHA-256 truncado com salt secreto — garante anonimização real dos IPs (LGPD)
function hashIp(ip: string, salt: string): string {
  return createHash('sha256').update(salt + ip).digest('hex').slice(0, 16)
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
}

// Resolve o IP real do cliente.
// cf-connecting-ip: injetado pela Cloudflare, não forjável pelo cliente.
// Fallback direto para socket TCP — omite x-vercel-forwarded-for e similares,
// que podem ser forjados por um proxy intermediário fora da borda confiável.
function resolveIp(event: any): string {
  return (
    getRequestHeader(event, 'cf-connecting-ip') ||
    event.node.req.socket?.remoteAddress ||
    '0.0.0.0'
  )
}

const ALLOWED_ORIGINS = [
  'https://editus.com.br',
  'https://www.editus.com.br',
  'http://localhost:3000',
]

export default defineEventHandler(async (event) => {
  // A04 — CSRF mínimo: valida Origin para bloquear submissões cross-site não autorizadas
  const origin = getRequestHeader(event, 'origin') ?? ''
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    throw createError({ statusCode: 403, message: 'Forbidden' })
  }

  const ip = resolveIp(event)

  if (!await checkRateLimit(ip, { key: 'waitlist', windowSecs: 60, max: 3 })) {
    console.warn('[waitlist] rate limit hit', { ip_hash: hashIp(ip, 'log') })
    throw createError({ statusCode: 429, message: 'Muitas tentativas. Aguarde 1 minuto.' })
  }

  // ── Validação do body ──────────────────────────────────────────────────────
  const body = await readBody<WaitlistPayload>(event).catch(() => null)

  // SEC-04: honeypot — campo _trap deve estar vazio; bots preenchem automaticamente
  if (body?._trap && body._trap.length > 0) {
    console.warn('[waitlist] honeypot triggered', { ip_hash: hashIp(ip, 'log') })
    return { ok: true }
  }

  // LGPD Art. 9º — consentimento explícito obrigatório
  if (body?.consent !== true) {
    throw createError({ statusCode: 400, message: 'Consentimento obrigatório.' })
  }

  if (!body?.email || !isValidEmail(body.email)) {
    throw createError({ statusCode: 422, message: 'E-mail inválido.' })
  }

  const email   = body.email.trim().toLowerCase().slice(0, 254)
  const name    = body.name?.trim().slice(0, 100) || null
  const company = body.company?.trim().slice(0, 100) || null
  const volume  = ['1-5', '6-20', '20+'].includes(body.volume ?? '')
    ? body.volume
    : null

  const VALID_SEGMENTS = ['ti', 'construcao', 'saude', 'limpeza', 'alimentacao', 'outro'] as const
  const segment = VALID_SEGMENTS.includes(body.segment as typeof VALID_SEGMENTS[number])
    ? body.segment
    : null

  // SEC-08: source validado contra whitelist (evita strings arbitrárias no banco)
  const source = VALID_SOURCES.includes(body.source as typeof VALID_SOURCES[number])
    ? body.source
    : 'landing'

  const utm_source   = body.utm_source?.trim().slice(0, 100) || null
  const utm_medium   = body.utm_medium?.trim().slice(0, 100) || null
  const utm_campaign = body.utm_campaign?.trim().slice(0, 100) || null

  // ── Credenciais e secrets (servidor apenas) ────────────────────────────────
  const config = useRuntimeConfig()
  const supabaseUrl = config.supabaseUrl
  const supabaseKey = config.supabaseServiceKey
  const ipSalt      = config.ipHashSalt

  if (!supabaseUrl || !supabaseKey) {
    console.error('[waitlist] Supabase não configurado — verifique .env')
    throw createError({ statusCode: 500, message: 'Serviço temporariamente indisponível.' })
  }

  if (!ipSalt) {
    console.error('[waitlist] IP_HASH_SALT não definido — verifique .env')
    throw createError({ statusCode: 500, message: 'Serviço temporariamente indisponível.' })
  }

  // ── Insert via REST API do Supabase (sem SDK extra) ────────────────────────
  const response = await fetch(`${supabaseUrl}/rest/v1/waitlist_leads`, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'apikey':        supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Prefer':        'return=minimal,resolution=ignore-duplicates',
    },
    body: JSON.stringify({
      email,
      name,
      company,
      volume,
      segment,
      ip_hash: hashIp(ip, ipSalt),
      source,
      consent: body.consent,
      utm_source,
      utm_medium,
      utm_campaign,
    }),
    signal: AbortSignal.timeout(8000),
  }).catch((err) => {
    if (err.name === 'TimeoutError') {
      throw createError({ statusCode: 503, message: 'Serviço temporariamente indisponível. Tente novamente em instantes.' })
    }
    throw err
  })

  // Email duplicado (204 com ignore-duplicates ou 409) → sucesso silencioso, sem email
  if (response.status === 409 || response.status === 204) {
    return { ok: true, duplicate: true }
  }

  if (response.ok) {
    // fire-and-forget: falha no email não impede o cadastro
    sendWelcomeEmail({ name: name ?? email, email }).catch((err: unknown) => {
      console.error('[email] falha ao enviar boas-vindas', { error: String(err) })
    })

    // Busca posição na fila logo após o insert (inclui o próprio registro)
    let position: number | null = null
    try {
      const posRes = await fetch(`${supabaseUrl}/rest/v1/rpc/waitlist_position`, {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'apikey':        supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({ p_email: email }),
        signal: AbortSignal.timeout(3000),
      })
      if (posRes.ok) {
        const val = await posRes.json() as number | null
        if (typeof val === 'number' && val > 0) position = val
      }
    } catch {
      // Posição indisponível — não bloqueia a resposta
    }

    return { ok: true, position }
  }

  const error = await response.text()
  console.error('[waitlist] Supabase error:', response.status, error)
  throw createError({ statusCode: 500, message: 'Erro ao salvar. Tente novamente.' })
})

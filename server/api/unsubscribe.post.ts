/**
 * POST /api/unsubscribe
 * body: { email, token }
 *
 * Remove o email da waitlist a partir de um token HMAC-SHA256 assinado.
 * Chamado pela página /cancelar após confirmação explícita do usuário.
 * POST garante que prefetch de links e proxies de email não disparem a ação.
 */

import { createHmac, timingSafeEqual } from 'node:crypto'
import { checkRateLimit } from '../utils/rateLimit'

// Verifica token com expiração: formato "hmac.expiry_timestamp"
function verifyToken(token: string, email: string, salt: string): boolean {
  try {
    const dotIdx = token.lastIndexOf('.')
    if (dotIdx === -1) return false

    const hmacPart = token.slice(0, dotIdx)
    const expiryPart = token.slice(dotIdx + 1)
    const expiry = Number.parseInt(expiryPart, 10)

    if (Number.isNaN(expiry) || Date.now() / 1000 > expiry) return false

    const payload = `${email}|${expiry}`
    const expected = createHmac('sha256', salt).update(payload).digest('hex')
    return timingSafeEqual(Buffer.from(hmacPart, 'hex'), Buffer.from(expected, 'hex'))
  }
  catch {
    return false
  }
}

export default defineEventHandler(async (event) => {
  const ip = event.node.req.socket?.remoteAddress || '0.0.0.0'
  if (!await checkRateLimit(ip, { key: 'unsubscribe', windowSecs: 60, max: 10 })) {
    throw createError({ statusCode: 429, message: 'Muitas tentativas. Aguarde 1 minuto.' })
  }

  const body = await readBody<{ email?: string, token?: string }>(event).catch(() => ({}))
  const token = typeof body?.token === 'string' ? body.token.trim() : ''
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''

  const config = useRuntimeConfig()
  const { supabaseUrl, supabaseServiceKey, ipHashSalt } = config

  if (!email || !token || !ipHashSalt || !verifyToken(token, email, ipHashSalt)) {
    throw createError({ statusCode: 400, message: 'Link inválido ou expirado.' })
  }

  if (supabaseUrl && supabaseServiceKey) {
    await fetch(
      `${supabaseUrl}/rest/v1/waitlist_leads?email=eq.${encodeURIComponent(email)}`,
      {
        method: 'DELETE',
        headers: {
          apikey: supabaseServiceKey,
          Authorization: `Bearer ${supabaseServiceKey}`,
        },
        signal: AbortSignal.timeout(5000),
      },
    ).catch(() => null)
  }

  return { ok: true }
})

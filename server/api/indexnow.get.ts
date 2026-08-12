/**
 * GET /api/indexnow
 * Dispara o ping do IndexNow (Bing → ChatGPT, Yandex, etc.) para as URLs
 * públicas do site. Pensado para ser chamado pelo Vercel Cron (ver vercel.json).
 *
 * Proteção: exige o header Authorization: Bearer <CRON_SECRET>. O Vercel Cron
 * envia automaticamente esse header quando CRON_SECRET está definido nas env vars
 * do projeto. Sem o segredo correto → 401. Isso evita que qualquer um force o
 * site a pingar o IndexNow repetidamente.
 */
import { timingSafeEqual } from 'node:crypto'
import { submitIndexNow } from '../utils/indexnow'

function secretMatches(provided: string, expected: string): boolean {
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export default defineEventHandler(async (event) => {
  const cronSecret = process.env.CRON_SECRET

  // Sem segredo configurado, o endpoint fica desativado (fail-safe): não queremos
  // um endpoint aberto disparando pings em produção.
  if (!cronSecret) {
    throw createError({ statusCode: 503, statusMessage: 'IndexNow desativado: CRON_SECRET ausente.' })
  }

  const auth = getRequestHeader(event, 'authorization') || ''
  const provided = auth.startsWith('Bearer ') ? auth.slice(7) : ''

  if (!provided || !secretMatches(provided, cronSecret)) {
    throw createError({ statusCode: 401, statusMessage: 'Não autorizado.' })
  }

  const result = await submitIndexNow()
  return {
    ok: result.ok,
    status: result.status,
    submitted: result.count,
    ...(result.detail ? { detail: result.detail } : {}),
  }
})

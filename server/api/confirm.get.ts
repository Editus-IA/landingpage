/**
 * GET /api/confirm?email=...&token=...
 * Double opt-in: valida o token e marca o lead como confirmed no Supabase.
 * Redireciona para /obrigado?confirmado=1 ou /obrigado?erro=1.
 */
import { createHmac, timingSafeEqual } from 'node:crypto'
import { checkRateLimit } from '../utils/rateLimit'

const TOKEN_TTL_DAYS = 7

function verifyConfirmToken(token: string, email: string, salt: string): boolean {
  try {
    const dotIdx = token.lastIndexOf('.')
    if (dotIdx === -1) return false
    const hmacPart   = token.slice(0, dotIdx)
    const expiryPart = token.slice(dotIdx + 1)
    const expiry     = parseInt(expiryPart, 10)
    if (isNaN(expiry) || Date.now() / 1000 > expiry) return false
    const payload  = `confirm|${email}|${expiry}`
    const expected = createHmac('sha256', salt).update(payload).digest('hex')
    return timingSafeEqual(Buffer.from(hmacPart, 'hex'), Buffer.from(expected, 'hex'))
  } catch {
    return false
  }
}

export default defineEventHandler(async (event) => {
  const ip = event.node.req.socket?.remoteAddress || '0.0.0.0'
  if (!await checkRateLimit(ip, { key: 'confirm', windowSecs: 60, max: 10 })) {
    throw createError({ statusCode: 429, message: 'Muitas tentativas. Aguarde 1 minuto.' })
  }

  const query = getQuery(event)
  const email = typeof query.email === 'string' ? query.email.trim().toLowerCase() : ''
  const token = typeof query.token === 'string' ? query.token.trim() : ''

  const config = useRuntimeConfig()
  const { supabaseUrl, supabaseServiceKey, ipHashSalt } = config

  if (!email || !token || !ipHashSalt || !verifyConfirmToken(token, email, ipHashSalt)) {
    return sendRedirect(event, '/obrigado?erro=token', 302)
  }

  if (supabaseUrl && supabaseServiceKey) {
    await fetch(
      `${supabaseUrl}/rest/v1/waitlist_leads?email=eq.${encodeURIComponent(email)}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type':  'application/json',
          'apikey':        supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
        },
        body: JSON.stringify({ confirmed: true }),
        signal: AbortSignal.timeout(5000),
      }
    ).catch(() => null)
  }

  return sendRedirect(event, '/obrigado?confirmado=1', 302)
})

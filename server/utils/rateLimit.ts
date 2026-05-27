import { createHash } from 'node:crypto'

// In-memory fallback: limpa entradas expiradas a cada 5 min
const memAttempts = new Map<string, { count: number; reset: number }>()
setInterval(() => {
  const now = Date.now()
  for (const [key, val] of memAttempts.entries()) {
    if (val.reset < now) memAttempts.delete(key)
  }
}, 300_000).unref()

export function hashIpForLog(ip: string): string {
  return createHash('sha256').update(ip).digest('hex').slice(0, 8)
}

/**
 * Verifica rate limit para um dado identificador (tipicamente IP hash).
 * Usa Upstash Redis via REST se configurado; cai para Map em memória caso contrário.
 *
 * @returns true se dentro do limite, false se excedeu
 */
export async function checkRateLimit(
  identifier: string,
  opts: { key: string; windowSecs: number; max: number },
): Promise<boolean> {
  const { key, windowSecs, max } = opts
  const rlKey = `rl:${key}:${identifier}`

  const upstashUrl   = process.env.UPSTASH_REDIS_REST_URL
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN

  if (upstashUrl && upstashToken) {
    try {
      const res = await fetch(`${upstashUrl}/pipeline`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${upstashToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify([['INCR', rlKey], ['EXPIRE', rlKey, windowSecs, 'NX']]),
        signal: AbortSignal.timeout(2000),
      })
      if (res.ok) {
        const [[, count]] = await res.json() as [[string, number], unknown]
        return count <= max
      }
    } catch {
      // Upstash indisponível → fallback em memória
    }
  }

  const now   = Date.now()
  const entry = memAttempts.get(rlKey)
  if (!entry || entry.reset < now) {
    memAttempts.set(rlKey, { count: 1, reset: now + windowSecs * 1000 })
    return true
  }
  if (entry.count >= max) return false
  entry.count++
  return true
}

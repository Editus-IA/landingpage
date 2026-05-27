/**
 * GET /api/waitlist-count
 * Retorna o total de inscritos na waitlist para exibição pública como social proof.
 *
 * Cache de 5 minutos — evita consulta ao Supabase a cada page load.
 * Em multi-instância (serverless), usa Upstash Redis como cache compartilhado.
 * Fallback para cache em memória por instância quando Upstash não está configurado.
 */

const CACHE_TTL_SECS = 5 * 60
const CACHE_KEY = 'waitlist:count'

// Fallback em memória para dev / quando Upstash não está configurado
let memCached: { count: number; at: number } | null = null

async function getCachedCount(): Promise<number | null> {
  const upstashUrl   = process.env.UPSTASH_REDIS_REST_URL
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN

  if (upstashUrl && upstashToken) {
    try {
      const res = await fetch(`${upstashUrl}/get/${CACHE_KEY}`, {
        headers: { Authorization: `Bearer ${upstashToken}` },
        signal: AbortSignal.timeout(2000),
      })
      if (res.ok) {
        const { result } = await res.json() as { result: string | null }
        if (result !== null) return parseInt(result, 10)
      }
    } catch { /* Upstash indisponível → cai para memória */ }
  }

  if (memCached && Date.now() - memCached.at < CACHE_TTL_SECS * 1000) {
    return memCached.count
  }
  return null
}

async function setCachedCount(count: number): Promise<void> {
  const upstashUrl   = process.env.UPSTASH_REDIS_REST_URL
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN

  if (upstashUrl && upstashToken) {
    try {
      await fetch(`${upstashUrl}/set/${CACHE_KEY}/${count}/ex/${CACHE_TTL_SECS}`, {
        headers: { Authorization: `Bearer ${upstashToken}` },
        signal: AbortSignal.timeout(2000),
      })
      return
    } catch { /* Upstash indisponível → cai para memória */ }
  }

  memCached = { count, at: Date.now() }
}

export default defineEventHandler(async () => {
  const cached = await getCachedCount()
  if (cached !== null) return { count: cached }

  const config = useRuntimeConfig()
  const { supabaseUrl, supabaseServiceKey } = config

  if (!supabaseUrl || !supabaseServiceKey) {
    return { count: null }
  }

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/waitlist_leads?select=count`, {
      headers: {
        'apikey':        supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Prefer':        'count=exact',
        'Range':         '0-0',
      },
      signal: AbortSignal.timeout(3000),
    })

    const contentRange = res.headers.get('content-range') // "0-0/847"
    const total = contentRange ? parseInt(contentRange.split('/')[1], 10) : null

    if (typeof total === 'number' && !isNaN(total)) {
      await setCachedCount(total)
      return { count: total }
    }
  } catch {
    // Supabase indisponível — retorna null sem quebrar a página
  }

  return { count: null }
})

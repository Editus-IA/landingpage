/**
 * Cache do total de inscritos na waitlist.
 *
 * Cache de 5 minutos — evita consulta ao Supabase a cada page load (social proof).
 * Em multi-instância (serverless), usa Upstash Redis como cache compartilhado.
 * Fallback para cache em memória por instância quando Upstash não está configurado.
 *
 * O POST /api/waitlist invalida o cache após cada cadastro bem-sucedido, para que
 * o badge e os formulários reflitam "vagas esgotadas" imediatamente (sem esperar o TTL).
 */

const CACHE_TTL_SECS = 5 * 60
const CACHE_KEY = 'waitlist:count'

// Fallback em memória para dev / quando Upstash não está configurado
let memCached: { count: number, at: number } | null = null

function upstashCreds(): { url: string, token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  return url && token ? { url, token } : null
}

export async function getCachedCount(): Promise<number | null> {
  const creds = upstashCreds()
  if (creds) {
    try {
      const res = await fetch(`${creds.url}/get/${CACHE_KEY}`, {
        headers: { Authorization: `Bearer ${creds.token}` },
        signal: AbortSignal.timeout(2000),
      })
      if (res.ok) {
        const { result } = await res.json() as { result: string | null }
        if (result !== null) return Number.parseInt(result, 10)
      }
    }
    catch { /* Upstash indisponível → cai para memória */ }
  }

  if (memCached && Date.now() - memCached.at < CACHE_TTL_SECS * 1000) {
    return memCached.count
  }
  return null
}

export async function setCachedCount(count: number): Promise<void> {
  const creds = upstashCreds()
  if (creds) {
    try {
      await fetch(`${creds.url}/set/${CACHE_KEY}/${count}/ex/${CACHE_TTL_SECS}`, {
        headers: { Authorization: `Bearer ${creds.token}` },
        signal: AbortSignal.timeout(2000),
      })
      return
    }
    catch { /* Upstash indisponível → cai para memória */ }
  }

  memCached = { count, at: Date.now() }
}

// Invalida o cache — chamado após um cadastro para forçar reccontagem no próximo GET.
export async function invalidateCachedCount(): Promise<void> {
  memCached = null
  const creds = upstashCreds()
  if (creds) {
    try {
      await fetch(`${creds.url}/del/${CACHE_KEY}`, {
        headers: { Authorization: `Bearer ${creds.token}` },
        signal: AbortSignal.timeout(2000),
      })
    }
    catch { /* Upstash indisponível → cache em memória já foi limpo */ }
  }
}

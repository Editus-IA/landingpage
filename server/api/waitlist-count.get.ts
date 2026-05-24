/**
 * GET /api/waitlist-count
 * Retorna o total de inscritos na waitlist para exibição pública como social proof.
 * Cache de 5 minutos — evita consulta ao Supabase a cada page load.
 */

let cached: { count: number; at: number } | null = null
const CACHE_TTL = 5 * 60 * 1000 // 5 minutos

export default defineEventHandler(async () => {
  if (cached && Date.now() - cached.at < CACHE_TTL) {
    return { count: cached.count }
  }

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
      cached = { count: total, at: Date.now() }
      return { count: total }
    }
  } catch {
    // Supabase indisponível — retorna null sem quebrar a página
  }

  return { count: null }
})

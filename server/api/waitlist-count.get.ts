/**
 * GET /api/waitlist-count
 * Retorna o total de inscritos na waitlist e o status do lote (vagas restantes / esgotado)
 * para exibição pública como social proof e bloqueio do formulário.
 *
 * Usa cache compartilhado (ver server/utils/waitlistCount.ts), invalidado a cada
 * cadastro pelo POST /api/waitlist — assim a UI reflete "esgotado" na hora.
 */

import { getCachedCount, setCachedCount } from '../utils/waitlistCount'

// Monta a resposta pública: total, vagas restantes e se o lote esgotou.
function buildResponse(count: number | null, maxVagas: number) {
  if (count === null) return { count: null, max: maxVagas, remaining: null, full: false }
  const remaining = Math.max(0, maxVagas - count)
  return { count, max: maxVagas, remaining, full: remaining <= 0 }
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const maxVagas = config.public.maxVagas

  const cached = await getCachedCount()
  if (cached !== null) return buildResponse(cached, maxVagas)

  const { supabaseUrl, supabaseServiceKey } = config

  if (!supabaseUrl || !supabaseServiceKey) {
    return buildResponse(null, maxVagas)
  }

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/waitlist_leads?select=count`, {
      headers: {
        apikey: supabaseServiceKey,
        Authorization: `Bearer ${supabaseServiceKey}`,
        Prefer: 'count=exact',
        Range: '0-0',
      },
      signal: AbortSignal.timeout(3000),
    })

    const contentRange = res.headers.get('content-range') // "0-0/847"
    const total = contentRange ? Number.parseInt(contentRange.split('/')[1], 10) : null

    if (typeof total === 'number' && !Number.isNaN(total)) {
      await setCachedCount(total)
      return buildResponse(total, maxVagas)
    }
  }
  catch {
    // Supabase indisponível — retorna null sem quebrar a página
  }

  return buildResponse(null, maxVagas)
})

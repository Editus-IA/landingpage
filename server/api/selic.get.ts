/**
 * GET /api/selic
 * Retorna a taxa Selic meta anual atual, buscada da API pública do Banco Central
 * (Sistema Gerenciador de Séries Temporais — série 432, "Meta Selic definida pelo
 * Copom", em % a.a.).
 *
 * Por que server-side: a chamada ao BCB sai do servidor, não do browser — assim a
 * CSP do cliente permanece intacta (sem precisar liberar api.bcb.gov.br em
 * connect-src). O resultado é cacheado em memória (a Selic muda poucas vezes ao
 * ano), e há fallback para um valor padrão se o BCB estiver indisponível — a
 * calculadora nunca quebra por causa disso.
 */

// Série 432 = Meta Selic (% a.a.). https://dadosabertos.bcb.gov.br/
const BCB_URL = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json'

// Fallback usado se a API do BCB falhar. Mantido conservador e ajustável.
const FALLBACK_SELIC = 11

// Cache em memória (o processo serverless reaproveita entre requisições quentes).
const CACHE_TTL_MS = 6 * 60 * 60 * 1000 // 6 horas
let cache: { value: number, source: 'bcb' | 'fallback', at: number } | null = null

export default defineEventHandler(async () => {
  // Cache válido → responde na hora.
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) {
    return { selic: cache.value, source: cache.source, cached: true }
  }

  try {
    const res = await fetch(BCB_URL, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(3000),
    })

    if (res.ok) {
      const data = (await res.json()) as Array<{ data: string, valor: string }>
      const raw = data?.[0]?.valor
      const value = raw === undefined || raw === null
        ? Number.NaN
        : Number(String(raw).replace(',', '.'))

      // Sanidade: Selic plausível entre 0% e 50% a.a.
      if (Number.isFinite(value) && value > 0 && value < 50) {
        cache = { value, source: 'bcb', at: Date.now() }
        return { selic: value, source: 'bcb', cached: false }
      }
    }
  }
  catch {
    // BCB indisponível ou timeout — cai no fallback abaixo sem quebrar.
  }

  // Fallback: valor padrão editável pelo usuário no front.
  cache = { value: FALLBACK_SELIC, source: 'fallback', at: Date.now() }
  return { selic: FALLBACK_SELIC, source: 'fallback', cached: false }
})

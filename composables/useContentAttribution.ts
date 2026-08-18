// Atribuição de leads que vêm de páginas de conteúdo (guias, calculadora,
// diagnóstico, FAQ). Todo CTA dessas páginas aponta para a MESMA instância de
// WaitlistForm na home (via /#waitlist) — sem isso, é impossível saber se um
// lead veio direto pela home ou por um guia específico.
//
// Estratégia: a página de conteúdo grava sua própria origem no sessionStorage
// ao montar; o WaitlistForm lê esse valor como fallback de UTM (só quando não
// há UTM real na querystring — tráfego pago/campanha sempre tem prioridade).
const STORAGE_KEY = 'editus_content_attribution'

export interface ContentAttribution {
  source: string // ex: 'guia', 'calculadora', 'diagnostico', 'faq'
  campaign: string // ex: slug do guia, ou o nome da página
}

// Chamar no onMounted de cada página de conteúdo.
export function setContentAttribution(attribution: ContentAttribution) {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution))
  }
  catch { /* sessionStorage indisponível (modo privado etc.) — não bloqueia */ }
}

// Chamar no WaitlistForm para obter o fallback, se existir.
export function getContentAttribution(): ContentAttribution | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ContentAttribution) : null
  }
  catch {
    return null
  }
}

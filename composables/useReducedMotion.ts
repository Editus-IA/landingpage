// Detecta a preferência do usuário por movimento reduzido.
// SSR-safe: no servidor (sem window) retorna false; a checagem real só ocorre
// no client. Toda animação decorativa do site deve respeitar isso — mesmo
// padrão já usado em components/HeroBackground.client.vue.
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

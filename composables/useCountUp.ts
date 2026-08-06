import { ref, watch } from 'vue'
import { animate } from 'animejs'
import { prefersReducedMotion } from '~/composables/useReducedMotion'

// Anima um número "subindo" de 0 até o valor alvo (ex: contador de vagas na
// waitlist). Usado como social proof — o movimento chama atenção sem exigir
// nenhum asset externo.
//
// Regras respeitadas:
// - prefers-reduced-motion: pula a animação e mostra o valor final direto.
// - SSR-safe: só anima no client; o valor é reativo e renderiza no HTML.
// - sem CLS: o elemento já ocupa seu espaço; só o texto interno muda.
//
// Retorna `display` (ref string) para bind no template. Chame `run(target)`
// quando o valor real chegar (ex: após o fetch de /api/waitlist-count).
export function useCountUp(options?: { duration?: number }) {
  const duration = options?.duration ?? 1200
  const display = ref('0')
  let started = false

  function run(target: number) {
    if (started) return
    started = true

    if (prefersReducedMotion() || target <= 0) {
      display.value = String(target)
      return
    }

    const state = { value: 0 }
    animate(state, {
      value: target,
      duration,
      ease: 'out(3)',
      onUpdate: () => {
        display.value = String(Math.round(state.value))
      },
    })
  }

  return { display, run }
}

// Variante que dispara automaticamente quando um ref numérico passa a ter valor.
export function useAutoCountUp(source: import('vue').Ref<number | null>, options?: { duration?: number }) {
  const { display, run } = useCountUp(options)
  watch(source, (val) => {
    if (val && val > 0) run(val)
  }, { immediate: true })
  return { display }
}

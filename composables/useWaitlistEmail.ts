// Estado compartilhado entre HeroSection (captura) e WaitlistForm (formulário completo)
export const useWaitlistEmail = () => useState<string>('waitlist-email', () => '')

// Segmento capturado pelo ScrollPopup — pré-preenche o WaitlistForm completo
export const useWaitlistSegment = () => useState<string>('waitlist-segment', () => '')

// Posição na fila retornada pelo POST — lida pela página /obrigado
export const useWaitlistPosition = () => useState<number | null>('waitlist-position', () => null)

// Indica se o lote de vagas esgotou — preenchido por useWaitlistCapacity()
export const useWaitlistFull = () => useState<boolean>('waitlist-full', () => false)

interface WaitlistCount {
  count: number | null
  max: number
  remaining: number | null
  full: boolean
}

// Busca a capacidade do lote uma única vez e propaga o estado "esgotado".
// Compartilhado entre UrgencyBadge, WaitlistForm e ScrollPopup.
export async function useWaitlistCapacity() {
  const full = useWaitlistFull()
  try {
    const data = await $fetch<WaitlistCount>('/api/waitlist-count')
    full.value = data?.full ?? false
    return data
  }
  catch {
    return null
  }
}

// Estado compartilhado entre HeroSection (captura) e WaitlistForm (formulário completo)
export const useWaitlistEmail = () => useState<string>('waitlist-email', () => '')

// Posição na fila retornada pelo POST — lida pela página /obrigado
export const useWaitlistPosition = () => useState<number | null>('waitlist-position', () => null)

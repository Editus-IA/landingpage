import { readonly } from 'vue'

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 // 7 dias

export function useABTest<T extends string>(testName: string, variants: T[]): Readonly<Ref<T>> {
  const key = `ab_${testName}`

  // IMPORTANTE (hydration): o sorteio da variante acontece UMA vez, no servidor.
  // Antes, o `default` com Math.random() rodava tanto no SSR quanto no client e
  // podia sortear variantes diferentes (o cookie ainda não existia no primeiro
  // acesso), causando "hydration mismatch" e flicker de conteúdo.
  //
  // Correção: o cookie é lido sem sorteio; se estiver ausente, sorteamos apenas
  // no servidor e gravamos o valor de volta em `variant.value`. O Nuxt serializa
  // esse valor no payload de SSR, então o client hidrata com a MESMA variante.
  const variant = useCookie<T | undefined>(key, {
    maxAge: COOKIE_MAX_AGE,
    sameSite: 'lax',
  })

  // Variante ausente ou inválida (ex: teste reconfigurado): resolve no servidor.
  if (!variant.value || !variants.includes(variant.value)) {
    if (import.meta.server) {
      variant.value = variants[Math.floor(Math.random() * variants.length)] as T
    }
    else if (!variant.value) {
      // Fallback client-only (ex: navegação SPA sem SSR): usa 'control' se existir,
      // senão a primeira variante — determinístico, sem risco de mismatch.
      variant.value = (variants.includes('control' as T) ? 'control' : variants[0]) as T
    }
  }

  return readonly(variant) as Readonly<Ref<T>>
}

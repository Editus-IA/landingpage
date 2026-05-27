import { readonly } from "vue"

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 // 7 dias

export function useABTest<T extends string>(testName: string, variants: T[]): Readonly<Ref<T>> {
  const key = `ab_${testName}`

  const variant = useCookie<T>(key, {
    maxAge: COOKIE_MAX_AGE,
    sameSite: 'lax',
    default: () => variants[Math.floor(Math.random() * variants.length)] as T,
  })

  // Garante que variante inválida (ex: teste reconfigurado) sempre retorna control
  if (!variants.includes(variant.value)) {
    variant.value = 'control' as T
  }

  return readonly(variant)
}

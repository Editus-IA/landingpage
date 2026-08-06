import { onMounted, readonly, ref } from 'vue'

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 // 7 dias

// Testes A/B sem hydration mismatch e sem prejudicar o SEO.
//
// O problema: cada variante renderiza HTML diferente. Se o servidor renderiza a
// variante X e o cliente hidrata esperando outra (ou reordena o DOM), o Vue
// dispara "hydration mismatch" e ocorre flicker.
//
// A estratégia: o SSR SEMPRE renderiza a variante canônica ('control' — ou a
// primeira, se não houver 'control'). Assim o HTML servido é estável e
// determinístico — ótimo para crawlers e agentes de IA, que veem o conteúdo
// principal. A variante real do experimento (sorteada e persistida em cookie) só
// é aplicada DEPOIS da montagem no client, quando o mismatch não é mais possível.
export function useABTest<T extends string>(testName: string, variants: T[]): Readonly<Ref<T>> {
  const key = `ab_${testName}`
  const controlVariant = (variants.includes('control' as T) ? 'control' : variants[0]) as T

  // Cookie: fonte de verdade da variante atribuída ao usuário (persistente).
  const cookie = useCookie<T | undefined>(key, {
    maxAge: COOKIE_MAX_AGE,
    sameSite: 'lax',
  })

  // No servidor, atribui/sorteia a variante e persiste no cookie — mas o valor
  // EXPOSTO ao render permanece 'control' até a montagem (ver abaixo).
  if (import.meta.server && (!cookie.value || !variants.includes(cookie.value))) {
    cookie.value = variants[Math.floor(Math.random() * variants.length)] as T
  }

  // Valor exibido: 'control' no SSR e no primeiro render do client (idênticos →
  // sem mismatch). Só troca para a variante do cookie após a montagem.
  const active = ref<T>(controlVariant)

  onMounted(() => {
    const resolved = cookie.value && variants.includes(cookie.value) ? cookie.value : controlVariant
    if (resolved !== active.value) active.value = resolved
  })

  return readonly(active) as Readonly<Ref<T>>
}

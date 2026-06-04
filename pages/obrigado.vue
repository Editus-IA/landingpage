<template>
  <div class="min-h-screen bg-indigo-900 flex flex-col items-center justify-center px-6 py-24">
    <div class="max-w-lg w-full text-center">
      <div class="w-16 h-16 bg-success/20 border border-success/30 rounded-eb-md flex items-center justify-center mx-auto mb-8">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          class="text-success"
        >
          <path
            d="M5 14l6 6 12-12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <template v-if="isConfirmed">
        <h1 class="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
          E-mail confirmado!
        </h1>
        <p class="text-white/50 leading-relaxed mb-10">
          Sua inscrição está confirmada. Você será um dos primeiros avisados quando o acesso antecipado abrir.
        </p>
      </template>
      <template v-else-if="isDuplicate">
        <h1 class="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
          Você já está na lista!
        </h1>
        <p class="text-white/50 leading-relaxed mb-10">
          Esse e-mail já estava cadastrado. Fique tranquilo, você não perde sua posição.
          Avisaremos assim que o acesso antecipado abrir.
        </p>
      </template>
      <template v-else>
        <h1 class="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
          Você está na lista!
        </h1>
        <p class="text-white/50 leading-relaxed mb-10">
          Obrigado pelo interesse no Editus. Verifique seu e-mail para confirmar a inscrição e garantir sua vaga.
        </p>
      </template>

      <!-- Badge de posição na fila -->
      <div
        v-if="position"
        class="inline-flex items-center gap-2 bg-indigo-700/40 border border-violet-600/40 rounded-eb-pill px-4 py-2 mb-8"
      >
        <span class="text-violet-300 text-xs font-medium tracking-widest uppercase">Sua posição</span>
        <span class="text-white font-semibold text-sm">#{{ position }}</span>
      </div>

      <div class="bg-indigo-800/40 border border-indigo-700/40 rounded-eb-md p-6 mb-10 text-left">
        <p class="text-xs font-medium tracking-widest uppercase text-violet-300 mb-4">
          O que acontece agora?
        </p>
        <ul class="space-y-3">
          <li class="flex items-start gap-3 text-sm text-white/60">
            <span class="mt-0.5 w-5 h-5 rounded-full bg-violet-700/60 flex items-center justify-center shrink-0 text-violet-300 text-xs font-medium">1</span>
            Você receberá um e-mail de confirmação em breve.
          </li>
          <li class="flex items-start gap-3 text-sm text-white/60">
            <span class="mt-0.5 w-5 h-5 rounded-full bg-violet-700/60 flex items-center justify-center shrink-0 text-violet-300 text-xs font-medium">2</span>
            Quando o acesso antecipado abrir, você será um dos primeiros avisados.
          </li>
          <li class="flex items-start gap-3 text-sm text-white/60">
            <span class="mt-0.5 w-5 h-5 rounded-full bg-violet-700/60 flex items-center justify-center shrink-0 text-violet-300 text-xs font-medium">3</span>
            O acesso é gratuito na fase inicial. Só queremos feedback real de quem compete em licitações.
          </li>
        </ul>
      </div>

      <button
        class="btn-primary justify-center w-full py-3 text-sm mb-4"
        @click="share"
      >
        {{ shareLabel }}
      </button>

      <NuxtLink
        to="/"
        class="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M9 11L5 7l4-4"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Voltar ao início
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

const route = useRoute()
const router = useRouter()
const isDuplicate = computed(() => route.query.duplicado === '1')
const isConfirmed = computed(() => route.query.confirmado === '1')
const position = useWaitlistPosition()
const shareLabel = ref('Compartilhar com colegas')

// Bloqueia acesso direto: só permite se veio de um submit válido
// useWaitlistPosition é estado em memória (perde no refresh), então usamos
// sessionStorage como fallback para o caso do browser recarregar a página
onMounted(() => {
  const fromSubmit = position.value !== null || sessionStorage.getItem('waitlist_submitted') === '1' || isDuplicate.value || isConfirmed.value
  if (!fromSubmit) {
    router.replace('/')
    return
  }
  // Marca sessão para sobreviver a reloads manuais desta página
  sessionStorage.setItem('waitlist_submitted', '1')
})

onUnmounted(() => {
  // Limpa ao sair da página para que o próximo acesso direto seja bloqueado
  sessionStorage.removeItem('waitlist_submitted')
})

async function share() {
  const url = 'https://editus.com.br'
  const title = 'Editus — IA para análise de editais e licitações'
  const text = 'Acabei de entrar na lista de acesso antecipado do Editus, plataforma de IA para licitações. Vale conhecer!'

  try {
    await navigator.share({ url, title, text })
  }
  catch {
    await navigator.clipboard.writeText(url)
    shareLabel.value = 'Copiado!'
    setTimeout(() => {
      shareLabel.value = 'Compartilhar com colegas'
    }, 2500)
  }
}
</script>

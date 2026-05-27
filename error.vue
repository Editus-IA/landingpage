<template>
  <div class="min-h-screen bg-editus-950 flex flex-col items-center justify-center px-6 py-24">
    <div class="max-w-md w-full text-center">
      <div class="w-16 h-16 bg-editus-800/60 border border-editus-700/40 rounded-2xl flex items-center justify-center mx-auto mb-8">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          class="text-editus-400"
        >
          <circle
            cx="14"
            cy="14"
            r="11"
            stroke="currentColor"
            stroke-width="1.8"
          />
          <path
            d="M14 8v7M14 18.5v1"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />
        </svg>
      </div>

      <p class="text-xs font-medium tracking-widest uppercase text-editus-500 mb-3">
        Erro {{ error?.statusCode || 500 }}
      </p>

      <h1 class="text-3xl font-semibold text-white tracking-tight mb-4">
        {{ title }}
      </h1>

      <p class="text-white/40 leading-relaxed mb-10">
        {{ description }}
      </p>

      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <NuxtLink
          to="/"
          class="btn-primary justify-center"
        >
          Voltar ao início
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M3 7h8M8 4.5L10.5 7 8 9.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </NuxtLink>
        <button
          class="btn-ghost"
          @click="handleError"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number, message?: string } | null }>()

const title = computed(() => {
  if (props.error?.statusCode === 404) return 'Página não encontrada'
  if (props.error?.statusCode === 403) return 'Acesso negado'
  return 'Algo deu errado'
})

const description = computed(() => {
  if (props.error?.statusCode === 404) return 'A página que você está procurando não existe ou foi movida.'
  if (props.error?.statusCode === 403) return 'Você não tem permissão para acessar esta página.'
  return 'Ocorreu um erro inesperado. Nossa equipe já foi notificada. Tente novamente em instantes.'
})

function handleError() {
  clearError({ redirect: '/' })
}

useHead({
  title: `${title.value} — Editus`,
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})
</script>

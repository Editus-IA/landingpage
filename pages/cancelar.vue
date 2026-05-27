<template>
  <div class="min-h-screen bg-editus-900 flex flex-col items-center justify-center px-6 py-24">
    <div class="max-w-md w-full text-center">
      <template v-if="done">
        <div class="w-14 h-14 bg-editus-800/60 border border-editus-700/40 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            class="text-white/60"
          >
            <path
              d="M5 12l5 5 9-9"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h1 class="text-2xl font-semibold text-white tracking-tight mb-3">
          Inscrição cancelada
        </h1>
        <p class="text-white/50 text-sm leading-relaxed mb-8">
          Seu e-mail foi removido da lista. Não enviaremos mais comunicações sobre o Editus.
        </p>
        <NuxtLink
          to="/"
          class="text-sm text-editus-400 hover:text-editus-300 transition-colors"
        >Voltar ao início</NuxtLink>
      </template>

      <template v-else-if="invalid">
        <h1 class="text-2xl font-semibold text-white tracking-tight mb-3">
          Link inválido
        </h1>
        <p class="text-white/50 text-sm leading-relaxed mb-8">
          Este link de cancelamento é inválido ou já foi utilizado.
          Para remover seus dados, entre em contato com
          <a
            href="mailto:privacidade@editus.com.br"
            class="text-editus-400 hover:text-editus-300 transition-colors"
          >privacidade@editus.com.br</a>.
        </p>
        <NuxtLink
          to="/"
          class="text-sm text-editus-400 hover:text-editus-300 transition-colors"
        >Voltar ao início</NuxtLink>
      </template>

      <template v-else>
        <h1 class="text-2xl font-semibold text-white tracking-tight mb-3">
          Cancelar inscrição
        </h1>
        <p class="text-white/50 text-sm leading-relaxed mb-8">
          Tem certeza que deseja sair da lista de acesso antecipado do Editus?
          Seu e-mail será removido permanentemente.
        </p>
        <button
          :disabled="loading"
          class="btn-primary justify-center px-8 py-3 text-sm mb-4"
          @click="confirm"
        >
          {{ loading ? 'Removendo...' : 'Confirmar cancelamento' }}
        </button>
        <br>
        <NuxtLink
          to="/"
          class="text-sm text-white/40 hover:text-white/60 transition-colors"
        >Manter minha inscrição</NuxtLink>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Cancelar inscrição — Editus',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

const route = useRoute()
const email = computed(() => (route.query.email as string) ?? '')
const token = computed(() => (route.query.token as string) ?? '')
const loading = ref(false)
const done = ref(false)
const invalid = ref(!email.value || !token.value)

async function confirm() {
  loading.value = true
  try {
    await $fetch('/api/unsubscribe', {
      method: 'POST',
      body: { email: email.value, token: token.value },
    })
    done.value = true
  }
  catch {
    invalid.value = true
  }
  finally {
    loading.value = false
  }
}
</script>

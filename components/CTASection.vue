<template>
  <section class="py-24 bg-editus-900 relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-[linear-gradient(rgba(100,89,200,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(100,89,200,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-editus-600/15 rounded-full blur-[100px] pointer-events-none" />

    <div class="relative max-w-3xl mx-auto px-6 text-center">
      <!-- Eyebrow -->
      <div class="inline-flex items-center gap-2 bg-editus-800/60 border border-editus-700/40 rounded-full px-4 py-1.5 mb-8">
        <span class="w-1.5 h-1.5 bg-victory-400 rounded-full" />
        <span class="text-xs text-editus-300 font-medium">Acesso antecipado · Vagas limitadas</span>
      </div>

      <h2 class="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight mb-6">
        Não perca mais licitações<br>
        <span class="text-editus-400">por falta de análise.</span><br>
        Sua vaga está aqui.
      </h2>

      <p class="text-lg text-white/50 leading-relaxed mb-10 max-w-xl mx-auto">
        Sem custo. Sem compromisso. Só queremos feedback real de quem compete em licitações.
      </p>

      <!-- Inline email capture -->
      <form
        class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-10"
        @submit.prevent="onSubmit"
      >
        <input
          v-model="email"
          type="email"
          required
          placeholder="seu@email.com.br"
          aria-label="Seu email para acesso antecipado"
          class="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/35 text-sm focus:outline-none focus:border-editus-400 focus:bg-white/15 transition-all"
        >
        <button
          type="submit"
          :disabled="submitting"
          :class="btnClass"
          class="whitespace-nowrap text-white rounded-lg px-6 py-3 text-sm font-medium inline-flex items-center gap-2 transition-all hover:-translate-y-px hover:shadow-lg active:translate-y-0 disabled:opacity-50"
        >
          Garantir acesso
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
        </button>
      </form>

      <!-- Benefícios rápidos -->
      <div class="flex flex-wrap justify-center gap-x-8 gap-y-3">
        <div class="flex items-center gap-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            class="text-victory-400 flex-shrink-0"
          >
            <path
              d="M12 3.5L5.5 10 2 6.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="text-sm text-white/60">Sem custo no beta</span>
        </div>
        <div class="flex items-center gap-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            class="text-victory-400 flex-shrink-0"
          >
            <path
              d="M12 3.5L5.5 10 2 6.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="text-sm text-white/60">Sem compromisso</span>
        </div>
        <div class="flex items-center gap-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            class="text-victory-400 flex-shrink-0"
          >
            <path
              d="M12 3.5L5.5 10 2 6.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="text-sm text-white/60">Selecionamos PMEs que lidam com licitações</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  buttonColorVariant?: 'control' | 'green'
}>()

const { track } = useUmami()
const sharedEmail = useWaitlistEmail()

const email = ref('')
const submitting = ref(false)

const btnClass = computed(() => {
  if (props.buttonColorVariant === 'green') {
    return 'bg-victory-500 hover:bg-victory-600 shadow-victory-500/25'
  }
  return 'bg-editus-600 hover:bg-editus-700 shadow-editus-600/25'
})

function onSubmit() {
  if (!email.value || submitting.value) return
  submitting.value = true
  track('cta_click', {
    location: 'cta_section',
    ab_cta_section: 'active',
    ab_button_color: props.buttonColorVariant ?? 'control',
  })
  sharedEmail.value = email.value
  const target = document.getElementById('waitlist')
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  setTimeout(() => {
    submitting.value = false
  }, 700)
}
</script>

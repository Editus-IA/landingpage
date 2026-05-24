<template>
  <!-- Inline (hero) version — captura o e-mail e rola até o formulário completo -->
  <div v-if="inline">
    <form @submit.prevent="submitInline" class="flex flex-col sm:flex-row gap-3 max-w-md">
      <input
        v-model="email"
        type="email"
        required
        placeholder="seu@email.com.br"
        aria-label="Seu email para acesso antecipado"
        class="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/35 text-sm focus:outline-none focus:border-editus-400 focus:bg-white/15 transition-all"
      />
      <button type="submit" :disabled="inlineSubmitting" class="btn-primary whitespace-nowrap">
        Garantir acesso
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7h8M8 4.5L10.5 7 8 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </form>
    <p class="mt-3 text-xs text-white/30">Sem spam. Só avisamos quando o acesso antecipado abrir.</p>
  </div>

  <!-- Full section version -->
  <div v-else id="waitlist" class="py-24 bg-editus-900">
    <div class="max-w-2xl mx-auto px-6 text-center">
      <p class="text-xs font-medium tracking-widest uppercase text-editus-400 mb-3">Acesso antecipado</p>
      <h2 class="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
        Seja um dos primeiros a usar o Editus
      </h2>
      <p class="text-white/50 mb-10 leading-relaxed">
        Estamos selecionando PMEs brasileiras para o acesso antecipado.
        Sem custo. Só queremos feedback real de quem compete em licitações todo dia.
      </p>

      <!-- SEC-04: honeypot anti-bot — só existe no client, nunca no HTML do SSR -->
      <input v-if="mounted" v-model="form._trap" type="text" name="website" autocomplete="off" tabindex="-1" aria-hidden="true" style="display:none;" />

      <form @submit.prevent="submitFull" class="space-y-4 text-left">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label for="waitlist-name" class="block text-xs font-medium text-white/50 mb-1.5">Nome</label>
            <input
              id="waitlist-name"
              v-model="form.name"
              type="text"
              placeholder="João Silva"
              class="w-full px-4 py-3 bg-editus-800/50 border border-editus-700/50 rounded-lg text-white placeholder-white/25 text-sm focus:outline-none focus:border-editus-500 transition-all"
            />
          </div>
          <div>
            <label for="waitlist-email" class="block text-xs font-medium text-white/50 mb-1.5">E-mail profissional</label>
            <input
              id="waitlist-email"
              v-model="form.email"
              type="email"
              required
              placeholder="joao@empresa.com.br"
              class="w-full px-4 py-3 bg-editus-800/50 border border-editus-700/50 rounded-lg text-white placeholder-white/25 text-sm focus:outline-none focus:border-editus-500 transition-all"
            />
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label for="waitlist-company" class="block text-xs font-medium text-white/50 mb-1.5">Empresa</label>
            <input
              id="waitlist-company"
              v-model="form.company"
              type="text"
              placeholder="Nome da empresa"
              class="w-full px-4 py-3 bg-editus-800/50 border border-editus-700/50 rounded-lg text-white placeholder-white/25 text-sm focus:outline-none focus:border-editus-500 transition-all"
            />
          </div>
          <div>
            <label for="waitlist-segment" class="block text-xs font-medium text-white/50 mb-1.5">Segmento de atuação</label>
            <div class="relative">
              <select
                id="waitlist-segment"
                v-model="form.segment"
                class="w-full px-4 py-3 bg-editus-800/50 border border-editus-700/50 rounded-lg text-white/80 text-sm focus:outline-none focus:border-editus-500 transition-all appearance-none pr-10"
              >
                <option value="" disabled selected>Selecione</option>
                <option value="ti">TI e Tecnologia</option>
                <option value="construcao">Construção e Engenharia</option>
                <option value="saude">Saúde e Farmácia</option>
                <option value="limpeza">Limpeza e Conservação</option>
                <option value="alimentacao">Alimentação e Nutrição</option>
                <option value="outro">Outro</option>
              </select>
              <svg class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/30" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label for="waitlist-volume" class="block text-xs font-medium text-white/50 mb-1.5">Editais por mês (aprox.)</label>
            <div class="relative">
              <select
                id="waitlist-volume"
                v-model="form.volume"
                class="w-full px-4 py-3 bg-editus-800/50 border border-editus-700/50 rounded-lg text-white/80 text-sm focus:outline-none focus:border-editus-500 transition-all appearance-none pr-10"
              >
                <option value="" disabled selected>Selecione</option>
                <option value="1-5">1 a 5 por mês</option>
                <option value="6-20">6 a 20 por mês</option>
                <option value="20+">Mais de 20 por mês</option>
              </select>
              <svg class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/30" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="flex items-start gap-3 pt-1">
          <input
            id="waitlist-consent"
            v-model="form.consent"
            type="checkbox"
            class="mt-0.5 h-4 w-4 shrink-0 rounded border-editus-600 bg-editus-800/50 text-editus-500 focus:ring-editus-500 focus:ring-offset-editus-900 cursor-pointer"
          />
          <label for="waitlist-consent" class="text-xs text-white/50 leading-relaxed cursor-pointer select-none">
            Li e concordo com a
            <NuxtLink to="/privacidade" class="text-editus-400 hover:text-editus-300 underline underline-offset-2 transition-colors">Política de Privacidade</NuxtLink>
            e autorizo o uso dos meus dados para receber comunicações sobre o Editus.
          </label>
        </div>

        <button
          type="submit"
          :disabled="!form.consent || loading"
          :aria-disabled="!form.consent || loading"
          class="w-full btn-primary justify-center py-4 text-base"
        >
          <span v-if="loading">Enviando...</span>
          <span v-else>Garantir meu acesso antecipado</span>
        </button>
        <p v-if="errorMsg" class="text-center text-xs text-red-400 font-medium">{{ errorMsg }}</p>
        <p v-else class="text-center text-xs text-white/25">
          Sem spam. Sem compromisso. Só avisamos quando abrir.
        </p>
      </form>

    </div>
  </div>
</template>

<script setup lang="ts">
const { track } = useUmami()
const router = useRouter()

const props = defineProps({
  inline: {
    type: Boolean,
    default: false,
  },
  ctaLocation: {
    type: String,
    default: 'hero',
  },
})

const sharedEmail    = useWaitlistEmail()
const sharedPosition = useWaitlistPosition()

const email = ref('')
const loading = ref(false)
const inlineSubmitting = ref(false)
const mounted = ref(false)
onMounted(() => { mounted.value = true })

const form = reactive({
  name: '',
  email: '',
  company: '',
  volume: '',
  segment: '',
  consent: false,
  _trap: '',  // honeypot — deve permanecer vazio
  utm_source:   null as string | null,
  utm_medium:   null as string | null,
  utm_campaign: null as string | null,
})

const errorMsg = ref('')

const route = useRoute()
onMounted(() => {
  form.utm_source   = (route.query.utm_source   as string) || null
  form.utm_medium   = (route.query.utm_medium   as string) || null
  form.utm_campaign = (route.query.utm_campaign as string) || null
  if (!props.inline) {
    track('waitlist_form_start', { source: 'waitlist-section' })
  }
})

// Formulário completo: pré-preenche o e-mail assim que o estado muda (hero → form)
const stopWatchingEmail = watch(sharedEmail, (val) => {
  if (!props.inline && val) {
    form.email = val
  }
}, { immediate: true })

onUnmounted(() => stopWatchingEmail())

function submitInline() {
  // Hero: guarda e-mail no estado compartilhado e rola até o formulário completo
  if (!email.value || inlineSubmitting.value) return
  inlineSubmitting.value = true
  track('cta_click', { location: props.ctaLocation })
  sharedEmail.value = email.value
  const target = document.getElementById('waitlist')
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  // Reabilita após o scroll terminar (~600ms)
  setTimeout(() => { inlineSubmitting.value = false }, 700)
}

async function submitFull() {
  loading.value = true
  errorMsg.value = ''
  try {
    const res = await $fetch<{ ok: boolean; duplicate?: boolean; position?: number | null }>('/api/waitlist', {
      method: 'POST',
      body: { ...form, source: 'waitlist-section' },
    })
    if (res?.ok) {
      sharedPosition.value = res.position ?? null
      if (res.duplicate) {
        router.push('/obrigado?duplicado=1')
      } else {
        track('waitlist_signup', { source: 'waitlist-section', volume: form.volume })
        router.push('/obrigado')
      }
    }
  } catch (err: any) {
    const status = err?.statusCode ?? err?.data?.statusCode
    const msg = err?.data?.message || err?.message || ''
    if (status === 429 || msg.includes('429')) {
      errorMsg.value = 'Muitas tentativas. Aguarde um momento.'
    } else if (status === 503) {
      errorMsg.value = msg || 'Serviço temporariamente indisponível. Tente novamente em instantes.'
    } else {
      errorMsg.value = 'Erro ao salvar. Tente novamente.'
    }
  } finally {
    loading.value = false
  }
}
</script>

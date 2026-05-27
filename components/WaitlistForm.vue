<template>
  <!-- Inline (hero) version — captura o e-mail e rola até o formulário completo -->
  <div v-if="inline">
    <form
      class="flex flex-col sm:flex-row gap-3 max-w-md"
      @submit.prevent="submitInline"
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
        :disabled="inlineSubmitting"
        :class="btnClass"
        class="btn-ab whitespace-nowrap"
      >
        {{ heroCTAText }}
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
    <p class="mt-3 text-xs text-white/30">
      <template v-if="resolvedUrgencyCopy === 'consequence'">
        Cada edital publicado no PNCP que você não analisa é um contrato que seu concorrente pode ganhar.
      </template>
      <template v-else>
        Sem spam. Só avisamos quando o acesso antecipado abrir.
      </template>
    </p>
  </div>

  <!-- Full section version -->
  <div
    v-else
    id="waitlist"
    class="py-24 bg-editus-900"
  >
    <div class="max-w-2xl mx-auto px-6 text-center">
      <p class="text-xs font-medium tracking-widest uppercase text-editus-400 mb-3">
        Acesso antecipado
      </p>
      <h2 class="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
        Seja um dos primeiros a usar o Editus
      </h2>
      <p class="text-white/50 mb-10 leading-relaxed">
        Estamos selecionando PMEs brasileiras para o acesso antecipado.
        Sem custo. Só queremos feedback real de quem compete em licitações todo dia.
      </p>

      <!-- SEC-04: honeypot anti-bot — só existe no client, nunca no HTML do SSR -->
      <input
        v-if="mounted"
        v-model="form._trap"
        type="text"
        name="website"
        autocomplete="off"
        tabindex="-1"
        aria-hidden="true"
        style="display:none;"
      >
      <!-- UTM ocultos — presentes em todas as variantes -->
      <input
        type="hidden"
        name="utm_source"
        :value="form.utm_source"
      >
      <input
        type="hidden"
        name="utm_medium"
        :value="form.utm_medium"
      >
      <input
        type="hidden"
        name="utm_campaign"
        :value="form.utm_campaign"
      >

      <!-- Variante: two-step — Passo 1 -->
      <form
        v-if="formVariant === 'two-step' && step === 1"
        class="space-y-4 text-left"
        @submit.prevent="advanceStep"
      >
        <div>
          <div class="text-xs text-white/30 text-center mb-6">
            Passo 1 de 2
          </div>
          <label
            for="waitlist-email-step1"
            class="block text-xs font-medium text-white/50 mb-1.5"
          >E-mail profissional</label>
          <input
            id="waitlist-email-step1"
            v-model="form.email"
            type="email"
            required
            placeholder="joao@empresa.com.br"
            class="w-full px-4 py-3 bg-editus-800/50 border border-editus-700/50 rounded-lg text-white placeholder-white/25 text-sm focus:outline-none focus:border-editus-500 transition-all"
          >
        </div>
        <button
          type="submit"
          :class="btnClass"
          class="btn-ab w-full justify-center py-4 text-base"
        >
          Continuar →
        </button>
      </form>

      <!-- Variante: two-step — Passo 2 / control / two-field -->
      <form
        v-else
        class="space-y-4 text-left"
        @submit.prevent="submitFull"
      >
        <div
          v-if="formVariant === 'two-step'"
          class="text-xs text-white/30 text-center mb-2"
        >
          Passo 2 de 2
        </div>

        <!-- Context line (A/B: form-context) -->
        <p
          v-if="formContextVariant === 'context'"
          class="text-xs text-white/40 leading-relaxed pb-1"
        >
          Usamos essas informações para priorizar empresas com mais fit para o beta e personalizar os editais monitorados para o seu perfil.
        </p>

        <!-- Campos name + email: apenas no control e two-step passo 2 -->
        <template v-if="formVariant !== 'two-field'">
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label
                for="waitlist-name"
                class="block text-xs font-medium text-white/50 mb-1.5"
              >Nome</label>
              <input
                id="waitlist-name"
                v-model="form.name"
                type="text"
                placeholder="João Silva"
                class="w-full px-4 py-3 bg-editus-800/50 border border-editus-700/50 rounded-lg text-white placeholder-white/25 text-sm focus:outline-none focus:border-editus-500 transition-all"
              >
            </div>
            <div>
              <label
                for="waitlist-email"
                class="block text-xs font-medium text-white/50 mb-1.5"
              >E-mail profissional</label>
              <input
                id="waitlist-email"
                v-model="form.email"
                type="email"
                required
                placeholder="joao@empresa.com.br"
                class="w-full px-4 py-3 bg-editus-800/50 border border-editus-700/50 rounded-lg text-white placeholder-white/25 text-sm focus:outline-none focus:border-editus-500 transition-all"
              >
            </div>
          </div>
          <div>
            <label
              for="waitlist-company"
              class="block text-xs font-medium text-white/50 mb-1.5"
            >Empresa</label>
            <input
              id="waitlist-company"
              v-model="form.company"
              type="text"
              required
              placeholder="Nome da empresa"
              class="w-full px-4 py-3 bg-editus-800/50 border border-editus-700/50 rounded-lg text-white placeholder-white/25 text-sm focus:outline-none focus:border-editus-500 transition-all"
            >
          </div>
        </template>

        <!-- Empresa visível apenas na variante two-field (nas demais fica no bloco condicional acima) -->
        <div v-if="formVariant === 'two-field'">
          <label
            for="waitlist-company-tf"
            class="block text-xs font-medium text-white/50 mb-1.5"
          >Empresa</label>
          <input
            id="waitlist-company-tf"
            v-model="form.company"
            type="text"
            required
            placeholder="Nome da empresa"
            class="w-full px-4 py-3 bg-editus-800/50 border border-editus-700/50 rounded-lg text-white placeholder-white/25 text-sm focus:outline-none focus:border-editus-500 transition-all"
          >
        </div>

        <!-- Email visível apenas na variante two-field -->
        <div v-if="formVariant === 'two-field'">
          <label
            for="waitlist-email-tf"
            class="block text-xs font-medium text-white/50 mb-1.5"
          >E-mail profissional</label>
          <input
            id="waitlist-email-tf"
            v-model="form.email"
            type="email"
            required
            placeholder="joao@empresa.com.br"
            class="w-full px-4 py-3 bg-editus-800/50 border border-editus-700/50 rounded-lg text-white placeholder-white/25 text-sm focus:outline-none focus:border-editus-500 transition-all"
          >
        </div>

        <!-- Volume + Segment: presente em todas as variantes -->
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label
              for="waitlist-volume"
              class="block text-xs font-medium text-white/50 mb-1.5"
            >Editais por mês (aprox.)</label>
            <div class="relative">
              <select
                id="waitlist-volume"
                v-model="form.volume"
                required
                class="w-full px-4 py-3 bg-editus-800/50 border border-editus-700/50 rounded-lg text-white/80 text-sm focus:outline-none focus:border-editus-500 transition-all appearance-none pr-10"
              >
                <option
                  value=""
                  disabled
                  selected
                >
                  Selecione
                </option>
                <option value="1-5">
                  1 a 5 por mês
                </option>
                <option value="6-20">
                  6 a 20 por mês
                </option>
                <option value="20+">
                  Mais de 20 por mês
                </option>
              </select>
              <svg
                class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/30"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3 5l4 4 4-4"
                  stroke="currentColor"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          <!-- Segment: presente em todas as variantes -->
          <div>
            <label
              for="waitlist-segment-tf"
              class="block text-xs font-medium text-white/50 mb-1.5"
            >Segmento de atuação</label>
            <div class="relative">
              <select
                id="waitlist-segment-tf"
                v-model="form.segment"
                required
                class="w-full px-4 py-3 bg-editus-800/50 border border-editus-700/50 rounded-lg text-white/80 text-sm focus:outline-none focus:border-editus-500 transition-all appearance-none pr-10"
              >
                <option
                  value=""
                  disabled
                  selected
                >
                  Selecione
                </option>
                <option value="ti">
                  TI e Tecnologia
                </option>
                <option value="construcao">
                  Construção e Engenharia
                </option>
                <option value="saude">
                  Saúde e Farmácia
                </option>
                <option value="limpeza">
                  Limpeza e Conservação
                </option>
                <option value="alimentacao">
                  Alimentação e Nutrição
                </option>
                <option value="outro">
                  Outro
                </option>
              </select>
              <svg
                class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/30"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3 5l4 4 4-4"
                  stroke="currentColor"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
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
          >
          <label
            for="waitlist-consent"
            class="text-xs text-white/50 leading-relaxed cursor-pointer select-none"
          >
            Li e concordo com a
            <NuxtLink
              to="/privacidade"
              class="text-editus-400 hover:text-editus-300 underline underline-offset-2 transition-colors"
            >Política de Privacidade</NuxtLink>
            e autorizo o uso dos meus dados para receber comunicações sobre o Editus.
          </label>
        </div>

        <button
          type="submit"
          :disabled="!form.consent || !form.volume || !form.segment || !form.company || loading"
          :aria-disabled="!form.consent || !form.volume || !form.segment || !form.company || loading"
          :class="btnClass"
          class="btn-ab w-full justify-center py-4 text-base"
        >
          <span v-if="loading">Enviando...</span>
          <span v-else>{{ fullFormCTAText }}</span>
        </button>
        <p
          v-if="errorMsg"
          class="text-center text-xs text-red-400 font-medium"
        >
          {{ errorMsg }}
        </p>
        <p
          v-else
          class="text-center text-xs text-white/25"
        >
          <template v-if="resolvedUrgencyCopy === 'consequence'">
            Cada edital publicado no PNCP que você não analisa é um contrato que seu concorrente pode ganhar.
          </template>
          <template v-else>
            Sem spam. Sem compromisso. Só avisamos quando abrir.
          </template>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const { track } = useUmami()
const router = useRouter()

const props = defineProps<{
  inline?: boolean
  ctaLocation?: string
  ctaCopyVariant?: 'control' | 'benefit' | 'action'
  buttonColorVariant?: 'control' | 'green'
  formVariant?: 'control' | 'two-field' | 'two-step'
  formContextVariant?: 'control' | 'context'
  urgencyCopyVariant?: 'control' | 'consequence'
}>()

const resolvedUrgencyCopy = computed(() => props.urgencyCopyVariant ?? 'control')

const sharedEmail = useWaitlistEmail()
const sharedPosition = useWaitlistPosition()

const email = ref('')
const loading = ref(false)
const inlineSubmitting = ref(false)
const mounted = ref(false)
const step = ref<1 | 2>(1)

onMounted(() => {
  mounted.value = true
})

const form = reactive({
  name: '',
  email: '',
  company: '',
  volume: '',
  segment: '',
  consent: false,
  _trap: '',
  utm_source: null as string | null,
  utm_medium: null as string | null,
  utm_campaign: null as string | null,
})

const errorMsg = ref('')

const route = useRoute()
onMounted(() => {
  form.utm_source = (route.query.utm_source as string) || null
  form.utm_medium = (route.query.utm_medium as string) || null
  form.utm_campaign = (route.query.utm_campaign as string) || null
  if (!props.inline) {
    track('waitlist_form_start', {
      source: 'waitlist-section',
      ab_waitlist_form: props.formVariant ?? 'control',
      ab_form_context: props.formContextVariant ?? 'control',
      ab_urgency_copy: resolvedUrgencyCopy.value,
    })
  }
})

const stopWatchingEmail = watch(sharedEmail, (val) => {
  if (!props.inline && val) {
    form.email = val
  }
}, { immediate: true })

onUnmounted(() => stopWatchingEmail())

// CTA copy por variante
const heroCTAText = computed(() => {
  if (props.ctaCopyVariant === 'benefit') return 'Testar grátis'
  if (props.ctaCopyVariant === 'action') return 'Entrar na lista'
  return 'Garantir acesso'
})

const fullFormCTAText = computed(() => {
  if (props.ctaCopyVariant === 'benefit') return 'Quero analisar editais'
  if (props.ctaCopyVariant === 'action') return 'Reservar minha vaga'
  return 'Garantir meu acesso antecipado'
})

// Cor do botão por variante
const btnClass = computed(() => {
  if (props.buttonColorVariant === 'green') {
    return 'bg-victory-500 hover:bg-victory-600 shadow-victory-500/25 text-white rounded-lg px-6 py-3 text-sm font-medium inline-flex items-center gap-2 transition-all hover:-translate-y-px hover:shadow-lg active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed'
  }
  return 'bg-editus-600 hover:bg-editus-700 shadow-editus-600/25 text-white rounded-lg px-6 py-3 text-sm font-medium inline-flex items-center gap-2 transition-all hover:-translate-y-px hover:shadow-lg active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed'
})

function advanceStep() {
  if (!form.email) return
  sharedEmail.value = form.email
  step.value = 2
}

function submitInline() {
  if (!email.value || inlineSubmitting.value) return
  inlineSubmitting.value = true
  track('cta_click', {
    location: props.ctaLocation ?? 'hero',
    ab_cta_copy: props.ctaCopyVariant ?? 'control',
    ab_button_color: props.buttonColorVariant ?? 'control',
  })
  sharedEmail.value = email.value
  const target = document.getElementById('waitlist')
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  setTimeout(() => {
    inlineSubmitting.value = false
  }, 700)
}

async function submitFull() {
  loading.value = true
  errorMsg.value = ''
  try {
    const res = await $fetch<{ ok: boolean, duplicate?: boolean, position?: number | null }>('/api/waitlist', {
      method: 'POST',
      body: { ...form, source: 'waitlist-section' },
    })
    if (res?.ok) {
      sharedPosition.value = res.position ?? null
      sessionStorage.setItem('waitlist_submitted', '1')
      if (res.duplicate) {
        router.push('/obrigado?duplicado=1')
      }
      else {
        track('waitlist_signup', {
          source: 'waitlist-section',
          volume: form.volume,
          ab_waitlist_form: props.formVariant ?? 'control',
          ab_cta_copy: props.ctaCopyVariant ?? 'control',
          ab_button_color: props.buttonColorVariant ?? 'control',
          ab_form_context: props.formContextVariant ?? 'control',
          ab_urgency_copy: resolvedUrgencyCopy.value,
        })
        router.push('/obrigado')
      }
    }
  }
  catch (err: unknown) {
    const e = err as { statusCode?: number, data?: { statusCode?: number, message?: string }, message?: string }
    const status = e?.statusCode ?? e?.data?.statusCode
    const msg = e?.data?.message || e?.message || ''
    if (status === 429 || msg.includes('429')) {
      errorMsg.value = 'Muitas tentativas. Aguarde um momento.'
    }
    else if (status === 503) {
      errorMsg.value = msg || 'Serviço temporariamente indisponível. Tente novamente em instantes.'
    }
    else {
      errorMsg.value = 'Erro ao salvar. Tente novamente.'
    }
  }
  finally {
    loading.value = false
  }
}
</script>

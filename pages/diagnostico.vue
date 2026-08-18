<template>
  <div class="min-h-screen bg-white">
    <TheNavbar />

    <main
      id="conteudo-principal"
      class="max-w-2xl mx-auto px-6 pt-28 pb-24"
    >
      <nav
        aria-label="Trilha de navegação"
        class="text-sm text-neutral-400 mb-8"
      >
        <NuxtLink
          to="/"
          class="hover:text-neutral-700 transition-colors"
        >Início</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-neutral-600">Diagnóstico de oportunidades</span>
      </nav>

      <header class="mb-10">
        <p class="section-label mb-3">
          Diagnóstico gratuito · 4 perguntas
        </p>
        <h1 class="text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tight leading-tight mb-4">
          Quanto você está deixando de ganhar em licitações?
        </h1>
        <p class="text-neutral-600 leading-relaxed">
          Você não perde licitações porque não consegue ganhar. Perde porque não consegue analisar
          todas. Responda 4 perguntas e veja uma estimativa de quantas oportunidades passam batido.
        </p>
      </header>

      <!-- Perguntas -->
      <form
        class="space-y-8"
        @submit.prevent
      >
        <fieldset
          v-for="(question, qi) in questions"
          :key="question.key"
        >
          <legend class="text-sm font-medium text-neutral-800 mb-3">
            {{ qi + 1 }}. {{ question.label }}
          </legend>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="opt in question.options"
              :key="opt.label"
              type="button"
              class="px-4 py-2 rounded-eb-sm border text-sm transition"
              :class="answers[question.key] === opt.value
                ? 'bg-violet-600 text-white border-violet-600'
                : 'border-neutral-300 text-neutral-600 hover:border-neutral-400'"
              :aria-pressed="answers[question.key] === opt.value"
              @click="answers[question.key] = opt.value"
            >
              {{ opt.label }}
            </button>
          </div>
        </fieldset>
      </form>

      <!-- Resultado -->
      <div
        v-if="allAnswered"
        class="mt-12 rounded-eb-lg border border-violet-200 bg-violet-50/50 p-8"
      >
        <p class="text-sm text-violet-700 font-medium mb-2">
          Seu diagnóstico
        </p>
        <p class="text-neutral-800 leading-relaxed mb-6">
          Com base nas suas respostas, sua empresa pode estar deixando de analisar
          <strong class="text-violet-700">cerca de {{ missedPerMonth }} oportunidades por mês</strong>
          por falta de tempo — o equivalente a
          <strong class="text-violet-700">{{ missedPerYear }} por ano</strong>.
        </p>

        <div
          v-if="potentialValue"
          class="rounded-eb-md bg-white border border-neutral-200 px-5 py-4 mb-6"
        >
          <p class="text-xs text-neutral-400 mb-1">
            Receita potencial em jogo por mês
          </p>
          <p class="font-display text-2xl font-bold text-neutral-900 tracking-tight">
            {{ potentialValue }}
          </p>
          <p class="text-xs text-neutral-400 mt-1">
            estimativa conservadora: oportunidades não analisadas × ticket médio × taxa de conversão
          </p>
        </div>

        <p class="text-sm text-neutral-600 leading-relaxed mb-6">
          O Editus automatiza justamente essa etapa: monitora o PNCP pelo perfil da sua empresa e
          analisa os editais compatíveis que hoje passam sem avaliação.
        </p>

        <NuxtLink
          to="/#waitlist"
          class="btn-primary text-white rounded-lg px-6 py-3 text-sm font-medium inline-flex items-center gap-2"
          @click="onResultCTA"
        >
          Quero descobrir minhas oportunidades
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
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
      </div>

      <p
        v-else
        class="mt-10 text-sm text-neutral-400"
      >
        Responda as 4 perguntas para ver seu diagnóstico.
      </p>

      <!-- Conteúdo citável -->
      <article class="mt-16 pt-10 border-t border-neutral-200 space-y-5">
        <h2 class="text-xl font-semibold text-neutral-900 tracking-tight">
          Por que tantas oportunidades passam batido
        </h2>
        <p class="text-neutral-600 leading-relaxed">
          Empresas ativas no PNCP recebem dezenas de editais compatíveis por semana. Analisar cada um
          com profundidade — ler o edital, verificar habilitação, checar impedimentos, calcular custo
          financeiro — leva horas. Na prática, a maioria das PMEs consegue analisar a fundo apenas
          quatro ou cinco por mês. O resto é descartado por falta de tempo, e entre eles há
          oportunidades reais que a empresa teria condições de vencer.
        </p>
        <p class="text-neutral-600 leading-relaxed">
          Este diagnóstico é uma estimativa simples: a diferença entre quantos editais aparecem para a
          sua empresa e quantos você consegue de fato avaliar. É esse intervalo que a automação elimina.
        </p>
      </article>
    </main>

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'

type QuestionKey = 'received' | 'analyzed' | 'ticket' | 'discarded'

const questions: Array<{
  key: QuestionKey
  label: string
  options: Array<{ label: string, value: number }>
}> = [
  {
    key: 'received',
    label: 'Quantas licitações compatíveis sua empresa vê por mês?',
    options: [
      { label: 'Até 5', value: 5 },
      { label: '6 a 15', value: 15 },
      { label: '16 a 40', value: 40 },
      { label: 'Mais de 40', value: 60 },
    ],
  },
  {
    key: 'analyzed',
    label: 'Quantas você consegue analisar com profundidade?',
    options: [
      { label: '1 a 2', value: 2 },
      { label: '3 a 5', value: 5 },
      { label: '6 a 10', value: 10 },
      { label: 'Mais de 10', value: 15 },
    ],
  },
  {
    key: 'ticket',
    label: 'Qual o ticket médio dos contratos que você disputa?',
    options: [
      { label: 'Até R$ 100 mil', value: 100000 },
      { label: 'R$ 100 mil a R$ 500 mil', value: 300000 },
      { label: 'R$ 500 mil a R$ 2 mi', value: 1000000 },
      { label: 'Acima de R$ 2 mi', value: 3000000 },
    ],
  },
  {
    key: 'discarded',
    label: 'Com que frequência você descarta editais por falta de tempo?',
    options: [
      { label: 'Raramente', value: 0.2 },
      { label: 'Às vezes', value: 0.5 },
      { label: 'Com frequência', value: 0.75 },
      { label: 'Quase sempre', value: 0.9 },
    ],
  },
]

const answers = reactive<Record<QuestionKey, number | null>>({
  received: null,
  analyzed: null,
  ticket: null,
  discarded: null,
})

const allAnswered = computed(() =>
  questions.every(q => answers[q.key] !== null),
)

// Oportunidades não analisadas = (recebidas − analisadas), ponderadas pela
// frequência com que a empresa descarta por falta de tempo. Nunca negativo.
const missedPerMonthRaw = computed(() => {
  if (!allAnswered.value) return 0
  const gap = Math.max(0, (answers.received ?? 0) - (answers.analyzed ?? 0))
  return Math.round(gap * (answers.discarded ?? 0))
})

const missedPerMonth = computed(() => missedPerMonthRaw.value)
const missedPerYear = computed(() => missedPerMonthRaw.value * 12)

// Valor "em jogo" nas oportunidades não avaliadas. Aplicamos uma taxa de
// conversão conservadora (10%) — nem toda oportunidade vira contrato — para o
// número ser defensável e não soar como marketing inflado.
const WIN_RATE = 0.1
const potentialValue = computed(() => {
  if (!allAnswered.value || !answers.ticket) return ''
  const value = missedPerMonthRaw.value * answers.ticket * WIN_RATE
  if (value <= 0) return ''
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
    notation: 'compact',
  }).format(value)
})

const { track } = useUmami()

onMounted(() => {
  // Atribuição: leads que clicarem em "waitlist" a partir daqui ficam
  // marcados com utm_source='diagnostico' (ver useContentAttribution).
  setContentAttribution({ source: 'diagnostico', campaign: 'oportunidades' })
  track('section_view', { location: 'diagnostico' })
})

// Sinal de engajamento: usuário completou as 4 perguntas (mesmo sem clicar no
// CTA depois). Dado de qualificação que hoje se perde — ver auditoria.
watch(allAnswered, (done) => {
  if (done) track('diagnostico_completo', { missed_per_month: missedPerMonthRaw.value })
})

function onResultCTA() {
  track('cta_click', {
    location: 'diagnostico',
    missed_per_month: missedPerMonthRaw.value,
  })
}

useHead({
  title: 'Diagnóstico: quantas licitações sua empresa deixa passar? | Editus',
  meta: [
    { name: 'robots', content: 'index, follow' },
    {
      name: 'description',
      content:
        'Responda 4 perguntas e descubra uma estimativa de quantas licitações compatíveis sua empresa deixa de analisar por mês por falta de tempo. Diagnóstico gratuito.',
    },
    { property: 'og:title', content: 'Quantas licitações sua empresa está deixando passar? — Editus' },
    { property: 'og:description', content: 'Diagnóstico gratuito em 4 perguntas: estime as oportunidades de licitação que passam batido por falta de tempo.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://editus.com.br/diagnostico' },
  ],
  link: [
    { rel: 'canonical', href: 'https://editus.com.br/diagnostico' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'Diagnóstico de oportunidades em licitações',
        'url': 'https://editus.com.br/diagnostico',
        'applicationCategory': 'BusinessApplication',
        'operatingSystem': 'Web',
        'inLanguage': 'pt-BR',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'BRL' },
        'publisher': { '@type': 'Organization', 'name': 'Editus', 'url': 'https://editus.com.br' },
      }),
    },
  ],
})
</script>

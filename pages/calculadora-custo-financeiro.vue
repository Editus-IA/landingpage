<template>
  <div class="min-h-screen bg-white">
    <TheNavbar />

    <main
      id="conteudo-principal"
      class="max-w-3xl mx-auto px-6 pt-28 pb-24"
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
        <span class="text-neutral-600">Calculadora de custo financeiro</span>
      </nav>

      <header class="mb-10">
        <p class="section-label mb-3">
          Calculadora gratuita
        </p>
        <h1 class="text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tight leading-tight mb-4">
          Calculadora de custo financeiro do prazo de pagamento
        </h1>
        <p class="text-neutral-600 leading-relaxed">
          Quando você vence uma licitação, o órgão paga em 30, 60 ou 90 dias — mas seus custos
          começam antes. Este é o <strong class="text-neutral-900">custo financeiro do prazo de
            pagamento</strong>: quanto o capital imobilizado nesse intervalo custa à sua empresa,
          ancorado na taxa Selic. A maioria não precifica isso e perde margem. Calcule o seu:
        </p>
      </header>

      <!-- Calculadora -->
      <section
        class="card !p-0 overflow-hidden"
        aria-label="Calculadora"
      >
        <div class="grid md:grid-cols-2">
          <!-- Inputs -->
          <div class="p-7 space-y-6 border-b md:border-b-0 md:border-r border-neutral-200">
            <div>
              <label
                for="valor"
                class="block text-sm font-medium text-neutral-700 mb-1.5"
              >Valor do contrato (R$)</label>
              <input
                id="valor"
                v-model.number="valorContrato"
                type="number"
                min="0"
                step="1000"
                inputmode="numeric"
                class="w-full rounded-eb-sm border border-neutral-300 px-3.5 py-2.5 text-neutral-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition"
              >
            </div>

            <div>
              <label
                for="prazo"
                class="block text-sm font-medium text-neutral-700 mb-1.5"
              >Prazo de pagamento (dias)</label>
              <input
                id="prazo"
                v-model.number="prazoPagamentoDias"
                type="number"
                min="0"
                step="15"
                inputmode="numeric"
                class="w-full rounded-eb-sm border border-neutral-300 px-3.5 py-2.5 text-neutral-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition"
              >
              <div class="flex gap-2 mt-2">
                <button
                  v-for="preset in [30, 60, 90]"
                  :key="preset"
                  type="button"
                  class="text-xs px-2.5 py-1 rounded-full border transition"
                  :class="prazoPagamentoDias === preset ? 'bg-violet-600 text-white border-violet-600' : 'border-neutral-300 text-neutral-500 hover:border-neutral-400'"
                  @click="onPrazoPreset(preset)"
                >
                  {{ preset }} dias
                </button>
              </div>
            </div>

            <div>
              <label
                for="selic"
                class="block text-sm font-medium text-neutral-700 mb-1.5"
              >Taxa Selic (% ao ano)</label>
              <input
                id="selic"
                v-model.number="selicAnual"
                type="number"
                min="0"
                max="50"
                step="0.25"
                inputmode="decimal"
                class="w-full rounded-eb-sm border border-neutral-300 px-3.5 py-2.5 text-neutral-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition"
              >
              <p class="text-xs text-neutral-400 mt-1.5">
                {{ selicHint }}
              </p>
            </div>
          </div>

          <!-- Resultado -->
          <div class="p-7 bg-neutral-50 flex flex-col justify-center">
            <p class="text-sm text-neutral-500 mb-1">
              Custo financeiro no período
            </p>
            <p class="font-display text-4xl font-bold text-violet-700 tracking-tight mb-1">
              {{ formatBRL(result.custo) }}
            </p>
            <p class="text-sm text-neutral-500 mb-6">
              equivale a <strong class="text-neutral-700">{{ result.percentualSobreContrato.toFixed(2) }}%</strong>
              do valor do contrato
            </p>

            <dl class="space-y-2 text-sm border-t border-neutral-200 pt-4">
              <div class="flex justify-between">
                <dt class="text-neutral-500">
                  Taxa mensal equivalente
                </dt>
                <dd class="text-neutral-800 font-medium">
                  {{ (result.taxaMensal * 100).toFixed(3) }}%
                </dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-neutral-500">
                  Capital imobilizado
                </dt>
                <dd class="text-neutral-800 font-medium">
                  {{ formatBRL(valorContrato) }}
                </dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-neutral-500">
                  Por
                </dt>
                <dd class="text-neutral-800 font-medium">
                  {{ prazoPagamentoDias }} dias
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <p class="text-xs text-neutral-400 mt-3">
        Estimativa para fins de planejamento. Usa custo de carregamento simples sobre a Selic;
        o custo real depende da estrutura de capital e do regime tributário da empresa.
      </p>

      <!-- Conteúdo explicativo (citável por IA / linkável) -->
      <article class="mt-14 space-y-5">
        <h2 class="text-xl font-semibold text-neutral-900 tracking-tight pt-4">
          O que é o custo financeiro do prazo de pagamento
        </h2>
        <p class="text-neutral-600 leading-relaxed">
          Em uma licitação, o pagamento não é imediato. Entre executar o contrato e receber do órgão
          público há um intervalo — comumente 30, 60 ou 90 dias — durante o qual a empresa já arcou
          com fornecedores, folha de pagamento e tributos. Esse capital adiantado tem um custo: ou é
          dinheiro próprio que deixou de render, ou é crédito que gera juros. Esse é o custo
          financeiro do prazo de pagamento.
        </p>

        <h2 class="text-xl font-semibold text-neutral-900 tracking-tight pt-4">
          Como o cálculo funciona
        </h2>
        <p class="text-neutral-600 leading-relaxed">
          Usamos o modelo de custo de carregamento, ancorado na taxa Selic (o custo de referência do
          dinheiro no Brasil). Primeiro convertemos a Selic anual em taxa mensal equivalente; depois
          aplicamos ao valor do contrato pelo número de meses de espera:
        </p>
        <div class="rounded-eb-sm bg-neutral-900 text-neutral-100 px-5 py-4 font-mono text-sm leading-relaxed overflow-x-auto">
          taxa_mensal = (1 + selic_anual)^(1/12) − 1<br>
          custo = valor_contrato × taxa_mensal × (prazo_dias ÷ 30)
        </div>

        <h2 class="text-xl font-semibold text-neutral-900 tracking-tight pt-4">
          Por que isso importa na precificação
        </h2>
        <p class="text-neutral-600 leading-relaxed">
          Empresas que ignoram esse custo apresentam propostas com margem menor do que imaginam. Em um
          contrato de R$ 300 mil pago em 90 dias, com a Selic a 14% ao ano (taxa mensal equivalente
          de ~1,1%), o custo financeiro é de R$ 9.881 — cerca de 3,3% do valor do contrato, dinheiro
          que sai direto da margem se não estiver embutido no preço. Precificar esse carregamento é a
          diferença entre um contrato lucrativo e um que só parece lucrativo.
        </p>
      </article>

      <!-- FAQ (FAQPage JSON-LD) -->
      <section class="mt-14 pt-10 border-t border-neutral-200">
        <h2 class="text-xl font-semibold text-neutral-900 tracking-tight mb-6">
          Perguntas frequentes
        </h2>
        <div class="space-y-6">
          <div
            v-for="(faq, i) in faqs"
            :key="i"
          >
            <h3 class="font-semibold text-neutral-900 mb-1.5">
              {{ faq.q }}
            </h3>
            <p class="text-neutral-600 text-sm leading-relaxed">
              {{ faq.a }}
            </p>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <div class="mt-14 rounded-eb-md border border-neutral-200 bg-neutral-50 px-8 py-10 text-center">
        <p class="text-neutral-900 font-semibold text-lg mb-2">
          O Editus calcula isso automaticamente em cada edital
        </p>
        <p class="text-neutral-500 text-sm mb-6 max-w-md mx-auto">
          Além do custo financeiro, o Editus analisa habilitação, compliance e risco — e gera a
          proposta. Entre na lista de acesso antecipado.
        </p>
        <NuxtLink
          to="/#waitlist"
          class="btn-primary text-white rounded-lg px-6 py-3 text-sm font-medium inline-flex items-center gap-2"
        >
          Entrar na lista de acesso
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
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  calcularCustoFinanceiro,
  formatBRL,
} from '~/composables/useCustoFinanceiro'

// Inputs (valores iniciais espelham o cenário usado na home: R$ 300k / 90 dias →
// ~R$ 9,9k). O selicAnual inicial é um placeholder; o valor real vem de /api/selic.
const valorContrato = ref(300000)
const prazoPagamentoDias = ref(90)
const selicAnual = ref(11)
const selicSource = ref<'bcb' | 'fallback' | 'default'>('default')

const result = computed(() =>
  calcularCustoFinanceiro({
    valorContrato: valorContrato.value,
    prazoPagamentoDias: prazoPagamentoDias.value,
    selicAnual: selicAnual.value,
  }),
)

const selicHint = computed(() => {
  if (selicSource.value === 'bcb') return 'Selic atual, do Banco Central. Ajuste se quiser.'
  if (selicSource.value === 'fallback') return 'Valor padrão (Banco Central indisponível). Ajuste se quiser.'
  return 'Ajuste conforme a Selic vigente.'
})

// Busca a Selic atual do endpoint server-side (que consulta o BCB com cache e
// fallback). SSR-safe: se falhar, mantém o valor padrão e o usuário edita.
const { data: selicData } = await useFetch<{ selic: number, source: 'bcb' | 'fallback' }>('/api/selic')
if (selicData.value?.selic) {
  selicAnual.value = selicData.value.selic
  selicSource.value = selicData.value.source
}

const faqs = [
  {
    q: 'O que é a taxa Selic e por que ela entra no cálculo?',
    a: 'A Selic é a taxa básica de juros da economia brasileira, definida pelo Copom. Ela representa o custo de referência do dinheiro no país — por isso é usada para estimar quanto custa manter capital imobilizado enquanto se espera o pagamento de um contrato.',
  },
  {
    q: 'Esse custo pode ser incluído na proposta da licitação?',
    a: 'Sim. O custo financeiro do prazo de pagamento é um componente legítimo da formação de preços e pode ser embutido na proposta, desde que o preço final permaneça compatível com o mercado e com o edital. Ignorá-lo significa absorver esse custo na própria margem.',
  },
  {
    q: 'O cálculo considera juros compostos?',
    a: 'Esta calculadora usa um modelo de custo de carregamento simples, adequado para os prazos típicos de licitação (30 a 90 dias). Para prazos longos ou análises mais detalhadas, um modelo com capitalização composta e o custo de capital específico da empresa fornece maior precisão.',
  },
  {
    q: 'De onde vem a taxa Selic usada aqui?',
    a: 'A taxa é buscada automaticamente da API pública do Banco Central (série 432 — Meta Selic). Se o serviço estiver indisponível, um valor padrão é usado, e você pode ajustar o campo manualmente a qualquer momento.',
  },
]

const { track } = useUmami()

onMounted(() => {
  // Atribuição: leads que clicarem em "waitlist" a partir daqui ficam
  // marcados com utm_source='calculadora' (ver useContentAttribution).
  setContentAttribution({ source: 'calculadora', campaign: 'custo-financeiro' })
  track('section_view', { location: 'calculadora-custo-financeiro' })
})

function onPrazoPreset(preset: number) {
  prazoPagamentoDias.value = preset
  track('calculator_use', { location: 'calculadora-custo-financeiro', prazo_dias: preset })
}

useHead({
  title: 'Calculadora de custo financeiro do prazo de pagamento em licitações | Editus',
  meta: [
    { name: 'robots', content: 'index, follow' },
    {
      name: 'description',
      content:
        'Calcule gratuitamente o custo financeiro do prazo de pagamento de um contrato de licitação, com base na taxa Selic. Descubra quanto o pagamento em 30/60/90 dias custa à sua margem.',
    },
    { property: 'og:title', content: 'Calculadora de custo financeiro do prazo de pagamento — Editus' },
    { property: 'og:description', content: 'Quanto o prazo de pagamento de uma licitação custa à sua empresa? Calcule com base na Selic.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://editus.com.br/calculadora-custo-financeiro' },
  ],
  link: [
    { rel: 'canonical', href: 'https://editus.com.br/calculadora-custo-financeiro' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'Calculadora de custo financeiro do prazo de pagamento',
        'url': 'https://editus.com.br/calculadora-custo-financeiro',
        'applicationCategory': 'FinanceApplication',
        'operatingSystem': 'Web',
        'inLanguage': 'pt-BR',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'BRL' },
        'publisher': { '@type': 'Organization', 'name': 'Editus', 'url': 'https://editus.com.br' },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map(f => ({
          '@type': 'Question',
          'name': f.q,
          'acceptedAnswer': { '@type': 'Answer', 'text': f.a },
        })),
      }),
    },
  ],
})
</script>

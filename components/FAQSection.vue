<template>
  <section
    id="faq"
    class="py-24 bg-white"
  >
    <div class="max-w-3xl mx-auto px-6">
      <div class="text-center mb-14">
        <p class="section-label mb-3">
          Perguntas frequentes
        </p>
        <h2 class="section-title mb-4">
          Tudo o que você quer saber<br>antes de entrar na lista
        </h2>
        <p class="section-sub mx-auto">
          Respostas diretas para as dúvidas mais comuns de quem lida com licitações todos os dias.
        </p>
      </div>

      <div class="space-y-3">
        <div
          v-for="(item, i) in faqs"
          :key="i"
          class="border border-editus-100 rounded-2xl overflow-hidden transition-all"
          :class="open === i ? 'shadow-md shadow-editus-900/5' : ''"
        >
          <button
            class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors"
            :class="open === i ? 'bg-editus-50' : 'bg-white hover:bg-editus-50/50'"
            :aria-expanded="open === i"
            :aria-controls="`faq-panel-${i}`"
            @click="toggle(i)"
          >
            <span class="font-semibold text-editus-900 text-base leading-snug">{{ item.q }}</span>
            <span
              class="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all"
              :class="open === i ? 'bg-editus-600 text-white rotate-45' : 'bg-editus-100 text-editus-600'"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M6 1v10M1 6h10"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>
            </span>
          </button>
          <Transition name="faq-expand">
            <div
              v-if="open === i"
              :id="`faq-panel-${i}`"
              class="px-6 pb-5 bg-white"
              role="region"
            >
              <p class="text-editus-900/60 text-sm leading-relaxed">
                <template
                  v-for="(part, pi) in item.parts"
                  :key="pi"
                >
                  <strong
                    v-if="part.bold"
                    class="font-semibold text-editus-900/80"
                  >{{ part.text }}</strong>
                  <template v-else>
                    {{ part.text }}
                  </template>
                </template>
              </p>
            </div>
          </Transition>
        </div>
      </div>

      <!-- CTA inline -->
      <div class="mt-12 text-center">
        <p class="text-editus-900/50 text-sm mb-4">
          Ainda tem dúvidas? Entre na lista e respondo pessoalmente.
        </p>
        <a
          href="#waitlist"
          :class="props.buttonColorVariant === 'green' ? 'bg-victory-500 hover:bg-victory-600 shadow-victory-500/25' : 'btn-primary'"
          class="text-white rounded-lg px-6 py-3 text-sm font-medium inline-flex items-center gap-2 transition-all hover:-translate-y-px hover:shadow-lg active:translate-y-0"
          @click="onCTAClick"
        >
          {{ faqCTAText }}
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
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Part = { text: string, bold?: true }
type Faq = { q: string, parts: Part[] }

const props = defineProps<{
  ctaCopyVariant?: 'control' | 'benefit' | 'action'
  buttonColorVariant?: 'control' | 'green'
}>()

const { track } = useUmami()

const faqCTAText = computed(() => {
  if (props.ctaCopyVariant === 'benefit') return 'Começar agora, é grátis'
  if (props.ctaCopyVariant === 'action') return 'Reservar minha vaga'
  return 'Entrar na lista de acesso'
})

function onCTAClick() {
  track('cta_click', {
    location: 'faq',
    ab_cta_copy: props.ctaCopyVariant ?? 'control',
    ab_button_color: props.buttonColorVariant ?? 'control',
  })
}

const open = ref<number | null>(0)

function toggle(i: number) {
  open.value = open.value === i ? null : i
}

const faqs: Faq[] = [
  {
    q: 'Funciona para qualquer tipo de licitação?',
    parts: [
      { text: 'Sim. O Editus foi desenhado para os principais modelos previstos na Lei 14.133/2021: ' },
      { text: 'pregão eletrônico, concorrência, tomada de preços e dispensa eletrônica.', bold: true },
      { text: ' O agente Compliance identifica automaticamente a modalidade do edital e aplica os critérios específicos de cada uma. Para editais de credenciamento e chamamento público, a análise é parcial — cobrindo habilitação e compliance, mas sem geração de proposta.' },
    ],
  },
  {
    q: 'O que é o Editus?',
    parts: [{ text: 'Editus é uma plataforma de inteligência artificial para PMEs brasileiras que participam de licitações públicas. Ela monitora o PNCP pelo perfil da sua empresa, analisa os editais relevantes com 12 agentes de IA especializados (habilitação, compliance, risco, custo financeiro) e entrega a proposta redigida e o relatório completo para você revisar antes de submeter no Comprasnet.' }],
  },
  {
    q: 'Preciso ter experiência com licitações para usar o Editus?',
    parts: [{ text: 'Não. O Editus foi desenhado para que qualquer gestor ou sócio consiga entender o relatório gerado, sem precisar conhecer de direito administrativo. A decisão final (participar ou não, submeter a proposta) sempre exige o julgamento humano de quem conhece a empresa. O Editus faz o trabalho analítico; você faz a decisão.' }],
  },
  {
    q: 'Como o Editus filtra os editais certos para a minha empresa?',
    parts: [{ text: 'No cadastro inicial você informa: CNPJ, segmentos de atuação (CATMAT/CATSER), UFs de interesse, porte (MEI, ME, EPP) e capacidade técnica. O agente Prospector usa esse perfil para monitorar o PNCP continuamente e acionar o processo de análise apenas quando um edital compatível é publicado. Sem ruído, sem alertas irrelevantes.' }],
  },
  {
    q: 'O Editus garante que minha proposta vai vencer a licitação?',
    parts: [
      { text: 'Não, e desconfiaria de qualquer ferramenta que prometesse isso. O resultado de uma licitação depende de fatores que nenhuma IA controla: a concorrência, a capacidade técnica da empresa e decisões do órgão. O que o Editus entrega é uma ' },
      { text: 'análise mais completa e uma proposta mais elaborada', bold: true },
      { text: ' do que seria possível fazer manualmente em poucos dias, reduzindo erros de habilitação, cláusulas ignoradas e erros de precificação.' },
    ],
  },
  {
    q: 'Quanto tempo leva a análise de um edital?',
    parts: [{ text: 'Depende do tamanho do edital e da carga do sistema, mas a análise completa com 12 agentes (leitura do PDF, verificação de certidões, compliance, risco e custo financeiro) fica pronta em minutos, não em dias. Um edital de 80 páginas que tomaria 3 a 5 dias de análise manual é processado em uma fração desse tempo.' }],
  },
  {
    q: 'É seguro informar o CNPJ da minha empresa?',
    parts: [{ text: 'Sim. As consultas de certidões (SIASG, CEIS, CNEP, CEPIM) são feitas nos portais públicos do governo federal, que são abertos por natureza. Nenhuma credencial ou dado confidencial da empresa é exigido pelo Editus além do CNPJ e informações de perfil. Os dados ficam em servidor seguro e não são compartilhados com terceiros.' }],
  },
  {
    q: 'O Editus substitui um consultor ou escritório jurídico de licitações?',
    parts: [{ text: 'Não substitui, e não é esse o objetivo. O Editus acelera e estrutura o trabalho analítico que hoje é feito manualmente ou delegado para consultores. Em editais mais simples, pode reduzir significativamente a dependência de consultoria externa. Em contratos complexos, o relatório do Editus serve de base qualificada para o consultor trabalhar mais rápido e com mais contexto.' }],
  },
  {
    q: 'O que é o PNCP e por que ele é importante?',
    parts: [{ text: 'O Portal Nacional de Compras Públicas (PNCP) é o repositório oficial de licitações da União, estados e municípios após a Lei 14.133/2021 (Nova Lei de Licitações). Todos os órgãos públicos são obrigados a publicar seus editais lá. Monitorar o PNCP sistematicamente é a forma mais completa de não perder oportunidades, e é o que o agente Prospector do Editus faz de forma contínua.' }],
  },
  {
    q: 'Funciona para pregão de serviço com critério de pontuação técnica?',
    parts: [
      { text: 'Sim, com ressalvas importantes. Para pregões de menor preço e maior desconto, a análise é completa: habilitação, compliance, custo financeiro e proposta de preços gerada automaticamente. Para licitações com ' },
      { text: 'julgamento por técnica e preço', bold: true },
      { text: ' (RDC, concorrências com envelope técnico), o Editus analisa habilitação, compliance e risco, mas a elaboração do envelope técnico exige input humano especializado — o sistema prepara o briefing e identifica os critérios de pontuação, mas não escreve o memorial técnico.' },
    ],
  },
  {
    q: 'O edital exige planilha de BDI ou composição de custo unitário. O Editus resolve?',
    parts: [
      { text: 'O agente Precificador identifica quando o edital exige BDI, composição de custo unitário ou planilha SINAPI e sinaliza isso no relatório. Para contratos de obras e serviços de engenharia, ' },
      { text: 'a geração automática da planilha de preços requer os dados de custo da empresa', bold: true },
      { text: ' — o Editus estrutura o modelo e preenche os campos a partir das suas informações, mas não tem acesso aos seus custos internos. Na prática: você fornece os insumos, o Editus formata conforme exigência do edital.' },
    ],
  },
  {
    q: 'Se a proposta gerada tiver erro, quem é responsável?',
    parts: [
      { text: 'A responsabilidade pela proposta submetida é sempre da empresa. O Editus deixa isso explícito no fluxo: ' },
      { text: 'nenhum documento é submetido sem revisão e aprovação humana.', bold: true },
      { text: ' O sistema gera a proposta como rascunho qualificado — com base nos dados do edital e do perfil da empresa —, mas a revisão final, os valores e a assinatura digital são sempre do responsável legal. O relatório de análise serve como registro de auditoria do processo de decisão.' },
    ],
  },
]

// Injeta FAQPage JSON-LD no <head> via useHead (forma correta no Nuxt)
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map(f => ({
          '@type': 'Question',
          'name': f.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': f.parts.map(p => p.text).join(''),
          },
        })),
      }),
    },
  ],
})
</script>

<style scoped>
.faq-expand-enter-active,
.faq-expand-leave-active {
  transition: all 0.22s ease;
  overflow: hidden;
}
.faq-expand-enter-from,
.faq-expand-leave-to {
  opacity: 0;
  max-height: 0;
}
.faq-expand-enter-to,
.faq-expand-leave-from {
  opacity: 1;
  max-height: 400px;
}
</style>

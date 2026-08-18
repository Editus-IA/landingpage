<template>
  <section
    id="features"
    class="py-24 bg-neutral-50"
  >
    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center mb-16">
        <p class="section-label mb-3">
          Funcionalidades
        </p>
        <h2 class="section-title mb-4">
          O que o Editus analisa<br>antes de você decidir
        </h2>
      </div>

      <!-- Feature grid -->
      <div class="grid md:grid-cols-2 gap-6">
        <!-- O cenário de custo financeiro (R$ 300k → R$ 9.881) já é apresentado
             nos blocos RoiHighlight e DecisionCard, no topo da página. Aqui
             listamos apenas as funcionalidades, sem repetir a tabela. -->

        <!-- Features regulares -->
        <div
          v-for="feature in features"
          :key="feature.title"
          class="card"
        >
          <div
            class="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
            :class="feature.iconBg"
          >
            <component :is="feature.icon" />
          </div>
          <h3 class="text-base font-semibold text-neutral-900 mb-2">
            {{ feature.title }}
          </h3>
          <p class="text-sm text-neutral-600 leading-relaxed">
            {{ feature.desc }}
          </p>
        </div>
      </div>
      <!-- CTA mid-page -->
      <div class="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 bg-neutral-50 border border-neutral-200 rounded-eb-md px-8 py-7">
        <div>
          <p class="font-semibold text-neutral-900 text-lg">
            Quer ver o relatório completo na prática?
          </p>
          <p class="text-sm text-neutral-500 mt-1">
            Entre na lista de acesso antecipado e seja um dos primeiros a testar.
          </p>
        </div>
        <a
          href="#waitlist"
          :class="props.buttonColorVariant === 'green' ? 'bg-success hover:bg-success/90 shadow-success/25' : 'btn-primary'"
          class="whitespace-nowrap flex-shrink-0 text-white rounded-lg px-6 py-3 text-sm font-medium inline-flex items-center gap-2 transition-all hover:-translate-y-px hover:shadow-lg active:translate-y-0"
          @click="onCTAClick"
        >
          {{ midPageCTAText }}
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
import { defineComponent, h, computed } from 'vue'

const props = defineProps<{
  ctaCopyVariant?: 'control' | 'benefit' | 'action'
  buttonColorVariant?: 'control' | 'green'
}>()

const { track } = useUmami()
const featuresCopyVariant = useABTest('features-copy', ['control'])

onMounted(() => {
  track('section_view', { section: 'features', ab_features_copy: featuresCopyVariant.value })
})

const midPageCTAText = computed(() => {
  if (props.ctaCopyVariant === 'benefit') return 'Quero analisar editais'
  if (props.ctaCopyVariant === 'action') return 'Reservar minha vaga'
  return 'Garantir meu acesso'
})

function onCTAClick() {
  track('cta_click', {
    location: 'features',
    ab_cta_copy: props.ctaCopyVariant ?? 'control',
    ab_button_color: props.buttonColorVariant ?? 'control',
  })
}

const IconStar = defineComponent(() => () => h('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none' }, [
  h('path', { 'd': 'M10 2l1.5 4.5H16l-3.5 2.5 1.5 4.5L10 11 6.5 13.5 8 9 4.5 6.5H9L10 2z', 'stroke': '#5A3CE0', 'stroke-width': 1.3, 'stroke-linejoin': 'round' }),
]))

const IconCheck = defineComponent(() => () => h('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none' }, [
  h('path', { 'd': 'M10 2a8 8 0 100 16A8 8 0 0010 2z', 'stroke': '#1D9E75', 'stroke-width': 1.3 }),
  h('path', { 'd': 'M7 10l2 2 4-4', 'stroke': '#1D9E75', 'stroke-width': 1.3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
]))

const IconAlert = defineComponent(() => () => h('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none' }, [
  h('path', { 'd': 'M10 2.5C6.5 2.5 3.5 5 3.5 8.5c0 2 .9 3.7 2.3 4.9L7 17.5h6l1.2-4.1c1.4-1.2 2.3-2.9 2.3-4.9 0-3.5-3-6-6.5-6z', 'stroke': '#A32D2D', 'stroke-width': 1.3, 'stroke-linejoin': 'round' }),
  h('path', { 'd': 'M10 7v3.5M10 12.5v.5', 'stroke': '#A32D2D', 'stroke-width': 1.4, 'stroke-linecap': 'round' }),
]))

const IconDoc = defineComponent(() => () => h('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none' }, [
  h('path', { 'd': 'M5 2h7l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z', 'stroke': '#BA7517', 'stroke-width': 1.3, 'stroke-linejoin': 'round' }),
  h('path', { 'd': 'M12 2v4h4', 'stroke': '#BA7517', 'stroke-width': 1.3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
  h('path', { 'd': 'M7 9h6M7 12h4', 'stroke': '#BA7517', 'stroke-width': 1.3, 'stroke-linecap': 'round' }),
]))

const controlTitles = [
  'Score de compliance automático',
  'Verificação de habilitação',
  'Análise de risco por cláusula',
  'Relatório PDF completo',
]

const outcomeTitles = [
  'Saiba se está habilitado antes de se inscrever — sem surpresas na abertura',
  'Identifique cláusulas leoninas e penalidades antes de assinar',
  'Score de 0 a 100: saiba o risco do edital em segundos',
  'Relatório pronto para apresentar à diretoria ou arquivar como due diligence',
]

const featureCardTitles = computed(() =>
  featuresCopyVariant.value === 'outcome' ? outcomeTitles : controlTitles,
)

const features = computed(() => [
  { iconBg: 'bg-violet-100', icon: IconStar, title: featureCardTitles.value[0], desc: 'Pontuação de 0 a 100 baseada nos critérios da Lei 14.133/2021. Identifica cláusulas problemáticas antes de você se comprometer.' },
  { iconBg: 'bg-success/10', icon: IconCheck, title: featureCardTitles.value[1], desc: 'Checklist automático com SIASG, CEIS, CNEP e CEPIM. Sabe exatamente quais certidões estão válidas e quais precisam de renovação.' },
  { iconBg: 'bg-red-50', icon: IconAlert, title: featureCardTitles.value[2], desc: 'Identifica cláusulas leoninas, penalidades desproporcionais e obrigações ocultas que a maioria não lê, antes de ser tarde.' },
  { iconBg: 'bg-amber-50', icon: IconDoc, title: featureCardTitles.value[3], desc: 'Documento profissional com todos os resultados dos agentes, pronto para apresentar para a diretoria ou arquivar como registro formal de auditoria.' },
])
</script>

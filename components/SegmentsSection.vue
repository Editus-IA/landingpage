<template>
  <section
    id="segmentos"
    class="py-24 bg-indigo-950 scroll-mt-20"
  >
    <div class="max-w-5xl mx-auto px-6">
      <div class="text-center mb-14">
        <p class="section-label mb-3 !text-violet-300">
          Feito para o seu setor
        </p>
        <h2 class="section-title !text-white mb-4">
          Para quem o Editus foi feito?
        </h2>
        <p class="section-sub mx-auto !text-white/60">
          Cada setor tem suas exigências de habilitação, técnica e precificação.
          O Editus aplica os critérios do seu segmento — não uma análise genérica.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="seg in segments"
          :key="seg.name"
          class="bg-indigo-900 border border-indigo-800 rounded-eb-md p-6 hover:border-indigo-700 transition-colors"
        >
          <span
            class="w-10 h-10 rounded-eb-sm bg-violet-600/20 text-violet-300 flex items-center justify-center mb-4"
            aria-hidden="true"
          >
            <component :is="seg.icon" />
          </span>
          <h3 class="font-semibold text-white mb-2">
            {{ seg.name }}
          </h3>
          <p class="text-sm text-white/60 leading-relaxed">
            {{ seg.value }}
          </p>
        </div>
      </div>

      <p class="text-center text-sm text-white/50 mt-10">
        Não vê o seu setor?
        <a
          href="#waitlist"
          class="text-violet-300 hover:text-violet-200 underline underline-offset-2 transition-colors"
          @click="onCTAClick"
        >Entre na lista</a>
        e diga qual é — o Editus cobre os principais segmentos do PNCP.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'

const { track } = useUmami()

const stroke = { 'stroke': 'currentColor', 'stroke-width': 1.4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'fill': 'none' }
const svg = (paths: ReturnType<typeof h>[]) =>
  defineComponent(() => () => h('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none' }, paths))

const IcoServicos = svg([h('path', { ...stroke, d: 'M10 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L10 14.3 5.2 16.7l.9-5.4L2.2 7.5l5.4-.8z' })])
const IcoDistribuicao = svg([h('path', { ...stroke, d: 'M3 7l7-4 7 4v6l-7 4-7-4z' }), h('path', { ...stroke, d: 'M3 7l7 4 7-4M10 11v6' })])
const IcoEngenharia = svg([h('path', { ...stroke, d: 'M3 17V8l7-5 7 5v9' }), h('path', { ...stroke, d: 'M8 17v-5h4v5' })])
const IcoTI = svg([h('rect', { ...stroke, x: 2.5, y: 4, width: 15, height: 9, rx: 1 }), h('path', { ...stroke, d: 'M7 16h6' })])

const segments = [
  {
    name: 'Prestadores de serviços',
    value: 'Encontre contratos compatíveis e descubra rápido se a margem compensa depois do prazo de pagamento.',
    icon: IcoServicos,
  },
  {
    name: 'Distribuidores',
    value: 'Identifique requisitos técnicos, documentação e condições comerciais antes de montar a proposta.',
    icon: IcoDistribuicao,
  },
  {
    name: 'Engenharia e obras',
    value: 'Analise requisitos técnicos, garantias, penalidades, BDI/SINAPI e a documentação exigida.',
    icon: IcoEngenharia,
  },
  {
    name: 'Empresas de TI',
    value: 'Veja rapidamente escopo, qualificação técnica e obrigações contratuais antes de investir tempo.',
    icon: IcoTI,
  },
]

function onCTAClick() {
  track('cta_click', { location: 'segments' })
}
</script>

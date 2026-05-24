<template>
  <section id="problema" class="py-24 bg-editus-50">
    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center mb-16">
        <p class="section-label mb-3">O problema</p>
        <h2 class="section-title mb-4">
          Por que PMEs perdem licitações<br>que deveriam ganhar?
        </h2>
        <p class="section-sub mx-auto">
          Não é falta de capacidade técnica. É falta de tempo e ferramentas para analisar editais com profundidade.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div v-for="problem in problems" :key="problem.title" class="card">
          <div
            class="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
            :class="problem.iconBg"
          >
            <component :is="problem.icon" />
          </div>
          <h3 class="text-lg font-semibold text-editus-900 mb-2">{{ problem.title }}</h3>
          <p class="text-sm text-editus-900/55 leading-relaxed">{{ problem.desc }}</p>
          <div class="mt-5 pt-5 border-t border-editus-100">
            <p class="text-xs font-medium text-editus-600/80">{{ problem.stat }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'

const IconClock = defineComponent(() => () => h('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none' }, [
  h('circle', { cx: 10, cy: 10, r: 8, stroke: '#A32D2D', 'stroke-width': 1.5 }),
  h('path', { d: 'M10 6v4.5l3 1.5', stroke: '#A32D2D', 'stroke-width': 1.5, 'stroke-linecap': 'round' }),
]))

const IconCompliance = defineComponent(() => () => h('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none' }, [
  h('path', { d: 'M10 2L2 7v6l8 5 8-5V7L10 2z', stroke: '#854F0B', 'stroke-width': 1.5, 'stroke-linejoin': 'round' }),
  h('path', { d: 'M10 12v-3M10 15.5v-.5', stroke: '#854F0B', 'stroke-width': 1.5, 'stroke-linecap': 'round' }),
]))

const IconMoney = defineComponent(() => () => h('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none' }, [
  h('path', { d: 'M10 2v16M6 6h5.5a2.5 2.5 0 010 5H6M6 11h6a2.5 2.5 0 010 5H6', stroke: '#3B6D11', 'stroke-width': 1.5, 'stroke-linecap': 'round' }),
]))

const problems = [
  {
    icon: IconClock,
    iconBg: 'bg-red-50',
    title: 'Análise manual leva dias',
    desc: 'Um edital público tem em média 80 páginas de requisitos, penalidades e especificações técnicas. Ler e interpretar tudo isso manualmente consome dias de trabalho especializado.',
    stat: '3 a 5 dias para analisar um edital complexo',
  },
  {
    icon: IconCompliance,
    iconBg: 'bg-amber-50',
    title: 'Compliance é complexo demais',
    desc: 'A Lei 14.133/2021 substituiu a antiga lei de licitações com centenas de novos requisitos. Uma cláusula ignorada pode levar à desclassificação ou até impedimento futuro.',
    stat: 'Lei 14.133 tem mais de 200 artigos',
  },
  {
    icon: IconMoney,
    iconBg: 'bg-green-50',
    title: 'Custo financeiro invisível',
    desc: 'Contratos com prazo de pagamento longo (30, 60, 90 dias) geram custo financeiro real que erode a margem. Poucos calculam isso na proposta e perdem dinheiro sem perceber.',
    stat: 'Custo de até 3% da margem ignorado por edital',
  },
]
</script>

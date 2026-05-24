<template>
  <section id="features" class="py-24 bg-editus-50">
    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center mb-16">
        <p class="section-label mb-3">Funcionalidades</p>
        <h2 class="section-title mb-4">
          O que o Editus analisa<br>antes de você decidir
        </h2>
      </div>

      <!-- Feature grid -->
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Feature destacada (large) -->
        <div class="card md:col-span-2 bg-editus-900 border-editus-800 hover:border-editus-700 p-8 md:p-10">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div class="inline-flex items-center gap-2 bg-victory-700/30 border border-victory-700/20 rounded-full px-3 py-1 mb-5">
                <span class="w-1.5 h-1.5 bg-victory-500 rounded-full" />
                <span class="text-xs text-victory-400 font-medium">Destaque</span>
              </div>
              <h3 class="text-2xl font-semibold text-white tracking-tight mb-3">
                Custo financeiro do prazo de pagamento
              </h3>
              <p class="text-white/55 leading-relaxed text-sm">
                Editais com pagamento em 60 ou 90 dias geram custo financeiro real que a maioria das PMEs ignora na proposta.
                O Editus calcula automaticamente esse custo com base na taxa Selic, inclui no relatório e ajusta sua margem antes de você enviar.
              </p>
              <div class="mt-6 flex items-baseline gap-2">
                <span class="text-3xl font-semibold text-victory-500">R$ 9.000</span>
                <span class="text-sm text-white/40">custo identificado em contrato de R$ 300k / 60 dias</span>
              </div>
            </div>
            <div class="bg-editus-800/50 border border-editus-700/30 rounded-2xl p-6">
              <div class="text-xs font-medium text-editus-400 mb-4 uppercase tracking-wider">Relatório de precificação</div>
              <div class="space-y-3">
                <div v-for="row in pricingRows" :key="row.label" class="flex items-center justify-between py-2 border-b border-editus-700/30 last:border-0">
                  <span class="text-sm text-white/60">{{ row.label }}</span>
                  <span class="text-sm font-medium" :class="row.highlight ? 'text-victory-400' : 'text-white'">{{ row.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Features regulares -->
        <div v-for="feature in features" :key="feature.title" class="card">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-4" :class="feature.iconBg">
            <component :is="feature.icon" />
          </div>
          <h3 class="text-base font-semibold text-editus-900 mb-2">{{ feature.title }}</h3>
          <p class="text-sm text-editus-900/55 leading-relaxed">{{ feature.desc }}</p>
        </div>
      </div>
      <!-- CTA mid-page -->
      <div class="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 bg-editus-50 border border-editus-100 rounded-2xl px-8 py-7">
        <div>
          <p class="font-semibold text-editus-900 text-lg">Quer ver o relatório completo na prática?</p>
          <p class="text-sm text-editus-900/55 mt-1">Entre na lista de acesso antecipado e seja um dos primeiros a testar.</p>
        </div>
        <a href="#waitlist" class="btn-primary whitespace-nowrap flex-shrink-0">
          Garantir meu acesso
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M8 4.5L10.5 7 8 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'

const IconStar = defineComponent(() => () => h('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none' }, [
  h('path', { d: 'M10 2l1.5 4.5H16l-3.5 2.5 1.5 4.5L10 11 6.5 13.5 8 9 4.5 6.5H9L10 2z', stroke: '#6459C8', 'stroke-width': 1.3, 'stroke-linejoin': 'round' }),
]))

const IconCheck = defineComponent(() => () => h('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none' }, [
  h('path', { d: 'M10 2a8 8 0 100 16A8 8 0 0010 2z', stroke: '#1D9E75', 'stroke-width': 1.3 }),
  h('path', { d: 'M7 10l2 2 4-4', stroke: '#1D9E75', 'stroke-width': 1.3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
]))

const IconAlert = defineComponent(() => () => h('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none' }, [
  h('path', { d: 'M10 3L2 17h16L10 3z', stroke: '#A32D2D', 'stroke-width': 1.3, 'stroke-linejoin': 'round' }),
  h('path', { d: 'M10 9v3M10 14v.5', stroke: '#A32D2D', 'stroke-width': 1.3, 'stroke-linecap': 'round' }),
]))

const IconDoc = defineComponent(() => () => h('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none' }, [
  h('rect', { x: 3, y: 3, width: 14, height: 14, rx: 2, stroke: '#BA7517', 'stroke-width': 1.3 }),
  h('path', { d: 'M7 10h6M7 7h4M7 13h2', stroke: '#BA7517', 'stroke-width': 1.3, 'stroke-linecap': 'round' }),
]))

const pricingRows = [
  { label: 'Valor do contrato', value: 'R$ 300.000' },
  { label: 'Prazo de pagamento', value: '60 dias' },
  { label: 'Taxa mensal (Selic)', value: '1,2% / mês' },
  { label: 'Custo financeiro', value: 'R$ 9.000', highlight: true },
  { label: 'Margem ajustada', value: '15,3% → 12,3%', highlight: false },
  { label: 'Recomendação', value: '✓ Participar c/ ajuste', highlight: true },
]

const features = [
  { iconBg: 'bg-editus-100', icon: IconStar,  title: 'Score de compliance automático',  desc: 'Pontuação de 0 a 100 baseada nos critérios da Lei 14.133/2021. Identifica cláusulas problemáticas antes de você se comprometer.' },
  { iconBg: 'bg-victory-100', icon: IconCheck, title: 'Verificação de habilitação',        desc: 'Checklist automático com SIASG, CEIS, CNEP e CEPIM. Sabe exatamente quais certidões estão válidas e quais precisam de renovação.' },
  { iconBg: 'bg-red-50',      icon: IconAlert, title: 'Análise de risco por cláusula',    desc: 'Identifica cláusulas leoninas, penalidades desproporcionais e obrigações ocultas que a maioria não lê, antes de ser tarde.' },
  { iconBg: 'bg-amber-50',    icon: IconDoc,   title: 'Relatório PDF completo',            desc: 'Documento profissional com todos os resultados dos agentes, pronto para apresentar para a diretoria ou arquivar como registro formal de auditoria.' },
]
</script>

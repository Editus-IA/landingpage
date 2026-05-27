<template>
  <section id="como-funciona" class="py-24 bg-white">
    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center mb-16">
        <p class="section-label mb-3">Como funciona</p>
        <h2 class="section-title mb-4">
          Você configura uma vez.<br>A IA trabalha sempre.
        </h2>
        <p class="section-sub mx-auto">
          Processo completo: do monitoramento de editais até a proposta na sua mesa,
          pronta para subir no Comprasnet. Sem atalhos, sem promessas vazias.
        </p>
      </div>

      <!-- Variante simple: 3 passos orientados ao usuário -->
      <template v-if="howItWorksVariant === 'simple'">
        <div class="grid md:grid-cols-3 gap-8 mt-4">
          <div v-for="(simpleStep, i) in simpleSteps" :key="i" class="text-center">
            <div class="w-14 h-14 rounded-2xl bg-editus-900 flex items-center justify-center mx-auto mb-5">
              <span class="text-2xl font-semibold text-white">{{ i + 1 }}</span>
            </div>
            <h3 class="text-base font-semibold text-editus-900 mb-2">{{ simpleStep.title }}</h3>
            <p class="text-sm text-editus-900/55 leading-relaxed">{{ simpleStep.context }}</p>
          </div>
        </div>
      </template>

      <!-- Variante control: pipeline 5 etapas + grade de agentes -->
      <template v-else>
        <!-- Pipeline steps -->
        <div class="relative">
          <!-- Vertical line connector -->
          <div class="hidden md:block absolute left-8 top-8 bottom-8 w-px bg-editus-100" />

          <div class="space-y-6">
            <div v-for="(step, i) in steps" :key="i"
              class="relative flex gap-6 md:gap-10 items-start"
            >
              <!-- Step circle -->
              <div class="relative flex-shrink-0">
                <div
                  class="w-16 h-16 rounded-2xl flex items-center justify-center border-2 z-10 relative"
                  :class="step.human ? 'bg-white border-editus-200' : 'bg-editus-900 border-editus-900'"
                >
                  <component :is="step.icon" />
                </div>
              </div>

              <!-- Content -->
              <div class="flex-1 pb-8">
                <div class="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 class="text-lg font-semibold text-editus-900">{{ step.title }}</h3>
                  <span
                    class="text-xs px-2.5 py-1 rounded-full font-medium border"
                    :class="step.human
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-editus-50 text-editus-700 border-editus-100'"
                  >
                    {{ step.human ? 'Você' : 'Editus IA' }}
                  </span>
                </div>
                <p class="text-sm text-editus-900/55 leading-relaxed max-w-2xl mb-4">{{ step.desc }}</p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in step.tags"
                    :key="tag"
                    class="text-xs px-2.5 py-1 bg-editus-50 text-editus-700 rounded-full border border-editus-100"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Agents grid -->
        <div class="mt-16 bg-editus-900 rounded-3xl p-8 md:p-12">
          <div class="text-center mb-10">
            <p class="text-xs font-medium tracking-widest uppercase text-editus-400 mb-2">Sob o capô</p>
            <h3 class="text-2xl font-semibold text-white tracking-tight mb-2">12 agentes trabalhando em paralelo</h3>
            <p class="text-sm text-white/40">Cada agente é especialista em uma etapa, todos ativados pelo perfil da sua empresa</p>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div
              v-for="agent in agents"
              :key="agent.name"
              class="bg-editus-800/50 border border-editus-700/30 rounded-xl p-4 hover:bg-editus-800 transition-colors"
            >
              <div class="flex items-center gap-2 mb-1">
                <span class="w-1.5 h-1.5 rounded-full" :class="agent.color" />
                <div class="text-sm font-medium text-white">{{ agent.name }}</div>
              </div>
              <div class="text-xs text-editus-400">{{ agent.role }}</div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'

const howItWorksVariant = useABTest('how-it-works', ['control', 'simple'])
const { track } = useUmami()

onMounted(() => {
  track('section_view', { section: 'how-it-works', ab_how_it_works: howItWorksVariant.value })
})

const IconUser = defineComponent(() => () => h('svg', { width: 22, height: 22, viewBox: '0 0 22 22', fill: 'none' }, [
  h('circle', { cx: 11, cy: 8, r: 3.5, stroke: '#6459C8', 'stroke-width': 1.4 }),
  h('path', { d: 'M4 19c0-3.5 3-6 7-6s7 2.5 7 6', stroke: '#6459C8', 'stroke-width': 1.4, 'stroke-linecap': 'round' }),
]))

const IconRadar = defineComponent(() => () => h('svg', { width: 22, height: 22, viewBox: '0 0 22 22', fill: 'none' }, [
  h('circle', { cx: 11, cy: 11, r: 2, stroke: 'white', 'stroke-width': 1.4 }),
  h('path', { d: 'M11 4v2M11 16v2M4 11h2M16 11h2M6.3 6.3l1.4 1.4M14.3 14.3l1.4 1.4M6.3 15.7l1.4-1.4M14.3 7.7l1.4-1.4', stroke: 'white', 'stroke-width': 1.4, 'stroke-linecap': 'round' }),
]))

const IconFile = defineComponent(() => () => h('svg', { width: 22, height: 22, viewBox: '0 0 22 22', fill: 'none' }, [
  h('path', { d: 'M6 3h7l4 4v12a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z', stroke: 'white', 'stroke-width': 1.4 }),
  h('path', { d: 'M13 3v4h4M8 10h6M8 13h4', stroke: 'white', 'stroke-width': 1.4, 'stroke-linecap': 'round' }),
]))

const IconCheckBox = defineComponent(() => () => h('svg', { width: 22, height: 22, viewBox: '0 0 22 22', fill: 'none' }, [
  h('rect', { x: 3, y: 3, width: 16, height: 16, rx: 2, stroke: 'white', 'stroke-width': 1.4 }),
  h('path', { d: 'M7 11l2.5 2.5 5.5-5', stroke: 'white', 'stroke-width': 1.4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
]))

const simpleSteps = [
  { title: 'Você cadastra o perfil da empresa', context: '5 minutos, uma vez só. Informe seu segmento, região e porte — a plataforma cuida do resto.' },
  { title: 'A IA monitora o PNCP e analisa os editais compatíveis', context: 'Automático, 24/7. Só os editais que fazem sentido para a sua empresa chegam até você.' },
  { title: 'Você recebe o relatório e a proposta pronta para revisar', context: 'Em minutos, não dias. A decisão final e a assinatura são sempre suas.' },
]

const steps = [
  {
    human: true,
    icon: IconUser,
    title: 'Configuração do perfil da empresa',
    desc: 'Você informa CNPJ, segmentos de atuação, UFs de interesse, porte e capacidade técnica. O Editus usa esse perfil para filtrar apenas os editais relevantes, sem ruído.',
    tags: ['CNPJ', 'Segmentos PNCP', 'Regiões', 'Porte MEI/ME/EPP'],
  },
  {
    human: false,
    icon: IconRadar,
    title: 'Monitoramento contínuo do PNCP',
    desc: 'O agente Prospector verifica o Portal Nacional de Compras Públicas continuamente. Quando um edital compatível com seu perfil é publicado, o processo de análise é acionado automaticamente.',
    tags: ['PNCP', 'Comprasnet', 'Portais estaduais', 'Tempo real'],
  },
  {
    human: false,
    icon: IconFile,
    title: 'Análise completa com 12 agentes',
    desc: 'Leitura do edital, verificação de habilitação, checklist de certidões, compliance com a Lei 14.133/2021, análise de risco por cláusula, custo financeiro do prazo de pagamento e consulta a CEIS/CNEP/CEPIM. Tudo em paralelo.',
    tags: ['Habilitação', 'Compliance', 'Risco', 'Impedimentos', 'Custo financeiro'],
  },
  {
    human: false,
    icon: IconCheckBox,
    title: 'Geração automática da proposta',
    desc: 'Com base nos dados do edital e no perfil da empresa, o agente Proposta redige o documento completo: valores, prazos e especificações técnicas, formatado para os requisitos do edital.',
    tags: ['Proposta técnica', 'Planilha de preços', 'Documentos', 'PDF pronto'],
  },
  {
    human: true,
    icon: IconUser,
    title: 'Você revisa, aprova e sobe no Comprasnet',
    desc: 'O Editus entrega tudo na sua mesa. Você lê o relatório, confere a proposta gerada e decide: aprovar ou pedir ajuste. A submissão final no Comprasnet é sempre humana. A decisão e a assinatura são suas.',
    tags: ['Revisão humana', 'Aprovação', 'Comprasnet', 'Assinatura digital'],
  },
]

const agents = [
  { name: 'Prospector', role: 'Monitora editais no PNCP', color: 'bg-victory-500' },
  { name: 'Leitor', role: 'Extração e leitura do PDF', color: 'bg-victory-500' },
  { name: 'Habilitador', role: 'Checklist de documentos', color: 'bg-victory-500' },
  { name: 'Compliance', role: 'Lei 14.133/2021', color: 'bg-editus-400' },
  { name: 'Risco', role: 'Análise de cláusulas', color: 'bg-editus-400' },
  { name: 'Impedimentos', role: 'CEIS, CNEP, CEPIM', color: 'bg-victory-500' },
  { name: 'Precificador', role: 'Custo financeiro e margem', color: 'bg-victory-500' },
  { name: 'Pagamento', role: 'Prazo e fluxo de caixa', color: 'bg-editus-400' },
  { name: 'Proposta', role: 'Geração do documento', color: 'bg-victory-500' },
  { name: 'Contrato', role: 'Revisão da minuta', color: 'bg-editus-400' },
  { name: 'Garantia', role: 'Garantia contratual', color: 'bg-editus-400' },
  { name: 'Aditivo', role: 'Cláusulas de aditamento', color: 'bg-editus-400' },
]
</script>

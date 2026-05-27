<template>
  <section ref="sectionRef" class="relative min-h-screen bg-editus-900 flex items-center overflow-hidden" @mousemove="onMouseMove" @mouseleave="resetTilt">
    <!-- Canvas particle network -->
    <HeroBackground />

    <!-- Background grid -->
    <div class="absolute inset-0 bg-[linear-gradient(rgba(100,89,200,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(100,89,200,0.07)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

    <!-- Glow -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-editus-600/20 rounded-full blur-[120px] pointer-events-none" />

    <div ref="contentRef" :style="tiltStyle" class="relative max-w-6xl mx-auto px-6 pt-28 pb-20 w-full will-change-transform transition-transform duration-100 ease-out">
      <div class="max-w-3xl">
        <!-- Badge de urgência (A/B: urgency-badge) -->
        <UrgencyBadge :variant="urgencyVariant" />

        <!-- Headline (A/B: hero-headline) -->
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.1] mb-6">
          <template v-if="headlineVariant === 'benefit'">
            Analise editais em minutos,<br>
            <span class="text-editus-400">não em dias.</span><br>
            A IA faz o trabalho, você decide.
          </template>
          <template v-else-if="headlineVariant === 'loss'">
            Quanto você está perdendo<br>
            <span class="text-editus-400">por não analisar o custo</span><br>
            financeiro do prazo?
          </template>
          <template v-else-if="headlineVariant === 'process'">
            IA que lê o edital,<br>
            <span class="text-editus-400">verifica habilitação</span><br>
            e escreve a proposta. Você só assina.
          </template>
          <template v-else>
            Análise mais precisa.<br>
            <span class="text-editus-400">Proposta mais elaborada.</span><br>
            Decisão sempre sua.
          </template>
        </h1>

        <!-- Sub (A/B: hero-subheadline) -->
        <p class="text-lg md:text-xl text-white/55 leading-relaxed mb-10 max-w-xl">
          <template v-if="subheadlineVariant === 'short'">
            IA especializada em licitações: verifica habilitação, checa compliance com a Lei 14.133 e entrega a proposta pronta para você revisar. Acesso antecipado gratuito.
          </template>
          <template v-else-if="subheadlineVariant === 'pain'">
            Você gasta 3 dias lendo edital e ainda pode errar na habilitação. O Editus analisa em minutos e entrega a proposta pronta. Acesso antecipado gratuito para PMEs.
          </template>
          <template v-else>
            Editus monitora o PNCP, filtra editais pelo perfil da sua empresa e entrega
            análise completa de habilitação, compliance e precificação com a proposta
            redigida e pronta para você revisar e submeter no Comprasnet.
          </template>
        </p>

        <!-- Waitlist inline form -->
        <WaitlistForm :inline="true" :cta-copy-variant="ctaCopyVariant" :button-color-variant="buttonColorVariant" :urgency-copy-variant="urgencyCopyVariant" />

        <!-- Social proof -->
        <div class="mt-10 flex items-center gap-6 flex-wrap">
          <div class="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="text-victory-500">
              <path d="M13.5 4L6.5 11 3 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="text-sm text-white/50">Monitora PNCP pelo perfil da empresa</span>
          </div>
          <div class="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="text-victory-500">
              <path d="M13.5 4L6.5 11 3 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="text-sm text-white/50">Proposta gerada, você só aprova</span>
          </div>
          <div class="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="text-victory-500">
              <path d="M13.5 4L6.5 11 3 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="text-sm text-white/50">Lei 14.133/2021 coberta</span>
          </div>
          <div v-if="count" class="flex items-center gap-2">
            <span class="w-2 h-2 bg-victory-400 rounded-full"></span>
            <span class="text-sm text-white/50"><strong class="text-white/70">{{ count }}</strong> empresas já na lista</span>
          </div>
        </div>
      </div>

      <!-- Stats row -->
      <div class="mt-20 pt-10 border-t border-editus-800 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div v-for="stat in stats" :key="stat.label">
          <div class="text-2xl md:text-3xl font-semibold text-white tracking-tight">{{ stat.value }}</div>
          <div class="text-sm text-white/40 mt-1">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useABTest } from '../composables/useABTest';

const props = defineProps<{
  buttonColorVariant: 'control' | 'green'
}>()

const { track } = useUmami()

// A/B tests
const headlineVariant     = useABTest('hero-headline',    ['control', 'benefit', 'loss', 'process'])
const ctaCopyVariant      = useABTest('cta-copy',         ['control', 'benefit', 'action'])
const urgencyVariant      = useABTest('urgency-badge',    ['control', 'count', 'countdown'])
const subheadlineVariant  = useABTest('hero-subheadline', ['control', 'short', 'pain'])
const urgencyCopyVariant  = useABTest('urgency-copy',     ['control', 'consequence'])

const count = ref<number | null>(null)
onMounted(async () => {
  track('page_view', {
    ab_hero_subheadline: subheadlineVariant.value,
    ab_urgency_copy:     urgencyCopyVariant.value,
  })
  try {
    const data = await $fetch<{ count: number | null }>('/api/waitlist-count')
    if (data?.count && data.count > 0) count.value = data.count
  } catch { /* silencioso */ }
})

const stats = [
  { value: '80+', label: 'páginas de edital analisadas em minutos' },
  { value: 'R$ 9k', label: 'custo financeiro identificado por contrato de R$ 300k' },
  { value: '200+', label: 'artigos da Lei 14.133/2021 verificados' },
  { value: '24/7', label: 'monitoramento do PNCP pelo perfil da empresa' },
]

const sectionRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const tiltStyle  = ref('')

const MAX_TILT = 4

function onMouseMove(e: MouseEvent) {
  if (!sectionRef.value) return
  const { left, top, width, height } = sectionRef.value.getBoundingClientRect()
  const nx = ((e.clientX - left)  / width  - 0.5) * 2
  const ny = ((e.clientY - top)   / height - 0.5) * 2
  tiltStyle.value = `perspective(1200px) rotateX(${-ny * MAX_TILT}deg) rotateY(${nx * MAX_TILT}deg)`
}

function resetTilt() {
  tiltStyle.value = 'perspective(1200px) rotateX(0deg) rotateY(0deg)'
}
</script>

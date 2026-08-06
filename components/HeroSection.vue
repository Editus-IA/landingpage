<template>
  <section
    ref="sectionRef"
    class="relative min-h-screen bg-indigo-900 flex items-center overflow-hidden"
    @mousemove="onMouseMove"
    @mouseleave="resetTilt"
  >
    <!-- Canvas particle network -->
    <HeroBackground />

    <!-- Background grid -->
    <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

    <!-- Glow -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />

    <div
      ref="contentRef"
      :style="tiltStyle"
      class="relative max-w-6xl mx-auto px-6 pt-28 pb-20 w-full will-change-transform transition-transform duration-100 ease-out"
    >
      <div
        ref="revealRef"
        class="max-w-3xl"
      >
        <!-- Badge de urgência (A/B: urgency-badge) -->
        <div data-hero-reveal>
          <UrgencyBadge :variant="urgencyVariant" />
        </div>

        <!-- Headline (A/B: hero-headline) -->
        <h1
          data-hero-reveal
          class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6"
        >
          <template v-if="headlineVariant === 'benefit'">
            Analise editais em minutos,<br>
            <span class="text-violet-300">não em dias.</span><br>
            A IA faz o trabalho, você decide.
          </template>
          <template v-else-if="headlineVariant === 'loss'">
            Quanto você está perdendo<br>
            <span class="text-violet-300">por não analisar o custo</span><br>
            financeiro do prazo?
          </template>
          <template v-else-if="headlineVariant === 'process'">
            IA que lê o edital,<br>
            <span class="text-violet-300">verifica habilitação</span><br>
            e escreve a proposta. Você só assina.
          </template>
          <template v-else-if="headlineVariant === 'veteran'">
            Quantos editais bons você<br>
            <span class="text-violet-300">deixou passar esse mês</span><br>
            por falta de profissional para analisar?
          </template>
          <template v-else>
            Análise mais precisa.<br>
            <span class="text-violet-300">Proposta mais elaborada.</span><br>
            Decisão sempre sua.
          </template>
        </h1>

        <!-- Sub (A/B: hero-subheadline) -->
        <p
          data-hero-reveal
          class="text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-xl"
        >
          <template v-if="subheadlineVariant === 'short'">
            IA especializada em licitações: verifica habilitação, checa compliance com a Lei 14.133 e entrega a proposta pronta para você revisar. Acesso antecipado gratuito.
          </template>
          <template v-else-if="subheadlineVariant === 'pain'">
            Você gasta 3 dias lendo edital e ainda pode errar na habilitação. O Editus analisa em minutos e entrega a proposta pronta. Acesso antecipado gratuito para PMEs.
          </template>
          <template v-else-if="subheadlineVariant === 'veteran'">
            Você já tem processo. O problema é volume: editais demais para analisar com profundidade, tempo de menos. O Editus analisa os que você não conseguiria: habilitação, risco, custo financeiro e entrega o relatório pronto.
          </template>
          <template v-else>
            Editus monitora o PNCP, filtra editais pelo perfil da sua empresa e entrega
            análise completa de habilitação, compliance e precificação com a proposta
            redigida e pronta para você revisar e submeter no Comprasnet.
          </template>
        </p>

        <!-- Waitlist inline form -->
        <div data-hero-reveal>
          <WaitlistForm
            :inline="true"
            :cta-copy-variant="ctaCopyVariant"
            :button-color-variant="buttonColorVariant"
            :urgency-copy-variant="urgencyCopyVariant"
          />
        </div>

        <!-- Social proof -->
        <div
          data-hero-reveal
          class="mt-10 flex items-center gap-6 flex-wrap"
        >
          <div class="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              class="text-success"
            >
              <path
                d="M13.5 4L6.5 11 3 7.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span class="text-sm text-white/50">Monitora PNCP pelo perfil da empresa</span>
          </div>
          <div class="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              class="text-success"
            >
              <path
                d="M13.5 4L6.5 11 3 7.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span class="text-sm text-white/50">Proposta gerada, você só aprova</span>
          </div>
          <div class="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              class="text-success"
            >
              <path
                d="M13.5 4L6.5 11 3 7.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span class="text-sm text-white/50">Lei 14.133/2021 coberta</span>
          </div>
          <div
            v-if="count"
            class="flex items-center gap-2"
          >
            <span class="w-2 h-2 bg-success rounded-full" />
            <span class="text-sm text-white/50"><strong class="text-white/70">{{ countDisplay }}</strong> empresas já na lista</span>
          </div>
        </div>
      </div>

      <!-- Stats row -->
      <div class="mt-20 pt-10 border-t border-indigo-800 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div
          v-for="stat in stats"
          :key="stat.label"
        >
          <div class="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
            {{ stat.value }}
          </div>
          <div class="text-sm text-white/40 mt-1">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { animate, stagger, utils } from 'animejs'
import { useABTest } from '../composables/useABTest'
import { useCountUp } from '../composables/useCountUp'
import { prefersReducedMotion } from '../composables/useReducedMotion'

defineProps<{
  buttonColorVariant: 'control' | 'green'
}>()

const { track } = useUmami()

// A/B tests
const headlineVariant = useABTest('hero-headline', ['control', 'benefit', 'loss', 'process', 'veteran'])
const ctaCopyVariant = useABTest('cta-copy', ['control', 'benefit', 'action'])
const urgencyVariant = useABTest('urgency-badge', ['control', 'count', 'countdown'])
const subheadlineVariant = useABTest('hero-subheadline', ['control', 'short', 'pain', 'veteran'])
const urgencyCopyVariant = useABTest('urgency-copy', ['control', 'consequence'])

const count = ref<number | null>(null)
// Contador de vagas animado (sobe de 0 ao valor real); respeita reduced-motion.
const { display: countDisplay, run: runCount } = useCountUp()

// Wrapper das peças do Hero — alvo da animação de entrada escalonada.
const revealRef = ref<HTMLElement | null>(null)

function revealHero() {
  const el = revealRef.value
  if (!el) return

  const targets = el.querySelectorAll<HTMLElement>('[data-hero-reveal]')
  if (!targets.length) return

  // Reduced-motion: não anima. Os elementos já estão visíveis (nunca ocultamos
  // no HTML/SSR — crawlers e usuários sem JS veem o conteúdo normalmente).
  if (prefersReducedMotion()) return

  // Estado inicial oculto aplicado SÓ no client, no mesmo tick da animação —
  // o HTML renderizado permanece visível (bom para SEO e fallback sem JS).
  // Anima apenas opacity + translateY: nunca desloca o layout (zero CLS).
  utils.set(targets, { opacity: 0, translateY: 16 })
  animate(targets, {
    opacity: 1,
    translateY: 0,
    duration: 650,
    delay: stagger(90),
    ease: 'out(3)',
  })
}

onMounted(async () => {
  track('page_view', {
    ab_hero_subheadline: subheadlineVariant.value,
    ab_urgency_copy: urgencyCopyVariant.value,
  })

  revealHero()

  try {
    const data = await $fetch<{ count: number | null }>('/api/waitlist-count')
    if (data?.count && data.count > 0) {
      count.value = data.count
      runCount(data.count)
    }
  }
  catch { /* silencioso */ }
})

const stats = [
  { value: '80+', label: 'páginas de edital analisadas em minutos' },
  { value: 'R$ 9k', label: 'custo financeiro identificado por contrato de R$ 300k' },
  { value: '200+', label: 'artigos da Lei 14.133/2021 verificados' },
  { value: '24/7', label: 'monitoramento do PNCP pelo perfil da empresa' },
]

const sectionRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const tiltStyle = ref('')

const MAX_TILT = 4

function onMouseMove(e: MouseEvent) {
  if (!sectionRef.value) return
  const { left, top, width, height } = sectionRef.value.getBoundingClientRect()
  const nx = ((e.clientX - left) / width - 0.5) * 2
  const ny = ((e.clientY - top) / height - 0.5) * 2
  tiltStyle.value = `perspective(1200px) rotateX(${-ny * MAX_TILT}deg) rotateY(${nx * MAX_TILT}deg)`
}

function resetTilt() {
  tiltStyle.value = 'perspective(1200px) rotateX(0deg) rotateY(0deg)'
}
</script>

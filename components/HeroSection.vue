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
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 bg-editus-800/60 border border-editus-700/50 rounded-full px-4 py-1.5 mb-8">
          <span class="w-2 h-2 bg-victory-400 rounded-full animate-pulse" />
          <span class="text-xs text-white/80 font-medium">Vagas limitadas · acesso antecipado aberto</span>
        </div>

        <!-- Headline -->
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.1] mb-6">
          Análise mais precisa.<br>
          <span class="text-editus-400">Proposta mais elaborada.</span><br>
          Decisão sempre sua.
        </h1>

        <!-- Sub -->
        <p class="text-lg md:text-xl text-white/55 leading-relaxed mb-10 max-w-xl">
          Editus monitora o PNCP, filtra editais pelo perfil da sua empresa e entrega
          análise completa de habilitação, compliance e precificação com a proposta
          redigida e pronta para você revisar e submeter no Comprasnet.
        </p>

        <!-- Waitlist inline form -->
        <WaitlistForm :inline="true" />

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
import { ref } from 'vue'

const count = ref<number | null>(null)
onMounted(async () => {
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

const sectionRef = ref(null)
const contentRef = ref(null)
const tiltStyle  = ref('')

const MAX_TILT = 4

function onMouseMove(e) {
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

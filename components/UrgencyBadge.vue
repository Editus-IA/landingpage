<template>
  <div class="inline-flex items-center gap-2 bg-editus-800/60 border border-editus-700/50 rounded-full px-4 py-1.5 mb-8">
    <span class="w-2 h-2 bg-victory-400 rounded-full animate-pulse" />
    <span class="text-xs text-white/80 font-medium">{{ badgeText }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'

// Próximo fechamento de lote — ajustar conforme calendário do produto
const LOTE_CLOSE_DATE = new Date('2026-06-30T23:59:59-03:00')

const props = defineProps<{
  variant: 'control' | 'count' | 'countdown'
}>()

const { track } = useUmami()

const remainingCount = ref<number | null>(null)
const countdown = ref('')

function formatCountdown(target: Date): string {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return ''
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  return `${days}d ${hours}h restantes`
}

const badgeText = computed(() => {
  if (props.variant === 'count') {
    if (remainingCount.value === null) return 'Vagas limitadas · acesso antecipado aberto'
    if (remainingCount.value <= 0) return 'Vagas esgotadas neste lote'
    return `Restam ${remainingCount.value} vagas neste lote`
  }
  if (props.variant === 'countdown') {
    // Se a data já passou, exibe badge neutro em vez de "encerrado" com form aberto
    if (Date.now() >= LOTE_CLOSE_DATE.getTime()) return 'Vagas limitadas · acesso antecipado aberto'
    const day = LOTE_CLOSE_DATE.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
    return countdown.value
      ? `Lote fecha em ${day} · ${countdown.value}`
      : `Lote fecha em ${day}`
  }
  return 'Vagas limitadas · acesso antecipado aberto'
})

let timer: ReturnType<typeof setInterval> | null = null

onMounted(async () => {
  track('urgency_badge_impression', { ab_urgency_badge: props.variant })

  if (props.variant === 'count') {
    const data = await useWaitlistCapacity()
    if (data) remainingCount.value = data.remaining
  }

  if (props.variant === 'countdown') {
    countdown.value = formatCountdown(LOTE_CLOSE_DATE)
    timer = setInterval(() => {
      countdown.value = formatCountdown(LOTE_CLOSE_DATE)
    }, 60_000)
  }
})

onUnmounted(() => {
  if (timer !== null) clearInterval(timer)
})
</script>

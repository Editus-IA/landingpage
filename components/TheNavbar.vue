<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-editus-900/95 backdrop-blur-md shadow-lg shadow-editus-950/30' : 'bg-transparent'"
  >
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <!-- Logo -->
      <a
        href="#"
        class="flex items-center gap-2.5"
      >
        <div class="w-8 h-8 bg-editus-600 rounded-lg flex items-center justify-center">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <rect
              x="2"
              y="2"
              width="6"
              height="4"
              rx="1"
              fill="white"
            />
            <rect
              x="2"
              y="7.5"
              width="6"
              height="4"
              rx="1"
              fill="white"
              opacity="0.65"
            />
            <rect
              x="2"
              y="13"
              width="6"
              height="3"
              rx="1"
              fill="white"
              opacity="0.35"
            />
            <rect
              x="10"
              y="2"
              width="6"
              height="14"
              rx="1"
              fill="white"
              opacity="0.12"
            />
            <path
              d="M10 5.5h6M10 9h4.5M10 12.5h3"
              stroke="white"
              stroke-width="1.2"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <span class="text-white font-semibold tracking-tight">
          edit<span class="text-editus-400">us</span>
        </span>
      </a>

      <!-- Nav links -->
      <nav
        class="hidden md:flex items-center gap-8"
        aria-label="Menu principal"
      >
        <a
          href="#problema"
          class="text-sm text-white/60 hover:text-white transition-colors"
        >Problema</a>
        <a
          href="#como-funciona"
          class="text-sm text-white/60 hover:text-white transition-colors"
        >Como funciona</a>
        <a
          href="#features"
          class="text-sm text-white/60 hover:text-white transition-colors"
        >Funcionalidades</a>
        <a
          href="#faq"
          class="text-sm text-white/60 hover:text-white transition-colors"
        >FAQ</a>
      </nav>

      <!-- CTA -->
      <a
        href="#waitlist"
        class="btn-primary text-sm py-2"
        @click="onCtaClick"
      >
        Acesso antecipado
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
  </header>
</template>

<script setup lang="ts">
const { track } = useUmami()

const ctaCopyVariant = useABTest('cta-copy', ['control', 'benefit', 'action'])
const buttonColorVariant = useABTest('button-color', ['control', 'green'])

const scrolled = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  if (import.meta.client) window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => {
  if (import.meta.client) window.removeEventListener('scroll', onScroll)
})

function onCtaClick() {
  track('cta_click', {
    location: 'navbar',
    ab_cta_copy: ctaCopyVariant.value,
    ab_button_color: buttonColorVariant.value,
  })
}
</script>

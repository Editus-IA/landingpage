<template>
  <section
    id="faq"
    class="py-24 bg-white"
  >
    <div class="max-w-3xl mx-auto px-6">
      <div class="text-center mb-14">
        <p class="section-label mb-3">
          Perguntas frequentes
        </p>
        <h2 class="section-title mb-4">
          Tudo o que você quer saber<br>antes de entrar na lista
        </h2>
        <p class="section-sub mx-auto">
          Respostas diretas para as dúvidas mais comuns de quem lida com licitações todos os dias.
        </p>
      </div>

      <div class="space-y-3">
        <div
          v-for="(item, i) in faqs"
          :key="i"
          class="border border-neutral-200 rounded-eb-md overflow-hidden transition-all"
          :class="open === i ? 'shadow-md shadow-indigo-900/5' : ''"
        >
          <button
            class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors"
            :class="open === i ? 'bg-neutral-50' : 'bg-white hover:bg-neutral-50/50'"
            :aria-expanded="open === i"
            :aria-controls="`faq-panel-${i}`"
            @click="toggle(i)"
          >
            <span class="font-semibold text-neutral-900 text-base leading-snug">{{ item.q }}</span>
            <span
              class="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all"
              :class="open === i ? 'bg-violet-600 text-white rotate-45' : 'bg-violet-100 text-violet-600'"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M6 1v10M1 6h10"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>
            </span>
          </button>
          <Transition name="faq-expand">
            <div
              v-if="open === i"
              :id="`faq-panel-${i}`"
              class="px-6 pb-5 bg-white"
              role="region"
            >
              <p class="text-neutral-600 text-sm leading-relaxed">
                <template
                  v-for="(part, pi) in item.parts"
                  :key="pi"
                >
                  <strong
                    v-if="part.bold"
                    class="font-semibold text-neutral-700"
                  >{{ part.text }}</strong>
                  <template v-else>
                    {{ part.text }}
                  </template>
                </template>
              </p>
            </div>
          </Transition>
        </div>
      </div>

      <!-- CTA inline -->
      <div class="mt-12 text-center">
        <p class="text-neutral-500 text-sm mb-4">
          Ainda tem dúvidas? Entre na lista e respondo pessoalmente.
        </p>
        <a
          href="#waitlist"
          :class="props.buttonColorVariant === 'green' ? 'bg-success hover:bg-success/90 shadow-success/25' : 'btn-primary'"
          class="text-white rounded-lg px-6 py-3 text-sm font-medium inline-flex items-center gap-2 transition-all hover:-translate-y-px hover:shadow-lg active:translate-y-0"
          @click="onCTAClick"
        >
          {{ faqCTAText }}
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
import { computed } from 'vue'
import { FAQS, faqPageJsonLd } from '~/composables/useFaqData'

const props = defineProps<{
  ctaCopyVariant?: 'control' | 'benefit' | 'action'
  buttonColorVariant?: 'control' | 'green'
}>()

const { track } = useUmami()

const faqCTAText = computed(() => {
  if (props.ctaCopyVariant === 'benefit') return 'Quero o acesso gratuito'
  if (props.ctaCopyVariant === 'action') return 'Reservar minha vaga'
  return 'Entrar na lista de acesso'
})

function onCTAClick() {
  track('cta_click', {
    location: 'faq',
    ab_cta_copy: props.ctaCopyVariant ?? 'control',
    ab_button_color: props.buttonColorVariant ?? 'control',
  })
}

const open = ref<number | null>(0)

function toggle(i: number) {
  open.value = open.value === i ? null : i
}

// Conteúdo do FAQ vem da fonte única compartilhada (~/composables/useFaqData).
const faqs = FAQS

// Injeta FAQPage JSON-LD no <head> via useHead (forma correta no Nuxt).
// A página /faq emite o MESMO schema; o Google desduplica por conteúdo idêntico.
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(faqPageJsonLd()),
    },
  ],
})
</script>

<style scoped>
.faq-expand-enter-active,
.faq-expand-leave-active {
  transition: all 0.22s ease;
  overflow: hidden;
}
.faq-expand-enter-from,
.faq-expand-leave-to {
  opacity: 0;
  max-height: 0;
}
.faq-expand-enter-to,
.faq-expand-leave-from {
  opacity: 1;
  max-height: 400px;
}
</style>

<template>
  <div>
    <TheNavbar />
    <main
      id="conteudo-principal"
      class="relative"
    >
      <!-- Hero: sempre primeiro -->
      <HeroSection :button-color-variant="buttonColorVariant" />

      <!-- Seções dinâmicas: ordem controlada pela variante section-order -->
      <template
        v-for="section in sectionOrder"
        :key="section"
      >
        <ProblemSection v-if="section === 'problem'" />
        <RoiHighlight v-else-if="section === 'roi-highlight'" />
        <DecisionCard v-else-if="section === 'decisao'" />
        <HowItWorks v-else-if="section === 'how-it-works'" />
        <FeaturesSection
          v-else-if="section === 'features'"
          :cta-copy-variant="ctaCopyVariant"
          :button-color-variant="buttonColorVariant"
        />
        <VsChatGPT v-else-if="section === 'vs-chatgpt'" />
        <ComparativoSection v-else-if="section === 'comparativo'" />
        <SegmentsSection v-else-if="section === 'segments'" />
        <ClientOnly v-else-if="section === 'dashboard'">
          <DashboardPreview />
          <template #fallback>
            <div class="py-24 bg-white" />
          </template>
        </ClientOnly>
        <FAQSection
          v-else-if="section === 'faq'"
          :cta-copy-variant="ctaCopyVariant"
          :button-color-variant="buttonColorVariant"
        />
        <!-- CTA Section: renderizada apenas na variante 'active' -->
        <CTASection
          v-else-if="section === 'cta-section' && ctaSectionVariant === 'active'"
          :button-color-variant="buttonColorVariant"
        />
        <WaitlistForm
          v-else-if="section === 'waitlist'"
          :cta-copy-variant="ctaCopyVariant"
          :button-color-variant="buttonColorVariant"
          :form-variant="formVariant"
          :form-context-variant="formContextVariant"
          :urgency-copy-variant="urgencyCopyVariant"
        />
      </template>

      <!-- Popup scroll-triggered: apenas na variante 'popup' -->
      <ScrollPopup v-if="scrollPopupVariant === 'popup'" />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
// A/B tests. Com tráfego de waitlist pré-lançamento, 14 testes simultâneos
// nunca atingiriam significância estatística (espaço combinatório
// astronômico). Mantemos ativos só os 2 de maior impacto na conversão
// (hero-headline em HeroSection.vue e cta-copy) e fixamos o resto em
// 'control' — reversível: basta reabrir o array de variantes.
const buttonColorVariant = useABTest('button-color', ['control'])
const ctaCopyVariant = useABTest('cta-copy', ['control', 'benefit', 'action'])
const ctaSectionVariant = useABTest('cta-section', ['control'])
const sectionOrderVariant = useABTest('section-order', ['control'])
const scrollPopupVariant = useABTest('scroll-popup', ['control'])
const formVariant = useABTest('waitlist-form', ['control'])
const formContextVariant = useABTest('form-context', ['control'])
const urgencyCopyVariant = useABTest('urgency-copy', ['control'])

const BASE_SECTIONS = ['problem', 'roi-highlight', 'decisao', 'how-it-works', 'features', 'vs-chatgpt', 'comparativo', 'segments', 'cta-section', 'dashboard', 'faq', 'waitlist'] as const
const FAQ_FIRST_SECTIONS = ['problem', 'roi-highlight', 'decisao', 'how-it-works', 'features', 'vs-chatgpt', 'comparativo', 'segments', 'cta-section', 'faq', 'dashboard', 'waitlist'] as const

const sectionOrder = computed(() =>
  sectionOrderVariant.value === 'faq-first' ? FAQ_FIRST_SECTIONS : BASE_SECTIONS,
)

const { track } = useUmami()

onMounted(() => {
  track('page_view', {
    ab_section_order: sectionOrderVariant.value,
    ab_button_color: buttonColorVariant.value,
    ab_cta_copy: ctaCopyVariant.value,
    ab_cta_section: ctaSectionVariant.value,
    ab_scroll_popup: scrollPopupVariant.value,
    ab_waitlist_form: formVariant.value,
    ab_form_context: formContextVariant.value,
    ab_urgency_copy: urgencyCopyVariant.value,
  })
})
</script>

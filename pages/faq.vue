<template>
  <div class="min-h-screen bg-white">
    <TheNavbar />

    <main
      id="conteudo-principal"
      class="max-w-3xl mx-auto px-6 pt-28 pb-24"
    >
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-700 transition-colors mb-8"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M10 7H4M6.5 4.5L4 7l2.5 2.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Voltar ao início
      </NuxtLink>

      <header class="mb-12">
        <p class="section-label mb-3">
          Perguntas frequentes
        </p>
        <h1 class="text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tight mb-4">
          Perguntas frequentes sobre o Editus
        </h1>
        <p class="text-neutral-600 leading-relaxed">
          O <strong class="text-neutral-900">Editus</strong> é uma plataforma de inteligência artificial
          para PMEs brasileiras que competem em licitações públicas: monitora o PNCP, analisa editais
          conforme a Lei 14.133/2021 e gera a proposta para revisão. Abaixo, as respostas diretas para
          as dúvidas mais comuns de quem lida com licitações todos os dias.
        </p>
      </header>

      <!-- Respostas renderizadas por completo (sem accordion) — máxima legibilidade
           para crawlers e agentes de IA, que citam o texto visível diretamente. -->
      <div class="divide-y divide-neutral-200">
        <article
          v-for="(item, i) in faqs"
          :key="i"
          class="py-7 first:pt-0"
        >
          <h2 class="text-lg font-semibold text-neutral-900 leading-snug mb-3">
            {{ item.q }}
          </h2>
          <p class="text-neutral-600 leading-relaxed">
            <template
              v-for="(part, pi) in item.parts"
              :key="pi"
            >
              <strong
                v-if="part.bold"
                class="font-semibold text-neutral-800"
              >{{ part.text }}</strong>
              <template v-else>
                {{ part.text }}
              </template>
            </template>
          </p>
        </article>
      </div>

      <!-- CTA de volta para a lista de acesso -->
      <div class="mt-14 rounded-eb-md border border-neutral-200 bg-neutral-50 px-8 py-10 text-center">
        <p class="text-neutral-900 font-semibold text-lg mb-2">
          Ainda tem dúvidas?
        </p>
        <p class="text-neutral-500 text-sm mb-6">
          Entre na lista de acesso antecipado e respondo pessoalmente.
        </p>
        <NuxtLink
          to="/#waitlist"
          class="btn-primary text-white rounded-lg px-6 py-3 text-sm font-medium inline-flex items-center gap-2 transition-all hover:-translate-y-px hover:shadow-lg active:translate-y-0"
        >
          Entrar na lista de acesso
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
        </NuxtLink>
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { FAQS, faqPageJsonLd } from '~/composables/useFaqData'

const faqs = FAQS

const { track } = useUmami()

onMounted(() => {
  // Atribuição: leads que clicarem em "waitlist" a partir daqui ficam
  // marcados com utm_source='faq' (ver useContentAttribution).
  setContentAttribution({ source: 'faq', campaign: 'pagina-faq' })
  track('section_view', { location: 'faq-page' })
})

// Página indexável e citável: canonical próprio, description dedicada e o mesmo
// FAQPage JSON-LD da home (fonte única em useFaqData). É a URL estável que
// agentes de IA podem referenciar diretamente ao responder sobre o Editus.
useHead({
  title: 'Perguntas frequentes sobre o Editus — IA para licitações públicas',
  meta: [
    { name: 'robots', content: 'index, follow' },
    {
      name: 'description',
      content:
        'Respostas às dúvidas mais comuns sobre o Editus: como a IA analisa editais de licitação, o que é o PNCP, compliance com a Lei 14.133, habilitação, prazos e responsabilidade sobre a proposta.',
    },
    { property: 'og:title', content: 'Perguntas frequentes sobre o Editus — IA para licitações públicas' },
    {
      property: 'og:description',
      content:
        'Como a IA do Editus analisa editais, o que é o PNCP, compliance com a Lei 14.133, habilitação e prazos — respostas diretas para PMEs.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://editus.com.br/faq' },
  ],
  link: [
    { rel: 'canonical', href: 'https://editus.com.br/faq' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(faqPageJsonLd()),
    },
  ],
})
</script>

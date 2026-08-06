<template>
  <div class="min-h-screen bg-white">
    <TheNavbar />

    <main
      id="conteudo-principal"
      class="max-w-3xl mx-auto px-6 pt-28 pb-24"
    >
      <nav
        aria-label="Trilha de navegação"
        class="text-sm text-neutral-400 mb-8"
      >
        <NuxtLink
          to="/"
          class="hover:text-neutral-700 transition-colors"
        >Início</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-neutral-600">Guias</span>
      </nav>

      <header class="mb-12">
        <p class="section-label mb-3">
          Guias de licitação
        </p>
        <h1 class="text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tight leading-tight mb-4">
          Guias práticos sobre licitações públicas
        </h1>
        <p class="text-neutral-600 leading-relaxed">
          Conteúdo direto sobre o ecossistema de licitações no Brasil — do PNCP à habilitação,
          das consultas de sanções à Lei 14.133/2021. Escrito para PMEs que querem participar
          de licitações com mais segurança.
        </p>
      </header>

      <ul class="space-y-4">
        <li
          v-for="g in guides"
          :key="g.slug"
        >
          <NuxtLink
            :to="`/guia/${g.slug}`"
            class="card block"
          >
            <p class="section-label mb-2 !text-violet-500">
              {{ g.kicker }}
            </p>
            <p class="font-semibold text-neutral-900 mb-1.5 leading-snug">
              {{ g.h1 }}
            </p>
            <p class="text-neutral-500 text-sm leading-relaxed">
              {{ g.description }}
            </p>
            <span class="inline-flex items-center gap-1.5 text-violet-600 text-sm font-medium mt-3">
              Ler guia
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
            </span>
          </NuxtLink>
        </li>
      </ul>
    </main>

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { GUIDES, guideUrl } from '~/composables/useGuides'

const guides = GUIDES

useHead({
  title: 'Guias de licitação pública — PNCP, habilitação, Lei 14.133 | Editus',
  meta: [
    { name: 'robots', content: 'index, follow' },
    {
      name: 'description',
      content:
        'Guias práticos sobre licitações públicas no Brasil: o que é o PNCP, checklist de habilitação, como consultar CEIS/CNEP/CEPIM e resumo da Lei 14.133/2021.',
    },
    { property: 'og:title', content: 'Guias de licitação pública — Editus' },
    { property: 'og:description', content: 'Guias práticos sobre PNCP, habilitação, sanções e a Lei 14.133 para PMEs que participam de licitações.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://editus.com.br/guia' },
  ],
  link: [
    { rel: 'canonical', href: 'https://editus.com.br/guia' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': 'Guias de licitação pública',
        'url': 'https://editus.com.br/guia',
        'inLanguage': 'pt-BR',
        'mainEntity': {
          '@type': 'ItemList',
          'itemListElement': GUIDES.map((g, i) => ({
            '@type': 'ListItem',
            'position': i + 1,
            'name': g.h1,
            'url': guideUrl(g.slug),
          })),
        },
      }),
    },
  ],
})
</script>

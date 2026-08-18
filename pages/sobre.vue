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
          Sobre
        </p>
        <h1 class="text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tight mb-4">
          O que é o Editus
        </h1>
        <p class="text-neutral-600 leading-relaxed">
          O <strong class="text-neutral-900">Editus</strong> é uma plataforma de inteligência artificial
          para PMEs brasileiras que participam de licitações públicas. Monitora o PNCP pelo perfil da
          empresa, analisa cada edital compatível — habilitação, compliance com a Lei 14.133/2021, risco
          e custo financeiro do prazo de pagamento — e entrega a proposta pronta para revisão.
        </p>
      </header>

      <div class="space-y-8">
        <section>
          <h2 class="text-lg font-semibold text-neutral-900 mb-3">
            Por que o Editus existe
          </h2>
          <p class="text-neutral-600 leading-relaxed">
            Milhares de editais são publicados no PNCP todas as semanas. Para uma PME, o desafio não é
            achar licitações — é ter tempo e conhecimento técnico para analisar cada uma com profundidade
            antes de decidir se vale a pena participar. Um edital de 80 páginas pode levar de 3 a 5 dias
            para ser lido e interpretado manualmente, e um erro de habilitação ou uma cláusula ignorada
            custam caro. O Editus automatiza esse trabalho analítico, sem substituir a decisão final, que
            é sempre humana.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 mb-3">
            Quem opera o Editus
          </h2>
          <p class="text-neutral-600 leading-relaxed">
            O Editus é um produto operado pela <strong class="text-neutral-900">Joaquim Alves LTDA</strong>,
            inscrita no CNPJ sob o nº <strong class="text-neutral-900">49.076.076/0001-90</strong>. A
            empresa é a controladora responsável pelo tratamento dos dados pessoais coletados nesta
            plataforma — ver a
            <NuxtLink
              to="/privacidade"
              class="text-violet-600 hover:text-violet-700 underline"
            >Política de Privacidade</NuxtLink>
            para os detalhes.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 mb-3">
            Em que estágio o produto está
          </h2>
          <p class="text-neutral-600 leading-relaxed">
            O Editus está em fase de acesso antecipado: quem entra na lista de espera participa dos
            primeiros testes e ajuda a moldar o produto antes do lançamento público. Não escondemos isso
            — preferimos ser diretos sobre o estágio atual do que prometer algo que ainda não existe.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 mb-3">
            Como saber mais
          </h2>
          <p class="text-neutral-600 leading-relaxed">
            Os
            <NuxtLink
              to="/guia"
              class="text-violet-600 hover:text-violet-700 underline"
            >guias de licitação</NuxtLink>
            explicam o ecossistema de compras públicas (PNCP, habilitação, Lei 14.133/2021, SICAF) em
            detalhe, e a
            <NuxtLink
              to="/faq"
              class="text-violet-600 hover:text-violet-700 underline"
            >página de perguntas frequentes</NuxtLink>
            responde às dúvidas mais comuns sobre o funcionamento do Editus.
          </p>
        </section>
      </div>

      <!-- CTA de volta para a lista de acesso -->
      <div class="mt-14 rounded-eb-md border border-neutral-200 bg-neutral-50 px-8 py-10 text-center">
        <p class="text-neutral-900 font-semibold text-lg mb-2">
          Quer ser um dos primeiros a testar?
        </p>
        <p class="text-neutral-500 text-sm mb-6">
          Entre na lista de acesso antecipado e ajude a moldar o Editus antes do lançamento.
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
const { track } = useUmami()

onMounted(() => {
  // Atribuição: leads que clicarem em "waitlist" a partir daqui ficam
  // marcados com utm_source='sobre' (ver useContentAttribution).
  setContentAttribution({ source: 'sobre', campaign: 'pagina-sobre' })
  track('section_view', { location: 'sobre-page' })
})

// Página institucional: estabelece a entidade Editus (o que é, quem opera,
// estágio do produto) para reforço de E-E-A-T/GEO. AboutPage JSON-LD referencia
// a mesma Organization (@id) já emitida em nuxt.config.ts — sem duplicar dados.
useHead({
  title: 'Sobre o Editus — IA para licitações públicas',
  meta: [
    { name: 'robots', content: 'index, follow' },
    {
      name: 'description',
      content:
        'O Editus é uma plataforma de IA para PMEs brasileiras em licitações públicas, operada pela Joaquim Alves LTDA. Conheça o produto, quem está por trás e em que estágio ele está.',
    },
    { property: 'og:title', content: 'Sobre o Editus — IA para licitações públicas' },
    {
      property: 'og:description',
      content:
        'Conheça o Editus: o que é, por que existe, quem opera a plataforma e em que estágio o produto está hoje.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://editus.com.br/sobre' },
  ],
  link: [
    { rel: 'canonical', href: 'https://editus.com.br/sobre' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        'name': 'Sobre o Editus',
        'url': 'https://editus.com.br/sobre',
        'inLanguage': 'pt-BR',
        'mainEntity': { '@id': 'https://editus.com.br/#organization' },
      }),
    },
  ],
})
</script>

export default defineNuxtConfig({
  // SEC-06: devtools apenas em desenvolvimento — nunca em produção

  modules: [
    '@sentry/nuxt/module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/sitemap',
  ], devtools: { enabled: process.env.NODE_ENV === 'development' },

  app: {
    head: {
      title: 'Editus — IA para análise de editais e licitações públicas',
      htmlAttrs: { lang: 'pt-BR' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Analise editais de licitação em minutos, não em dias. O Editus verifica habilitação, compliance com a Lei 14.133 e gera a proposta pronta para PMEs. Acesso antecipado aberto.',
        },
        {
          name: 'keywords',
          content:
            'análise de edital, software licitação, IA para licitações, PNCP, Lei 14133, compliance licitação, habilitação licitação, PME licitação, proposta automática, Comprasnet, como analisar edital de licitação, verificação habilitação licitação, custo financeiro edital pagamento, análise edital PNCP automática',
        },
        // Open Graph
        { property: 'og:title', content: 'Editus — IA para análise de editais e licitações públicas' },
        {
          property: 'og:description',
          content:
            'Monitora o PNCP, analisa editais com 12 agentes de IA e entrega proposta pronta para revisão. Habilitação, compliance e custo financeiro — automatizados.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://editus.com.br' },
        { property: 'og:image', content: 'https://editus.com.br/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Editus — IA para análise de editais e licitações públicas' },
        { property: 'og:locale', content: 'pt_BR' },
        { property: 'og:site_name', content: 'Editus' },
        // Twitter / X Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Editus — IA para análise de editais e licitações' },
        {
          name: 'twitter:description',
          content:
            'Monitora PNCP, analisa editais com IA e entrega proposta pronta para revisão. Para PMEs brasileiras.',
        },
        { name: 'twitter:image', content: 'https://editus.com.br/og-image.png' },
        { name: 'twitter:image:alt', content: 'Editus — IA para análise de editais e licitações públicas' },
        // Técnico
        { name: 'theme-color', content: '#1E1654' },
        { name: 'robots', content: 'index, follow' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'canonical', href: 'https://editus.com.br' },
      ],
      script: [
        // Umami: injetado em app.vue via useRuntimeConfig (runtime-safe)
        // JSON-LD: SoftwareApplication
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            'name': 'Editus',
            'applicationCategory': 'BusinessApplication',
            'operatingSystem': 'Web',
            'url': 'https://editus.com.br',
            'description':
              'Plataforma de inteligência artificial para PMEs brasileiras que competem em licitações públicas. Monitora o PNCP, analisa editais com 12 agentes de IA especializados, verifica habilitação e gera propostas completas com base no perfil da empresa.',
            'offers': {
              '@type': 'Offer',
              'availability': 'https://schema.org/PreOrder',
              'priceCurrency': 'BRL',
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'Editus',
              'url': 'https://editus.com.br',
            },
            'featureList': [
              'Monitoramento contínuo do PNCP',
              'Análise de edital com 12 agentes de IA',
              'Verificação de habilitação e certidões',
              'Compliance com Lei 14.133/2021',
              'Análise de risco por cláusula',
              'Cálculo de custo financeiro do prazo de pagamento',
              'Consulta a CEIS, CNEP e CEPIM',
              'Geração automática de proposta',
              'Relatório PDF completo',
            ],
            'audience': {
              '@type': 'BusinessAudience',
              'audienceType':
                'Pequenas e médias empresas brasileiras que participam de licitações públicas',
            },
          }),
        },
        // JSON-LD: Organization
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': 'Editus',
            'url': 'https://editus.com.br',
            'description':
              'Empresa de tecnologia especializada em inteligência artificial para o mercado de licitações públicas brasileiras.',
            'foundingDate': '2026',
            'contactPoint': {
              '@type': 'ContactPoint',
              'contactType': 'customer support',
              'email': 'contato@editus.com.br',
              'availableLanguage': 'Portuguese',
            },
          }),
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://editus.com.br',
  },

  // Variáveis privadas — disponíveis APENAS no servidor (nunca no browser)
  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY || '',
    ipHashSalt: process.env.IP_HASH_SALT || '',
    resendApiKey: process.env.RESEND_API_KEY || '',
    public: {
      umamiScriptUrl: process.env.NUXT_PUBLIC_UMAMI_SCRIPT_URL || '',
      umamiWebsiteId: process.env.NUXT_PUBLIC_UMAMI_WEBSITE_ID || '',
      sentryDsn: process.env.SENTRY_DSN || '',
      // Vagas do lote de acesso antecipado — quando esgotadas, o cadastro é bloqueado.
      // Aceita 0 (fecha o lote); só cai para o padrão 20 se a env estiver ausente/vazia/inválida.
      maxVagas: (() => {
        const raw = process.env.NUXT_PUBLIC_MAX_VAGAS?.trim()
        if (!raw) return 20
        const n = Number(raw)
        return Number.isFinite(n) && n >= 0 ? n : 20
      })(),
    },
  },

  // SEC-01: HTTP Security Headers — protege contra XSS, clickjacking e MITM
  routeRules: {
    '/**': {
      headers: {
        // Bloqueia carregamento em iframe (clickjacking)
        'X-Frame-Options': 'DENY',
        // Previne MIME-type sniffing
        'X-Content-Type-Options': 'nosniff',
        // Não vaza URL completa em referrals externos
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        // Desabilita APIs de hardware desnecessárias
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        // Força HTTPS por 2 anos (ativar após validar HTTPS em produção)
        'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
        // CSP: nonces injetados por request via server/plugins/csp-nonce.ts
        // 'unsafe-inline' substituído por 'nonce-<valor>' dinamicamente — sem brecha XSS
        'Content-Security-Policy': (() => {
          const umamiUrl = process.env.NUXT_PUBLIC_UMAMI_SCRIPT_URL
          let umamiOrigin = ''
          if (umamiUrl) {
            try {
              umamiOrigin = ' ' + new URL(umamiUrl).origin
            }
            catch { /* URL inválida — ignora */ }
          }
          const supabaseOrigin = process.env.SUPABASE_URL || 'https://*.supabase.co'
          return [
            'default-src \'self\'',
            `script-src 'self' 'unsafe-inline'${umamiOrigin}`,
            'style-src \'self\' \'unsafe-inline\' https://fonts.googleapis.com',
            'font-src \'self\' data: https://fonts.gstatic.com',
            'img-src \'self\' data: https:',
            `connect-src 'self' ${supabaseOrigin} https://*.ingest.sentry.io${umamiOrigin}`,
            process.env.NODE_ENV === 'development' ? 'worker-src blob:' : 'worker-src \'none\'',
            'manifest-src \'self\'',
            process.env.NODE_ENV === 'development' ? 'frame-src \'self\' data:' : 'frame-src \'none\'',
            'frame-ancestors \'none\'',
            'base-uri \'self\'',
            'form-action \'self\'',
            'report-uri /api/csp-report',
          ].join('; ')
        })(),
      },
    },
  },

  compatibilityDate: '2024-04-03',

  telemetry: false,

  googleFonts: {
    families: {
      Inter: [400, 500, 600],
    },
    display: 'swap',
    preload: true,
  },

  sentry: {
    dsn: process.env.SENTRY_DSN || '',
  },

  sitemap: {
    exclude: ['/api/**', '/obrigado', '/cancelar', '/privacidade'],
  },
})

<template>
  <div class="min-h-screen bg-white">
    <TheNavbar class="print:hidden" />

    <main
      id="conteudo-principal"
      class="max-w-3xl mx-auto px-6 pt-28 pb-24 print:pt-0 print:pb-0"
    >
      <NuxtLink
        to="/"
        class="print:hidden inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-700 transition-colors mb-8"
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

      <header class="mb-10">
        <p class="section-label mb-3 print:hidden">
          Checklist gratuito
        </p>
        <h1 class="text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tight leading-tight mb-4">
          Checklist de habilitação em licitação
        </h1>
        <p class="text-neutral-600 leading-relaxed print:hidden">
          A causa mais comum de desclassificação em licitações não é falta de capacidade —
          é um documento vencido ou esquecido. Este checklist reúne os quatro grupos de
          habilitação exigidos pela Lei 14.133/2021, para você conferir antes de cada sessão.
        </p>
      </header>

      <!-- Gate: pede e-mail antes de liberar o checklist completo -->
      <div
        v-if="!unlocked"
        class="print:hidden rounded-eb-md border border-neutral-200 bg-neutral-50 px-8 py-10"
      >
        <p class="text-neutral-900 font-semibold text-lg mb-2 text-center">
          Informe seu e-mail para liberar o checklist
        </p>
        <p class="text-neutral-500 text-sm mb-6 text-center max-w-md mx-auto">
          Sem custo. Enviamos só este checklist — nada de spam.
        </p>
        <form
          class="max-w-sm mx-auto"
          @submit.prevent="submitGate"
        >
          <div class="flex flex-col sm:flex-row gap-3">
            <input
              v-model="gateEmail"
              type="email"
              required
              autocomplete="email"
              placeholder="seu@email.com.br"
              aria-label="Seu e-mail para liberar o checklist"
              class="flex-1 px-4 py-3 bg-white border border-neutral-300 rounded-eb-sm text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:border-violet-500 transition-all"
            >
            <button
              type="submit"
              :disabled="gateSubmitting || !gateConsent"
              class="btn-primary text-white rounded-eb-sm px-6 py-3 text-sm font-medium whitespace-nowrap transition-all disabled:opacity-50"
            >
              {{ gateSubmitting ? 'Enviando...' : 'Liberar checklist' }}
            </button>
          </div>
          <label class="flex items-start gap-2 mt-4 text-left cursor-pointer">
            <input
              v-model="gateConsent"
              type="checkbox"
              required
              class="mt-0.5 accent-violet-500"
            >
            <span class="text-xs text-neutral-500 leading-relaxed">
              Concordo com o tratamento dos meus dados conforme a
              <NuxtLink
                to="/privacidade"
                class="text-violet-600 hover:text-violet-700 underline"
              >Política de Privacidade</NuxtLink>.
            </span>
          </label>
          <p
            v-if="gateError"
            class="text-danger text-xs mt-3 text-center"
          >
            {{ gateError }}
          </p>
        </form>
      </div>

      <!-- Checklist completo — liberado após o gate -->
      <template v-else>
        <p class="hidden print:block text-sm text-neutral-500 mb-8">
          editus.com.br/checklist-habilitacao · Baseado na Lei 14.133/2021
        </p>

        <div
          v-for="group in groups"
          :key="group.title"
          class="mb-8 break-inside-avoid"
        >
          <h2 class="text-lg font-semibold text-neutral-900 mb-3">
            {{ group.title }}
          </h2>
          <ul class="space-y-2.5">
            <li
              v-for="(item, i) in group.items"
              :key="i"
              class="flex gap-3 text-neutral-700 leading-relaxed"
            >
              <span
                class="mt-0.5 flex-shrink-0 w-4 h-4 rounded border border-neutral-400 print:border-black"
                aria-hidden="true"
              />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <div class="rounded-eb-md border border-violet-200 bg-violet-50/60 px-6 py-5 mb-10 break-inside-avoid">
          <p class="font-semibold text-violet-900 mb-1.5 text-sm">
            A maioria das desclassificações não é por falta de capacidade
          </p>
          <p class="text-violet-800/80 text-sm leading-relaxed">
            É uma certidão vencida dois dias antes da sessão, ou um documento que ninguém
            lembrou de anexar. O agente de habilitação do Editus cruza as exigências do
            edital com o perfil da empresa e sinaliza pendências antes da submissão.
          </p>
        </div>

        <div class="print:hidden flex flex-col sm:flex-row gap-3 justify-center mb-14">
          <button
            type="button"
            class="btn-primary text-white rounded-lg px-6 py-3 text-sm font-medium inline-flex items-center justify-center gap-2"
            @click="printChecklist"
          >
            Imprimir / salvar como PDF
          </button>
          <NuxtLink
            to="/guia/habilitacao-licitacao"
            class="text-sm text-violet-600 hover:text-violet-700 underline underline-offset-2 inline-flex items-center justify-center"
          >
            Ver o guia completo de habilitação
          </NuxtLink>
        </div>

        <!-- CTA para a waitlist -->
        <div class="print:hidden rounded-eb-md border border-neutral-200 bg-neutral-50 px-8 py-10 text-center">
          <p class="text-neutral-900 font-semibold text-lg mb-2">
            Quer que a verificação seja automática?
          </p>
          <p class="text-neutral-500 text-sm mb-6 max-w-md mx-auto">
            O Editus cruza esse checklist com cada edital automaticamente. Entre na lista
            de acesso antecipado.
          </p>
          <NuxtLink
            to="/#waitlist"
            class="btn-primary text-white rounded-lg px-6 py-3 text-sm font-medium inline-flex items-center gap-2"
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
      </template>
    </main>

    <TheFooter class="print:hidden" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const STORAGE_KEY = 'editus_checklist_unlocked'

const { track } = useUmami()

const unlocked = ref(false)
const gateEmail = ref('')
const gateConsent = ref(false)
const gateSubmitting = ref(false)
const gateError = ref('')

onMounted(() => {
  setContentAttribution({ source: 'checklist-habilitacao', campaign: 'lead-magnet' })
  track('section_view', { location: 'checklist-habilitacao' })

  // Reabrir o checklist em visitas seguintes na mesma sessão sem pedir e-mail de novo.
  if (sessionStorage.getItem(STORAGE_KEY) === '1') {
    unlocked.value = true
  }
})

async function submitGate() {
  if (!gateEmail.value || !gateConsent.value || gateSubmitting.value) return
  gateSubmitting.value = true
  gateError.value = ''
  try {
    await $fetch('/api/waitlist', {
      method: 'POST',
      body: {
        email: gateEmail.value,
        consent: gateConsent.value,
        source: 'checklist-habilitacao',
      },
    })
    unlocked.value = true
    sessionStorage.setItem(STORAGE_KEY, '1')
    track('lead_magnet_unlock', { magnet: 'checklist-habilitacao' })
  }
  catch {
    gateError.value = 'Não foi possível liberar o checklist. Tente novamente.'
  }
  finally {
    gateSubmitting.value = false
  }
}

function printChecklist() {
  track('lead_magnet_print', { magnet: 'checklist-habilitacao' })
  window.print()
}

const groups = [
  {
    title: '1. Habilitação jurídica',
    items: [
      'Ato constitutivo, estatuto ou contrato social em vigor, devidamente registrado.',
      'Documento de identificação dos sócios ou representantes legais.',
      'Para MEI: Certificado da Condição de Microempreendedor Individual (CCMEI).',
    ],
  },
  {
    title: '2. Regularidade fiscal e trabalhista',
    items: [
      'Comprovante de inscrição no CNPJ.',
      'Certidão Negativa de Débitos relativos a Tributos Federais e à Dívida Ativa da União (CND conjunta).',
      'Certidão de regularidade com o FGTS (CRF), emitida pela Caixa.',
      'Certidão Negativa de Débitos Trabalhistas (CNDT).',
      'Certidões de regularidade fiscal estadual e municipal, conforme o objeto.',
    ],
  },
  {
    title: '3. Qualificação técnica',
    items: [
      'Atestados de capacidade técnica emitidos por clientes anteriores.',
      'Registro ou inscrição em conselho de classe (CREA, CAU, etc.), quando exigido.',
      'Comprovação de equipe técnica e/ou aparelhamento, se o edital exigir.',
    ],
  },
  {
    title: '4. Qualificação econômico-financeira',
    items: [
      'Balanço patrimonial e demonstrações contábeis do último exercício.',
      'Certidão negativa de falência ou recuperação judicial.',
      'Índices contábeis mínimos (liquidez, solvência), quando previstos no edital.',
    ],
  },
  {
    title: '5. Verificação de impedimentos',
    items: [
      'Consulta ao CEIS (Cadastro de Empresas Inidôneas e Suspensas).',
      'Consulta ao CNEP (Cadastro Nacional de Empresas Punidas).',
      'Confirmação de que nenhuma certidão está vencida na data exigida pelo edital.',
    ],
  },
]

useHead({
  title: 'Checklist de habilitação em licitação (gratuito) — Editus',
  meta: [
    { name: 'robots', content: 'index, follow' },
    {
      name: 'description',
      content:
        'Checklist gratuito com os documentos de habilitação jurídica, fiscal, técnica e econômico-financeira exigidos pela Lei 14.133/2021 em licitações públicas.',
    },
    { property: 'og:title', content: 'Checklist de habilitação em licitação (gratuito) — Editus' },
    {
      property: 'og:description',
      content: 'Os documentos que sua empresa precisa para não ser desclassificada por habilitação em uma licitação.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://editus.com.br/checklist-habilitacao' },
  ],
  link: [
    { rel: 'canonical', href: 'https://editus.com.br/checklist-habilitacao' },
  ],
})
</script>

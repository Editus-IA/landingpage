<template>
  <section
    id="decisao"
    class="py-24 bg-indigo-950 scroll-mt-20"
  >
    <div class="max-w-3xl mx-auto px-6">
      <div class="text-center mb-12">
        <p class="section-label mb-3 !text-violet-300">
          A pergunta que importa
        </p>
        <h2 class="section-title !text-white mb-4">
          Devo participar desta licitação?
        </h2>
        <p class="section-sub mx-auto !text-white/60">
          O Editus reúne habilitação, risco, compliance, prazo, custo financeiro e margem
          numa única decisão executiva — para você não gastar horas com um edital que não vale a pena.
        </p>
      </div>

      <!-- Cartão de decisão (ilustração do resultado que o Editus entrega) -->
      <div class="rounded-eb-lg bg-white shadow-2xl shadow-black/30 overflow-hidden">
        <!-- Cabeçalho -->
        <div class="flex items-center justify-between gap-4 px-6 py-4 border-b border-neutral-200 bg-neutral-50">
          <div>
            <p class="text-xs font-mono text-neutral-400">
              EDITAL PE-042/2026
            </p>
            <p class="text-sm font-semibold text-neutral-700">
              Prefeitura de Santos · SP
            </p>
          </div>
          <span class="text-[10px] font-semibold tracking-widest uppercase text-violet-600">
            Decisão Editus
          </span>
        </div>

        <!-- Veredito -->
        <div class="px-6 py-6 flex items-center gap-3 border-b border-neutral-100">
          <span
            class="flex-shrink-0 w-9 h-9 rounded-full bg-warning/15 flex items-center justify-center"
            aria-hidden="true"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M9 5.5v4M9 12.5h.01"
                stroke="#C07A09"
                stroke-width="1.6"
                stroke-linecap="round"
              />
              <circle
                cx="9"
                cy="9"
                r="7"
                stroke="#C07A09"
                stroke-width="1.4"
              />
            </svg>
          </span>
          <div>
            <p class="text-lg font-bold text-warning tracking-tight leading-none">
              Participar com ajustes
            </p>
            <p class="text-sm text-neutral-500 mt-1">
              Oportunidade viável, com pontos que merecem atenção antes de enviar.
            </p>
          </div>
        </div>

        <!-- Métricas -->
        <dl class="grid grid-cols-2 sm:grid-cols-3 gap-px bg-neutral-100">
          <div
            v-for="m in metrics"
            :key="m.label"
            class="bg-white px-5 py-4"
          >
            <dt class="text-xs text-neutral-400 mb-1">
              {{ m.label }}
            </dt>
            <dd
              class="font-display text-lg font-bold tracking-tight"
              :class="m.color"
            >
              {{ m.value }}
            </dd>
          </div>
        </dl>

        <!-- Por que participar / Atenção -->
        <div class="grid sm:grid-cols-2 gap-px bg-neutral-100">
          <div class="bg-white px-6 py-5">
            <p class="text-xs font-semibold text-success uppercase tracking-wider mb-3">
              Por que participar
            </p>
            <ul class="space-y-2">
              <li
                v-for="(reason, i) in reasons"
                :key="i"
                class="flex gap-2.5 text-sm text-neutral-600 leading-snug"
              >
                <span
                  class="mt-0.5 flex-shrink-0 text-success"
                  aria-hidden="true"
                >✓</span>
                <span>{{ reason }}</span>
              </li>
            </ul>
          </div>
          <div class="bg-white px-6 py-5">
            <p class="text-xs font-semibold text-warning uppercase tracking-wider mb-3">
              Atenção
            </p>
            <ul class="space-y-2">
              <li
                v-for="(warn, i) in warnings"
                :key="i"
                class="flex gap-2.5 text-sm text-neutral-600 leading-snug"
              >
                <span
                  class="mt-0.5 flex-shrink-0 text-warning"
                  aria-hidden="true"
                >⚠</span>
                <span>{{ warn }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Rodapé / ação ilustrativa -->
        <div class="px-6 py-5 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between gap-4">
          <p class="text-xs text-neutral-400">
            Exemplo ilustrativo do relatório de decisão do Editus.
          </p>
          <span
            class="btn-primary !py-2 !px-4 text-xs pointer-events-none opacity-90"
            aria-hidden="true"
          >
            Gerar proposta
          </span>
        </div>
      </div>

      <!-- CTA real abaixo do mockup -->
      <div class="mt-10 text-center">
        <a
          href="#waitlist"
          class="btn-primary text-white rounded-lg px-6 py-3 text-sm font-medium inline-flex items-center gap-2"
          @click="onCTAClick"
        >
          Quero decisões assim para os meus editais
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
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
const { track } = useUmami()

// Métricas do exemplo — coerentes com a /calculadora-custo-financeiro
// (contrato R$ 300k, 90 dias, Selic ~14% → custo ≈ R$ 9.881; margem cai ~3,3 p.p.).
const metrics = [
  { label: 'Fit da empresa', value: '91/100', color: 'text-success' },
  { label: 'Risco', value: '24/100', color: 'text-success' },
  { label: 'Margem estimada', value: '12,0%', color: 'text-neutral-900' },
  { label: 'Prazo de pagamento', value: '90 dias', color: 'text-neutral-900' },
  { label: 'Custo financeiro', value: 'R$ 9.881', color: 'text-neutral-900' },
  { label: 'Documentos pendentes', value: '2', color: 'text-warning' },
]

const reasons = [
  'Sua empresa atende aos requisitos técnicos do edital.',
  'Documentação principal de habilitação está válida.',
  'Mesmo com o custo financeiro, a margem permanece positiva.',
]

const warnings = [
  'Prazo de pagamento reduz a margem em ~3,3 p.p.',
  'Duas certidões precisam ser renovadas antes da sessão.',
  'Cláusula de penalidade por atraso merece revisão jurídica.',
]

function onCTAClick() {
  track('cta_click', { location: 'decision-card' })
}
</script>

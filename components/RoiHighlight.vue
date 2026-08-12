<template>
  <section class="py-24 bg-white">
    <div class="max-w-4xl mx-auto px-6">
      <div class="text-center mb-12">
        <p class="section-label mb-3">
          O dinheiro que ninguém vê
        </p>
        <h2 class="section-title mb-4">
          Uma licitação pode parecer lucrativa<br class="hidden sm:block"> e não ser.
        </h2>
        <p class="section-sub mx-auto">
          O prazo de pagamento tem um custo que a maioria não coloca na proposta —
          e come a margem depois que já é tarde. O Editus mostra esse número antes.
        </p>
      </div>

      <div class="rounded-eb-lg border border-neutral-200 overflow-hidden shadow-md shadow-indigo-900/5">
        <!-- Cenário -->
        <div class="grid sm:grid-cols-2 gap-px bg-neutral-100">
          <div class="bg-neutral-50 px-6 py-5">
            <p class="text-xs text-neutral-400 mb-1">
              Contrato
            </p>
            <p class="font-display text-2xl font-bold text-neutral-900 tracking-tight">
              R$ 300.000
            </p>
          </div>
          <div class="bg-neutral-50 px-6 py-5">
            <p class="text-xs text-neutral-400 mb-1">
              Pagamento
            </p>
            <p class="font-display text-2xl font-bold text-neutral-900 tracking-tight">
              90 dias
            </p>
          </div>
        </div>

        <!-- Antes / depois da margem -->
        <div class="grid sm:grid-cols-2 gap-px bg-neutral-100 border-t border-neutral-100">
          <div class="bg-white px-6 py-6">
            <p class="text-xs text-neutral-400 mb-1">
              Margem aparente
            </p>
            <p class="font-display text-3xl font-bold text-neutral-400 tracking-tight line-through decoration-neutral-300">
              15,3%
            </p>
            <p class="text-xs text-neutral-400 mt-1">
              sem considerar o custo financeiro
            </p>
          </div>
          <div class="bg-white px-6 py-6">
            <p class="text-xs text-neutral-400 mb-1">
              Margem real
            </p>
            <p class="font-display text-3xl font-bold text-neutral-900 tracking-tight">
              12,0%
            </p>
            <p class="text-xs text-neutral-500 mt-1">
              após o custo do prazo de pagamento
            </p>
          </div>
        </div>

        <!-- Impacto -->
        <div class="bg-indigo-950 px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p class="font-display text-3xl font-bold text-violet-300 tracking-tight">
              R$ 9.881
            </p>
            <p class="text-sm text-white/60 mt-1">
              de impacto financeiro identificado antes da proposta.
            </p>
          </div>
          <NuxtLink
            to="/calculadora-custo-financeiro"
            class="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors flex-shrink-0"
          >
            Calcular para o meu contrato
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
          </NuxtLink>
        </div>
      </div>

      <p class="text-center text-sm text-neutral-500 mt-6 max-w-xl mx-auto">
        É esse tipo de coisa que o Editus encontra antes de você enviar sua proposta.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
// Bloco de ROI puramente ilustrativo. Os números batem com a
// /calculadora-custo-financeiro (300k / 90 dias / Selic ~14% = R$ 9.881; margem
// 15,3% → 12,0%, queda de ~3,3 p.p.). Manter em sincronia se algum valor mudar.
</script>

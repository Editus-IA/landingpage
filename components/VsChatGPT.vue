<template>
  <section
    id="por-que-nao-chatgpt"
    class="py-24 bg-white scroll-mt-20"
  >
    <div class="max-w-4xl mx-auto px-6">
      <div class="text-center mb-14">
        <p class="section-label mb-3">
          A pergunta que todo mundo faz
        </p>
        <h2 class="section-title mb-4">
          Por que não jogar o edital no ChatGPT?
        </h2>
        <p class="section-sub mx-auto">
          Porque o problema não começa no PDF. Começa em <strong class="text-neutral-900">achar
            os editais certos</strong> — e termina numa decisão de negócio, não num resumo.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <!-- ChatGPT -->
        <div class="card !bg-neutral-50">
          <div class="flex items-center gap-2 mb-5">
            <span
              class="w-8 h-8 rounded-eb-sm bg-neutral-200 flex items-center justify-center text-neutral-500"
              aria-hidden="true"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 4h10M3 8h10M3 12h6"
                  stroke="currentColor"
                  stroke-width="1.4"
                  stroke-linecap="round"
                />
              </svg>
            </span>
            <h3 class="font-semibold text-neutral-700">
              ChatGPT genérico
            </h3>
          </div>
          <p class="text-sm text-neutral-500 mb-5">
            Você já precisa ter o edital em mãos. E a resposta é um resumo — não uma decisão.
          </p>
          <ul class="space-y-3">
            <li
              v-for="(item, i) in chatgptFlow"
              :key="i"
              class="flex gap-2.5 text-sm text-neutral-500 leading-snug"
            >
              <span
                class="mt-0.5 flex-shrink-0 text-neutral-300"
                aria-hidden="true"
              >—</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <!-- Editus -->
        <div class="card border-violet-200 bg-violet-50/40">
          <div class="flex items-center gap-2 mb-5">
            <span
              class="w-8 h-8 rounded-eb-sm bg-violet-600 flex items-center justify-center text-white"
              aria-hidden="true"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M13 4L6 11 3 8"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <h3 class="font-semibold text-neutral-900">
              Editus
            </h3>
          </div>
          <p class="text-sm text-neutral-600 mb-5">
            Não começa no PDF. Começa procurando as oportunidades compatíveis com a sua empresa.
          </p>
          <ol class="space-y-2.5">
            <li
              v-for="(step, i) in editusFlow"
              :key="i"
              class="flex items-center gap-3 text-sm text-neutral-700 leading-snug"
            >
              <span
                class="flex-shrink-0 w-5 h-5 rounded-full bg-violet-100 text-violet-700 text-[11px] font-semibold flex items-center justify-center"
                aria-hidden="true"
              >{{ i + 1 }}</span>
              <span class="font-medium">{{ step }}</span>
            </li>
          </ol>
        </div>
      </div>

      <p class="text-center text-sm text-neutral-500 mt-8 max-w-2xl mx-auto">
        O ChatGPT responde sobre um documento. O Editus é uma camada operacional sobre todo o
        processo de licitação — do monitoramento à proposta.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const chatgptFlow = [
  'Você garimpa o PNCP manualmente para achar o edital.',
  'Cola o PDF e pede um resumo.',
  'Ele não verifica sua habilitação real (certidões, CEIS, porte).',
  'Não calcula o custo financeiro nem a margem do seu contrato.',
  'A cada novo edital, você recomeça do zero.',
]

const editusFlow = [
  'Monitora o PNCP pelo perfil da sua empresa',
  'Encontra os editais compatíveis',
  'Verifica habilitação e impedimentos',
  'Analisa risco e compliance (Lei 14.133)',
  'Calcula custo financeiro e margem',
  'Prepara a proposta',
  'Você decide',
]
</script>

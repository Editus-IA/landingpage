<template>
  <section
    id="comparativo"
    class="py-24 bg-neutral-50 scroll-mt-20"
  >
    <div class="max-w-5xl mx-auto px-6">
      <div class="text-center mb-14">
        <p class="section-label mb-3">
          Como as empresas fazem isso hoje
        </p>
        <h2 class="section-title mb-4">
          Planilha, consultoria ou Editus?
        </h2>
        <p class="section-sub mx-auto">
          Não existe uma forma errada de analisar editais — existe a forma que cabe no seu
          tempo e no seu orçamento. Veja onde cada abordagem entrega e onde ela deixa a
          empresa exposta.
        </p>
      </div>

      <!-- Tabela: dimensão x abordagem. Overflow-x no mobile evita quebra de layout. -->
      <div class="overflow-x-auto">
        <table class="w-full min-w-[640px] border-collapse">
          <thead>
            <tr>
              <th class="text-left text-sm font-medium text-neutral-500 pb-4 pr-4 w-1/4">
                &nbsp;
              </th>
              <th
                v-for="col in columns"
                :key="col.key"
                class="text-left pb-4 px-4 w-1/4"
              >
                <span
                  class="text-sm font-semibold"
                  :class="col.key === 'editus' ? 'text-violet-700' : 'text-neutral-700'"
                >{{ col.label }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in rows"
              :key="row.dimension"
              class="border-t border-neutral-200"
            >
              <th
                scope="row"
                class="text-left text-sm font-medium text-neutral-900 py-4 pr-4 align-top"
              >
                {{ row.dimension }}
              </th>
              <td
                v-for="col in columns"
                :key="col.key"
                class="py-4 px-4 align-top text-sm leading-relaxed"
                :class="col.key === 'editus' ? 'bg-violet-50/60 text-violet-900' : 'text-neutral-600'"
              >
                {{ row.values[col.key] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="text-center text-sm text-neutral-500 mt-8 max-w-2xl mx-auto">
        O Editus não substitui o julgamento humano sobre participar ou não — ele reduz o
        tempo entre "um edital foi publicado" e "sei se vale a pena", para você decidir com
        mais editais analisados, não com menos cuidado.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const columns = [
  { key: 'planilha' as const, label: 'Planilha manual' },
  { key: 'consultoria' as const, label: 'Consultoria terceirizada' },
  { key: 'editus' as const, label: 'Editus' },
]

const rows = [
  {
    dimension: 'Monitoramento do PNCP',
    values: {
      planilha: 'Manual — alguém verifica o portal com a frequência que o tempo permitir.',
      consultoria: 'Depende do escopo contratado; geralmente por demanda, não contínuo.',
      editus: 'Contínuo, automático, filtrado pelo perfil da empresa.',
    },
  },
  {
    dimension: 'Verificação de habilitação',
    values: {
      planilha: 'Checklist manual — fácil esquecer uma certidão a vencer.',
      consultoria: 'Feita por especialista, com custo por edital ou contrato mensal.',
      editus: 'Automática, cruzando o edital com o perfil e as certidões da empresa.',
    },
  },
  {
    dimension: 'Custo financeiro do prazo de pagamento',
    values: {
      planilha: 'Raramente calculado — a maioria precifica só custo direto e BDI.',
      consultoria: 'Depende do consultor incluir esse cálculo no escopo.',
      editus: 'Calculado automaticamente para cada edital compatível.',
    },
  },
  {
    dimension: 'Tempo por edital',
    values: {
      planilha: '3 a 5 dias de leitura e análise manual, por pessoa qualificada.',
      consultoria: 'Mais rápido que manual, mas depende da disponibilidade do consultor.',
      editus: 'Minutos — a análise roda em paralelo para todos os editais compatíveis.',
    },
  },
  {
    dimension: 'Custo recorrente',
    values: {
      planilha: 'Tempo da equipe interna — sem custo direto, mas com custo de oportunidade.',
      consultoria: 'Honorários por edital ou contrato mensal, variável por escopo.',
      editus: 'Em acesso antecipado, sem custo — modelo definitivo ainda não fechado.',
    },
  },
  {
    dimension: 'Decisão final e assinatura',
    values: {
      planilha: 'Sempre humana.',
      consultoria: 'Sempre humana — o consultor recomenda, a empresa decide.',
      editus: 'Sempre humana — o Editus analisa, você decide e assina.',
    },
  },
]
</script>

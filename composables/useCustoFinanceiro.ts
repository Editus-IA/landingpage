// Cálculo do custo financeiro do prazo de pagamento em licitações.
//
// A dor: a empresa vence o contrato mas o órgão paga em 30/60/90 dias. Nesse
// intervalo ela banca custos (fornecedores, folha, tributos) com capital próprio
// ou de terceiros. Esse "dinheiro parado" tem um custo de carregamento ancorado
// na Selic — que a maioria não precifica e come a margem.
//
// Modelo: custo de carregamento simples (transparente e fácil de explicar).
//   taxa_mensal = (1 + selic_anual)^(1/12) − 1
//   custo       = valor_contrato × taxa_mensal × (prazo_dias / 30)
//
// Funções puras — sem efeitos colaterais, fáceis de testar.

export interface CustoFinanceiroInput {
  valorContrato: number // R$
  prazoPagamentoDias: number // dias até o recebimento
  selicAnual: number // % a.a. (ex: 11 para 11%)
}

export interface CustoFinanceiroResult {
  custo: number // R$ imobilizados no período
  taxaMensal: number // fração (ex: 0.00873)
  percentualSobreContrato: number // % do valor do contrato
}

// Converte Selic anual (% a.a.) em taxa mensal equivalente (fração).
export function selicMensal(selicAnual: number): number {
  const anual = selicAnual / 100
  return (1 + anual) ** (1 / 12) - 1
}

export function calcularCustoFinanceiro(input: CustoFinanceiroInput): CustoFinanceiroResult {
  const valor = Math.max(0, input.valorContrato || 0)
  const dias = Math.max(0, input.prazoPagamentoDias || 0)
  const taxaMensal = selicMensal(Math.max(0, input.selicAnual || 0))

  const custo = valor * taxaMensal * (dias / 30)
  const percentualSobreContrato = valor > 0 ? (custo / valor) * 100 : 0

  return { custo, taxaMensal, percentualSobreContrato }
}

// Formatação BRL para exibição.
export function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0)
}

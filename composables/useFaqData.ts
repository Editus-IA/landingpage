// Fonte única de verdade para o conteúdo do FAQ.
// Consumido tanto por components/FAQSection.vue (seção da home, com A/B tests)
// quanto por pages/faq.vue (página indexável e citável por agentes de IA).
// Manter o conteúdo aqui evita divergência entre as duas superfícies e garante
// que o FAQPage JSON-LD seja idêntico onde quer que seja emitido.

export type FaqPart = { text: string, bold?: true }
export type Faq = { q: string, parts: FaqPart[] }

export const FAQS: Faq[] = [
  {
    q: 'Funciona para qualquer tipo de licitação?',
    parts: [
      { text: 'Sim. O Editus foi desenhado para os principais modelos previstos na Lei 14.133/2021: ' },
      { text: 'pregão eletrônico, concorrência e dispensa eletrônica.', bold: true },
      { text: ' O agente Compliance identifica automaticamente a modalidade do edital e aplica os critérios específicos de cada uma. Para editais de credenciamento e chamamento público, a análise é parcial — cobrindo habilitação e compliance, mas sem geração de proposta.' },
    ],
  },
  {
    q: 'O que é o Editus?',
    parts: [{ text: 'Editus é uma plataforma de inteligência artificial para PMEs brasileiras que participam de licitações públicas. Ela monitora o PNCP pelo perfil da sua empresa, analisa os editais relevantes com 12 agentes de IA especializados (habilitação, compliance, risco, custo financeiro) e entrega a proposta redigida e o relatório completo para você revisar antes de submeter no Comprasnet.' }],
  },
  {
    q: 'Preciso ter experiência com licitações para usar o Editus?',
    parts: [{ text: 'Não. O Editus foi desenhado para que qualquer gestor ou sócio consiga entender o relatório gerado, sem precisar conhecer de direito administrativo. A decisão final (participar ou não, submeter a proposta) sempre exige o julgamento humano de quem conhece a empresa. O Editus faz o trabalho analítico; você faz a decisão.' }],
  },
  {
    q: 'Como o Editus filtra os editais certos para a minha empresa?',
    parts: [{ text: 'No cadastro inicial você informa: CNPJ, segmentos de atuação (CATMAT/CATSER), UFs de interesse, porte (MEI, ME, EPP) e capacidade técnica. O agente Prospector usa esse perfil para monitorar o PNCP continuamente e acionar o processo de análise apenas quando um edital compatível é publicado. Sem ruído, sem alertas irrelevantes.' }],
  },
  {
    q: 'O Editus garante que minha proposta vai vencer a licitação?',
    parts: [
      { text: 'Não, e desconfiaria de qualquer ferramenta que prometesse isso. O resultado de uma licitação depende de fatores que nenhuma IA controla: a concorrência, a capacidade técnica da empresa e decisões do órgão. O que o Editus entrega é uma ' },
      { text: 'análise mais completa e uma proposta mais elaborada', bold: true },
      { text: ' do que seria possível fazer manualmente em poucos dias, reduzindo erros de habilitação, cláusulas ignoradas e erros de precificação.' },
    ],
  },
  {
    q: 'Quanto tempo leva a análise de um edital?',
    parts: [{ text: 'Depende do tamanho do edital e da carga do sistema, mas a análise completa com 12 agentes (leitura do PDF, verificação de certidões, compliance, risco e custo financeiro) fica pronta em minutos, não em dias. Um edital de 80 páginas que tomaria 3 a 5 dias de análise manual é processado em uma fração desse tempo.' }],
  },
  {
    q: 'É seguro informar o CNPJ da minha empresa?',
    parts: [{ text: 'Sim. As consultas de certidões (SIASG, CEIS, CNEP, CEPIM) são feitas nos portais públicos do governo federal, que são abertos por natureza. Nenhuma credencial ou dado confidencial da empresa é exigido pelo Editus além do CNPJ e informações de perfil. Os dados ficam em servidor seguro e não são compartilhados com terceiros.' }],
  },
  {
    q: 'O Editus substitui um consultor ou escritório jurídico de licitações?',
    parts: [{ text: 'Não substitui, e não é esse o objetivo. O Editus acelera e estrutura o trabalho analítico que hoje é feito manualmente ou delegado para consultores. Em editais mais simples, pode reduzir significativamente a dependência de consultoria externa. Em contratos complexos, o relatório do Editus serve de base qualificada para o consultor trabalhar mais rápido e com mais contexto.' }],
  },
  {
    q: 'O que é o PNCP e por que ele é importante?',
    parts: [{ text: 'O Portal Nacional de Compras Públicas (PNCP) é o repositório oficial de licitações da União, estados e municípios após a Lei 14.133/2021 (Nova Lei de Licitações). Todos os órgãos públicos são obrigados a publicar seus editais lá. Monitorar o PNCP sistematicamente é a forma mais completa de não perder oportunidades, e é o que o agente Prospector do Editus faz de forma contínua.' }],
  },
  {
    q: 'Funciona para pregão de serviço com critério de pontuação técnica?',
    parts: [
      { text: 'Sim, com ressalvas importantes. Para pregões de menor preço e maior desconto, a análise é completa: habilitação, compliance, custo financeiro e proposta de preços gerada automaticamente. Para licitações com ' },
      { text: 'julgamento por técnica e preço', bold: true },
      { text: ' (RDC, concorrências com envelope técnico), o Editus analisa habilitação, compliance e risco, mas a elaboração do envelope técnico exige input humano especializado — o sistema prepara o briefing e identifica os critérios de pontuação, mas não escreve o memorial técnico.' },
    ],
  },
  {
    q: 'O edital exige planilha de BDI ou composição de custo unitário. O Editus resolve?',
    parts: [
      { text: 'O agente Precificador identifica quando o edital exige BDI, composição de custo unitário ou planilha SINAPI e sinaliza isso no relatório. Para contratos de obras e serviços de engenharia, ' },
      { text: 'a geração automática da planilha de preços requer os dados de custo da empresa', bold: true },
      { text: ' — o Editus estrutura o modelo e preenche os campos a partir das suas informações, mas não tem acesso aos seus custos internos. Na prática: você fornece os insumos, o Editus formata conforme exigência do edital.' },
    ],
  },
  {
    q: 'Se a proposta gerada tiver erro, quem é responsável?',
    parts: [
      { text: 'A responsabilidade pela proposta submetida é sempre da empresa. O Editus deixa isso explícito no fluxo: ' },
      { text: 'nenhum documento é submetido sem revisão e aprovação humana.', bold: true },
      { text: ' O sistema gera a proposta como rascunho qualificado — com base nos dados do edital e do perfil da empresa —, mas a revisão final, os valores e a assinatura digital são sempre do responsável legal. O relatório de análise serve como registro de auditoria do processo de decisão.' },
    ],
  },
]

// Texto plano de uma resposta — usado no JSON-LD (FAQPage) e em contextos sem markup.
export function faqAnswerText(faq: Faq): string {
  return faq.parts.map(p => p.text).join('')
}

// Objeto FAQPage (schema.org) — fonte única para o JSON-LD emitido pela seção e pela página.
export function faqPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': FAQS.map(f => ({
      '@type': 'Question',
      'name': f.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faqAnswerText(f),
      },
    })),
  }
}

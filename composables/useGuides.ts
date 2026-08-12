// Cluster de conteúdo indexável /guia/* — fonte única de verdade.
//
// Objetivo estratégico: capturar buscas do ecossistema de licitação em ângulos
// AINDA NÃO saturados por concorrentes (PNCP, habilitação, CEIS/CNEP/CEPIM,
// Lei 14.133), com conteúdo citável por agentes de IA. Cada guia vira uma URL
// estável, com Article + BreadcrumbList (+ FAQPage quando há perguntas) JSON-LD.
//
// Renderização: components/GuiaLayout.vue consome estes dados. Manter o conteúdo
// aqui (dados, não markup) permite gerar HTML semântico e schema.org do mesmo
// objeto, sem divergência.

// --- Blocos de conteúdo (renderizados semanticamente pelo GuiaLayout) ---
export type GuideBlock
  = | { type: 'p', text: string }
    | { type: 'h2', text: string, id: string }
    | { type: 'ul', items: string[] }
    | { type: 'ol', items: string[] }
    | { type: 'callout', title: string, text: string }

export type GuideFaq = { q: string, a: string }

export interface Guide {
  slug: string
  // <title> e H1
  title: string
  h1: string
  // meta description (150-160 chars, com termo-alvo)
  description: string
  // frase-âncora curta exibida no topo (label da seção)
  kicker: string
  // termo-alvo principal de busca (usado em og/keywords internos)
  keyword: string
  // data de publicação/atualização (ISO) — usada no Article schema
  updated: string
  // tempo estimado de leitura
  readingTime: string
  blocks: GuideBlock[]
  faqs?: GuideFaq[]
}

const ORIGIN = 'https://editus.com.br'

export const GUIDES: Guide[] = [
  // ---------------------------------------------------------------------------
  {
    slug: 'o-que-e-pncp',
    title: 'O que é o PNCP? Guia do Portal Nacional de Compras Públicas',
    h1: 'O que é o PNCP (Portal Nacional de Compras Públicas)',
    description:
      'O PNCP é o portal oficial onde a União, estados e municípios publicam todas as licitações após a Lei 14.133/2021. Entenda o que é, como funciona e como monitorar.',
    kicker: 'Guia do PNCP',
    keyword: 'o que é PNCP',
    updated: '2026-08-05',
    readingTime: '6 min',
    blocks: [
      { type: 'p', text: 'O PNCP (Portal Nacional de Compras Públicas) é o repositório oficial e centralizado das licitações e contratos da administração pública brasileira. Criado pela Lei 14.133/2021 (a Nova Lei de Licitações), ele reúne num único endereço os editais publicados pela União, estados, Distrito Federal e municípios.' },
      { type: 'p', text: 'Na prática, o PNCP substitui a fragmentação anterior — em que cada órgão publicava em seu próprio portal — por um ponto único de divulgação obrigatória. Para uma empresa que quer participar de licitações, ele é a fonte primária de oportunidades.' },
      { type: 'h2', text: 'Para que serve o PNCP', id: 'para-que-serve' },
      { type: 'p', text: 'O portal cumpre três funções centrais previstas em lei:' },
      { type: 'ul', items: [
        'Divulgação obrigatória: todo edital de licitação regido pela Lei 14.133/2021 deve ser publicado no PNCP para ter validade.',
        'Transparência: qualquer cidadão ou empresa pode consultar editais, atas de registro de preços, contratos e seus aditivos.',
        'Padronização: reúne documentos, prazos e informações num formato uniforme, facilitando a busca e a comparação entre oportunidades.',
      ] },
      { type: 'h2', text: 'O que você encontra no PNCP', id: 'o-que-encontra' },
      { type: 'ul', items: [
        'Editais de licitação (pregão eletrônico, concorrência, dispensa eletrônica e outras modalidades).',
        'Atas de registro de preços vigentes.',
        'Contratos administrativos e seus termos aditivos.',
        'Planos de contratação anual (PCA) dos órgãos — úteis para antecipar futuras licitações.',
      ] },
      { type: 'h2', text: 'Como monitorar o PNCP de forma eficiente', id: 'como-monitorar' },
      { type: 'p', text: 'O desafio não é acessar o PNCP — é acompanhá-lo continuamente. São milhares de editais publicados por semana em todo o país, e uma oportunidade compatível com o seu segmento pode surgir a qualquer momento, com prazo curto para participar.' },
      { type: 'p', text: 'Monitorar manualmente é inviável para a maioria das PMEs: exige checar o portal todos os dias, filtrar por objeto (CATMAT/CATSER), UF e valor, e ainda ler cada edital para avaliar se a empresa se habilita. É exatamente esse trabalho repetitivo que ferramentas de automação eliminam.' },
      { type: 'callout', title: 'Como o Editus se encaixa', text: 'O Editus monitora o PNCP continuamente pelo perfil da sua empresa (CNPJ, segmentos, UFs, porte) e aciona a análise apenas quando um edital compatível é publicado — sem ruído, sem alertas irrelevantes.' },
    ],
    faqs: [
      { q: 'O PNCP é gratuito?', a: 'Sim. O acesso e a consulta ao Portal Nacional de Compras Públicas são gratuitos e abertos a qualquer pessoa ou empresa, sem necessidade de cadastro para pesquisar editais.' },
      { q: 'O PNCP substituiu o Comprasnet?', a: 'Não exatamente. O PNCP é o portal de divulgação e transparência dos editais. O Comprasnet (Compras.gov.br) continua sendo o sistema operacional onde os pregões do governo federal são efetivamente disputados. Muitos editais publicados no PNCP remetem ao Comprasnet ou a outras plataformas para a sessão pública.' },
      { q: 'Todo órgão público é obrigado a publicar no PNCP?', a: 'Sim. Sob a Lei 14.133/2021, a publicação no PNCP é condição de eficácia do edital para os órgãos e entidades da administração pública direta e indireta da União, estados, DF e municípios.' },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    slug: 'habilitacao-licitacao',
    title: 'Habilitação em licitação: checklist de documentos e certidões',
    h1: 'Habilitação em licitação: o checklist de documentos',
    description:
      'Quais documentos e certidões sua empresa precisa para se habilitar em uma licitação sob a Lei 14.133/2021. Checklist prático de habilitação jurídica, fiscal, técnica e econômica.',
    kicker: 'Guia de habilitação',
    keyword: 'documentos para habilitação em licitação',
    updated: '2026-08-05',
    readingTime: '7 min',
    blocks: [
      { type: 'p', text: 'Habilitação é a etapa da licitação em que a empresa comprova que reúne as condições legais, fiscais, técnicas e econômicas para executar o objeto do contrato. Falhar na habilitação é a causa mais comum de desclassificação — muitas vezes por uma certidão vencida, não por falta de capacidade real.' },
      { type: 'p', text: 'A Lei 14.133/2021 organiza a documentação de habilitação em quatro grandes grupos. Abaixo, o checklist de cada um.' },
      { type: 'h2', text: '1. Habilitação jurídica', id: 'juridica' },
      { type: 'ul', items: [
        'Ato constitutivo, estatuto ou contrato social em vigor, devidamente registrado.',
        'Documento de identificação dos sócios ou representantes legais.',
        'Para MEI: Certificado da Condição de Microempreendedor Individual (CCMEI).',
      ] },
      { type: 'h2', text: '2. Regularidade fiscal e trabalhista', id: 'fiscal' },
      { type: 'ul', items: [
        'Comprovante de inscrição no CNPJ.',
        'Certidão Negativa de Débitos relativos a Tributos Federais e à Dívida Ativa da União (CND conjunta).',
        'Certidão de regularidade com o FGTS (CRF), emitida pela Caixa.',
        'Certidão Negativa de Débitos Trabalhistas (CNDT).',
        'Certidões de regularidade fiscal estadual e municipal, conforme o objeto.',
      ] },
      { type: 'h2', text: '3. Qualificação técnica', id: 'tecnica' },
      { type: 'ul', items: [
        'Atestados de capacidade técnica emitidos por clientes anteriores, comprovando execução de objeto compatível.',
        'Registro ou inscrição em conselho de classe (CREA, CAU, etc.), quando exigido.',
        'Comprovação de equipe técnica e/ou aparelhamento, se o edital exigir.',
      ] },
      { type: 'h2', text: '4. Qualificação econômico-financeira', id: 'economica' },
      { type: 'ul', items: [
        'Balanço patrimonial e demonstrações contábeis do último exercício.',
        'Certidão negativa de falência ou recuperação judicial.',
        'Índices contábeis mínimos (liquidez, solvência), quando previstos no edital.',
      ] },
      { type: 'h2', text: 'O erro que mais desclassifica: certidão vencida', id: 'certidao-vencida' },
      { type: 'p', text: 'A maioria das certidões tem validade curta (30 a 180 dias). Uma empresa plenamente capaz pode ser inabilitada porque uma CND venceu dois dias antes da sessão. Controlar a validade de cada documento é tão importante quanto tê-los.' },
      { type: 'callout', title: 'Como o Editus se encaixa', text: 'O agente de habilitação do Editus cruza as exigências do edital com o perfil da sua empresa e sinaliza pendências e certidões a vencer antes da submissão — reduzindo o risco de inabilitação por documentação.' },
    ],
    faqs: [
      { q: 'MEI pode participar de licitação?', a: 'Sim. O Microempreendedor Individual pode participar de licitações e ainda conta com os benefícios legais de ME/EPP (como o direito de preferência em caso de empate). A habilitação jurídica do MEI é comprovada pelo CCMEI.' },
      { q: 'Quais certidões negativas são obrigatórias?', a: 'As mais recorrentes são: CND de tributos federais e dívida ativa da União, CRF do FGTS e CNDT (débitos trabalhistas). A depender do objeto e do ente licitante, somam-se certidões estaduais e municipais.' },
      { q: 'O que acontece se um documento estiver vencido no dia da sessão?', a: 'A empresa costuma ser inabilitada. Por isso o controle de validade das certidões é crítico. Empresas ME/EPP têm alguma flexibilidade para regularização fiscal posterior, mas isso não vale para todos os documentos.' },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    slug: 'consulta-ceis-cnep-cepim',
    title: 'Como consultar CEIS, CNEP e CEPIM: empresa impedida de licitar',
    h1: 'CEIS, CNEP e CEPIM: como saber se uma empresa está impedida de licitar',
    description:
      'CEIS, CNEP e CEPIM são cadastros públicos de empresas sancionadas e impedidas de contratar com o poder público. Veja o que é cada um e como consultar gratuitamente.',
    kicker: 'Guia de sanções',
    keyword: 'como consultar CEIS CNEP CEPIM',
    updated: '2026-08-05',
    readingTime: '5 min',
    blocks: [
      { type: 'p', text: 'Antes de participar de uma licitação — ou de firmar parceria com outra empresa — é essencial verificar se ela está sob alguma sanção que a impeça de contratar com a administração pública. Três cadastros federais concentram essa informação: CEIS, CNEP e CEPIM. Todos são públicos e gratuitos.' },
      { type: 'h2', text: 'CEIS — Cadastro de Empresas Inidôneas e Suspensas', id: 'ceis' },
      { type: 'p', text: 'O CEIS lista pessoas físicas e jurídicas que sofreram sanções restritivas do direito de participar de licitações ou de celebrar contratos com a administração pública. É a consulta mais direta para saber se uma empresa está impedida de licitar.' },
      { type: 'h2', text: 'CNEP — Cadastro Nacional de Empresas Punidas', id: 'cnep' },
      { type: 'p', text: 'O CNEP reúne as sanções aplicadas com base na Lei Anticorrupção (Lei 12.846/2013), como multas e acordos de leniência. Indica empresas punidas por atos lesivos contra a administração pública, nacional ou estrangeira.' },
      { type: 'h2', text: 'CEPIM — Cadastro de Entidades Privadas Sem Fins Lucrativos Impedidas', id: 'cepim' },
      { type: 'p', text: 'O CEPIM lista entidades sem fins lucrativos (associações, fundações, ONGs) impedidas de celebrar convênios, contratos de repasse ou termos de parceria com a administração pública federal.' },
      { type: 'h2', text: 'Como consultar', id: 'como-consultar' },
      { type: 'ol', items: [
        'Acesse o Portal da Transparência do Governo Federal (portaldatransparencia.gov.br).',
        'No menu de Sanções, escolha o cadastro desejado (CEIS, CNEP ou CEPIM).',
        'Pesquise pelo CNPJ/CPF ou pela razão social da empresa.',
        'Verifique a existência, o tipo, o alcance e a vigência de eventuais sanções.',
      ] },
      { type: 'callout', title: 'Como o Editus se encaixa', text: 'O Editus consulta automaticamente CEIS, CNEP e CEPIM (além do SIASG) durante a análise do edital, sinalizando impedimentos que poderiam desclassificar a proposta — sem você precisar checar cada portal manualmente.' },
    ],
    faqs: [
      { q: 'A consulta ao CEIS é gratuita?', a: 'Sim. CEIS, CNEP e CEPIM são consultáveis gratuitamente no Portal da Transparência do Governo Federal, sem necessidade de cadastro.' },
      { q: 'Qual a diferença entre CEIS e CNEP?', a: 'O CEIS registra sanções que restringem o direito de licitar e contratar (inidoneidade, suspensão). O CNEP registra punições da Lei Anticorrupção (multas e acordos de leniência por atos lesivos à administração).' },
      { q: 'Estar no CEIS impede definitivamente de licitar?', a: 'Depende do tipo e da vigência da sanção. Algumas são temporárias e têm prazo determinado; enquanto vigentes, impedem a participação. Por isso é importante verificar não só a existência, mas o alcance e a validade da sanção.' },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    slug: 'lei-14133-resumo',
    title: 'Lei 14.133/2021 (Nova Lei de Licitações): resumo prático',
    h1: 'Lei 14.133/2021: resumo da Nova Lei de Licitações',
    description:
      'Resumo prático da Lei 14.133/2021, a Nova Lei de Licitações e Contratos: principais mudanças, modalidades, critérios de julgamento e o que muda para as empresas.',
    kicker: 'Guia da Lei 14.133',
    keyword: 'resumo Lei 14.133',
    updated: '2026-08-05',
    readingTime: '8 min',
    blocks: [
      { type: 'p', text: 'A Lei 14.133/2021 é o novo marco legal das licitações e contratos administrativos no Brasil. Ela substituiu definitivamente a antiga Lei 8.666/1993, a Lei do Pregão (10.520/2002) e o RDC, unificando as regras num único diploma. Desde 2023, é o regime obrigatório para as contratações públicas.' },
      { type: 'h2', text: 'Principais mudanças', id: 'mudancas' },
      { type: 'ul', items: [
        'Unificação: um único texto legal no lugar de três leis anteriores.',
        'PNCP: criação do Portal Nacional de Compras Públicas como ponto único e obrigatório de divulgação.',
        'Novos critérios de julgamento, incluindo maior desconto e melhor técnica ou conteúdo artístico.',
        'Ênfase no planejamento: estudo técnico preliminar, análise de riscos e plano de contratação anual.',
        'Matriz de riscos obrigatória em contratos de maior complexidade.',
      ] },
      { type: 'h2', text: 'Modalidades de licitação', id: 'modalidades' },
      { type: 'p', text: 'A nova lei prevê cinco modalidades:' },
      { type: 'ul', items: [
        'Pregão: para bens e serviços comuns, julgado por menor preço ou maior desconto.',
        'Concorrência: para objetos de maior vulto ou complexidade, admite critérios técnicos.',
        'Concurso: para escolha de trabalho técnico, científico ou artístico.',
        'Leilão: para alienação de bens.',
        'Diálogo competitivo: novidade da lei, para soluções inovadoras em que a administração dialoga com os licitantes antes de definir a solução.',
      ] },
      { type: 'h2', text: 'Critérios de julgamento', id: 'criterios' },
      { type: 'ul', items: [
        'Menor preço.',
        'Maior desconto.',
        'Melhor técnica ou conteúdo artístico.',
        'Técnica e preço.',
        'Maior lance (no leilão).',
        'Maior retorno econômico.',
      ] },
      { type: 'h2', text: 'O que muda para as empresas', id: 'para-empresas' },
      { type: 'p', text: 'Para as empresas, a Lei 14.133/2021 traz mais previsibilidade (regras unificadas) e transparência (tudo no PNCP), mas também exige atenção a documentos de planejamento e à matriz de riscos. O julgamento por técnica e preço e o diálogo competitivo abrem espaço para quem tem diferencial técnico, além do menor preço.' },
      { type: 'callout', title: 'Como o Editus se encaixa', text: 'O agente de compliance do Editus identifica automaticamente a modalidade e o critério de julgamento de cada edital, aplicando as regras específicas da Lei 14.133/2021 — de habilitação a prazos.' },
    ],
    faqs: [
      { q: 'A Lei 8.666 ainda vale?', a: 'Não para novas contratações. Desde o fim do período de transição, em 2023, a Lei 14.133/2021 é o regime obrigatório. Contratos antigos firmados sob a Lei 8.666 seguem regidos por ela até o encerramento.' },
      { q: 'Quais são as modalidades da nova lei?', a: 'São cinco: pregão, concorrência, concurso, leilão e diálogo competitivo. A tomada de preços e o convite, da lei antiga, foram extintos.' },
      { q: 'O que é o diálogo competitivo?', a: 'É uma modalidade nova, voltada a contratações de soluções inovadoras ou tecnicamente complexas, em que a administração conversa com os licitantes para desenvolver a solução antes de receber as propostas finais.' },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    slug: 'pregao-eletronico-como-funciona',
    title: 'Como funciona o pregão eletrônico: guia completo para empresas',
    h1: 'Como funciona o pregão eletrônico',
    description:
      'O pregão eletrônico é a modalidade mais usada em licitações de bens e serviços comuns. Entenda as fases, os lances, a habilitação e como participar passo a passo.',
    kicker: 'Guia do pregão eletrônico',
    keyword: 'como funciona o pregão eletrônico',
    updated: '2026-08-05',
    readingTime: '7 min',
    blocks: [
      { type: 'p', text: 'O pregão eletrônico é a modalidade de licitação mais utilizada no Brasil para a compra de bens e serviços comuns — aqueles cujo desempenho e qualidade podem ser definidos por especificações usuais de mercado. Toda a disputa acontece pela internet, o que amplia a competição e dá transparência ao processo.' },
      { type: 'p', text: 'Sob a Lei 14.133/2021, o pregão é julgado por menor preço ou maior desconto, e é conduzido em plataformas como o Compras.gov.br (antigo Comprasnet) e portais estaduais e municipais.' },
      { type: 'h2', text: 'As fases do pregão eletrônico', id: 'fases' },
      { type: 'ol', items: [
        'Publicação do edital no PNCP, com o objeto, as exigências e a data da sessão.',
        'Cadastro e envio das propostas iniciais pelas empresas, antes da abertura.',
        'Sessão pública: abertura das propostas e início da etapa de lances.',
        'Etapa de lances: as empresas reduzem seus preços em tempo real até o encerramento.',
        'Julgamento e habilitação: verifica-se a documentação da empresa mais bem classificada.',
        'Adjudicação e homologação: o vencedor é declarado e o resultado é oficializado.',
      ] },
      { type: 'h2', text: 'A etapa de lances', id: 'lances' },
      { type: 'p', text: 'É o momento decisivo. Após a abertura das propostas, as empresas competem enviando lances sucessivos e decrescentes. Os modos de disputa mais comuns são o aberto (lances públicos por tempo determinado, com prorrogações automáticas) e o aberto e fechado (combina lances públicos com um lance final sigiloso dos melhores classificados).' },
      { type: 'h2', text: 'Habilitação: o vencedor precisa comprovar', id: 'habilitacao' },
      { type: 'p', text: 'Vencer o preço não basta. Antes de assinar, a empresa mais bem classificada precisa comprovar habilitação jurídica, regularidade fiscal e trabalhista, qualificação técnica e econômico-financeira. É aqui que muitas propostas caem — por uma certidão vencida ou um documento faltando.' },
      { type: 'callout', title: 'Como o Editus se encaixa', text: 'O Editus analisa o edital do pregão antes da sessão: verifica se sua empresa está habilitada, calcula o custo financeiro do prazo de pagamento e ajuda a definir o preço mínimo viável — para você não dar um lance que corrói a margem.' },
    ],
    faqs: [
      { q: 'Qual a diferença entre pregão eletrônico e presencial?', a: 'No pregão eletrônico toda a disputa ocorre pela internet, em plataforma como o Compras.gov.br. No presencial, hoje raro, os representantes comparecem fisicamente. A Lei 14.133/2021 prioriza a forma eletrônica.' },
      { q: 'Preciso de certificado digital para participar de pregão?', a: 'Para operar na maioria das plataformas e assinar documentos é necessário credenciamento e, em muitos casos, certificado digital. O cadastro no Compras.gov.br é o ponto de partida para pregões federais.' },
      { q: 'O menor preço sempre vence o pregão?', a: 'O menor preço é classificado em primeiro lugar, mas só vence se a empresa comprovar a habilitação e se o preço for exequível. Propostas inexequíveis ou com documentação irregular são desclassificadas.' },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    slug: 'como-participar-de-licitacao',
    title: 'Como participar de uma licitação: passo a passo para empresas',
    h1: 'Como participar de uma licitação (passo a passo)',
    description:
      'Guia prático para a sua primeira licitação: do cadastro no Compras.gov.br à documentação de habilitação e ao envio da proposta. O que a empresa precisa para começar.',
    kicker: 'Guia para começar',
    keyword: 'como participar de licitação',
    updated: '2026-08-05',
    readingTime: '8 min',
    blocks: [
      { type: 'p', text: 'Participar de licitações é uma das formas mais previsíveis de conquistar um cliente com contratos de médio e longo prazo: o poder público. O processo tem regras claras, e uma empresa organizada consegue competir mesmo sem experiência prévia. Este é o passo a passo para começar.' },
      { type: 'h2', text: '1. Regularize a empresa', id: 'regularize' },
      { type: 'p', text: 'Antes de qualquer coisa, a empresa precisa estar em dia: CNPJ ativo, contrato social atualizado, e as certidões de regularidade fiscal e trabalhista válidas (federal, FGTS e CNDT). É a base da habilitação — sem isso, nem adianta disputar.' },
      { type: 'h2', text: '2. Faça o cadastro nas plataformas', id: 'cadastro' },
      { type: 'ul', items: [
        'Compras.gov.br: cadastro no SICAF para licitações federais.',
        'Portais estaduais e municipais: cada ente pode ter sua própria plataforma.',
        'Certificado digital: necessário para assinar propostas e documentos na maioria dos sistemas.',
      ] },
      { type: 'h2', text: '3. Encontre editais compatíveis', id: 'encontre' },
      { type: 'p', text: 'Todos os editais são publicados no PNCP. O desafio é achar os que combinam com o seu segmento, porte e região — e acompanhar as publicações continuamente, porque os prazos são curtos. Monitorar manualmente todos os dias é inviável para a maioria das empresas.' },
      { type: 'h2', text: '4. Analise o edital antes de decidir', id: 'analise' },
      { type: 'p', text: 'Nem toda licitação vale a pena. Antes de investir tempo, avalie: sua empresa se habilita? Há cláusulas de risco ou penalidades desproporcionais? O prazo de pagamento (30, 60, 90 dias) corrói a margem? Essa análise é o que separa um contrato lucrativo de um prejuízo disfarçado.' },
      { type: 'h2', text: '5. Envie a proposta e dispute', id: 'proposta' },
      { type: 'p', text: 'Com a decisão tomada, monte a proposta conforme as exigências do edital, cadastre-a na plataforma dentro do prazo e participe da sessão. No pregão, isso inclui a etapa de lances.' },
      { type: 'callout', title: 'Como o Editus se encaixa', text: 'O Editus cobre as etapas 3, 4 e 5: monitora o PNCP pelo perfil da sua empresa, analisa cada edital compatível (habilitação, risco, custo financeiro) e prepara a proposta para você revisar e enviar.' },
    ],
    faqs: [
      { q: 'Qualquer empresa pode participar de licitação?', a: 'Sim, desde que atenda às condições de habilitação do edital e não esteja impedida (por exemplo, com registro no CEIS). MEI, ME e EPP inclusive têm benefícios legais, como o direito de preferência em empate.' },
      { q: 'Preciso de um consultor para participar?', a: 'Não é obrigatório. Em licitações mais simples, uma empresa organizada consegue participar sozinha. Em contratos complexos, uma consultoria ou ferramentas de análise ajudam a reduzir erros de habilitação e precificação.' },
      { q: 'Quanto custa participar de uma licitação?', a: 'Participar em si é gratuito. Os custos são indiretos: certificado digital, tempo de análise do edital, elaboração da proposta e, eventualmente, garantias exigidas pelo edital.' },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    slug: 'mei-pode-participar-de-licitacao',
    title: 'MEI pode participar de licitação? O que o microempreendedor precisa saber',
    h1: 'MEI pode participar de licitação?',
    description:
      'Sim, o MEI pode participar de licitações e ainda tem benefícios legais como ME/EPP. Veja os documentos, os limites de faturamento e como o microempreendedor concorre.',
    kicker: 'Guia para MEI',
    keyword: 'MEI pode participar de licitação',
    updated: '2026-08-05',
    readingTime: '5 min',
    blocks: [
      { type: 'p', text: 'Sim: o Microempreendedor Individual (MEI) pode participar de licitações públicas. Mais do que isso, o MEI é equiparado a microempresa (ME) e goza dos benefícios legais concedidos a ME e EPP na Lei Complementar 123/2006 — o que, em muitos casos, é uma vantagem competitiva real.' },
      { type: 'h2', text: 'Documentos que o MEI precisa', id: 'documentos' },
      { type: 'ul', items: [
        'Certificado da Condição de Microempreendedor Individual (CCMEI), que comprova a habilitação jurídica.',
        'Comprovante de inscrição no CNPJ.',
        'Certidões de regularidade fiscal e trabalhista (federal, FGTS e CNDT).',
        'Certificado digital, para operar nas plataformas e assinar a proposta.',
      ] },
      { type: 'h2', text: 'Os benefícios do MEI em licitações', id: 'beneficios' },
      { type: 'ul', items: [
        'Direito de preferência em caso de empate (o chamado empate ficto): se a proposta de um MEI/ME/EPP for até 5% superior à do vencedor, ele pode cobrir o preço.',
        'Regularização fiscal facilitada: prazo para sanar pendências fiscais após ser declarado vencedor.',
        'Licitações e cotas exclusivas para ME/EPP em contratações de menor valor.',
      ] },
      { type: 'h2', text: 'O limite que o MEI precisa observar', id: 'limite' },
      { type: 'p', text: 'A principal atenção é o faturamento: o MEI tem um teto anual de receita. Ao disputar contratos públicos, o microempreendedor precisa garantir que a soma dos contratos não ultrapasse esse limite — caso contrário, será obrigado a migrar para ME, com outra carga tributária. Vale planejar o porte antes de assumir contratos maiores.' },
      { type: 'callout', title: 'Como o Editus se encaixa', text: 'O Editus considera o porte da empresa (MEI, ME, EPP) na análise: identifica cotas e benefícios aplicáveis, verifica a habilitação e sinaliza quando o valor do contrato exige atenção ao limite de faturamento.' },
    ],
    faqs: [
      { q: 'MEI tem vantagem em licitação?', a: 'Sim. Como é equiparado a ME, o MEI tem direito de preferência em empate (empate ficto), regularização fiscal facilitada e acesso a cotas e licitações exclusivas para ME/EPP em contratações de menor valor.' },
      { q: 'Qual o limite de faturamento do MEI em licitações?', a: 'O MEI deve respeitar o teto anual de receita da categoria. Contratos públicos contam para esse limite; ao ultrapassá-lo, o microempreendedor precisa migrar para ME, com regime tributário diferente.' },
      { q: 'MEI precisa de certificado digital para licitar?', a: 'Na prática, sim. A maioria das plataformas de licitação exige credenciamento e certificado digital para envio de propostas e assinatura de documentos.' },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    slug: 'o-que-e-sicaf',
    title: 'O que é o SICAF e como se cadastrar para licitar',
    h1: 'O que é o SICAF e como fazer o cadastro',
    description:
      'O SICAF é o cadastro que habilita empresas a participar de licitações federais. Entenda o que é, os níveis de cadastramento e o passo a passo para se registrar.',
    kicker: 'Guia do SICAF',
    keyword: 'o que é SICAF e como se cadastrar',
    updated: '2026-08-05',
    readingTime: '6 min',
    blocks: [
      { type: 'p', text: 'O SICAF (Sistema de Cadastramento Unificado de Fornecedores) é o registro oficial das empresas aptas a contratar com a administração pública federal. Estar cadastrado no SICAF simplifica a habilitação: em vez de apresentar dezenas de documentos a cada licitação, boa parte da regularidade da empresa já fica comprovada no sistema.' },
      { type: 'p', text: 'O cadastro é gratuito e feito pelo portal Compras.gov.br. É, na prática, o passo de entrada para quem quer disputar licitações federais.' },
      { type: 'h2', text: 'Para que serve o SICAF', id: 'para-que-serve' },
      { type: 'ul', items: [
        'Comprova a regularidade fiscal, trabalhista e a habilitação jurídica da empresa de forma centralizada.',
        'Agiliza a fase de habilitação — o pregoeiro consulta o SICAF em vez de conferir documento por documento.',
        'Mantém o histórico e a situação cadastral da empresa atualizados perante o governo federal.',
      ] },
      { type: 'h2', text: 'Os níveis de cadastramento', id: 'niveis' },
      { type: 'p', text: 'O SICAF é organizado em níveis, do credenciamento básico à qualificação técnica e econômico-financeira. Quanto mais completo o cadastro, menos documentos avulsos a empresa precisa apresentar em cada certame. Alguns editais exigem níveis específicos.' },
      { type: 'h2', text: 'Passo a passo para se cadastrar', id: 'passo-a-passo' },
      { type: 'ol', items: [
        'Obtenha um certificado digital (e-CNPJ) para acessar o sistema.',
        'Acesse o Compras.gov.br e inicie o credenciamento como fornecedor.',
        'Preencha os dados da empresa e dos sócios/representantes.',
        'Anexe e valide as certidões de regularidade fiscal e trabalhista.',
        'Conclua os níveis adicionais (técnico e econômico) conforme o seu ramo.',
      ] },
      { type: 'callout', title: 'Como o Editus se encaixa', text: 'Depois de cadastrada, sua empresa precisa manter as certidões válidas — e é aqui que muitos perdem prazo. O Editus verifica a habilitação a cada edital e sinaliza certidões a vencer antes da sessão.' },
    ],
    faqs: [
      { q: 'O cadastro no SICAF é gratuito?', a: 'Sim. O credenciamento no SICAF é gratuito e feito pelo portal Compras.gov.br. O custo indireto é o certificado digital (e-CNPJ), necessário para acessar o sistema.' },
      { q: 'Preciso estar no SICAF para participar de qualquer licitação?', a: 'Para licitações federais no Compras.gov.br, o SICAF é o cadastro padrão. Estados e municípios podem ter seus próprios sistemas de cadastramento de fornecedores.' },
      { q: 'O SICAF substitui a apresentação de documentos?', a: 'Parcialmente. Ele comprova boa parte da regularidade da empresa, mas alguns editais ainda exigem documentos complementares específicos do objeto.' },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    slug: 'certidao-vencida-licitacao',
    title: 'Certidão vencida na licitação: o que fazer para não ser desclassificado',
    h1: 'Certidão vencida na licitação: o que fazer',
    description:
      'Uma certidão vencida é a causa mais comum de desclassificação em licitações. Entenda o que acontece, o que a lei permite (especialmente para ME/EPP) e como se prevenir.',
    kicker: 'Guia de certidões',
    keyword: 'certidão vencida na licitação',
    updated: '2026-08-05',
    readingTime: '5 min',
    blocks: [
      { type: 'p', text: 'Perder uma licitação por causa de uma certidão vencida é uma das frustrações mais comuns — e mais evitáveis — do processo. A empresa tem capacidade, oferece o melhor preço, mas é inabilitada por um documento que expirou dias antes da sessão. Entender as regras ajuda a não cair nessa.' },
      { type: 'h2', text: 'O que acontece se a certidão estiver vencida', id: 'o-que-acontece' },
      { type: 'p', text: 'Na regra geral, a empresa cuja documentação de regularidade fiscal ou trabalhista esteja vencida no momento da habilitação é inabilitada. As certidões precisam estar válidas na data exigida pelo edital — normalmente a da sessão ou a do envio da proposta.' },
      { type: 'h2', text: 'A exceção para ME e EPP', id: 'me-epp' },
      { type: 'p', text: 'A Lei Complementar 123/2006 dá um tratamento favorecido a microempresas e empresas de pequeno porte: mesmo com alguma restrição na regularidade fiscal, a ME/EPP pode ser declarada vencedora e tem um prazo (prorrogável) para regularizar a situação antes da assinatura do contrato. Atenção: esse benefício vale para a regularidade fiscal e trabalhista — não para todos os documentos.' },
      { type: 'h2', text: 'Como se prevenir', id: 'prevencao' },
      { type: 'ul', items: [
        'Mantenha um calendário de validade de cada certidão (CND federal, FGTS, CNDT, estaduais e municipais).',
        'Emita as certidões novamente sempre que faltar pouco para o vencimento antes de uma sessão.',
        'Confira as datas exigidas pelo edital — algumas pedem validade na data da proposta, outras na sessão.',
      ] },
      { type: 'callout', title: 'Como o Editus se encaixa', text: 'O agente de habilitação do Editus cruza as exigências do edital com o perfil da empresa e sinaliza certidões vencidas ou a vencer antes da sessão — reduzindo o risco de desclassificação por documentação.' },
    ],
    faqs: [
      { q: 'ME e EPP podem regularizar certidão depois de vencer a licitação?', a: 'Sim, quanto à regularidade fiscal e trabalhista. A Lei Complementar 123/2006 concede às ME/EPP um prazo para sanar pendências após serem declaradas vencedoras, antes da assinatura do contrato.' },
      { q: 'Certidão positiva com efeito de negativa serve?', a: 'Sim. A certidão positiva com efeitos de negativa (quando há débito com exigibilidade suspensa ou parcelado) é geralmente aceita como prova de regularidade, equivalendo à negativa.' },
      { q: 'Posso apresentar a certidão em outra data se ela venceu?', a: 'Fora da hipótese de ME/EPP, não. A regra geral exige a certidão válida na data definida pelo edital; documento vencido leva à inabilitação.' },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    slug: 'impugnacao-de-edital',
    title: 'Impugnação de edital de licitação: como e quando fazer',
    h1: 'Impugnação de edital: como e quando fazer',
    description:
      'A impugnação questiona cláusulas ilegais ou restritivas de um edital antes da sessão. Veja quem pode impugnar, os prazos e a diferença para o pedido de esclarecimento.',
    kicker: 'Guia de impugnação',
    keyword: 'como impugnar edital de licitação',
    updated: '2026-08-05',
    readingTime: '6 min',
    blocks: [
      { type: 'p', text: 'Nem todo edital é perfeito. Às vezes ele traz uma exigência restritiva, uma cláusula ilegal ou um erro que prejudica a competição. Nesses casos, a lei permite que se apresente uma impugnação — um questionamento formal ao órgão, antes da sessão, para corrigir ou anular o que estiver errado.' },
      { type: 'h2', text: 'Quem pode impugnar', id: 'quem-pode' },
      { type: 'p', text: 'Sob a Lei 14.133/2021, qualquer pessoa — cidadão ou empresa interessada — pode impugnar os termos do edital por irregularidade. Não é preciso já estar inscrito na licitação para impugnar.' },
      { type: 'h2', text: 'Impugnação x pedido de esclarecimento', id: 'diferenca' },
      { type: 'ul', items: [
        'Impugnação: aponta uma ilegalidade ou restrição indevida e pede correção ou anulação de cláusula.',
        'Pedido de esclarecimento: apenas tira dúvidas sobre pontos do edital, sem questionar sua legalidade.',
      ] },
      { type: 'h2', text: 'Prazos', id: 'prazos' },
      { type: 'p', text: 'A Lei 14.133/2021 fixa prazo para impugnação e para o pedido de esclarecimento até determinado número de dias úteis antes da data da sessão, e o órgão deve responder também dentro de prazo legal. Como os prazos são curtos, analisar o edital cedo é decisivo — quem só lê o edital na véspera perde a janela de impugnar.' },
      { type: 'h2', text: 'Como apresentar', id: 'como-apresentar' },
      { type: 'ol', items: [
        'Identifique a cláusula problemática e a base legal do questionamento.',
        'Redija a impugnação de forma objetiva, indicando o pedido (correção ou anulação).',
        'Protocole pelo canal indicado no edital (geralmente a plataforma ou e-mail do órgão), dentro do prazo.',
        'Acompanhe a resposta: o edital pode ser alterado, com eventual reabertura de prazo.',
      ] },
      { type: 'callout', title: 'Como o Editus se encaixa', text: 'O agente de risco do Editus identifica cláusulas restritivas, penalidades desproporcionais e exigências possivelmente ilegais logo na análise do edital — dando tempo para você decidir se vale impugnar antes do prazo acabar.' },
    ],
    faqs: [
      { q: 'Qualquer pessoa pode impugnar um edital?', a: 'Sim. Sob a Lei 14.133/2021, qualquer pessoa pode impugnar os termos do edital por irregularidade, não sendo necessário já estar inscrito na licitação.' },
      { q: 'Impugnar o edital atrapalha minha participação?', a: 'Não. Impugnar é um direito e não impede a empresa de participar. Se a impugnação for aceita, o edital é corrigido — o que pode inclusive beneficiar quem apontou o problema.' },
      { q: 'Qual a diferença entre impugnação e recurso?', a: 'A impugnação questiona o edital antes da sessão. O recurso questiona decisões tomadas durante ou após o certame (habilitação, julgamento, resultado).' },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    slug: 'carta-de-credenciamento-licitacao',
    title: 'Carta de credenciamento e procuração em licitação: para que servem',
    h1: 'Carta de credenciamento e procuração em licitação',
    description:
      'A carta de credenciamento autoriza um representante a agir pela empresa na licitação. Entenda quando é exigida, o que deve conter e a diferença para a procuração.',
    kicker: 'Guia de credenciamento',
    keyword: 'carta de credenciamento licitação',
    updated: '2026-08-05',
    readingTime: '5 min',
    blocks: [
      { type: 'p', text: 'Em uma licitação, quem fala e assina pela empresa precisa ter poderes para isso. A carta de credenciamento (ou a procuração) é o documento que comprova que aquele representante está autorizado a agir em nome da empresa — dar lances, assinar atas, apresentar recursos e praticar os atos do certame.' },
      { type: 'h2', text: 'Quando é exigida', id: 'quando' },
      { type: 'p', text: 'É exigida sempre que quem representa a empresa no certame não é o próprio titular ou sócio administrador com poderes no contrato social. No pregão eletrônico, os poderes muitas vezes se comprovam pelo credenciamento na plataforma; em atos presenciais ou específicos, o documento formal pode ser pedido.' },
      { type: 'h2', text: 'O que a carta de credenciamento deve conter', id: 'conteudo' },
      { type: 'ul', items: [
        'Identificação completa da empresa (razão social, CNPJ) e do representante (nome, CPF, documento).',
        'Os poderes concedidos: formular lances, negociar preço, assinar atas, interpor e desistir de recursos.',
        'A licitação a que se refere (número do edital/órgão), quando específica.',
        'Data e assinatura do responsável legal da empresa.',
      ] },
      { type: 'h2', text: 'Carta de credenciamento x procuração', id: 'diferenca' },
      { type: 'p', text: 'Na prática ambas cumprem a função de outorgar poderes. A carta de credenciamento costuma ser um documento mais simples, específico para aquele certame. A procuração (por instrumento particular ou público) é mais formal e pode ter escopo mais amplo. O edital indica qual forma aceita — vale sempre conferir a exigência exata.' },
      { type: 'callout', title: 'Como o Editus se encaixa', text: 'Na análise do edital, o Editus identifica as exigências de representação e credenciamento — para que a empresa chegue à sessão com a documentação de poderes correta e não perca a disputa por uma formalidade.' },
    ],
    faqs: [
      { q: 'Preciso de firma reconhecida na carta de credenciamento?', a: 'Depende do edital. Muitos aceitam a carta com assinatura simples do responsável legal; outros exigem firma reconhecida ou procuração pública. Confira sempre a exigência específica do edital.' },
      { q: 'No pregão eletrônico preciso de carta de credenciamento?', a: 'Em geral os poderes se comprovam pelo próprio credenciamento na plataforma. Ainda assim, alguns editais pedem o documento para atos específicos — leia as regras do certame.' },
      { q: 'Qual a diferença entre carta de credenciamento e procuração?', a: 'Ambas outorgam poderes ao representante. A carta costuma ser mais simples e específica para o certame; a procuração é mais formal e pode ter escopo mais amplo. O edital define qual é aceita.' },
    ],
  },
]

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find(g => g.slug === slug)
}

export function guideUrl(slug: string): string {
  return `${ORIGIN}/guia/${slug}`
}

// --- JSON-LD helpers (schema.org) ---

export function guideArticleJsonLd(guide: Guide) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': guide.h1,
    'description': guide.description,
    'inLanguage': 'pt-BR',
    'datePublished': guide.updated,
    'dateModified': guide.updated,
    'url': guideUrl(guide.slug),
    'mainEntityOfPage': { '@type': 'WebPage', '@id': guideUrl(guide.slug) },
    'author': { '@type': 'Organization', 'name': 'Editus', 'url': ORIGIN },
    'publisher': {
      '@type': 'Organization',
      'name': 'Editus',
      'url': ORIGIN,
      'logo': { '@type': 'ImageObject', 'url': `${ORIGIN}/logo-symbol-gradient.svg` },
    },
  }
}

export function guideBreadcrumbJsonLd(guide: Guide) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Início', 'item': ORIGIN },
      { '@type': 'ListItem', 'position': 2, 'name': 'Guias', 'item': `${ORIGIN}/guia` },
      { '@type': 'ListItem', 'position': 3, 'name': guide.h1, 'item': guideUrl(guide.slug) },
    ],
  }
}

export function guideFaqJsonLd(guide: Guide) {
  if (!guide.faqs?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': guide.faqs.map(f => ({
      '@type': 'Question',
      'name': f.q,
      'acceptedAnswer': { '@type': 'Answer', 'text': f.a },
    })),
  }
}

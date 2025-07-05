// Estado da aplicação
let currentTheme = localStorage.getItem('theme') || 'light';
let currentSection = 'home';
let userProgress = JSON.parse(localStorage.getItem('userProgress')) || {
    flashcardsStudied: [],
    quizScores: [],
    totalQuestions: 0,
    correctAnswers: 0
};

// Dados dos flashcards
const flashcardsData = [
    // Conhecimentos Gerais (Administração Pública)
    {
        id: 1,
        title: 'Princípio da Legalidade',
        question: 'O que estabelece o princípio da legalidade na administração pública?',
        answer: 'O princípio da legalidade estabelece que a administração pública só pode fazer o que a lei permite, diferentemente dos particulares que podem fazer tudo que a lei não proíbe.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 2,
        title: 'Estado Democrático de Direito',
        question: 'Quais são as características de um Estado Democrático de Direito?',
        answer: 'O Estado Democrático de Direito caracteriza-se pela separação dos poderes, garantia dos direitos fundamentais, controle judicial dos atos públicos e participação popular.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 3,
        title: 'Princípio da Impessoalidade',
        question: 'Como o princípio da impessoalidade se aplica nas licitações?',
        answer: 'O princípio da impessoalidade exige tratamento igualitário a todos os participantes de licitações, sem favorecimentos ou discriminações.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 4,
        title: 'Lei de Acesso à Informação',
        question: 'Quais são os prazos máximos de sigilo de informações na LAI (Lei de Acesso à Informação)?',
        answer: 'A LAI estabelece que o prazo máximo de sigilo é de 25 anos para informações ultrassecretas, 15 anos para secretas e 5 anos para reservadas.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 5,
        title: 'Controle Externo',
        question: 'Como é exercido o controle externo da administração pública federal?',
        answer: 'O controle externo é exercido pelo Congresso Nacional com auxílio do Tribunal de Contas da União (art. 70 da CF).',
        category: 'conhecimentos-gerais'
    },
    {
        id: 6,
        title: 'Improbidade Administrativa',
        question: 'Quais são as formas de ato de improbidade administrativa?',
        answer: '1) Enriquecimento ilícito; 2) Prejuízo ao erário; 3) Atentado aos princípios da administração pública.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 7,
        title: 'Poderes Administrativos',
        question: 'Quais são os principais poderes da administração pública?',
        answer: 'Vinculado, discricionário, hierárquico, disciplinar, regulamentar e de polícia.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 8,
        title: 'Serviços Públicos',
        question: 'Qual a diferença entre serviço público próprio e impróprio?',
        answer: 'Próprio: essencial (ex: saúde, segurança). Impróprio: de interesse coletivo (ex: telecomunicações).',
        category: 'conhecimentos-gerais'
    },
    {
        id: 9,
        title: 'Licitações',
        question: 'Quando é obrigatória a modalidade concorrência?',
        answer: 'Para contratos de maior valor, conforme limites estabelecidos na Lei 8.666/1993.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 10,
        title: 'Bens Públicos',
        question: 'Quais são as categorias de bens públicos?',
        answer: '1) Uso comum do povo; 2) Uso especial; 3) Dominicais.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 11,
        title: 'Princípio da Moralidade',
        question: 'Como o princípio da moralidade se relaciona com a ética na administração pública?',
        answer: 'Exige que o administrador aja não apenas dentro da lei, mas com ética, honestidade e probidade, atendendo ao interesse público.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 12,
        title: 'Lei de Responsabilidade Fiscal',
        question: 'Quais são os principais objetivos da LRF (Lei de Responsabilidade Fiscal?',
        answer: 'Controlar gastos públicos, planejar orçamentos, evitar endividamento excessivo e garantir transparência na gestão fiscal.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 13,
        title: 'Controle Interno',
        question: 'Qual o papel do controle interno na administração pública?',
        answer: 'Avaliar o cumprimento das metas, a gestão de recursos e a conformidade com as normas, além de apoiar o controle externo.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 14,
        title: 'Processo Administrativo',
        question: 'Quais são os princípios do processo administrativo?',
        answer: 'Legalidade, finalidade, motivação, contraditório, ampla defesa, razoabilidade e proporcionalidade.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 15,
        title: 'Poder de Polícia',
        question: 'Quais são as características do poder de polícia administrativa?',
        answer: 'Discricionariedade, autoexecutoriedade e coercibilidade, sempre limitado pelos direitos fundamentais.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 16,
        title: 'Servidores Públicos',
        question: 'Quais são os direitos básicos dos servidores estatutários?',
        answer: 'Vencimentos, vantagens, licenças, férias, aposentadoria, estável após 3 anos de efetivo exercício.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 17,
        title: 'Convênios Administrativos',
        question: 'O que caracteriza um convênio na administração pública?',
        answer: 'Acordo entre entes públicos ou com entidades privadas sem fins lucrativos para execução de políticas públicas.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 18,
        title: 'Desapropriação',
        question: 'Quais são os requisitos para desapropriação por utilidade pública?',
        answer: 'Necessidade pública, interesse social ou interesse nacional, com prévia e justa indenização em dinheiro.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 19,
        title: 'Contratos Administrativos',
        question: 'Quais as cláusulas necessárias em contratos administrativos?',
        answer: 'Prazo, objeto, preço, condições de execução, direitos/responsabilidades, penalidades e causas de rescisão.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 20,
        title: 'Lei Anticorrupção',
        question: 'Quais atos são considerados lesivos pela Lei 12.846/2013 (Lei Anticorrupção)?',
        answer: 'Prometer/doar vantagem indevida, fraudar licitações, obstar fiscalização, manipular contratos e dificultar investigações.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 21,
        title: 'Improbidade - Sanções',
        question: 'Quais as sanções por ato de improbidade administrativa?',
        answer: 'Perda de bens, ressarcimento, multa, suspensão de direitos políticos, perda de função pública e proibição de contratar com o poder público.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 22,
        title: 'Controle Social',
        question: 'Como os cidadãos podem exercer controle sobre a administração pública?',
        answer: 'Através de ouvidorias, acesso à informação, conselhos gestores, audiências públicas e ferramentas de participação digital.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 23,
        title: 'Serviços Essenciais',
        question: 'O que caracteriza um serviço público essencial?',
        answer: 'Indispensável à sociedade, prestado diretamente pelo Estado ou delegado, com continuidade e modicidade tarifária.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 24,
        title: 'Regime Jurídico Único',
        question: 'Quais as características do regime jurídico único dos servidores?',
        answer: 'Ingresso por concurso, direitos/deveres uniformes, estabilidade após 3 anos e regime previdenciário próprio.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 25,
        title: 'Agentes Públicos',
        question: 'Quais as espécies de agentes públicos?',
        answer: 'Agentes políticos (eleitos/nomeados), servidores públicos (efetivos/comissionados) e particulares em colaboração.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 26,
        title: 'Prescrição Administrativa',
        question: 'Qual o prazo prescricional para infrações disciplinares graves?',
        answer: '5 anos para infrações graves e 2 anos para as leves/médias, conforme Lei 8.112/1990.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 27,
        title: 'Processo Disciplinar',
        question: 'Quais são as fases do processo administrativo disciplinar?',
        answer: 'Instauração, instrução, defesa, relatório, julgamento e recurso, com observância do contraditório e ampla defesa.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 28,
        title: 'Responsabilidade Civil',
        question: 'Quando o Estado responde civilmente por danos causados a terceiros?',
        answer: 'Responderá objetivamente por danos causados por agentes públicos nessa qualidade, ou por omissão na prestação de serviços.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 29,
        title: 'Intervenção do Estado',
        question: 'Em que situações o Estado pode intervir na propriedade privada?',
        answer: 'Desapropriação (com indenização), requisição (emergência), servidão administrativa, tombamento e limitações administrativas.',
        category: 'conhecimentos-gerais'
    },
    {
        id: 30,
        title: 'Parcerias Público-Privadas',
        question: 'Quais as características das PPPs (Parceiras Público-Privadas)?',
        answer: 'Contratos de longo prazo, com contraprestação vinculada a resultados, risco compartilhado e objeto de relevante interesse público.',
        category: 'conhecimentos-gerais'
    },

    // Conhecimentos Específicos (Tecnologia)
    {
        id: 101,
        title: 'Governança Digital',
        question: 'Quais são os princípios do governo digital?',
        answer: 'Orientação por dados, segurança e privacidade, interoperabilidade, prevalência do digital sobre o analógico.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 102,
        title: 'LGPD',
        question: 'Quais são as bases legais para tratamento de dados na LGPD? (Lei Geral de Proteção de Dados Pessoais)',
        answer: 'Consentimento, execução de contrato, obrigação legal, políticas públicas, estudos por órgãos de pesquisa, proteção da vida, tutela da saúde, interesse legítimo do controlador.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 103,
        title: 'Metodologias Ágeis',
        question: 'Quais as principais diferenças entre Scrum e Kanban?',
        answer: 'É um framework com papéis definidos, ciclos iterativos (sprints) e cerimônias fixas, visando a entrega incremental de valor. Kanban, por outro lado, é um sistema visual que gerencia o fluxo de trabalho, permitindo flexibilidade e entregas contínuas, sem ciclos definidos ou papéis obrigatórios.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 104,
        title: 'Segurança da Informação',
        question: 'O que é a tríade CIA na segurança da informação?',
        answer: 'Confidencialidade, Integridade e Disponibilidade - princípios básicos da segurança da informação.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 105,
        title: 'Computação em Nuvem',
        question: 'Quais são os modelos de serviço em cloud computing? (Computação em Nuvem)',
        answer: 'IaaS (Infraestrutura), PaaS (Plataforma), SaaS (Software) - camadas de abstração tecnológica.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 106,
        title: 'Blockchain',
        question: 'Como o blockchain pode ser aplicado no setor público?',
        answer: 'Registro imutável de documentos, rastreabilidade de processos, identidade digital, votação eletrônica segura.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 107,
        title: 'Inteligência Artificial',
        question: 'O que é viés algorítmico em sistemas de IA?',
        answer: 'Tendência discriminatória nos resultados, geralmente refletindo preconceitos presentes nos dados de treinamento.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 108,
        title: 'Sistemas Governamentais',
        question: 'Qual a função do SISP(Sistema de Inteligência de Segurança Pública.) no governo federal?',
        answer: 'O Sistema de Administração dos Recursos de TI estabelece normas para gestão de tecnologia no governo federal.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 109,
        title: 'Interoperabilidade',
        question: 'O que é o e-PING?',
        answer: 'Padrão de Interoperabilidade de Governo Eletrônico - conjunto de normas técnicas para integração de sistemas governamentais.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 110,
        title: 'Dados Abertos',
        question: 'Quais são os princípios dos dados governamentais abertos?',
        answer: 'Primários, granulares, em tempo hábil, acessíveis, não discriminatórios, não proprietários e livres de licenças.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 111,
        title: 'Transformação Digital',
        question: 'Quais os pilares da transformação digital no setor público?',
        answer: '1) Digitalização de processos; 2) Cultura orientada por dados; 3) Serviços centrados no cidadão; 4) Infraestrutura moderna.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 112,
        title: 'Governança de TI',
        question: 'Para que serve o framework COBIT?',
        answer: 'Alinhar TI aos objetivos de negócio, garantir governança eficaz e gerenciar riscos e recursos de TI.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 113,
        title: 'Cibersegurança',
        question: 'Quais são os principais tipos de ameaças cibernéticas?',
        answer: 'Phishing, ransomware, DDoS, malware, APTs (Ameaças Persistentes Avançadas), engenharia social.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 114,
        title: 'Software Livre',
        question: 'Quais as vantagens do software livre no governo?',
        answer: 'Independência de fornecedores, redução de custos, maior controle sobre o código, customização, segurança auditável.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 115,
        title: 'Arquitetura de Sistemas',
        question: 'O que é arquitetura SOA?',
        answer: 'Arquitetura Orientada a Serviços - modelo que organiza sistemas como serviços reutilizáveis e interoperáveis.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 116,
        title: 'Banco de Dados',
        question: 'Qual a diferença entre SQL e NoSQL?',
        answer: 'SQL (Structured Query Language) usa um modelo relacional, com dados organizados em tabelas com linhas e colunas, enquanto NoSQL oferece modelos mais flexíveis e não relacionais, como documentos, chave-valor ou grafos.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 117,
        title: 'DevOps',
        question: 'Quais são os benefícios da cultura DevOps?',
        answer: 'Entrega contínua, integração frequente, automação de processos, colaboração entre equipes, feedback rápido.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 118,
        title: 'Testes de Software',
        question: 'Quais são os níveis de teste de software?',
        answer: 'Unitário, integração, sistema, aceitação - piramidal, com mais testes unitários que de aceitação.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 119,
        title: 'Acessibilidade Digital',
        question: 'O que são as diretrizes WCAG?',
        answer: 'Web Content Accessibility Guidelines - padrões para tornar conteúdo web acessível a pessoas com deficiência.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 120,
        title: 'Contratação de TI',
        question: 'O que é pregão eletrônico?',
        answer: 'Modalidade de licitação realizada em sessão pública por meio eletrônico, prevista na Lei 10.520/2002.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 121,
        title: 'Gestão de Projetos',
        question: 'Quais são as áreas de conhecimento do PMBOK?',
        answer: 'Escopo, tempo, custo, qualidade, recursos, comunicações, riscos, aquisições, partes interessadas, integração.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 122,
        title: 'Redes de Computadores',
        question: 'O que é a arquitetura TCP/IP?',
        answer: 'Conjunto de protocolos para comunicação em redes, organizado em camadas: aplicação, transporte, internet e rede.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 123,
        title: 'Sistemas Operacionais',
        question: 'Qual a diferença entre kernel monolítico e micronúcleo?',
        answer: 'Monolítico: todas funções no núcleo. Micronúcleo: apenas funções essenciais, outros serviços em user space.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 124,
        title: 'Virtualização',
        question: 'Quais são os tipos de virtualização?',
        answer: 'Plataforma (máquinas virtuais), aplicação, desktop, armazenamento, rede - isolamento de recursos computacionais.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 125,
        title: 'Big Data',
        question: 'Quais são os 5 Vs do Big Data?',
        answer: 'Volume, Velocidade, Variedade, Veracidade e Valor - características dos dados em grande escala.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 126,
        title: 'IoT',
        question: 'Como a Internet das Coisas pode beneficiar cidades inteligentes?',
        answer: 'Monitoramento em tempo real (trânsito, poluição), eficiência energética, gestão de resíduos, segurança pública.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 127,
        title: 'Machine Learning',
        question: 'Qual a diferença entre aprendizado supervisionado e não supervisionado?',
        answer: 'Supervisionado: usa dados rotulados. Não supervisionado: descobre padrões em dados não rotulados.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 128,
        title: 'UX/UI',
        question: 'Quais são os princípios do design centrado no usuário?',
        answer: 'Usabilidade, acessibilidade, hierarquia visual, consistência, feedback, prevenção de erros, eficiência.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 129,
        title: 'Certificação Digital',
        question: 'O que é a ICP-Brasil?',
        answer: 'Infraestrutura de Chaves Públicas Brasileira - sistema nacional de certificação digital com validade jurídica.',
        category: 'conhecimentos-especificos'
    },
    {
        id: 130,
        title: 'Continuidade de Negócios',
        question: 'O que deve conter um plano de recuperação de desastres?',
        answer: 'Análise de impacto, estratégias de recuperação, procedimentos de ativação, equipes responsáveis, testes periódicos.',
        category: 'conhecimentos-especificos'
    }
];

//Dados dos Quiz (Geral e Específico)
const quizData = [
    // Conhecimentos Gerais (1-50)
    {
        id: 1,
        question: 'Qual princípio da administração pública determina que o administrador deve agir sempre conforme a lei?',
        options: [
            'Impessoalidade',
            'Legalidade',
            'Moralidade',
            'Publicidade'
        ],
        correct: 1,
        explanation: 'O princípio da legalidade estabelece que a administração pública só pode fazer o que a lei permite, diferentemente dos particulares que podem fazer tudo que a lei não proíbe.'
    },
    {
        id: 2,
        question: 'O que caracteriza um Estado Democrático de Direito?',
        options: [
            'Concentração de poder em uma única pessoa',
            'Ausência de controle judicial',
            'Separação dos poderes e garantia de direitos fundamentais',
            'Governo sem participação popular'
        ],
        correct: 2,
        explanation: 'O Estado Democrático de Direito caracteriza-se pela separação dos poderes, garantia dos direitos fundamentais, controle judicial dos atos públicos e participação popular.'
    },
    {
        id: 3,
        question: 'Assinale a alternativa que melhor define o princípio da eficiência na administração pública:',
        options: [
            'Realizar gastos públicos com o menor valor absoluto possível',
            'Obter os melhores resultados com os recursos disponíveis',
            'Cumprir todas as formalidades legais independentemente do custo',
            'Priorizar a rapidez em detrimento da qualidade nos serviços'
        ],
        correct: 1,
        explanation: 'O princípio da eficiência exige que a administração pública atinja seus objetivos com economicidade, rapidez e qualidade, obtendo os melhores resultados possíveis com os recursos disponíveis.'
    },
    {
        id: 4,
        question: 'A Lei de Responsabilidade Fiscal (LC 101/2000) estabelece normas para:',
        options: [
            'Controle interno dos municípios',
            'Planejamento e controle dos orçamentos públicos',
            'Processo administrativo disciplinar',
            'Licitações e contratos administrativos'
        ],
        correct: 1,
        explanation: 'A LRF estabelece normas de finanças públicas voltadas para a responsabilidade na gestão fiscal, com ênfase no planejamento, controle e transparência dos orçamentos públicos.'
    },
    {
        id: 5,
        question: 'De acordo com a Lei de Acesso à Informação (Lei 12.527/2011), as informações classificadas como sigilosas têm prazo máximo de restrição de acesso de:',
        options: [
            '5 anos',
            '15 anos',
            '25 anos',
            '50 anos'
        ],
        correct: 2,
        explanation: 'A LAI estabelece que o prazo máximo de sigilo é de 25 anos para informações ultrassecretas, 15 anos para secretas e 5 anos para reservadas.'
    },
    {
        id: 6,
        question: 'O controle externo da administração pública federal é exercido pelo:',
        options: [
            'Ministério Público Federal',
            'Tribunal de Contas da União',
            'Controladoria-Geral da União',
            'Congresso Nacional com auxílio do TCU'
        ],
        correct: 3,
        explanation: 'Conforme a Constituição Federal, o controle externo é exercido pelo Congresso Nacional com auxílio do Tribunal de Contas da União (art. 70).'
    },
    {
        id: 7,
        question: 'Qual das seguintes situações caracteriza conflito de interesses na administração pública?',
        options: [
            'Servidor participar de licitação onde seu cônjuge tem empresa participante',
            'Servidor trabalhar em horário noturno',
            'Servidor assumir cargo comissionado em outro órgão',
            'Servidor ter parente em outro órgão público'
        ],
        correct: 0,
        explanation: 'Conflito de interesses ocorre quando o servidor tem interesse pessoal que pode influenciar sua imparcialidade, como no caso de parentes em empresas licitantes.'
    },
    {
        id: 8,
        question: 'A improbidade administrativa, conforme a Lei 8.429/1992, NÃO está associada a:',
        options: [
            'Enriquecimento ilícito',
            'Violação aos princípios da administração pública',
            'Exercício de cargo político',
            'Lesão ao erário'
        ],
        correct: 2,
        explanation: 'A improbidade administrativa está relacionada a atos que violam princípios ou causam dano ao erário, independentemente do cargo ser político ou não.'
    },
    {
        id: 9,
        question: 'Qual princípio constitucional da administração pública exige que as licitações tratem todos os participantes de forma isonômica?',
        options: [
            'Legalidade',
            'Impessoalidade',
            'Moralidade',
            'Publicidade'
        ],
        correct: 1,
        explanation: 'O princípio da impessoalidade exige tratamento igualitário a todos os participantes de licitações, sem favorecimentos ou discriminações.'
    },
    {
        id: 10,
        question: 'A Constituição Federal estabelece que a administração pública direta e indireta obedecerá aos princípios de:',
        options: [
            'Legalidade, impessoalidade, moralidade, publicidade e eficiência',
            'Legalidade, igualdade, moralidade, publicidade e economicidade',
            'Legalidade, impessoalidade, probidade, transparência e eficácia',
            'Legalidade, igualdade, moralidade, probidade e eficiência'
        ],
        correct: 0,
        explanation: 'O art. 37 da CF estabelece os princípios da administração pública: legalidade, impessoalidade, moralidade, publicidade e eficiência.'
    },
    {
        id: 11,
        question: 'Qual órgão é responsável pela defesa do patrimônio público e da moralidade administrativa no âmbito federal?',
        options: [
            'Tribunal de Contas da União',
            'Controladoria-Geral da União',
            'Ministério Público Federal',
            'Advocacia-Geral da União'
        ],
        correct: 1,
        explanation: 'A CGU é o órgão central do sistema de correição e tem como atribuição a defesa do patrimônio público e o combate à corrupção.'
    },
    {
        id: 12,
        question: 'O processo administrativo disciplinar deve observar o contraditório e a ampla defesa:',
        options: [
            'Apenas na fase recursal',
            'Somente após a decisão final',
            'Em todos os momentos do processo',
            'Apenas quando solicitado pelo acusado'
        ],
        correct: 2,
        explanation: 'Os princípios do contraditório e ampla defesa devem ser observados em todas as fases do processo administrativo disciplinar.'
    },
    {
        id: 13,
        question: 'Qual modalidade de licitação é obrigatória para contratos de maior valor?',
        options: [
            'Convite',
            'Tomada de preços',
            'Concorrência',
            'Pregão'
        ],
        correct: 2,
        explanation: 'A concorrência é a modalidade de licitação obrigatória para contratos de maior valor, conforme a Lei 8.666/1993.'
    },
    {
        id: 14,
        question: 'A finalidade principal do controle interno na administração pública é:',
        options: [
            'Substituir o controle externo',
            'Avaliar a legalidade dos atos do Poder Judiciário',
            'Avaliar o cumprimento das metas do Poder Executivo',
            'Avaliar a gestão dos recursos públicos e o cumprimento das normas'
        ],
        correct: 3,
        explanation: 'O controle interno tem por finalidade avaliar a gestão dos recursos públicos e o cumprimento das normas, conforme a Constituição Federal.'
    },
    {
        id: 15,
        question: 'Qual desses NÃO é um direito do cidadão perante a administração pública?',
        options: [
            'Certidões para defesa de direitos',
            'Resposta a petições em prazo razoável',
            'Acesso a informações pessoais de servidores',
            'Indenização por danos causados por agentes públicos'
        ],
        correct: 2,
        explanation: 'O acesso a informações pessoais de servidores é limitado pela proteção à privacidade, exceto quando necessário para defesa de direitos.'
    },
    {
        id: 16,
        question: 'A Lei 12.846/2013 (Lei Anticorrupção) estabelece responsabilidade:',
        options: [
            'Apenas para pessoas físicas',
            'Apenas para pessoas jurídicas',
            'Para pessoas físicas e jurídicas',
            'Apenas para agentes públicos'
        ],
        correct: 2,
        explanation: 'A Lei Anticorrupção estabelece responsabilidade objetiva para pessoas jurídicas e subjetiva para pessoas físicas por atos contra a administração pública.'
    },
    {
        id: 17,
        question: 'Qual desses princípios NÃO está expresso na Constituição Federal como princípio da administração pública?',
        options: [
            'Eficiência',
            'Moralidade',
            'Economicidade',
            'Publicidade'
        ],
        correct: 2,
        explanation: 'Economicidade não está entre os princípios expressos no art. 37 da CF, que são: legalidade, impessoalidade, moralidade, publicidade e eficiência.'
    },
    {
        id: 18,
        question: 'A estabilidade do servidor público civil:',
        options: [
            'É garantida após 3 anos de efetivo exercício',
            'Pode ser cassada por decisão administrativa',
            'Protege contra demissão arbitrária, mas não contra processo disciplinar',
            'É concedida imediatamente após a posse'
        ],
        correct: 2,
        explanation: 'A estabilidade protege contra demissão sem justa causa, mas não impede a abertura de processo disciplinar que pode resultar em demissão.'
    },
    {
        id: 19,
        question: 'Qual desses atos NÃO está sujeito ao controle pelo Tribunal de Contas?',
        options: [
            'Contratos administrativos',
            'Concessão de aposentadorias',
            'Decisões judiciais',
            'Nomeações para cargos comissionados'
        ],
        correct: 2,
        explanation: 'O TCU não exerce controle sobre decisões judiciais, que estão sujeitas apenas ao controle hierárquico e recursal no Poder Judiciário.'
    },
    {
        id: 20,
        question: 'O princípio da publicidade na administração pública:',
        options: [
            'Dispensa a divulgação de informações pessoais de servidores',
            'Permite sigilo indefinido em casos de segurança nacional',
            'Exige transparência, mas resguarda informações pessoais e sigilosas',
            'Obriga a divulgação de todos os atos administrativos sem exceção'
        ],
        correct: 2,
        explanation: 'O princípio da publicidade exige transparência, mas resguarda informações pessoais e aquelas legalmente sigilosas.'
    },
    {
        id: 21,
        question: 'Qual desses NÃO é um tipo de controle da administração pública?',
        options: [
            'Controle parlamentar',
            'Controle judicial',
            'Controle social',
            'Controle privado'
        ],
        correct: 3,
        explanation: 'Os tipos de controle da administração pública são: controle interno, externo, judicial e social. Não existe "controle privado".'
    },
    {
        id: 22,
        question: 'A função social do serviço público está relacionada:',
        options: [
            'Ao lucro obtido pelo Estado',
            'À satisfação das necessidades coletivas',
            'Ao crescimento do funcionalismo público',
            'À redução de custos operacionais'
        ],
        correct: 1,
        explanation: 'A função social do serviço público é satisfazer necessidades coletivas, conforme o interesse público.'
    },
    {
        id: 23,
        question: 'O regime jurídico único dos servidores públicos:',
        options: [
            'Uniformiza os direitos e deveres dos servidores',
            'Impede a existência de cargos temporários',
            'Proíbe a terceirização de serviços',
            'Garante isonomia salarial entre todos os servidores'
        ],
        correct: 0,
        explanation: 'O regime jurídico único estabelece um conjunto básico de direitos e deveres para os servidores estatutários.'
    },
    {
        id: 24,
        question: 'Qual desses NÃO é um requisito para a validade do ato administrativo?',
        options: [
            'Competência',
            'Forma',
            'Motivo',
            'Publicidade'
        ],
        correct: 3,
        explanation: 'Os requisitos do ato administrativo são: competência, forma, motivo, objeto e finalidade. Publicidade é princípio, não requisito de validade.'
    },
    {
        id: 25,
        question: 'A eficácia do ato administrativo:',
        options: [
            'Depende sempre da publicação',
            'É imediata quando perfeito e acabado',
            'Só ocorre após o decurso do prazo para recursos',
            'Depende de homologação superior'
        ],
        correct: 1,
        explanation: 'A eficácia do ato administrativo ocorre quando ele está perfeito e acabado, podendo produzir seus efeitos.'
    },
    {
        id: 26,
        question: 'A anulação do ato administrativo:',
        options: [
            'Só pode ser feita pelo Poder Judiciário',
            'Pode ser feita pela própria administração quando eivado de vício',
            'Depende sempre de processo judicial',
            'Prescreve em 5 anos'
        ],
        correct: 1,
        explanation: 'A administração pode anular seus próprios atos quando eivados de vícios, por meio do princípio da autotutela.'
    },
    {
        id: 27,
        question: 'A revogação do ato administrativo:',
        options: [
            'Decorre de vício no ato',
            'Ocorre por razões de conveniência e oportunidade',
            'Só pode ser feita pelo Judiciário',
            'Depende de ação judicial'
        ],
        correct: 1,
        explanation: 'A revogação ocorre por razões de conveniência e oportunidade, quando o ato se torna inconveniente ou inoportuno, embora válido.'
    },
    {
        id: 28,
        question: 'O silêncio da administração pública:',
        options: [
            'Sempre implica em aprovação tácita',
            'Nunca produz efeitos jurídicos',
            'Pode configurar omissão punível',
            'Dispensa o cidadão de cumprir obrigações'
        ],
        correct: 2,
        explanation: 'O silêncio da administração pode configurar omissão punível, especialmente quando há dever legal de manifestação.'
    },
    {
        id: 29,
        question: 'Qual desses NÃO é um poder da administração pública?',
        options: [
            'Poder hierárquico',
            'Poder disciplinar',
            'Poder legislativo',
            'Poder de polícia'
        ],
        correct: 2,
        explanation: 'Os poderes da administração são: vinculado, discricionário, hierárquico, disciplinar e de polícia. O legislativo é poder do Estado, não da administração.'
    },
    {
        id: 30,
        question: 'O poder de polícia da administração pública:',
        options: [
            'Limita-se à atividade de segurança pública',
            'Pode ser delegado a particulares',
            'Não está sujeito a controle judicial',
            'Dispensa o respeito aos direitos fundamentais'
        ],
        correct: 1,
        explanation: 'O poder de polícia pode ser delegado a particulares, como ocorre com agentes de trânsito e vigilância sanitária.'
    },
    {
        id: 31,
        question: 'Qual desses é um exemplo de serviço público impróprio?',
        options: [
            'Fornecimento de energia elétrica',
            'Serviços postais',
            'Telecomunicações',
            'Transporte metroviário'
        ],
        correct: 2,
        explanation: 'Telecomunicações são serviço público impróprio (de interesse coletivo), enquanto os outros são serviços públicos próprios.'
    },
    {
        id: 32,
        question: 'A concessão de serviço público:',
        options: [
            'Transfere a propriedade do bem público',
            'Dispensa licitação quando há urgência',
            'Exige prévia licitação na modalidade concorrência',
            'Pode ser feita por tempo indeterminado'
        ],
        correct: 2,
        explanation: 'A concessão de serviço público exige prévia licitação na modalidade concorrência, conforme a Lei 8.987/1995.'
    },
    {
        id: 33,
        question: 'Qual desses NÃO é um princípio do serviço público?',
        options: [
            'Continuidade',
            'Generalidade',
            'Eficiência',
            'Modicidade tarifária'
        ],
        correct: 2,
        explanation: 'Os princípios do serviço público são: continuidade, generalidade, modicidade tarifária e cortesia. Eficiência é princípio da administração pública.'
    },
    {
        id: 34,
        question: 'A permissão de serviço público:',
        options: [
            'Sempre exige licitação',
            'Pode ser precária e revogável unilateralmente',
            'Transfere a propriedade dos bens',
            'Só pode ser outorgada a entes públicos'
        ],
        correct: 1,
        explanation: 'A permissão pode ser precária e revogável unilateralmente pela administração, diferentemente da concessão.'
    },
    {
        id: 35,
        question: 'Qual desses NÃO é um tipo de bens públicos?',
        options: [
            'Bens de uso comum do povo',
            'Bens de uso especial',
            'Bens dominicais',
            'Bens de uso privativo'
        ],
        correct: 3,
        explanation: 'Os bens públicos classificam-se em: de uso comum do povo, de uso especial e dominicais. Não existe a categoria "bens de uso privativo".'
    },
    {
        id: 36,
        question: 'Os bens de uso comum do povo:',
        options: [
            'Podem ser alienados livremente',
            'São inalienáveis enquanto afetados',
            'Podem ser gravados com ônus reais',
            'Admitem usucapião após 5 anos'
        ],
        correct: 1,
        explanation: 'Bens de uso comum do povo são inalienáveis enquanto estiverem afetados ao uso público.'
    },
    {
        id: 37,
        question: 'A desapropriação por utilidade pública:',
        options: [
            'Depende de prévia ação judicial',
            'Exige declaração de necessidade pública',
            'Pode ser feita sem indenização',
            'Prescinde de interesse social'
        ],
        correct: 1,
        explanation: 'A desapropriação por utilidade pública exige declaração de necessidade pública ou interesse social, conforme a Constituição.'
    },
    {
        id: 38,
        question: 'Qual desses NÃO é um requisito da desapropriação?',
        options: [
            'Interesse público',
            'Justa indenização',
            'Consentimento do proprietário',
            'Processo legal'
        ],
        correct: 2,
        explanation: 'A desapropriação é ato unilateral da administração, não dependendo do consentimento do proprietário.'
    },
    {
        id: 39,
        question: 'A requisição administrativa:',
        options: [
            'É modalidade de desapropriação',
            'Pode ser feita sem indenização prévia',
            'Exige processo judicial prévio',
            'Só se aplica a bens imóveis'
        ],
        correct: 1,
        explanation: 'A requisição pode ser feita sem indenização prévia, que será fixada posteriormente, em caso de emergência.'
    },
    {
        id: 40,
        question: 'Qual desses NÃO é um tipo de servidor público?',
        options: [
            'Efetivo',
            'Comissionado',
            'Temporário',
            'Voluntário'
        ],
        correct: 3,
        explanation: 'Os tipos de servidores são: efetivos, comissionados e temporários. Não existe servidor "voluntário" na administração pública.'
    },
    {
        id: 41,
        question: 'O servidor público estável:',
        options: [
            'Pode ser demitido por ato discricionário',
            'Está sujeito a estágio probatório',
            'Não pode ser exonerado a bem do serviço público',
            'Está protegido contra demissão arbitrária'
        ],
        correct: 3,
        explanation: 'A estabilidade protege contra demissão arbitrária, mas não impede exoneração por interesse da administração ou punição disciplinar.'
    },
    {
        id: 42,
        question: 'Qual desses NÃO é um direito do servidor público estatutário?',
        options: [
            'Férias remuneradas',
            'Licença-prêmio',
            'Auxílio-transporte',
            'Participação nos lucros'
        ],
        correct: 3,
        explanation: 'Participação nos lucros não é direito do servidor público estatutário, sendo comum apenas na iniciativa privada.'
    },
    {
        id: 43,
        question: 'O regime jurídico dos servidores públicos:',
        options: [
            'É sempre o mesmo em todas as esferas de governo',
            'Pode variar conforme a Constituição do ente federado',
            'É determinado exclusivamente pela CLT',
            'Não admite diferenças entre servidores'
        ],
        correct: 1,
        explanation: 'Cada ente federado pode estabelecer seu próprio regime jurídico, dentro dos limites constitucionais.'
    },
    {
        id: 44,
        question: 'Qual desses NÃO é um dever do servidor público?',
        options: [
            'Lealdade à instituição',
            'Assiduidade',
            'Sigilo sobre informações privilegiadas',
            'Fidelidade partidária'
        ],
        correct: 3,
        explanation: 'Fidelidade partidária não é dever do servidor público, que deve ser apartidário no exercício da função.'
    },
    {
        id: 45,
        question: 'O acúmulo de cargos públicos:',
        options: [
            'É permitido quando há compatibilidade de horários',
            'Só é permitido para cargos de professor',
            'É vedado pela Constituição, com exceções',
            'Depende de autorização judicial'
        ],
        correct: 2,
        explanation: 'A Constituição veda o acúmulo de cargos públicos, com exceções específicas (dois cargos de professor, um de professor com outro técnico ou científico, etc.).'
    },
    {
        id: 46,
        question: 'Qual desses NÃO é uma vedação ao servidor público?',
        options: [
            'Exercer comércio',
            'Participar de licitação como particular',
            'Receber presentes de qualquer valor',
            'Associar-se a sindicatos'
        ],
        correct: 3,
        explanation: 'O servidor tem direito à liberdade de associação, podendo filiar-se a sindicatos. As demais opções são vedações.'
    },
    {
        id: 47,
        question: 'O processo administrativo disciplinar:',
        options: [
            'Dispensa o contraditório e ampla defesa',
            'Pode resultar em penalidades como demissão',
            'Não admite recurso hierárquico',
            'Prescreve em 1 ano'
        ],
        correct: 1,
        explanation: 'O PAD pode resultar em penalidades como advertência, suspensão, demissão ou cassação de aposentadoria.'
    },
    {
        id: 48,
        question: 'Qual desses NÃO é um princípio do processo administrativo?',
        options: [
            'Contraditório',
            'Ampla defesa',
            'Sigilo processual',
            'Impessoalidade'
        ],
        correct: 2,
        explanation: 'Os princípios do processo administrativo incluem: legalidade, finalidade, motivação, contraditório, ampla defesa, razoabilidade, proporcionalidade, moralidade, ampla defesa, duração razoável e segurança jurídica.'
    },
    {
        id: 49,
        question: 'A prescrição disciplinar para infrações graves cometidas por servidor público é de:',
        options: [
            '2 anos',
            '5 anos',
            '10 anos',
            'Não prescreve'
        ],
        correct: 1,
        explanation: 'Para infrações graves, a prescrição é de 5 anos; para as leves e médias, de 2 anos (Lei 8.112/1990).'
    },
    {
        id: 50,
        question: 'Qual desses NÃO é um requisito para aposentadoria do servidor público?',
        options: [
            'Idade mínima',
            'Tempo de contribuição',
            'Tempo de serviço público',
            'Avaliação de desempenho positiva'
        ],
        correct: 3,
        explanation: 'A aposentadoria não exige avaliação de desempenho, mas sim idade, tempo de contribuição e, em alguns casos, tempo de serviço público.'
    },

    // Conhecimentos Específicos - Bloco 3 (51-150)
    {
        id: 51,
        question: 'Qual é o objetivo principal das políticas de Ciência, Tecnologia e Inovação?',
        options: [
            'Reduzir gastos públicos',
            'Promover desenvolvimento científico-tecnológico nacional',
            'Eliminar universidades públicas',
            'Concentrar pesquisa em empresas privadas'
        ],
        correct: 1,
        explanation: 'As políticas de CT&I visam promover o desenvolvimento científico-tecnológico nacional através de financiamento à pesquisa, formação de recursos humanos e incentivos à inovação.'
    },
    {
        id: 52,
        question: 'Na gestão de projetos, o que caracteriza a metodologia Agile?',
        options: [
            'Fases sequenciais e rígidas',
            'Processo iterativo e adaptativo',
            'Ausência de planejamento',
            'Foco apenas na documentação'
        ],
        correct: 1,
        explanation: 'A metodologia Agile caracteriza-se por ser iterativa e adaptativa, permitindo mudanças durante o desenvolvimento e entrega de valor de forma incremental.'
    },
    {
        id: 53,
        question: 'Como as TICs contribuem para a modernização da administração pública?',
        options: [
            'Aumentando a burocracia',
            'Reduzindo a transparência',
            'Promovendo governo eletrônico e eficiência',
            'Eliminando a participação cidadã'
        ],
        correct: 2,
        explanation: 'As TICs modernizam a administração pública através do governo eletrônico, maior transparência, eficiência operacional e melhor participação cidadã.'
    },
    {
        id: 54,
        question: 'Qual método de pesquisa combina dados numéricos e interpretação qualitativa?',
        options: [
            'Método quantitativo',
            'Método qualitativo',
            'Método misto',
            'Método experimental'
        ],
        correct: 2,
        explanation: 'O método misto combina abordagens quantitativas (dados numéricos) e qualitativas (interpretação e significados) para uma análise mais completa.'
    },
    {
        id: 55,
        question: 'Um órgão público pretende implementar um sistema de inteligência artificial para análise de processos. De acordo com a LGPD, é CORRETO afirmar que:',
        options: [
            'O tratamento de dados pessoais é permitido sem consentimento quando necessário para a execução de política pública',
            'Dados anonimizados não estão sujeitos às regras da LGPD',
            'O controlador dos dados é sempre a autoridade máxima do órgão',
            'O encarregado (DPO) deve ser necessariamente um servidor público concursado'
        ],
        correct: 0,
        explanation: 'A LGPD permite o tratamento sem consentimento para execução de política pública (Art. 7º, IV). Dados anonimizados só estão fora do escopo se não puderem ser reidentificados. O controlador pode ser a pessoa jurídica, não necessariamente a autoridade máxima. O DPO pode ser terceirizado.'
    },
    {
        id: 56,
        question: 'Na gestão de projetos de TI, o método ágil SCRUM se caracteriza por:',
        options: [
            'Planejamento detalhado de todo o projeto antes do início',
            'Divisão do trabalho em sprints com entregas parciais',
            'Hierarquia rígida de comando e controle',
            'Documentação extensa como principal produto'
        ],
        correct: 1,
        explanation: 'O SCRUM é um método ágil que divide o trabalho em ciclos curtos (sprints) com entregas parciais e funcionais, permitindo adaptações rápidas às mudanças.'
    },
    {
        id: 57,
        question: 'A Lei Geral de Proteção de Dados (LGPD) aplica-se ao tratamento de dados pessoais realizado:',
        options: [
            'Apenas por empresas privadas',
            'Por qualquer pessoa física ou jurídica, inclusive o poder público',
            'Exclusivamente a operações comerciais',
            'Somente quando há finalidade lucrativa'
        ],
        correct: 1,
        explanation: 'A LGPD aplica-se a todo tratamento de dados pessoais, independentemente do meio, país sede ou país onde os dados estão localizados, inclusive pelo poder público.'
    },
    {
        id: 58,
        question: 'Qual dessas NÃO é uma característica da computação em nuvem?',
        options: [
            'Autoatendimento sob demanda',
            'Amplo acesso à rede',
            'Pool de recursos dedicados',
            'Elasticidade rápida'
        ],
        correct: 2,
        explanation: 'A computação em nuvem utiliza pool de recursos compartilhados, não dedicados, conforme definição do NIST.'
    },
    {
        id: 59,
        question: 'No contexto de governança de TI, o framework COBIT tem como objetivo principal:',
        options: [
            'Substituir todos os outros frameworks de governança',
            'Alinhar TI aos objetivos de negócio',
            'Reduzir custos de infraestrutura',
            'Automatizar todos os processos de TI'
        ],
        correct: 1,
        explanation: 'O COBIT (Control Objectives for Information and Related Technologies) é um framework para alinhar TI aos objetivos de negócio e garantir governança eficaz.'
    },
    {
        id: 60,
        question: 'Qual desses NÃO é um princípio do governo digital?',
        options: [
            'Orientação por dados',
            'Segurança e privacidade',
            'Centralização de todos os serviços',
            'Interoperabilidade'
        ],
        correct: 2,
        explanation: 'O governo digital prega a descentralização coordenada, não a centralização absoluta de serviços.'
    },
    {
        id: 61,
        question: 'A transformação digital no setor público requer:',
        options: [
            'Apenas aquisição de novas tecnologias',
            'Mudança cultural e reorganização de processos',
            'Substituição total de sistemas legados',
            'Eliminação de todos os processos manuais'
        ],
        correct: 1,
        explanation: 'A transformação digital vai além da tecnologia, exigindo mudança cultural e redesign de processos para obter benefícios plenos.'
    },
    {
        id: 62,
        question: 'Qual desses é um benefício da análise de dados (big data) no setor público?',
        options: [
            'Tomada de decisão baseada em evidências',
            'Eliminação completa de erros humanos',
            'Redução absoluta de custos operacionais',
            'Substituição de todos os processos analógicos'
        ],
        correct: 0,
        explanation: 'O principal benefício é possibilitar decisões baseadas em evidências, embora não elimine completamente erros ou reduza custos de forma absoluta.'
    },
    {
        id: 63,
        question: 'No contexto de cidades inteligentes (smart cities), qual desses NÃO é um componente essencial?',
        options: [
            'Infraestrutura de conectividade',
            'Sensores e IoT',
            'Centralização de todos os serviços',
            'Plataformas de dados abertos'
        ],
        correct: 2,
        explanation: 'Cidades inteligentes promovem integração e coordenação, não necessariamente centralização absoluta de serviços.'
    },
    {
        id: 64,
        question: 'A interoperabilidade no governo eletrônico refere-se a:',
        options: [
            'Capacidade de sistemas diferentes trocarem informações',
            'Uso exclusivo de softwares livres',
            'Padronização de equipamentos em todos os órgãos',
            'Eliminação de sistemas legados'
        ],
        correct: 0,
        explanation: 'Interoperabilidade é a capacidade de sistemas heterogêneos trocarem informações e processos de forma eficiente.'
    },
    {
        id: 65,
        question: 'Qual dessas iniciativas do governo federal brasileiro promove a interoperabilidade?',
        options: [
            'Portal da Transparência',
            'Sistema de Pagamentos Brasileiro',
            'Estratégia de Governança Digital',
            'Plataforma Digital de Governo'
        ],
        correct: 2,
        explanation: 'A Estratégia de Governança Digital (EGD) estabelece diretrizes para interoperabilidade no governo federal.'
    },
    {
        id: 66,
        question: 'O blockchain no setor público pode ser aplicado para:',
        options: [
            'Eliminar completamente a necessidade de confiança',
            'Rastreabilidade de processos e documentos',
            'Substituir todos os bancos de dados tradicionais',
            'Eliminar a necessidade de regulamentação'
        ],
        correct: 1,
        explanation: 'Blockchain é útil para rastreabilidade e segurança de processos, mas não elimina completamente a necessidade de confiança ou regulamentação.'
    },
    {
        id: 67,
        question: 'Qual desses NÃO é um desafio da inteligência artificial no setor público?',
        options: [
            'Viés algorítmico',
            'Falta de dados de qualidade',
            'Necessidade de capacitação técnica',
            'Excesso de regulamentação específica'
        ],
        correct: 3,
        explanation: 'A IA no setor público enfrenta mais a falta de regulamentação adequada do que excesso de normas específicas.'
    },
    {
        id: 68,
        question: 'A Lei 14.129/2021 (Governo Digital) estabelece como princípio:',
        options: [
            'Prevalência do meio digital sobre o analógico',
            'Obrigatoriedade de uso de blockchain',
            'Eliminação de todos os sistemas legados',
            'Proibição de parcerias com o setor privado'
        ],
        correct: 0,
        explanation: 'A Lei do Governo Digital estabelece a prevalência do digital sobre o analógico, entre outros princípios como interoperabilidade e segurança.'
    },
    {
        id: 69,
        question: 'No contexto de segurança da informação, a tríade CIA refere-se a:',
        options: [
            'Confidencialidade, Integridade e Disponibilidade',
            'Controle, Inspeção e Auditoria',
            'Criptografia, Identificação e Autenticação',
            'Contingência, Infraestrutura e Acesso'
        ],
        correct: 0,
        explanation: 'A tríade CIA da segurança da informação compreende: Confidencialidade, Integridade e Disponibilidade.'
    },
    {
        id: 70,
        question: 'Qual desses NÃO é um tipo comum de ameaça à segurança da informação?',
        options: [
            'Phishing',
            'Ransomware',
            'Cloud computing',
            'Ataque DDoS'
        ],
        correct: 2,
        explanation: 'Cloud computing é modelo de serviço, não ameaça. As demais são ameaças à segurança da informação.'
    },
    {
        id: 71,
        question: 'A norma ISO/IEC 27001 trata de:',
        options: [
            'Gestão da qualidade',
            'Gestão de segurança da informação',
            'Gestão de projetos',
            'Gestão de serviços de TI'
        ],
        correct: 1,
        explanation: 'A ISO/IEC 27001 estabelece requisitos para um Sistema de Gestão de Segurança da Informação (SGSI).'
    },
    {
        id: 72,
        question: 'Qual desses é um princípio da proteção de dados pessoais na LGPD?',
        options: [
            'Finalidade específica',
            'Armazenamento indefinido',
            'Compartilhamento irrestrito',
            'Coleta máxima de dados'
        ],
        correct: 0,
        explanation: 'A LGPD estabelece como princípios: finalidade, adequação, necessidade, livre acesso, qualidade dos dados, transparência, segurança, prevenção, não discriminação e responsabilização.'
    },
    {
        id: 73,
        question: 'O encarregado (DPO) na LGPD tem como função principal:',
        options: [
            'Tomar todas as decisões sobre tratamento de dados',
            'Ser o único responsável por conformidade',
            'Atuar como canal de comunicação entre controlador, titulares e ANPD',
            'Substituir a área jurídica da organização'
        ],
        correct: 2,
        explanation: 'O DPO atua como canal de comunicação e auxilia na conformidade, mas não assume sozinho toda a responsabilidade nem substitui outras áreas.'
    },
    {
        id: 74,
        question: 'Qual dessas NÃO é uma hipótese de tratamento de dados pessoais sem consentimento na LGPD?',
        options: [
            'Execução de contrato',
            'Interesse legítimo do controlador',
            'Política pública',
            'Finalidade comercial'
        ],
        correct: 3,
        explanation: 'Finalidade comercial por si só não autoriza tratamento sem consentimento, a menos que enquadrada em outra hipótese legal.'
    },
    {
        id: 75,
        question: 'A ANPD (Autoridade Nacional de Proteção de Dados) é responsável por:',
        options: [
            'Substituir o Judiciário em casos de violação',
            'Fiscalizar e aplicar sanções por descumprimento da LGPD',
            'Controlar todos os bancos de dados do país',
            'Definir políticas de segurança para todas as empresas'
        ],
        correct: 1,
        explanation: 'A ANPD é órgão fiscalizador da LGPD, podendo aplicar sanções, mas não substitui o Judiciário ou controla bancos de dados diretamente.'
    },
    {
        id: 76,
        question: 'Qual desses NÃO é um direito do titular na LGPD?',
        options: [
            'Revogar consentimento',
            'Solicitar eliminação de dados',
            'Exigir indenização automática por qualquer tratamento',
            'Acessar seus dados pessoais'
        ],
        correct: 2,
        explanation: 'O titular não tem direito a indenização automática, que depende de comprovação de dano e nexo causal.'
    },
    {
        id: 77,
        question: 'O relatório de impacto à proteção de dados (RIPD) é obrigatório quando o tratamento:',
        options: [
            'Envolve qualquer dado pessoal',
            'Pode gerar riscos às liberdades civis',
            'É feito por órgãos públicos',
            'Utiliza inteligência artificial'
        ],
        correct: 1,
        explanation: 'O RIPD é obrigatório para tratamentos que possam gerar riscos às liberdades civis e direitos fundamentais.'
    },
    {
        id: 78,
        question: 'Qual desses NÃO é um exemplo de dado pessoal sensível na LGPD (Lei Geral de Proteção de Dados Pessoais)?',
        options: [
            'Opinião política',
            'Dado biométrico',
            'Endereço residencial',
            'Convicção religiosa'
        ],
        correct: 2,
        explanation: 'Endereço residencial é dado pessoal comum. Dados sensíveis incluem origem racial, convicção religiosa, opinião política, saúde, vida sexual, genético ou biométrico.'
    },
    {
        id: 79,
        question: 'A transferência internacional de dados na LGPD:',
        options: [
            'É sempre proibida',
            'Pode ocorrer para países com nível adequado de proteção',
            'Só é permitida para países da América Latina',
            'Depende exclusivamente do consentimento do titular'
        ],
        correct: 1,
        explanation: 'A transferência internacional pode ocorrer para países com nível adequado de proteção ou quando houver garantias específicas.'
    },
    {
        id: 80,
        question: 'Qual dessas sanções NÃO está prevista na LGPD?',
        options: [
            'Advertência',
            'Multa simples de até 2% do faturamento',
            'Bloqueio de dados',
            'Prisão do responsável'
        ],
        correct: 3,
        explanation: 'A LGPD prevê sanções administrativas como advertência, multa, bloqueio ou eliminação de dados, mas não prevê sanções penais como prisão.'
    },
    {
        id: 81,
        question: 'No contexto de contratações de TI pelo governo, o que é pregão eletrônico?',
        options: [
            'Modalidade de licitação realizada exclusivamente por meio eletrônico',
            'Sistema de compras diretas sem licitação',
            'Processo de contratação emergencial',
            'Modalidade exclusiva para compra de softwares'
        ],
        correct: 0,
        explanation: 'Pregão eletrônico é modalidade de licitação realizada em sessão pública por meio eletrônico, prevista na Lei 10.520/2002.'
    },
    {
        id: 82,
        question: 'Qual desses NÃO é um benefício do software livre no setor público?',
        options: [
            'Independência de fornecedores',
            'Redução de custos com licenças',
            'Maior controle sobre o código-fonte',
            'Garantia absoluta de segurança'
        ],
        correct: 3,
        explanation: 'Software livre não garante segurança absoluta, que depende da implementação e manutenção adequadas.'
    },
    {
        id: 83,
        question: 'O Marco Legal da Ciência, Tecnologia e Inovação (Lei 13.243/2016) trouxe como inovação:',
        options: [
            'Restrição às parcerias público-privadas',
            'Flexibilização nas contratações de pesquisadores',
            'Proibição de compartilhamento de infraestrutura',
            'Fim dos incentivos fiscais para pesquisa'
        ],
        correct: 1,
        explanation: 'O Marco Legal de CTI trouxe flexibilização nas contratações e maior facilidade para parcerias público-privadas em pesquisa.'
    },
    {
        id: 84,
        question: 'Qual desses é um objetivo da Política Nacional de Dados Abertos?',
        options: [
            'Restringir o acesso a dados governamentais',
            'Promover transparência e inovação com dados públicos',
            'Centralizar todos os dados em um único órgão',
            'Substituir todos os sistemas legados'
        ],
        correct: 1,
        explanation: 'A Política de Dados Abertos visa aumentar a transparência e permitir que sociedade e empresas inovem usando dados governamentais.'
    },
    {
        id: 85,
        question: 'No contexto de cibersegurança, o que é um ataque do tipo "phishing"?',
        options: [
            'Ataque que sobrecarrega um servidor com requisições',
            'Tentativa de obter informações sensíveis se passando por entidade confiável',
            'Sequestro de dados com pedido de resgate',
            'Exploração de vulnerabilidades em sistemas desatualizados'
        ],
        correct: 1,
        explanation: 'Phishing é a tentativa fraudulenta de obter informações confidenciais se passando por comunicação confiável, geralmente via e-mail ou mensagem.'
    },
    {
        id: 86,
        question: 'Qual desses NÃO é um componente da transformação digital no setor público?',
        options: [
            'Digitalização de processos',
            'Manutenção de todos os procedimentos analógicos',
            'Orientação por dados',
            'Foco no cidadão'
        ],
        correct: 1,
        explanation: 'A transformação digital implica em mudança para processos digitais, não manutenção de procedimentos analógicos.'
    },
    {
        id: 87,
        question: 'O que é a Estratégia de Governança Digital (EGD) do governo federal?',
        options: [
            'Política para padronização de equipamentos de TI',
            'Conjunto de diretrizes para transformação digital dos serviços públicos',
            'Programa de capacitação obrigatória para servidores',
            'Lei que obriga a contratação de serviços em nuvem'
        ],
        correct: 1,
        explanation: 'A EGD estabelece diretrizes para transformação digital, incluindo interoperabilidade, segurança e melhoria de serviços públicos.'
    },
    {
        id: 88,
        question: 'Qual desses NÃO é um benefício da computação em nuvem para o governo?',
        options: [
            'Escalabilidade de recursos',
            'Redução de custos com infraestrutura física',
            'Eliminação completa de riscos de segurança',
            'Maior flexibilidade para inovação'
        ],
        correct: 2,
        explanation: 'A nuvem não elimina completamente riscos de segurança, que devem ser gerenciados com políticas e controles adequados.'
    },
    {
        id: 89,
        question: 'No contexto de inteligência artificial, o que é "bias algorítmico"?',
        options: [
            'Tendência do algoritmo a produzir resultados distorcidos ou discriminatórios',
            'Método para otimização de processamento',
            'Técnica de aprendizado de máquina supervisionado',
            'Erro aleatório em sistemas de IA'
        ],
        correct: 0,
        explanation: 'Bias algorítmico refere-se a tendências discriminatórias ou distorcidas nos resultados de sistemas de IA, muitas vezes refletindo vieses presentes nos dados de treinamento.'
    },
    {
        id: 90,
        question: 'Qual dessas tecnologias é mais adequada para garantir autenticidade de documentos digitais?',
        options: [
            'Blockchain',
            'Computação em nuvem',
            'Big Data',
            'Internet das Coisas'
        ],
        correct: 0,
        explanation: 'Blockchain é especialmente útil para garantir autenticidade e não repúdio em documentos digitais devido às suas características de imutabilidade e descentralização.'
    },
    {
        id: 91,
        question: 'O que é a Plataforma Digital de Governo (PGD) no Brasil?',
        options: [
            'Sistema único para todos os serviços públicos',
            'Conjunto de componentes compartilhados para construção de serviços digitais',
            'Rede social para servidores públicos',
            'Plataforma de comércio eletrônico governamental'
        ],
        correct: 1,
        explanation: 'A PGD oferece componentes compartilhados (como autenticação e pagamentos) para acelerar o desenvolvimento de serviços digitais no governo.'
    },
    {
        id: 92,
        question: 'Qual desses NÃO é um desafio na implementação de cidades inteligentes?',
        options: [
            'Integração de sistemas heterogêneos',
            'Proteção de privacidade e dados pessoais',
            'Falta de padrões e interoperabilidade',
            'Excesso de regulamentação específica'
        ],
        correct: 3,
        explanation: 'O desafio nas cidades inteligentes é mais a falta de regulamentação adequada do que excesso de normas específicas.'
    },
    {
        id: 93,
        question: 'O que são "dados anonimizados" na LGPD?',
        options: [
            'Dados que nunca foram associados a um indivíduo',
            'Dados que não permitem a identificação do titular, considerados os meios técnicos disponíveis',
            'Dados com nomes substituídos por códigos',
            'Dados compartilhados apenas internamente no órgão'
        ],
        correct: 1,
        explanation: 'Dados anonimizados são aqueles que não permitem a identificação do titular, considerando meios técnicos razoáveis, conforme art. 12 da LGPD.'
    },
    {
        id: 94,
        question: 'Qual dessas NÃO é uma boa prática em segurança da informação?',
        options: [
            'Atualização regular de sistemas',
            'Uso de senhas complexas e autenticação multifator',
            'Compartilhamento de credenciais entre colegas',
            'Backup regular dos dados'
        ],
        correct: 2,
        explanation: 'Compartilhar credenciais viola o princípio da individualidade e é considerada má prática em segurança da informação.'
    },
    {
        id: 95,
        question: 'No contexto de contratação de soluções de TI pelo governo, o que é TIC Verde?',
        options: [
            'Uso de tecnologias da informação com menor impacto ambiental',
            'Software exclusivo para monitoramento ambiental',
            'Sistema de compras sustentáveis',
            'Plataforma para denúncias de crimes ambientais'
        ],
        correct: 0,
        explanation: 'TIC Verde refere-se ao uso de tecnologias da informação e comunicação com menor impacto ambiental, considerando todo o ciclo de vida.'
    },
    {
        id: 96,
        question: 'Qual desses é um componente da arquitetura de serviços do governo eletrônico?',
        options: [
            'Blockchain obrigatório',
            'Serviços centralizados em um único órgão',
            'Padrões de interoperabilidade',
            'Eliminação de todos os sistemas legados'
        ],
        correct: 2,
        explanation: 'Padrões de interoperabilidade são essenciais para arquitetura de serviços no governo eletrônico, permitindo integração entre sistemas.'
    },
    {
        id: 97,
        question: 'O que é o Sistema de Administração dos Recursos de Tecnologia da Informação (SISP)?',
        options: [
            'Conjunto de normas para gestão de TI no governo federal',
            'Software único para todos os órgãos públicos',
            'Sistema de compras centralizadas de TI',
            'Programa de capacitação em TI para servidores'
        ],
        correct: 0,
        explanation: 'O SISP é o sistema que estabelece normas e diretrizes para gestão de TI no âmbito do governo federal brasileiro.'
    },
    {
        id: 98,
        question: 'Qual desses NÃO é um princípio do design centrado no usuário para serviços públicos digitais?',
        options: [
            'Complexidade para garantir segurança',
            'Acessibilidade',
            'Simplicidade',
            'Eficiência'
        ],
        correct: 0,
        explanation: 'Design centrado no usuário busca simplicidade e usabilidade, sem sacrificar segurança, mas evitando complexidade desnecessária.'
    },
    {
        id: 99,
        question: 'O que é o Digital Governance Framework (DGF) do governo federal?',
        options: [
            'Modelo de governança para transformação digital dos serviços públicos',
            'Sistema de certificação digital obrigatório',
            'Plataforma única de serviços ao cidadão',
            'Programa de substituição de sistemas legados'
        ],
        correct: 0,
        explanation: 'O DGF é o modelo de governança que estabelece padrões e diretrizes para a transformação digital no governo federal.'
    },
    {
        id: 100,
        question: 'Qual dessas tecnologias é mais adequada para tratamento de grandes volumes de dados estruturados e não estruturados?',
        options: [
            'Blockchain',
            'Big Data',
            'Realidade virtual',
            'Internet das Coisas'
        ],
        correct: 1,
        explanation: 'Tecnologias de Big Data são especializadas no tratamento de grandes volumes de dados, tanto estruturados quanto não estruturados.'
    },
    {
        id: 101,
        question: 'Qual desses NÃO é um componente típico de uma arquitetura de dados governamental?',
        options: [
            'Data Lake',
            'Catálogo de dados',
            'API de integração',
            'Processador de texto simples'
        ],
        correct: 3,
        explanation: 'Processador de texto simples não é componente de arquitetura de dados, que inclui soluções como data lakes, catálogos e APIs para integração.'
    },
    {
        id: 102,
        question: 'O que é o Programa Gov.br?',
        options: [
            'Portal único de acesso a serviços governamentais digitais',
            'Sistema de gestão de documentos eletrônicos',
            'Plataforma de comércio eletrônico governamental',
            'Rede social para servidores públicos'
        ],
        correct: 0,
        explanation: 'O Gov.br é o portal unificado do governo federal para acesso a serviços digitais, com autenticação única e personalização.'
    },
    {
        id: 103,
        question: 'Qual desses NÃO é um benefício da identidade digital no governo?',
        options: [
            'Redução de fraudes',
            'Maior conveniência para o cidadão',
            'Eliminação completa de documentos físicos',
            'Simplificação de acesso a serviços'
        ],
        correct: 2,
        explanation: 'A identidade digital não elimina completamente a necessidade de documentos físicos em todas as situações, embora reduza significativamente.'
    },
    {
        id: 104,
        question: 'O que é o ICP-Brasil?',
        options: [
            'Infraestrutura de Chaves Públicas brasileira para certificação digital',
            'Índice de qualidade de portais governamentais',
            'Sistema de inteligência artificial do governo',
            'Programa de inclusão digital'
        ],
        correct: 0,
        explanation: 'A ICP-Brasil é a Infraestrutura de Chaves Públicas brasileira, que viabiliza a certificação digital no país.'
    },
    {
        id: 105,
        question: 'Qual desses NÃO é um tipo de certificado digital da ICP-Brasil (Infraestrutura de Chaves Públicas brasileira)?',
        options: [
            'A1',
            'A3',
            'S1',
            'T3'
        ],
        correct: 3,
        explanation: 'Os tipos de certificados da ICP-Brasil incluem A1, A2, A3, A4, S1, S2, S3, S4, T3 e T4. "T3" existe, mas não é uma opção incorreta como "S1".'
    },
    {
        id: 106,
        question: 'O que é a Lei 14.063/2020 (Lei do Digital)?',
        options: [
            'Lei que estabelece a prevalência do meio digital sobre o físico',
            'Norma que cria o Ministério da Economia Digital',
            'Regulamentação exclusiva para comércio eletrônico',
            'Lei que proíbe totalmente o uso de papel no governo'
        ],
        correct: 0,
        explanation: 'A Lei 14.063/2020 estabelece a prevalência do meio digital sobre o físico na relação entre poder público e cidadãos.'
    },
    {
        id: 107,
        question: 'Qual desses NÃO é um objetivo da Política Nacional de Segurança da Informação (PNSI)?',
        options: [
            'Proteção de informações estratégicas do Estado',
            'Garantia da continuidade dos serviços de TI governamentais',
            'Controle absoluto de todos os dados pessoais',
            'Prevenção de incidentes de segurança'
        ],
        correct: 2,
        explanation: 'A PNSI não busca controle absoluto de dados pessoais, mas sim proteção de informações estratégicas e continuidade de serviços.'
    },
    {
        id: 108,
        question: 'O que é o Sistema de Informações do Governo Federal (SIGF)?',
        options: [
            'Plataforma única de dados abertos',
            'Conjunto integrado de sistemas para gestão governamental',
            'Sistema de inteligência artificial para políticas públicas',
            'Banco de dados centralizado de todos os cidadãos'
        ],
        correct: 1,
        explanation: 'O SIGF é o conjunto de sistemas integrados para gestão de processos governamentais no âmbito federal.'
    },
    {
        id: 109,
        question: 'Qual desses NÃO é um princípio da Política de Dados Abertos?',
        options: [
            'Dados primários',
            'Granularidade',
            'Sigilo seletivo',
            'Não discriminação'
        ],
        correct: 2,
        explanation: 'Os princípios são: dados primários, granulares, em tempo hábil, acessíveis, não discriminatórios, não proprietários e livres de licenças.'
    },
    {
        id: 110,
        question: 'O que é o Cadastro Base do Cidadão?',
        options: [
            'Registro único de dados pessoais de todos os brasileiros',
            'Base de dados para cruzamento de informações fiscais',
            'Sistema de identificação biométrica nacional',
            'Conjunto mínimo de dados para identificação em serviços públicos'
        ],
        correct: 3,
        explanation: 'O Cadastro Base contém o conjunto mínimo de dados necessários para identificação do cidadão em serviços públicos digitais.'
    },
    {
        id: 111,
        question: 'Qual desses NÃO é um componente da Estratégia de Governança Digital?',
        options: [
            'Interoperabilidade',
            'Segurança e privacidade',
            'Centralização absoluta de todos os sistemas',
            'Atendimento digital'
        ],
        correct: 2,
        explanation: 'A EGD prega integração e coordenação, não centralização absoluta de sistemas.'
    },
    {
        id: 112,
        question: 'O que é o Programa Conecta Gov?',
        options: [
            'Rede de fibra óptica exclusiva para órgãos governamentais',
            'Plataforma de integração e interoperabilidade do governo federal',
            'Programa de inclusão digital em áreas remotas',
            'Sistema de wi-fi público gratuito'
        ],
        correct: 1,
        explanation: 'O Conecta Gov é a plataforma de integração e interoperabilidade que conecta sistemas do governo federal.'
    },
    {
        id: 113,
        question: 'Qual desses NÃO é um benefício da arquitetura de serviços (SOA) no governo?',
        options: [
            'Reúso de componentes',
            'Redução de redundâncias',
            'Aumento do acoplamento entre sistemas',
            'Maior agilidade no desenvolvimento'
        ],
        correct: 2,
        explanation: 'SOA busca reduzir acoplamento entre sistemas, não aumentá-lo.'
    },
    {
        id: 114,
        question: 'O que é o Modelo de Referência em Arquitetura (MRA) do governo federal?',
        options: [
            'Padrão para construção de prédios públicos',
            'Conjunto de normas para arquitetura de sistemas de informação',
            'Modelo de organização de secretarias',
            'Guia para contratação de arquitetos'
        ],
        correct: 1,
        explanation: 'O MRA estabelece padrões e diretrizes para arquitetura de sistemas de informação no governo federal.'
    },
    {
        id: 115,
        question: 'Qual desses NÃO é um domínio do Modelo de Referência em Arquitetura?',
        options: [
            'Negócio',
            'Aplicação',
            'Infraestrutura',
            'Recursos humanos'
        ],
        correct: 3,
        explanation: 'Os domínios do MRA são: Negócio, Aplicação, Dados e Infraestrutura.'
    },
    {
        id: 116,
        question: 'O que é o Padrão de Interoperabilidade de Governo Eletrônico (e-PING)?',
        options: [
            'Conjunto de normas técnicas para integração de sistemas governamentais',
            'Sistema de mensagens instantâneas para servidores',
            'Protocolo de segurança para transações eletrônicas',
            'Padrão para construção de portais governamentais'
        ],
        correct: 0,
        explanation: 'O e-PING estabelece normas técnicas para garantir interoperabilidade entre sistemas governamentais.'
    },
    {
        id: 117,
        question: 'Qual desses NÃO é um componente do e-PING (Padrão de Interoperabilidade de Governo Eletrônico)?',
        options: [
            'Interconexão',
            'Segurança',
            'Organograma',
            'Dados'
        ],
        correct: 2,
        explanation: 'Os componentes do e-PING são: Interconexão, Segurança, Dados e Organização da Informação.'
    },
    {
        id: 118,
        question: 'O que é o Sistema de Informações Gerenciais do Governo Federal (SIGA)?',
        options: [
            'Sistema de gestão de documentos eletrônicos',
            'Plataforma integrada para gestão de processos administrativos',
            'Ferramenta de business intelligence exclusiva para ministros',
            'Sistema de compras governamentais'
        ],
        correct: 1,
        explanation: 'O SIGA é a plataforma integrada para gestão de processos administrativos no governo federal.'
    },
    {
        id: 119,
        question: 'Qual desses NÃO é um módulo do SIGA (Sistema de Informações Gerenciais do Governo Federal )?',
        options: [
            'Protocolo',
            'Processo',
            'Recursos humanos',
            'Patrimônio'
        ],
        correct: 2,
        explanation: 'O SIGA possui módulos como Protocolo, Processo, Patrimônio e Almoxarifado, mas não de RH.'
    },
    {
        id: 120,
        question: 'O que é o Sistema Eletrônico de Informações (SEI)?',
        options: [
            'Sistema de gestão de documentos e processos administrativos digitais',
            'Plataforma de inteligência artificial governamental',
            'Banco de dados centralizado de informações sigilosas',
            'Sistema de votação eletrônica'
        ],
        correct: 0,
        explanation: 'O SEI é o sistema de gestão de documentos e processos administrativos em meio digital, amplamente utilizado no governo federal.'
    },
    {
        id: 121,
        question: 'Qual desses NÃO é um benefício do SEI (Sistema Eletrônico de Informações?',
        options: [
            'Eliminação completa de documentos físicos',
            'Redução de custos com papel e impressão',
            'Maior agilidade nos processos',
            'Rastreabilidade de documentos'
        ],
        correct: 0,
        explanation: 'O SEI reduz mas não elimina completamente documentos físicos, que ainda são necessários em alguns casos.'
    },
    {
        id: 122,
        question: 'O que é o Portal da Transparência?',
        options: [
            'Sistema de denúncias anônimas',
            'Plataforma de divulgação de dados e gastos públicos',
            'Banco de dados de servidores públicos',
            'Sistema de consulta processual'
        ],
        correct: 1,
        explanation: 'O Portal da Transparência é a plataforma que disponibiliza informações sobre gastos e receitas públicas para controle social.'
    },
    {
        id: 123,
        question: 'Qual desses NÃO é um tipo de informação disponível no Portal da Transparência?',
        options: [
            'Despesas do governo federal',
            'Salários de servidores',
            'Dados pessoais de cidadãos comuns',
            'Transferências para estados e municípios'
        ],
        correct: 2,
        explanation: 'O Portal não divulga dados pessoais de cidadãos comuns, protegidos pela LGPD, apenas informações de interesse público.'
    },
    {
        id: 124,
        question: 'O que é o Sistema Integrado de Administração Financeira (SIAFI)?',
        options: [
            'Sistema de gestão financeira do governo federal',
            'Plataforma de investimentos para servidores',
            'Banco de dados de fornecedores do governo',
            'Sistema de controle de estoques'
        ],
        correct: 0,
        explanation: 'O SIAFI é o sistema que gerencia a execução orçamentária, financeira e patrimonial do governo federal.'
    },
    {
        id: 125,
        question: 'Qual desses NÃO é um módulo do SIAFI(Sistema Integrado de Administração Financeira)?',
        options: [
            'Contabilidade',
            'Orçamento',
            'Gestão de pessoas',
            'Patrimônio'
        ],
        correct: 2,
        explanation: 'O SIAFI possui módulos como Orçamento, Contabilidade e Patrimônio, mas não de Gestão de Pessoas.'
    },
    {
        id: 126,
        question: 'O que é o Comprasnet?',
        options: [
            'Portal de compras do governo federal',
            'Rede de fornecedores preferenciais',
            'Sistema de comércio eletrônico para servidores',
            'Plataforma de leilões de bens apreendidos'
        ],
        correct: 0,
        explanation: 'O Comprasnet é o portal onde são realizadas as compras e licitações do governo federal.'
    },
    {
        id: 127,
        question: 'Qual desses NÃO é um tipo de licitação disponível no Comprasnet?',
        options: [
            'Pregão eletrônico',
            'Concorrência',
            'Tomada de preços',
            'Leilão reverso'
        ],
        correct: 3,
        explanation: 'Leilão reverso não é modalidade de licitação, mas técnica que pode ser usada em pregões.'
    },
    {
        id: 128,
        question: 'O que é o Sistema de Informações Contábeis e Fiscais (SICONFI)?',
        options: [
            'Sistema de gestão financeira dos estados e municípios',
            'Banco de dados de contadores públicos',
            'Plataforma de fiscalização federal',
            'Sistema de controle de dívidas públicas'
        ],
        correct: 0,
        explanation: 'O SICONFI é o sistema onde estados e municípios prestam informações sobre suas finanças públicas.'
    },
    {
        id: 129,
        question: 'Qual desses NÃO é um objetivo do SICONFI (Sistema de Informações Contábeis e Fiscais)?',
        options: [
            'Transparência das contas públicas',
            'Fiscalização pelo Tribunal de Contas',
            'Controle social dos gastos',
            'Substituição total dos sistemas locais'
        ],
        correct: 3,
        explanation: 'O SICONFI não substitui sistemas locais, mas coleta informações padronizadas para análise comparativa.'
    },
    {
        id: 130,
        question: 'O que é o Sistema de Informações sobre Orçamentos Públicos em Saúde (SIOPS)?',
        options: [
            'Sistema que coleta dados sobre gastos em saúde',
            'Plataforma de agendamento de consultas',
            'Banco de dados de profissionais de saúde',
            'Sistema de controle de medicamentos'
        ],
        correct: 0,
        explanation: 'O SIOPS coleta informações sobre aplicação de recursos em saúde por entes federativos, conforme exigência constitucional.'
    },
    {
        id: 131,
        question: 'Qual desses NÃO é um tipo de informação disponível no SIOPS(Sistema de Informações sobre Orçamentos Públicos em Saúde)?',
        options: [
            'Receitas destinadas à saúde',
            'Despesas executadas em saúde',
            'Prontuários médicos de pacientes',
            'Recursos transferidos entre entes'
        ],
        correct: 2,
        explanation: 'O SIOPS não contém dados individuais de pacientes, apenas informações consolidadas sobre financiamento da saúde.'
    },
    {
        id: 132,
        question: 'O que é o Sistema de Informações sobre Mortalidade (SIM)?',
        options: [
            'Banco de dados nacional de óbitos',
            'Sistema de notificação de doenças',
            'Plataforma de vigilância epidemiológica',
            'Registro de causas de mortes violentas'
        ],
        correct: 0,
        explanation: 'O SIM é o sistema nacional que coleta dados sobre mortalidade no país, fundamental para políticas de saúde pública.'
    },
    {
        id: 133,
        question: 'Qual desses NÃO é um objetivo do SIM(Sistema de Informações sobre Mortalidade)?',
        options: [
            'Identificar causas de morte',
            'Subsidiar políticas de saúde',
            'Monitorar epidemias',
            'Controlar estoques de medicamentos'
        ],
        correct: 3,
        explanation: 'O SIM não gerencia estoques de medicamentos, mas fornece dados para análise epidemiológica.'
    },
   {
    id: 134,
    question: 'O que é o Sistema de Informações Hospitalares (SIH)?',
    options: [
        'Sistema que processa dados de internações hospitalares no SUS',
        'Plataforma de agendamento de cirurgias eletivas',
        'Banco de dados de profissionais hospitalares',
        'Sistema de controle de leitos em tempo real'
    ],
    correct: 0,
    explanation: 'O SIH é o sistema do Ministério da Saúde que processa informações sobre internações hospitalares financiadas pelo SUS, incluindo Autorizações de Internação Hospitalar (AIH).'
},
{
    id: 135,
    question: 'Qual desses NÃO é um objetivo do SIH (Sistema de Informações Hospitalares )?',
    options: [
        'Controle de gastos com internações hospitalares',
        'Pagamento aos estabelecimentos de saúde',
        'Gestão de prontuários eletrônicos individuais',
        'Planejamento da rede hospitalar'
    ],
    correct: 2,
    explanation: 'O SIH não gerencia prontuários individuais, mas sim informações consolidadas para fins de pagamento, controle e planejamento.'
},
{
    id: 136,
    question: 'O que é o Sistema de Informações Ambulatoriais (SIA)?',
    options: [
        'Sistema de registro de atendimentos ambulatoriais no SUS',
        'Plataforma de telemedicina',
        'Agenda eletrônica para consultas',
        'Sistema de prontuário eletrônico'
    ],
    correct: 0,
    explanation: 'O SIA registra procedimentos ambulatoriais realizados no SUS, incluindo consultas, exames e pequenas cirurgias, para fins de pagamento e gestão.'
},
{
    id: 137,
    question: 'Qual desses NÃO é um tipo de informação processada pelo SIA (Sistema de Informações sobre Nascidos Vivos)?',
    options: [
        'Procedimentos ambulatoriais realizados',
        'Medicamentos dispensados',
        'Laudos de exames detalhados',
        'Recursos financeiros repassados'
    ],
    correct: 2,
    explanation: 'O SIA não armazena laudos completos, mas sim informações consolidadas sobre procedimentos realizados e recursos financeiros.'
},
{
    id: 138,
    question: 'O que é o Sistema de Informações sobre Nascidos Vivos (SINASC)?',
    options: [
        'Banco de dados nacional de nascimentos',
        'Sistema de acompanhamento pré-natal',
        'Registro de fertilizações in vitro',
        'Plataforma de adoção'
    ],
    correct: 0,
    explanation: 'O SINASC é o sistema nacional que coleta dados sobre nascimentos no país, fundamental para políticas de saúde materno-infantil.'
},
{
    id: 139,
    question: 'Qual desses NÃO é um objetivo do SINASC (Sistema de Informações sobre Nascidos Vivos)?',
    options: [
        'Identificar características dos nascimentos',
        'Subsidiar políticas de saúde infantil',
        'Monitorar taxas de natalidade',
        'Controlar estoques de vacinas'
    ],
    correct: 3,
    explanation: 'O SINASC não gerencia estoques de vacinas, mas fornece dados epidemiológicos sobre nascimentos.'
},
{
    id: 140,
    question: 'O que é o Sistema de Informações sobre Imunizações (SI-PNI)?',
    options: [
        'Sistema que registra vacinas aplicadas no país',
        'Banco de dados de reações adversas',
        'Plataforma de pesquisa de novas vacinas',
        'Sistema de controle de epidemias'
    ],
    correct: 0,
    explanation: 'O SI-PNI registra as doses de vacinas aplicadas no Brasil, permitindo o monitoramento da cobertura vacinal.'
},
{
    id: 141,
    question: 'Qual desses NÃO é um tipo de informação disponível no SI-PNI (Sistema de Informações sobre Imunizações)?',
    options: [
        'Doses aplicadas por tipo de vacina',
        'Cobertura vacinal por região',
        'Prontuários completos dos vacinados',
        'Estoques de vacinas por município'
    ],
    correct: 2,
    explanation: 'O SI-PNI não armazena prontuários completos, mas sim informações consolidadas sobre aplicação de vacinas.'
},
{
    id: 142,
    question: 'O que é o Sistema de Informações sobre Agravos de Notificação (SINAN)?',
    options: [
        'Banco de dados de doenças de notificação compulsória',
        'Sistema de alerta epidemiológico',
        'Plataforma de pesquisa clínica',
        'Registro de surtos infecciosos'
    ],
    correct: 0,
    explanation: 'O SINAN é o sistema nacional que coleta dados sobre doenças e agravos de notificação compulsória no Brasil.'
},
{
    id: 143,
    question: 'Qual desses NÃO é um objetivo do SINAN (Sistema de Informação de Agravos de Notificação)?',
    options: [
        'Detectar surtos epidemiológicos',
        'Monitorar doenças transmissíveis',
        'Subsidiar pesquisas acadêmicas',
        'Substituir prontuários médicos'
    ],
    correct: 3,
    explanation: 'O SINAN não substitui prontuários, mas fornece dados para vigilância epidemiológica.'
},
{
    id: 144,
    question: 'O que é o Sistema de Informações sobre Mortalidade Infantil (SIMI)?',
    options: [
        'Módulo do SIM especializado em óbitos infantis',
        'Sistema independente de notificação',
        'Banco de dados de nascimentos prematuros',
        'Plataforma de acompanhamento neonatal'
    ],
    correct: 0,
    explanation: 'O SIMI é um módulo especializado do SIM para análise detalhada de óbitos infantis e fetais.'
},
{
    id: 145,
    question: 'Qual desses NÃO é um tipo de informação disponível no SIMI (Sistema de Informações sobre Mortalidade Infantil)?',
    options: [
        'Causas de óbito infantil',
        'Características da mãe',
        'Prontuários completos do pré-natal',
        'Condições do parto'
    ],
    correct: 2,
    explanation: 'O SIMI não contém prontuários completos, mas sim informações consolidadas sobre óbitos infantis.'
},
{
    id: 146,
    question: 'O que é o Sistema de Informações sobre Orçamentos Públicos em Educação (SIOPE)?',
    options: [
        'Sistema que coleta dados sobre gastos em educação',
        'Plataforma de planejamento pedagógico',
        'Banco de dados de profissionais da educação',
        'Sistema de controle de frequência escolar'
    ],
    correct: 0,
    explanation: 'O SIOPE coleta informações sobre aplicação de recursos em educação por entes federativos, conforme exigência do Fundeb.'
},
{
    id: 147,
    question: 'Qual desses NÃO é um tipo de informação disponível no SIOPE(Sistema de Informações sobre Orçamentos Públicos em Educação)?',
    options: [
        'Receitas vinculadas à educação',
        'Despesas executadas em educação',
        'Notas individuais de alunos',
        'Recursos transferidos entre entes'
    ],
    correct: 2,
    explanation: 'O SIOPE não contém dados individuais de alunos, apenas informações consolidadas sobre financiamento da educação.'
},
{
    id: 148,
    question: 'O que é o Sistema de Informações sobre Recursos para o Ensino (SIRH)?',
    options: [
        'Sistema que monitora infraestrutura escolar',
        'Banco de dados de currículos docentes',
        'Plataforma de gestão de bibliotecas',
        'Sistema de reserva de laboratórios'
    ],
    correct: 0,
    explanation: 'O SIRH monitora a infraestrutura física e recursos materiais das escolas públicas brasileiras.'
},
{
    id: 149,
    question: 'Qual desses NÃO é um objetivo do SIRH(Sistema de Informações sobre Recursos para o Ensino)?',
    options: [
        'Mapear condições das escolas',
        'Planejar reformas e construções',
        'Distribuir recursos didáticos',
        'Avaliar desempenho docente'
    ],
    correct: 3,
    explanation: 'O SIRH não avalia desempenho de professores, mas sim condições físicas das escolas.'
},
{
    id: 150,
    question: 'O que é o Sistema de Informações da Educação Básica (INEP)?',
    options: [
        'Conjunto de sistemas que coleta dados sobre educação básica',
        'Plataforma de ensino a distância',
        'Banco de dados de projetos pedagógicos',
        'Sistema de matrículas escolares'
    ],
    correct: 0,
    explanation: 'O INEP mantém sistemas como o Educacenso que coletam dados sobre escolas, alunos e profissionais da educação básica.'
}
]

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Aplicar tema salvo
    applyTheme(currentTheme);
    
    // Configurar event listeners
    setupEventListeners();
    
    // Inicializar flashcards
    initializeFlashcards();
    
    // Mostrar seção inicial
    showSection('home');
}

function setupEventListeners() {
    // Navegação
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('href').substring(1);
            showSection(section);
        });
    });

    // Menu mobile
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Impede que o clique se propague para o documento
        mobileMenu.classList.toggle('hidden');
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnMenuButton = mobileMenuBtn.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnMenuButton && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Toggle tema
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('mobile-theme-toggle').addEventListener('click', toggleTheme);

    // Flashcards
    setupFlashcardListeners();
    
    // Quiz
    setupQuizListeners();
}

function showSection(sectionName) {
    // Esconder todas as seções
    document.querySelectorAll('.section-content').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Mostrar seção selecionada
    document.getElementById(sectionName).classList.remove('hidden');
    
    // Atualizar navegação ativa
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('text-blue-200');
        if (link.getAttribute('href') === '#' + sectionName) {
            link.classList.add('text-blue-200');
        }
    });
    
    // Fechar menu mobile
    document.getElementById('mobile-menu').classList.add('hidden');
    
    // Scroll para o topo
    window.scrollTo(0, 0);
    
    currentSection = sectionName;
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
}

function applyTheme(theme) {
    const body = document.body;
    const themeIcons = document.querySelectorAll('#theme-icon, #mobile-theme-icon');
    
    if (theme === 'dark') {
        body.classList.add('dark');
        themeIcons.forEach(icon => {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
        });
    } else {
        body.classList.remove('dark');
        themeIcons.forEach(icon => {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
        });
    }
}

// Funcionalidades dos Flashcards
let currentFlashcards = [];
let currentCardIndex = 0;
let filteredCards = [];

function setupFlashcardListeners() {
    // Filtros
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterFlashcards(category);
            
            // Atualizar botões ativos
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active', 'bg-blue-600', 'text-white');
                b.classList.add('bg-gray-200', 'text-gray-700');
            });
            this.classList.add('active', 'bg-blue-600', 'text-white');
            this.classList.remove('bg-gray-200', 'text-gray-700');
        });
    });

    // Navegação dos cards
    document.getElementById('prev-card').addEventListener('click', () => navigateCard(-1));
    document.getElementById('next-card').addEventListener('click', () => navigateCard(1));
}

function initializeFlashcards() {
    currentFlashcards = [...flashcardsData];
    filteredCards = [...flashcardsData];
    renderFlashcards();
}

function filterFlashcards(category) {
    if (category === 'all') {
        filteredCards = [...flashcardsData];
    } else {
        filteredCards = flashcardsData.filter(card => card.category === category);
    }
    currentCardIndex = 0;
    renderFlashcards();
}

function renderFlashcards() {
    const container = document.getElementById('flashcards-container');
    container.innerHTML = '';
    
    if (filteredCards.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500 col-span-full">Nenhum flashcard encontrado.</p>';
        return;
    }
    
    // Mostrar apenas o card atual
    const card = filteredCards[currentCardIndex];
    const cardElement = createFlashcardElement(card);
    container.appendChild(cardElement);
    
    updateCardCounter();
    updateNavigationButtons();
}

   function createFlashcardElement(card) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'flashcard-container col-span-full w-full px-2'; // Adicionado px-2 para espaçamento
    
    const categoryClass = card.category === 'conhecimentos-gerais' ? 
        'bg-blue-600 text-white' : 'bg-red-600 text-white';
    
    cardDiv.innerHTML = `
        <div class="flashcard bg-white rounded-xl shadow-lg p-4 md:p-6 cursor-pointer transform transition-transform duration-300 hover:scale-105 mx-auto w-full max-w-md" data-id="${card.id}">
            <div class="flashcard-inner">
                <div class="flashcard-front">
                    <div class="flex items-center justify-between mb-3">
                        <span class="px-2 py-1 ${categoryClass} rounded-full text-xs md:text-sm font-medium">
                            ${card.category === 'conhecimentos-gerais' ? 'Gerais' : 'Específicos'}
                        </span>
                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3 break-words">${card.title}</h3>
                    <p class="text-sm md:text-base text-gray-600 mb-3 md:mb-4 break-words">${card.question}</p>
                    <p class="text-xs text-gray-500 text-center">Clique para ver a resposta</p>
                </div>
                <div class="flashcard-back hidden">
                    <div class="flex items-center justify-between mb-4">
                        <span class="px-3 py-1 bg-green-200 text-gray-700 rounded-full text-sm font-medium">
                            Resposta
                        </span>
                        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 mb-4">${card.title}</h3>
                    <p class="text-gray-700 leading-relaxed mb-6">${card.answer}</p>
                    <p class="text-sm text-gray-500 text-center">Clique para voltar à pergunta</p>
                </div>
            </div>
        </div>
    `;
    
    // Adicionar evento de clique para virar o card
    const flashcard = cardDiv.querySelector('.flashcard');
    flashcard.addEventListener('click', function() {
        flipCard(this);
    });
    
    return cardDiv;
}

function flipCard(cardElement) {
    const front = cardElement.querySelector('.flashcard-front');
    const back = cardElement.querySelector('.flashcard-back');
    
    if (front.classList.contains('hidden')) {
        // Mostrar frente
        back.classList.add('hidden');
        front.classList.remove('hidden');
    } else {
        // Mostrar verso
        front.classList.add('hidden');
        back.classList.remove('hidden');
        
        // Marcar como estudado
        const cardId = parseInt(cardElement.getAttribute('data-id'));
        if (!userProgress.flashcardsStudied.includes(cardId)) {
            userProgress.flashcardsStudied.push(cardId);
            saveUserProgress();
        }
    }
}

function navigateCard(direction) {
    currentCardIndex += direction;
    
    if (currentCardIndex < 0) {
        currentCardIndex = filteredCards.length - 1;
    } else if (currentCardIndex >= filteredCards.length) {
        currentCardIndex = 0;
    }
    
    renderFlashcards();
}

function updateCardCounter() {
    const counter = document.getElementById('card-counter');
    counter.textContent = `${currentCardIndex + 1} de ${filteredCards.length}`;
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-card');
    const nextBtn = document.getElementById('next-card');
    
    prevBtn.disabled = filteredCards.length <= 1;
    nextBtn.disabled = filteredCards.length <= 1;
}

// Funcionalidades do Quiz
let currentQuiz = [];
let currentQuestionIndex = 0;
let quizScore = 0;
let quizAnswers = [];

function setupQuizListeners() {
    document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
    document.getElementById('restart-quiz-btn').addEventListener('click', startQuiz);
    document.getElementById('review-answers-btn').addEventListener('click', showQuizReview);
}

document.querySelectorAll('.quiz-size-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        quizSize = parseInt(this.getAttribute('data-size'));
        document.querySelectorAll('.quiz-size-btn').forEach(b => {
            b.classList.remove('bg-blue-600', 'text-white');
            b.classList.add('bg-blue-100', 'text-blue-800');
        });
        this.classList.add('bg-blue-600', 'text-white');
        this.classList.remove('bg-blue-100', 'text-blue-800');
    });
});

function startQuiz() {
    // Resetar estado do quiz
    currentQuiz = shuffleArray([...quizData]).slice(0, quizSize);
    currentQuestionIndex = 0;
    quizScore = 0;
    quizAnswers = [];
    
    // Mostrar área do jogo
    document.getElementById('quiz-start').classList.add('hidden');
    document.getElementById('quiz-results').classList.add('hidden');
    document.getElementById('quiz-game').classList.remove('hidden');
    
    // Mostrar primeira pergunta
    showQuestion();
}

function showQuestion() {
  const question = currentQuiz[currentQuestionIndex];
    
    // Atualizar progresso (mobile-friendly)
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('total-questions').textContent = currentQuiz.length;
    document.getElementById('current-score').textContent = quizScore;
    
    const progressPercent = ((currentQuestionIndex + 1) / currentQuiz.length) * 100;
    document.getElementById('progress-bar').style.width = progressPercent + '%';
    
    // Mostrar pergunta com break-words
    document.getElementById('question-text').className = 'text-base md:text-xl font-bold text-gray-800 mb-4 break-words';
    document.getElementById('question-text').textContent = question.question;
    
    // Mostrar alternativas
    const answersContainer = document.getElementById('answers-container');
    answersContainer.className = 'space-y-2 md:space-y-3'; // Espaçamento menor em mobile
    answersContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn w-full text-left p-2 md:p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors duration-200 text-sm md:text-base break-words';
        button.innerHTML = `
            <span class="font-medium text-gray-800">${String.fromCharCode(65 + index)}) ${option}</span>
        `;
        button.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(button);
    });
    
    // Esconder feedback
    document.getElementById('feedback-container').classList.add('hidden');
}

function selectAnswer(selectedIndex) {
    const question = currentQuiz[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correct;
    
    // Salvar resposta
    quizAnswers.push({
        question: question.question,
        selectedAnswer: question.options[selectedIndex],
        correctAnswer: question.options[question.correct],
        isCorrect: isCorrect,
        explanation: question.explanation
    });
    
    // Atualizar pontuação
    if (isCorrect) {
        quizScore++;
        userProgress.correctAnswers++;
    }
    userProgress.totalQuestions++;
    
    // Mostrar feedback
    showFeedback(isCorrect, question.explanation, question.options[question.correct]);
    
    // Desabilitar botões de resposta
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.disabled = true;
        btn.classList.add('opacity-50', 'cursor-not-allowed');
    });
    
    // Destacar resposta correta e incorreta
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons[question.correct].classList.add('border-green-500', 'bg-green-100');
    
    if (!isCorrect) {
        answerButtons[selectedIndex].classList.add('border-red-500', 'bg-red-100');
    }
}

function showFeedback(isCorrect, explanation, correctAnswer) {
     const feedbackContainer = document.getElementById('feedback-container');
    feedbackContainer.className = 'hidden bg-white rounded-xl shadow-lg p-4 md:p-6 mb-4';
    
    const feedbackContent = document.getElementById('feedback-content');
    feedbackContent.innerHTML = `
        <div class="flex items-start space-x-3 md:space-x-4">
            <div class="flex-shrink-0">
                ${isCorrect ? 
                    '<div class="w-6 h-6 md:w-8 md:h-8 bg-green-100 rounded-full flex items-center justify-center"><svg class="w-4 h-4 md:w-5 md:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div>' :
                    '<div class="w-6 h-6 md:w-8 md:h-8 bg-red-100 rounded-full flex items-center justify-center"><svg class="w-4 h-4 md:w-5 md:h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></div>'
                }
            </div>
            <div class="flex-1">
                <h4 class="font-bold text-base md:text-lg ${isCorrect ? 'text-green-600' : 'text-red-600'} mb-1 md:mb-2">
                    ${isCorrect ? 'Correto!' : 'Incorreto!'}
                </h4>
                ${!isCorrect ? `<p class="text-sm md:text-base text-gray-700 mb-1 md:mb-2 break-words"><strong>Resposta correta:</strong> ${correctAnswer}</p>` : ''}
                <p class="text-sm md:text-base text-gray-700 break-words">${explanation}</p>
            </div>
        </div>
    `;
    
    feedbackContainer.classList.remove('hidden');
    
    // Configurar botão de próxima pergunta
    const nextBtn = document.getElementById('next-question-btn');
    nextBtn.onclick = () => {
        if (currentQuestionIndex < currentQuiz.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            showQuizResults();
        }
    };
    
    nextBtn.textContent = currentQuestionIndex < currentQuiz.length - 1 ? 'Próxima Pergunta' : 'Ver Resultados';
}

function showQuizResults() {
    // Salvar progresso
    userProgress.quizScores.push({
        score: quizScore,
        total: currentQuiz.length,
        date: new Date().toISOString()
    });
    saveUserProgress();
    
    // Esconder jogo
    document.getElementById('quiz-game').classList.add('hidden');
    
    // Mostrar resultados
    const resultsContainer = document.getElementById('quiz-results');
    const resultsContent = document.getElementById('results-content');
    
    const percentage = Math.round((quizScore / currentQuiz.length) * 100);
    let performanceMessage = '';
    let performanceColor = '';
    
    if (percentage >= 80) {
        performanceMessage = 'Excelente! Você domina bem o conteúdo.';
        performanceColor = 'text-green-600';
    } else if (percentage >= 60) {
        performanceMessage = 'Bom trabalho! Continue estudando para melhorar.';
        performanceColor = 'text-blue-600';
    } else {
        performanceMessage = 'Continue estudando! A prática leva à perfeição.';
        performanceColor = 'text-orange-600';
    }
    
       resultsContent.innerHTML = `
        <div class="w-16 h-16 md:w-20 md:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
            <svg class="w-8 h-8 md:w-10 md:h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
            </svg>
        </div>
        <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">Quiz Concluído!</h3>
        <div class="text-center mb-4 md:mb-6">
            <div class="text-4xl md:text-6xl font-bold ${performanceColor} mb-1 md:mb-2">${percentage}%</div>
            <p class="text-base md:text-xl text-gray-600 mb-1 md:mb-2">Você acertou ${quizScore} de ${currentQuiz.length} perguntas</p>
            <p class="text-base md:text-lg ${performanceColor} font-medium break-words">${performanceMessage}</p>
        </div>
        <div class="bg-gray-50 rounded-lg p-4 md:p-6">
            <h4 class="font-bold text-gray-800 mb-3 md:mb-4 text-sm md:text-base">Seu Progresso Geral</h4>
            <div class="grid grid-cols-2 gap-3 md:gap-4 text-center">
                <div>
                    <div class="text-xl md:text-2xl font-bold text-blue-600">${userProgress.quizScores.length}</div>
                    <div class="text-xs md:text-sm text-gray-600">Quizzes Realizados</div>
                </div>
                <div>
                    <div class="text-xl md:text-2xl font-bold text-green-600">${userProgress.flashcardsStudied.length}</div>
                    <div class="text-xs md:text-sm text-gray-600">Flashcards Estudados</div>
                </div>
            </div>
        </div>
    `;
    
    resultsContainer.classList.remove('hidden');
}

function showQuizReview() {
    // Esconder resultados
    document.getElementById('quiz-results').classList.add('hidden');
    
    // Mostrar área de revisão
    const reviewContainer = document.createElement('div');
    reviewContainer.id = 'quiz-review';
    reviewContainer.className = 'max-w-4xl mx-auto';
     reviewContainer.innerHTML = `
        <div class="text-center mb-6 md:mb-8">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-4 break-words">Revisão das Respostas</h3>
            <p class="text-base md:text-xl text-gray-600 break-words">Veja todas as perguntas e suas respostas</p>
        </div>
        
        <div class="space-y-4 md:space-y-6">
            ${quizAnswers.map((answer, index) => `
                <div class="bg-white rounded-xl shadow-lg p-4 md:p-6">
                    <div class="flex items-start space-x-3 md:space-x-4">
                        <div class="flex-shrink-0">
                            <div class="w-6 h-6 md:w-8 md:h-8 ${answer.isCorrect ? 'bg-green-100' : 'bg-red-100'} rounded-full flex items-center justify-center">
                                <span class="text-sm md:text-base font-bold ${answer.isCorrect ? 'text-green-600' : 'text-red-600'}">${index + 1}</span>
                            </div>
                        </div>
                        <div class="flex-1">
                            <h4 class="text-base md:text-lg font-bold text-gray-800 mb-2 md:mb-3 break-words">${answer.question}</h4>
                            <div class="space-y-1 md:space-y-2 mb-3 md:mb-4">
                                <p class="text-sm md:text-base text-gray-700 break-words">
                                    <span class="font-medium">Sua resposta:</span> 
                                    <span class="${answer.isCorrect ? 'text-green-600' : 'text-red-600'}">${answer.selectedAnswer}</span>
                                </p>
                                ${!answer.isCorrect ? `
                                    <p class="text-sm md:text-base text-gray-700 break-words">
                                        <span class="font-medium">Resposta correta:</span> 
                                        <span class="text-green-600">${answer.correctAnswer}</span>
                                    </p>
                                ` : ''}
                            </div>
                            <div class="bg-gray-50 rounded-lg p-3 md:p-4">
                                <p class="text-sm md:text-base text-gray-700 break-words">${answer.explanation}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="text-center mt-6 md:mt-8">
            <button id="back-to-results-btn" class="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm md:text-base">
                Voltar aos Resultados
            </button>
        </div>
    `;
    // Substituir o conteúdo do quiz
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';
    quizContainer.appendChild(reviewContainer);
    
    // Adicionar evento para voltar aos resultados
    document.getElementById('back-to-results-btn').addEventListener('click', function() {
        quizContainer.innerHTML = `
            <div id="quiz-start" class="text-center bg-white rounded-xl shadow-lg p-8 hidden"></div>
            <div id="quiz-game" class="hidden"></div>
            <div id="quiz-results" class="text-center bg-white rounded-xl shadow-lg p-8"></div>
        `;
        showQuizResults();
    });
}

// Funções utilitárias
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function saveUserProgress() {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
}

// Exportar funções para uso global
window.showSection = showSection;


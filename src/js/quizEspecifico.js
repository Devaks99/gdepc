// Variáveis globais para o quiz específico
let currentQuestionIndex = 0;
let questions = [];
let userAnswers = [];
let currentSubject = '';
let isQuizActive = false;

// Mapeamento de assuntos
const subjectNames = {
    'cts': 'Ciência, Tecnologia e Sociedade',
    'ctbs': 'Ciência, Tecnologia e Biosegurança',
    'gestao-projetos': 'Gestão de Projetos',
    'metodologia': 'Metodologia Científica',
    'tics-dados': 'TICs e Dados',
    'politicas-cti': 'Políticas de CT&I',
    'lgpd': 'LGPD e Proteção de Dados',
    'governo-digital': 'Governo Digital',
    'seguranca': 'Segurança da Informação',
    'saude-publica': 'Sistemas de Saúde Pública',
    'outros': 'Outros Temas'
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeQuizEspecifico();
});

function initializeQuizEspecifico() {
    setupSubjectSelection();
    setupQuizNavigation();
    loadQuestions();
}

// Configurar seleção de assunto
function setupSubjectSelection() {
    const subjectCards = document.querySelectorAll('.subject-card');
    
    subjectCards.forEach(card => {
        card.addEventListener('click', function() {
            const subject = this.getAttribute('data-subject');
            startSubjectQuiz(subject);
        });
    });
}

// Carregar questões
async function loadQuestions() {
    try {
        const response = await fetch('../data/questoes.json');
        if (!response.ok) {
            throw new Error('Erro ao carregar questões');
        }
        const data = await response.json();
        window.allQuestions = data.especificas;
        
    } catch (error) {
        console.error('Erro ao carregar questões:', error);
        // Fallback com questões de exemplo
        window.allQuestions = getAllSpecificQuestions();
    }
}

// Todas as 100 questões específicas
function getAllSpecificQuestions() {
    return {
        'cts': [
            {
                id: 1,
                category: "conhecimentos-especificos",
                subject: "CTS",
                question: "O que estuda o campo Ciência, Tecnologia e Sociedade (CTS)?",
                options: [
                    "Apenas os aspectos técnicos da ciência",
                    "As relações e influências mútuas entre ciência, tecnologia e sociedade",
                    "Somente o desenvolvimento de novas tecnologias",
                    "Exclusivamente os impactos negativos da tecnologia"
                ],
                correct: 1,
                explanation: "CTS é um campo interdisciplinar que estuda as relações e influências mútuas entre ciência, tecnologia e sociedade, analisando impactos sociais, econômicos e ambientais."
            },
            {
                id: 2,
                category: "conhecimentos-especificos",
                subject: "CTS",
                question: "Qual é um dos principais objetivos dos estudos CTS?",
                options: [
                    "Acelerar o desenvolvimento tecnológico sem questionamentos",
                    "Promover reflexão crítica sobre o papel da ciência e tecnologia na sociedade",
                    "Impedir qualquer avanço científico",
                    "Separar completamente ciência e sociedade"
                ],
                correct: 1,
                explanation: "Os estudos CTS promovem reflexão crítica sobre o papel da ciência e tecnologia na sociedade, buscando desenvolvimento mais consciente e responsável."
            }
        ],
        'ctbs': [
            {
                id: 3,
                category: "conhecimentos-especificos",
                subject: "CT&BS",
                question: "O que significa biosegurança no contexto científico?",
                options: [
                    "Apenas a segurança de laboratórios",
                    "Conjunto de medidas para prevenir riscos biológicos",
                    "Somente a proteção de animais",
                    "Exclusivamente a segurança alimentar"
                ],
                correct: 1,
                explanation: "Biosegurança é o conjunto de medidas destinadas a prevenir, controlar ou eliminar riscos inerentes às atividades que possam comprometer a saúde humana, animal, vegetal e o meio ambiente."
            }
        ],
        'gestao-projetos': [
            {
                id: 4,
                category: "conhecimentos-especificos",
                subject: "Gestão de Projetos",
                question: "Quais são as principais fases de um projeto segundo o PMBOK?",
                options: [
                    "Planejamento e Execução apenas",
                    "Iniciação, Planejamento, Execução, Monitoramento e Encerramento",
                    "Análise e Desenvolvimento apenas",
                    "Início e Fim apenas"
                ],
                correct: 1,
                explanation: "Segundo o PMBOK, as fases de um projeto são: Iniciação, Planejamento, Execução, Monitoramento e Controle, e Encerramento."
            },
            {
                id: 5,
                category: "conhecimentos-especificos",
                subject: "Gestão de Projetos",
                question: "O que é o escopo de um projeto?",
                options: [
                    "Apenas o orçamento disponível",
                    "O trabalho que deve ser realizado para entregar o produto do projeto",
                    "Somente o cronograma de atividades",
                    "Apenas a equipe envolvida"
                ],
                correct: 1,
                explanation: "O escopo do projeto define todo o trabalho que deve ser realizado para entregar o produto, serviço ou resultado do projeto com as características especificadas."
            },
            {
                id: 10,
                category: "conhecimentos-especificos",
                subject: "Gestão de Projetos",
                question: "Na gestão de projetos, o que caracteriza a metodologia Agile?",
                options: [
                    "Fases sequenciais e rígidas",
                    "Processo iterativo e adaptativo",
                    "Ausência de planejamento",
                    "Foco apenas na documentação"
                ],
                correct: 1,
                explanation: "A metodologia Agile caracteriza-se por ser iterativa e adaptativa, permitindo mudanças durante o desenvolvimento e entrega de valor de forma incremental."
            },
            {
                id: 14,
                category: "conhecimentos-especificos",
                subject: "Gestão de Projetos",
                question: "Na gestão de projetos de TI, o método ágil SCRUM se caracteriza por:",
                options: [
                    "Planejamento detalhado de todo o projeto antes do início",
                    "Divisão do trabalho em sprints com entregas parciais",
                    "Hierarquia rígida de comando e controle",
                    "Documentação extensa como principal produto"
                ],
                correct: 1,
                explanation: "O SCRUM é um método ágil que divide o trabalho em ciclos curtos (sprints) com entregas parciais e funcionais, permitindo adaptações rápidas às mudanças."
            }
        ],
        'metodologia': [
            {
                id: 6,
                category: "conhecimentos-especificos",
                subject: "Metodologia Científica",
                question: "Qual é o objetivo principal da metodologia científica?",
                options: [
                    "Comprovar teorias pré-existentes",
                    "Garantir rigor, objetividade e confiabilidade na pesquisa",
                    "Acelerar o processo de pesquisa",
                    "Simplificar procedimentos científicos"
                ],
                correct: 1,
                explanation: "A metodologia científica visa garantir rigor, objetividade e confiabilidade na condução de pesquisas, assegurando a validade dos resultados obtidos."
            },
            {
                id: 12,
                category: "conhecimentos-especificos",
                subject: "Metodologia Científica",
                question: "Qual método de pesquisa combina dados numéricos e interpretação qualitativa?",
                options: [
                    "Método quantitativo",
                    "Método qualitativo",
                    "Método misto",
                    "Método experimental"
                ],
                correct: 2,
                explanation: "O método misto combina abordagens quantitativas (dados numéricos) e qualitativas (interpretação e significados) para uma análise mais completa."
            }
        ],
       'tics-dados': [
    {
        id: 7,
        category: "conhecimentos-especificos",
        subject: "TICs e Dados",
        question: "O que são Tecnologias da Informação e Comunicação (TICs)?",
        options: [
            "Apenas computadores e internet",
            "Tecnologias para processamento, armazenamento e transmissão de informações",
            "Somente redes sociais",
            "Exclusivamente software de escritório"
        ],
        correct: 1,
        explanation: "TICs são tecnologias que permitem o processamento, armazenamento e transmissão de informações de forma digital, incluindo hardware, software, redes e telecomunicações."
    },
    {
        id: 11,
        category: "conhecimentos-especificos",
        subject: "TICs e Dados",
        question: "Como as TICs contribuem para a modernização da administração pública?",
        options: [
            "Aumentando a burocracia",
            "Reduzindo a transparência",
            "Promovendo governo eletrônico e eficiência",
            "Eliminando a participação cidadã"
        ],
        correct: 2,
        explanation: "As TICs modernizam a administração pública através do governo eletrônico, maior transparência, eficiência operacional e melhor participação cidadã."
    },
    {
        id: 16,
        category: "conhecimentos-especificos",
        subject: "TICs e Dados",
        question: "Qual dessas NÃO é uma característica da computação em nuvem?",
        options: [
            "Autoatendimento sob demanda",
            "Amplo acesso à rede",
            "Pool de recursos dedicados",
            "Elasticidade rápida"
        ],
        correct: 2,
        explanation: "A computação em nuvem utiliza pool de recursos compartilhados, não dedicados, conforme definição do NIST (Instituto Nacional de Padrões e Tecnologia dos Estados Unidos)."
    },
    {
        id: 20,
        category: "conhecimentos-especificos",
        subject: "TICs e Dados",
        question: "Qual desses é um benefício da análise de dados (big data) no setor público?",
        options: [
            "Tomada de decisão baseada em evidências",
            "Eliminação completa de erros humanos",
            "Redução absoluta de custos operacionais",
            "Substituição de todos os processos analógicos"
        ],
        correct: 0,
        explanation: "O principal benefício é possibilitar decisões baseadas em evidências, embora não elimine completamente erros ou reduza custos de forma absoluta."
    },
    {
        id: 58,
        category: "conhecimentos-especificos",
        subject: "TICs e Dados",
        question: "Qual dessas tecnologias é mais adequada para tratamento de grandes volumes de dados estruturados e não estruturados?",
        options: [
            "Blockchain",
            "Big Data",
            "Realidade virtual",
            "Internet das Coisas"
        ],
        correct: 1,
        explanation: "Tecnologias de Big Data são especializadas no tratamento de grandes volumes de dados, tanto estruturados quanto não estruturados."
    },
    {
        id: 101,
        category: "conhecimentos-especificos",
        subject: "TICs",
        question: "A interoperabilidade entre sistemas de informação é fundamental para a eficiência das TICs. Assinale a alternativa que melhor define esse conceito:",
        options: [
            "Capacidade de um sistema se comunicar e compartilhar dados com outros sistemas, independentemente de plataformas ou tecnologias.",
            "Processo de padronização de hardware para evitar incompatibilidades entre dispositivos.",
            "Método exclusivo de criptografia usado em redes privadas virtuais (VPNs).",
            "Sistema de backup automatizado para garantir redundância de dados."
        ],
        correct: 0,
        explanation: "Interoperabilidade é a capacidade de diferentes sistemas trocarem informações de forma eficiente e independente da tecnologia utilizada, o que é essencial para integração e comunicação nas TICs."
    },
    {
        id: 102,
        category: "conhecimentos-especificos",
        subject: "Big Data",
        question: "Os '5 Vs' do Big Data incluem Volume, Velocidade, Variedade, Veracidade e:",
        options: [
            "Virtualização.",
            "Valor.",
            "Vulnerabilidade.",
            "Vigilância."
        ],
        correct: 1,
        explanation: "O 'Valor' é o quinto V do Big Data, pois representa a utilidade real que os dados podem trazer quando analisados corretamente."
    },
    {
        id: 103,
        category: "conhecimentos-especificos",
        subject: "IoT",
        question: "Um desafio crítico na implementação de soluções de IoT em ambientes industriais (IIoT) é:",
        options: [
            "A falta de dispositivos com sensores no mercado.",
            "A necessidade de protocolos de comunicação unificados para integração de sistemas heterogêneos.",
            "O custo insignificante de armazenamento de dados gerados.",
            "A ausência de aplicações comerciais para IoT."
        ],
        correct: 1,
        explanation: "A interoperabilidade é um dos maiores gargalos em ambientes heterogêneos, e um dos principais desafios da IoT em ambientes industriais."
    },
    {
        id: 104,
        category: "conhecimentos-especificos",
        subject: "Ciência de Dados",
        question: "Na fase de 'preparação de dados' do ciclo de vida da Ciência de Dados, qual técnica é usada para lidar com valores ausentes em um conjunto de dados?",
        options: [
            "One-Hot Encoding.",
            "Imputação.",
            "Tokenização.",
            "Clusterização."
        ],
        correct: 1,
        explanation: "Imputação é a técnica que substitui dados ausentes por estimativas, como média, mediana ou valores preditivos."
    },
    {
        id: 105,
        category: "conhecimentos-especificos",
        subject: "LGPD",
        question: "De acordo com a LGPD, qual é o prazo máximo para que um controlador responda a uma solicitação de acesso a dados pessoais pelo titular?",
        options: [
            "15 dias.",
            "30 dias.",
            "10 dias.",
            "45 dias."
        ],
        correct: 0,
        explanation: "Segundo a LGPD, o controlador pode enviar uma resposta imediata ou dentro de 15 dias corridos ao titular dos dados."
    },
    {
        id: 106,
        category: "conhecimentos-especificos",
        subject: "Inteligência Artificial",
        question: "Qual tipo de aprendizado de máquina é usado quando um modelo é treinado com dados rotulados?",
        options: [
            "Aprendizado não supervisionado.",
            "Aprendizado por reforço.",
            "Aprendizado supervisionado.",
            "Aprendizado semi-supervisionado."
        ],
        correct: 2,
        explanation: "O aprendizado supervisionado utiliza dados rotulados para ensinar o modelo a prever saídas com base em entradas específicas."
    },
    {
        id: 107,
        category: "conhecimentos-especificos",
        subject: "Governança de Dados",
        question: "Qual componente da governança de dados define políticas para garantir a qualidade e a integridade dos dados?",
        options: [
            "Catálogo de dados.",
            "Data Stewardship.",
            "Linhagem de dados.",
            "Master Data Management (MDM)."
        ],
        correct: 1,
        explanation: "Data Stewardship se refere à prática de supervisionar a qualidade, integridade e consistência dos dados na organização."
    },
    {
        id: 108,
        category: "conhecimentos-especificos",
        subject: "Big Data",
        question: "O processo de 'Data Lake' diferencia-se de um 'Data Warehouse' principalmente porque:",
        options: [
            "Armazena apenas dados estruturados.",
            "Exige schema-on-write (esquema definido antes da ingestão).",
            "Permite armazenar dados brutos em qualquer formato (estruturados, semi-estruturados ou não estruturados).",
            "Não suporta ferramentas de análise em tempo real."
        ],
        correct: 2,
        explanation: "Um Data Lake permite armazenar dados em seu formato bruto, sem necessidade de esquema pré-definido."
    },
    {
        id: 109,
        category: "conhecimentos-especificos",
        subject: "LGPD",
        question: "Qual princípio da LGPD determina que os dados pessoais devem ser utilizados apenas para finalidades específicas e informadas ao titular?",
        options: [
            "Princípio da finalidade.",
            "Princípio da não discriminação.",
            "Princípio da transparência.",
            "Princípio da necessidade."
        ],
        correct: 0,
        explanation: "O princípio da finalidade exige que os dados sejam coletados para propósitos legítimos, específicos e informados previamente ao titular."
    },
    {
        id: 110,
        category: "conhecimentos-especificos",
        subject: "IoT",
        question: "Em Smart Cities, sensores de IoT são frequentemente usados para:",
        options: [
            "Substituir totalmente a infraestrutura física por virtualização.",
            "Monitorar tráfego, qualidade do ar e consumo de energia em tempo real.",
            "Eliminar a necessidade de governança de dados.",
            "Reduzir a dependência de Big Data."
        ],
        correct: 1,
        explanation: "Sensores em cidades inteligentes ajudam a monitorar condições em tempo real, permitindo tomada de decisão mais eficiente."
    },
    {
        id: 111,
        category: "conhecimentos-especificos",
        subject: "Ciência de Dados",
        question: "Qual técnica de visualização é mais adequada para representar a correlação entre duas variáveis contínuas?",
        options: [
            "Gráfico de barras.",
            "Gráfico de dispersão (scatter plot).",
            "Histograma.",
            "Mapa de calor (heatmap)."
        ],
        correct: 1,
        explanation: "O gráfico de dispersão permite visualizar a relação entre duas variáveis contínuas e identificar padrões ou correlações."
    },
    {
        id: 112,
        category: "conhecimentos-especificos",
        subject: "Redes e IoT",
        question: "O protocolo MQTT (Message Queuing Telemetry Transport) é amplamente utilizado em IoT devido à sua capacidade de:",
        options: [
            "Transmitir grandes volumes de dados não estruturados com alta latência.",
            "Operar com baixo consumo de energia e largura de banda, ideal para dispositivos limitados.",
            "Substituir totalmente o TCP/IP em redes industriais.",
            "Priorizar a criptografia de dados em detrimento da performance."
        ],
        correct: 1,
        explanation: "MQTT é ideal para dispositivos com recursos limitados por ser leve, eficiente e operar com baixo consumo de energia."
    },
    {
        id: 113,
        category: "conhecimentos-especificos",
        subject: "LGPD",
        question: "Qual órgão é responsável pela fiscalização do cumprimento da LGPD no Brasil?",
        options: [
            "ANATEL.",
            "Autoridade Nacional de Proteção de Dados (ANPD).",
            "BACEN.",
            "SERPRO."
        ],
        correct: 1,
        explanation: "A ANPD é o órgão criado especificamente para regulamentar e fiscalizar o cumprimento da LGPD no Brasil."
    },
    {
        id: 114,
        category: "conhecimentos-especificos",
        subject: "Inteligência Artificial",
        question: "O termo 'overfitting' em machine learning refere-se a:",
        options: [
            "Um modelo que generaliza bem para dados não vistos.",
            "Um modelo excessivamente adaptado aos dados de treinamento, perdendo capacidade de generalização.",
            "A técnica de aumentar o tamanho do dataset para melhorar a acurácia.",
            "A divisão equilibrada entre dados de treino e teste."
        ],
        correct: 1,
        explanation: "Overfitting ocorre quando o modelo aprende tão bem os dados de treino que não consegue generalizar para novos dados."
    },
    {
        id: 115,
        category: "conhecimentos-especificos",
        subject: "Governança de Dados",
        question: "A 'linhagem de dados' (data lineage) é importante porque:",
        options: [
            "Garante que todos os dados sejam armazenados em nuvem.",
            "Rastreia a origem, transformações e fluxo dos dados ao longo do tempo.",
            "Substitui a necessidade de metadados.",
            "Aplica automaticamente técnicas de anonimização."
        ],
        correct: 1,
        explanation: "A linhagem de dados permite rastrear todo o caminho percorrido pelos dados desde sua origem até o uso final."
    },
    {
        id: 116,
        category: "conhecimentos-especificos",
        subject: "Cloud Computing",
        question: "Uma das principais vantagens do modelo de computação em nuvem (cloud computing) é:",
        options: [
            "A obrigatoriedade do uso de servidores locais.",
            "A eliminação total de custos operacionais.",
            "A escalabilidade, permitindo ajustar recursos conforme a demanda.",
            "A proibição do acesso remoto por motivos de segurança."
        ],
        correct: 2,
        explanation: "A escalabilidade é uma das maiores vantagens da nuvem, permitindo aumentar ou reduzir recursos conforme a necessidade."
    },
    {
        id: 117,
        category: "conhecimentos-especificos",
        subject: "Blockchain",
        question: "O principal diferencial da tecnologia blockchain em relação a bancos de dados tradicionais é:",
        options: [
            "Sua capacidade de armazenar apenas dados não estruturados.",
            "A centralização das transações em um único servidor.",
            "A imutabilidade e o registro distribuído das informações.",
            "O uso exclusivo para aplicações financeiras."
        ],
        correct: 2,
        explanation: "Blockchain é imutável e distribuído, o que garante mais segurança e confiança entre as partes envolvidas."
    },
    {
        id: 118,
        category: "conhecimentos-especificos",
        subject: "Redes Móveis",
        question: "Uma característica do 5G que o torna ideal para aplicações de IoT em tempo real é:",
        options: [
            "Alta latência e maior consumo energético.",
            "Maior largura de banda e baixa latência.",
            "Exclusividade para uso doméstico.",
            "Limitação à comunicação entre smartphones apenas."
        ],
        correct: 1,
        explanation: "O 5G permite comunicação em tempo real por ter baixa latência e altíssima velocidade de transmissão."
    },
    {
        id: 119,
        category: "conhecimentos-especificos",
        subject: "DevOps",
        question: "No contexto de DevOps, o termo CI/CD refere-se a:",
        options: [
            "Ciclo de Interface e Codificação Direta.",
            "Integração Contínua e Entrega Contínua.",
            "Controle Interno e Desenvolvimento Colaborativo.",
            "Conectividade Integrada e Desempenho Computacional."
        ],
        correct: 1,
        explanation: "CI/CD é um processo de automação para integrar e entregar código continuamente, reduzindo erros e acelerando entregas."
    },
    {
        id: 120,
        category: "conhecimentos-especificos",
        subject: "Edge Computing",
        question: "O modelo de Edge Computing busca resolver qual limitação dos modelos tradicionais de nuvem?",
        options: [
            "A falta de conectividade entre dispositivos móveis.",
            "A dependência de GPUs para processamento local.",
            "A latência causada pela centralização do processamento em data centers distantes.",
            "A necessidade de conexão via satélite para todas as operações."
        ],
        correct: 2,
        explanation: "Edge Computing processa os dados mais próximos da fonte para reduzir a latência causada por servidores distantes na nuvem."
    }
 ],
        'politicas-cti': [
            {
                id: 8,
                category: "conhecimentos-especificos",
                subject: "Políticas CT&I",
                question: "O que são políticas de Ciência, Tecnologia e Inovação (CT&I)?",
                options: [
                    "Apenas investimentos em universidades",
                    "Políticas públicas para promover desenvolvimento científico e tecnológico",
                    "Somente regulamentação de patentes",
                    "Exclusivamente financiamento de startups"
                ],
                correct: 1,
                explanation: "Políticas de CT&I são políticas públicas voltadas para promover o desenvolvimento científico e tecnológico através de investimentos, incentivos e marcos regulatórios adequados."
            },
            {
                id: 9,
                category: "conhecimentos-especificos",
                subject: "Políticas CT&I",
                question: "Qual é o objetivo principal das políticas de Ciência, Tecnologia e Inovação?",
                options: [
                    "Reduzir gastos públicos",
                    "Promover desenvolvimento científico-tecnológico nacional",
                    "Eliminar universidades públicas",
                    "Concentrar pesquisa em empresas privadas"
                ],
                correct: 1,
                explanation: "As políticas de CT&I visam promover o desenvolvimento científico-tecnológico nacional através de financiamento à pesquisa, formação de recursos humanos e incentivos à inovação."
            },
            {
                id: 41,
                category: "conhecimentos-especificos",
                subject: "Políticas CT&I",
                question: "O Marco Legal da Ciência, Tecnologia e Inovação (Lei 13.243/2016) trouxe como inovação:",
                options: [
                    "Restrição às parcerias público-privadas",
                    "Flexibilização nas contratações de pesquisadores",
                    "Proibição de compartilhamento de infraestrutura",
                    "Fim dos incentivos fiscais para pesquisa"
                ],
                correct: 1,
                explanation: "O Marco Legal de CTI trouxe flexibilização nas contratações e maior facilidade para parcerias público-privadas em pesquisa."
            }
        ],
        'lgpd': [
            {
                id: 13,
                category: "conhecimentos-especificos",
                subject: "LGPD",
                question: "Um órgão público pretende implementar um sistema de inteligência artificial para análise de processos. De acordo com a LGPD, é CORRETO afirmar que:",
                options: [
                    "O tratamento de dados pessoais é permitido sem consentimento quando necessário para a execução de política pública",
                    "Dados anonimizados não estão sujeitos às regras da LGPD",
                    "O controlador dos dados é sempre a autoridade máxima do órgão",
                    "O encarregado (DPO) deve ser necessariamente um servidor público concursado"
                ],
                correct: 0,
                explanation: "A LGPD permite o tratamento sem consentimento para execução de política pública (Art. 7º, IV). Dados anonimizados só estão fora do escopo se não puderem ser reidentificados. O controlador pode ser a pessoa jurídica, não necessariamente a autoridade máxima. O DPO pode ser terceirizado."
            },
            {
                id: 15,
                category: "conhecimentos-especificos",
                subject: "LGPD",
                question: "A Lei Geral de Proteção de Dados (LGPD) aplica-se ao tratamento de dados pessoais realizado:",
                options: [
                    "Apenas por empresas privadas",
                    "Por qualquer pessoa física ou jurídica, inclusive o poder público",
                    "Exclusivamente a operações comerciais",
                    "Somente quando há finalidade lucrativa"
                ],
                correct: 1,
                explanation: "A LGPD aplica-se a todo tratamento de dados pessoais, independentemente do meio, país sede ou país onde os dados estão localizados, inclusive pelo poder público."
            },
            {
                id: 30,
                category: "conhecimentos-especificos",
                subject: "LGPD",
                question: "Qual desses é um princípio da proteção de dados pessoais na LGPD?",
                options: [
                    "Finalidade específica",
                    "Armazenamento indefinido",
                    "Compartilhamento irrestrito",
                    "Coleta máxima de dados"
                ],
                correct: 0,
                explanation: "A LGPD estabelece como princípios: finalidade, adequação, necessidade, livre acesso, qualidade dos dados, transparência, segurança, prevenção, não discriminação e responsabilização."
            },
            {
                id: 31,
                category: "conhecimentos-especificos",
                subject: "LGPD",
                question: "O encarregado (DPO) na LGPD tem como função principal:",
                options: [
                    "Tomar todas as decisões sobre tratamento de dados",
                    "Ser o único responsável por conformidade",
                    "Atuar como canal de comunicação entre controlador, titulares e ANPD",
                    "Substituir a área jurídica da organização"
                ],
                correct: 2,
                explanation: "O DPO atua como canal de comunicação e auxilia na conformidade, mas não assume sozinho toda a responsabilidade nem substitui outras áreas."
            },
            {
                id: 32,
                category: "conhecimentos-especificos",
                subject: "LGPD",
                question: "Qual dessas NÃO é uma hipótese de tratamento de dados pessoais sem consentimento na LGPD?",
                options: [
                    "Execução de contrato",
                    "Interesse legítimo do controlador",
                    "Política pública",
                    "Finalidade comercial"
                ],
                correct: 3,
                explanation: "Finalidade comercial por si só não autoriza tratamento sem consentimento, a menos que enquadrada em outra hipótese legal."
            },
            {
                id: 33,
                category: "conhecimentos-especificos",
                subject: "LGPD",
                question: "A ANPD (Autoridade Nacional de Proteção de Dados) é responsável por:",
                options: [
                    "Substituir o Judiciário em casos de violação",
                    "Fiscalizar e aplicar sanções por descumprimento da LGPD",
                    "Controlar todos os bancos de dados do país",
                    "Definir políticas de segurança para todas as empresas"
                ],
                correct: 1,
                explanation: "A ANPD é órgão fiscalizador da LGPD, podendo aplicar sanções, mas não substitui o Judiciário ou controla bancos de dados diretamente."
            },
            {
                id: 34,
                category: "conhecimentos-especificos",
                subject: "LGPD",
                question: "Qual desses NÃO é um direito do titular na LGPD?",
                options: [
                    "Revogar consentimento",
                    "Solicitar eliminação de dados",
                    "Exigir indenização automática por qualquer tratamento",
                    "Acessar seus dados pessoais"
                ],
                correct: 2,
                explanation: "O titular não tem direito a indenização automática, que depende de comprovação de dano e nexo causal."
            },
            {
                id: 35,
                category: "conhecimentos-especificos",
                subject: "LGPD",
                question: "O relatório de impacto à proteção de dados (RIPD) é obrigatório quando o tratamento:",
                options: [
                    "Envolve qualquer dado pessoal",
                    "Pode gerar riscos às liberdades civis",
                    "É feito por órgãos públicos",
                    "Utiliza inteligência artificial"
                ],
                correct: 1,
                explanation: "O RIPD é obrigatório para tratamentos que possam gerar riscos às liberdades civis e direitos fundamentais."
            },
            {
                id: 36,
                category: "conhecimentos-especificos",
                subject: "LGPD",
                question: "Qual desses NÃO é um exemplo de dado pessoal sensível na LGPD (Lei Geral de Proteção de Dados Pessoais)?",
                options: [
                    "Opinião política",
                    "Dado biométrico",
                    "Endereço residencial",
                    "Convicção religiosa"
                ],
                correct: 2,
                explanation: "Endereço residencial é dado pessoal comum. Dados sensíveis incluem origem racial, convicção religiosa, opinião política, saúde, vida sexual, genético ou biométrico."
            },
            {
                id: 37,
                category: "conhecimentos-especificos",
                subject: "LGPD",
                question: "A transferência internacional de dados na LGPD:",
                options: [
                    "É sempre proibida",
                    "Pode ocorrer para países com nível adequado de proteção",
                    "Só é permitida para países da América Latina",
                    "Depende exclusivamente do consentimento do titular"
                ],
                correct: 1,
                explanation: "A transferência internacional pode ocorrer para países com nível adequado de proteção ou quando houver garantias específicas."
            },
            {
                id: 38,
                category: "conhecimentos-especificos",
                subject: "LGPD",
                question: "Qual dessas sanções NÃO está prevista na LGPD?",
                options: [
                    "Advertência",
                    "Multa simples de até 2% do faturamento",
                    "Bloqueio de dados",
                    "Prisão do responsável"
                ],
                correct: 3,
                explanation: "A LGPD prevê sanções administrativas como advertência, multa, bloqueio ou eliminação de dados, mas não prevê sanções penais como prisão."
            },
            {
                id: 51,
                category: "conhecimentos-especificos",
                subject: "LGPD",
                question: "O que são \"dados anonimizados\" na LGPD?",
                options: [
                    "Dados que nunca foram associados a um indivíduo",
                    "Dados que não permitem a identificação do titular, considerados os meios técnicos disponíveis",
                    "Dados com nomes substituídos por códigos",
                    "Dados compartilhados apenas internamente no órgão"
                ],
                correct: 1,
                explanation: "Dados anonimizados são aqueles que não permitem a identificação do titular, considerando meios técnicos razoáveis, conforme art. 12 da LGPD."
            }
        ],
        'governo-digital': [
            {
                id: 18,
                category: "conhecimentos-especificos",
                subject: "Governo Digital",
                question: "Qual desses NÃO é um princípio do governo digital?",
                options: [
                    "Orientação por dados",
                    "Segurança e privacidade",
                    "Centralização de todos os serviços",
                    "Interoperabilidade"
                ],
                correct: 2,
                explanation: "O governo digital prega a descentralização coordenada, não a centralização absoluta de serviços."
            },
            {
                id: 19,
                category: "conhecimentos-especificos",
                subject: "Governo Digital",
                question: "A transformação digital no setor público requer:",
                options: [
                    "Apenas aquisição de novas tecnologias",
                    "Mudança cultural e reorganização de processos",
                    "Substituição total de sistemas legados",
                    "Eliminação de todos os processos manuais"
                ],
                correct: 1,
                explanation: "A transformação digital vai além da tecnologia, exigindo mudança cultural e redesign de processos para obter benefícios plenos."
            },
            {
                id: 21,
                category: "conhecimentos-especificos",
                subject: "Governo Digital",
                question: "No contexto de cidades inteligentes (smart cities), qual desses NÃO é um componente essencial?",
                options: [
                    "Infraestrutura de conectividade",
                    "Sensores e IoT",
                    "Centralização de todos os serviços",
                    "Plataformas de dados abertos"
                ],
                correct: 2,
                explanation: "Cidades inteligentes promovem integração e coordenação, não necessariamente centralização absoluta de serviços."
            },
            {
                id: 22,
                category: "conhecimentos-especificos",
                subject: "Governo Digital",
                question: "A interoperabilidade no governo eletrônico refere-se a:",
                options: [
                    "Capacidade de sistemas diferentes trocarem informações",
                    "Uso exclusivo de softwares livres",
                    "Padronização de equipamentos em todos os órgãos",
                    "Eliminação de sistemas legados"
                ],
                correct: 0,
                explanation: "Interoperabilidade é a capacidade de sistemas heterogêneos trocarem informações e processos de forma eficiente."
            },
            {
                id: 23,
                category: "conhecimentos-especificos",
                subject: "Governo Digital",
                question: "Qual dessas iniciativas do governo federal brasileiro promove a interoperabilidade?",
                options: [
                    "Portal da Transparência",
                    "Sistema de Pagamentos Brasileiro",
                    "Estratégia de Governança Digital",
                    "Plataforma Digital de Governo"
                ],
                correct: 2,
                explanation: "A Estratégia de Governança Digital (EGD) estabelece diretrizes para interoperabilidade no governo federal."
            },
            {
                id: 26,
                category: "conhecimentos-especificos",
                subject: "Governo Digital",
                question: "A Lei 14.129/2021 (Governo Digital) estabelece como princípio:",
                options: [
                    "Prevalência do meio digital sobre o analógico",
                    "Obrigatoriedade de uso de blockchain",
                    "Eliminação de todos os sistemas legados",
                    "Proibição de parcerias com o setor privado"
                ],
                correct: 0,
                explanation: "A Lei do Governo Digital estabelece a prevalência do digital sobre o analógico, entre outros princípios como interoperabilidade e segurança."
            },
            {
                id: 42,
                category: "conhecimentos-especificos",
                subject: "Governo Digital",
                question: "Qual desses é um objetivo da Política Nacional de Dados Abertos?",
                options: [
                    "Restringir o acesso a dados governamentais",
                    "Promover transparência e inovação com dados públicos",
                    "Centralizar todos os dados em um único órgão",
                    "Substituir todos os sistemas legados"
                ],
                correct: 1,
                explanation: "A Política de Dados Abertos visa aumentar a transparência e permitir que sociedade e empresas inovem usando dados governamentais."
            },
            {
                id: 44,
                category: "conhecimentos-especificos",
                subject: "Governo Digital",
                question: "Qual desses NÃO é um componente da transformação digital no setor público?",
                options: [
                    "Digitalização de processos",
                    "Manutenção de todos os procedimentos analógicos",
                    "Orientação por dados",
                    "Foco no cidadão"
                ],
                correct: 1,
                explanation: "A transformação digital implica em mudança para processos digitais, não manutenção de procedimentos analógicos."
            },
            {
                id: 45,
                category: "conhecimentos-especificos",
                subject: "Governo Digital",
                question: "O que é a Estratégia de Governança Digital (EGD) do governo federal?",
                options: [
                    "Política para padronização de equipamentos de TI",
                    "Conjunto de diretrizes para transformação digital dos serviços públicos",
                    "Programa de capacitação obrigatória para servidores",
                    "Lei que obriga a contratação de serviços em nuvem"
                ],
                correct: 1,
                explanation: "A EGD estabelece diretrizes para transformação digital, incluindo interoperabilidade, segurança e melhoria de serviços públicos."
            },
            {
                id: 49,
                category: "conhecimentos-especificos",
                subject: "Governo Digital",
                question: "O que é a Plataforma Digital de Governo (PGD) no Brasil?",
                options: [
                    "Sistema único para todos os serviços públicos",
                    "Conjunto de componentes compartilhados para construção de serviços digitais",
                    "Rede social para servidores públicos",
                    "Plataforma de comércio eletrônico governamental"
                ],
                correct: 1,
                explanation: "A PGD oferece componentes compartilhados (como autenticação e pagamentos) para acelerar o desenvolvimento de serviços digitais no governo."
            },
            {
                id: 60,
                category: "conhecimentos-especificos",
                subject: "Governo Digital",
                question: "O que é o Programa Gov.br?",
                options: [
                    "Portal único de acesso a serviços governamentais digitais",
                    "Sistema de gestão de documentos eletrônicos",
                    "Plataforma de comércio eletrônico governamental",
                    "Rede social para servidores públicos"
                ],
                correct: 0,
                explanation: "O Gov.br é o portal unificado do governo federal para acesso a serviços digitais, com autenticação única e personalização."
            },
            {
                id: 64,
                category: "conhecimentos-especificos",
                subject: "Governo Digital",
                question: "O que é a Lei 14.063/2020 (Lei do Digital)?",
                options: [
                    "Lei que estabelece a prevalência do meio digital sobre o físico",
                    "Norma que cria o Ministério da Economia Digital",
                    "Regulamentação exclusiva para comércio eletrônico",
                    "Lei que proíbe totalmente o uso de papel no governo"
                ],
                correct: 0,
                explanation: "A Lei 14.063/2020 estabelece a prevalência do meio digital sobre o físico na relação entre poder público e cidadãos."
            },
            {
                id: 67,
                category: "conhecimentos-especificos",
                subject: "Governo Digital",
                question: "Qual desses NÃO é um princípio da Política de Dados Abertos?",
                options: [
                    "Dados primários",
                    "Granularidade",
                    "Sigilo seletivo",
                    "Não discriminação"
                ],
                correct: 2,
                explanation: "Os princípios são: dados primários, granulares, em tempo hábil, acessíveis, não discriminatórios, não proprietários e livres de licenças."
            },
            {
                id: 68,
                category: "conhecimentos-especificos",
                subject: "Governo Digital",
                question: "O que é o Cadastro Base do Cidadão?",
                options: [
                    "Registro único de dados pessoais de todos os brasileiros",
                    "Base de dados para cruzamento de informações fiscais",
                    "Sistema de identificação biométrica nacional",
                    "Conjunto mínimo de dados para identificação em serviços públicos"
                ],
                correct: 3,
                explanation: "O Cadastro Base contém o conjunto mínimo de dados necessários para identificação do cidadão em serviços públicos digitais."
            },
            {
                id: 80,
                category: "conhecimentos-especificos",
                subject: "Governo Digital",
                question: "O que é o Portal da Transparência?",
                options: [
                    "Sistema de denúncias anônimas",
                    "Plataforma de divulgação de dados e gastos públicos",
                    "Banco de dados de servidores públicos",
                    "Sistema de consulta processual"
                ],
                correct: 1,
                explanation: "O Portal da Transparência é a plataforma que disponibiliza informações sobre gastos e receitas públicas para controle social."
            },
            {
                id: 81,
                category: "conhecimentos-especificos",
                subject: "Governo Digital",
                question: "Qual desses NÃO é um tipo de informação disponível no Portal da Transparência?",
                options: [
                    "Despesas do governo federal",
                    "Salários de servidores",
                    "Dados pessoais de cidadãos comuns",
                    "Transferências para estados e municípios"
                ],
                correct: 2,
                explanation: "O Portal não divulga dados pessoais de cidadãos comuns, protegidos pela LGPD, apenas informações de interesse público."
            }
        ],
        'seguranca': [
            {
                id: 27,
                category: "conhecimentos-especificos",
                subject: "Segurança da Informação",
                question: "No contexto de segurança da informação, a tríade CIA refere-se a:",
                options: [
                    "Confidencialidade, Integridade e Disponibilidade",
                    "Controle, Inspeção e Auditoria",
                    "Criptografia, Identificação e Autenticação",
                    "Contingência, Infraestrutura e Acesso"
                ],
                correct: 0,
                explanation: "A tríade CIA da segurança da informação compreende: Confidencialidade, Integridade e Disponibilidade."
            },
            {
                id: 28,
                category: "conhecimentos-especificos",
                subject: "Segurança da Informação",
                question: "Qual desses NÃO é um tipo comum de ameaça à segurança da informação?",
                options: [
                    "Phishing",
                    "Ransomware",
                    "Cloud computing",
                    "Ataque DDoS"
                ],
                correct: 2,
                explanation: "Cloud computing é modelo de serviço, não ameaça. As demais são ameaças à segurança da informação."
            },
            {
                id: 29,
                category: "conhecimentos-especificos",
                subject: "Segurança da Informação",
                question: "A norma ISO/IEC 27001 trata de:",
                options: [
                    "Gestão da qualidade",
                    "Gestão de segurança da informação",
                    "Gestão de projetos",
                    "Gestão de serviços de TI"
                ],
                correct: 1,
                explanation: "A ISO/IEC 27001 estabelece requisitos para um Sistema de Gestão de Segurança da Informação (SGSI)."
            },
            {
                id: 43,
                category: "conhecimentos-especificos",
                subject: "Segurança da Informação",
                question: "No contexto de cibersegurança, o que é um ataque do tipo \"phishing\"?",
                options: [
                    "Ataque que sobrecarrega um servidor com requisições",
                    "Tentativa de obter informações sensíveis se passando por entidade confiável",
                    "Sequestro de dados com pedido de resgate",
                    "Exploração de vulnerabilidades em sistemas desatualizados"
                ],
                correct: 1,
                explanation: "Phishing é a tentativa fraudulenta de obter informações confidenciais se passando por comunicação confiável, geralmente via e-mail ou mensagem."
            },
            {
                id: 52,
                category: "conhecimentos-especificos",
                subject: "Segurança da Informação",
                question: "Qual dessas NÃO é uma boa prática em segurança da informação?",
                options: [
                    "Atualização regular de sistemas",
                    "Uso de senhas complexas e autenticação multifator",
                    "Compartilhamento de credenciais entre colegas",
                    "Backup regular dos dados"
                ],
                correct: 2,
                explanation: "Compartilhar credenciais viola o princípio da individualidade e é considerada má prática em segurança da informação."
            },
            {
                id: 62,
                category: "conhecimentos-especificos",
                subject: "Segurança da Informação",
                question: "O que é o ICP-Brasil?",
                options: [
                    "Infraestrutura de Chaves Públicas brasileira para certificação digital",
                    "Índice de qualidade de portais governamentais",
                    "Sistema de inteligência artificial do governo",
                    "Programa de inclusão digital"
                ],
                correct: 0,
                explanation: "A ICP-Brasil é a Infraestrutura de Chaves Públicas brasileira, que viabiliza a certificação digital no país."
            },
            {
                id: 63,
                category: "conhecimentos-especificos",
                subject: "Segurança da Informação",
                question: "Qual desses NÃO é um tipo de certificado digital da ICP-Brasil (Infraestrutura de Chaves Públicas brasileira)?",
                options: [
                    "A1",
                    "A3",
                    "S1",
                    "T3"
                ],
                correct: 3,
                explanation: "Os tipos de certificados da ICP-Brasil incluem A1, A2, A3, A4, S1, S2, S3, S4, T3 e T4. \"T3\" existe, mas não é uma opção incorreta como \"S1\"."
            },
            {
                id: 65,
                category: "conhecimentos-especificos",
                subject: "Segurança da Informação",
                question: "Qual desses NÃO é um objetivo da Política Nacional de Segurança da Informação (PNSI)?",
                options: [
                    "Proteção de informações estratégicas do Estado",
                    "Garantia da continuidade dos serviços de TI governamentais",
                    "Controle absoluto de todos os dados pessoais",
                    "Prevenção de incidentes de segurança"
                ],
                correct: 2,
                explanation: "A PNSI não busca controle absoluto de dados pessoais, mas sim proteção de informações estratégicas e continuidade de serviços."
            }
        ],
        'saude-publica': [
            {
                id: 88,
                category: "conhecimentos-especificos",
                subject: "Saúde Pública",
                question: "O que é o Sistema de Informações sobre Orçamentos Públicos em Saúde (SIOPS)?",
                options: [
                    "Sistema que coleta dados sobre gastos em saúde",
                    "Plataforma de agendamento de consultas",
                    "Banco de dados de profissionais de saúde",
                    "Sistema de controle de medicamentos"
                ],
                correct: 0,
                explanation: "O SIOPS coleta informações sobre aplicação de recursos em saúde por entes federativos, conforme exigência constitucional."
            },
            {
                id: 89,
                category: "conhecimentos-especificos",
                subject: "Saúde Pública",
                question: "Qual desses NÃO é um tipo de informação disponível no SIOPS(Sistema de Informações sobre Orçamentos Públicos em Saúde)?",
                options: [
                    "Receitas destinadas à saúde",
                    "Despesas executadas em saúde",
                    "Prontuários médicos de pacientes",
                    "Recursos transferidos entre entes"
                ],
                correct: 2,
                explanation: "O SIOPS não contém dados individuais de pacientes, apenas informações consolidadas sobre financiamento da saúde."
            },
            {
                id: 90,
                category: "conhecimentos-especificos",
                subject: "Saúde Pública",
                question: "O que é o Sistema de Informações sobre Mortalidade (SIM)?",
                options: [
                    "Banco de dados nacional de óbitos",
                    "Sistema de notificação de doenças",
                    "Plataforma de vigilância epidemiológica",
                    "Registro de causas de mortes violentas"
                ],
                correct: 0,
                explanation: "O SIM é o sistema nacional que coleta dados sobre mortalidade no país, fundamental para políticas de saúde pública."
            },
            {
                id: 91,
                category: "conhecimentos-especificos",
                subject: "Saúde Pública",
                question: "Qual desses NÃO é um objetivo do SIM(Sistema de Informações sobre Mortalidade)?",
                options: [
                    "Identificar causas de morte",
                    "Subsidiar políticas de saúde",
                    "Monitorar epidemias",
                    "Controlar estoques de medicamentos"
                ],
                correct: 3,
                explanation: "O SIM não gerencia estoques de medicamentos, mas fornece dados para análise epidemiológica."
            },
            {
                id: 92,
                category: "conhecimentos-especificos",
                subject: "Saúde Pública",
                question: "O que é o Sistema de Informações Hospitalares (SIH)?",
                options: [
                    "Sistema que processa dados de internações hospitalares no SUS",
                    "Plataforma de agendamento de cirurgias eletivas",
                    "Banco de dados de profissionais hospitalares",
                    "Sistema de controle de leitos em tempo real"
                ],
                correct: 0,
                explanation: "O SIH é o sistema do Ministério da Saúde que processa informações sobre internações hospitalares financiadas pelo SUS, incluindo Autorizações de Internação Hospitalar (AIH)."
            },
            {
                id: 93,
                category: "conhecimentos-especificos",
                subject: "Saúde Pública",
                question: "Qual desses NÃO é um objetivo do SIH (Sistema de Informações Hospitalares )?",
                options: [
                    "Controle de gastos com internações hospitalares",
                    "Pagamento aos estabelecimentos de saúde",
                    "Gestão de prontuários eletrônicos individuais",
                    "Planejamento da rede hospitalar"
                ],
                correct: 2,
                explanation: "O SIH não gerencia prontuários individuais, mas sim informações consolidadas para fins de pagamento, controle e planejamento."
            },
            {
                id: 94,
                category: "conhecimentos-especificos",
                subject: "Saúde Pública",
                question: "O que é o Sistema de Informações Ambulatoriais (SIA)?",
                options: [
                    "Sistema de registro de atendimentos ambulatoriais no SUS",
                    "Plataforma de telemedicina",
                    "Agenda eletrônica para consultas",
                    "Sistema de prontuário eletrônico"
                ],
                correct: 0,
                explanation: "O SIA registra procedimentos ambulatoriais realizados no SUS, incluindo consultas, exames e pequenas cirurgias, para fins de pagamento e gestão."
            },
            {
                id: 95,
                category: "conhecimentos-especificos",
                subject: "Saúde Pública",
                question: "Qual desses NÃO é um tipo de informação processada pelo SIA (Sistema de Informações sobre Nascidos Vivos)?",
                options: [
                    "Procedimentos ambulatoriais realizados",
                    "Medicamentos dispensados",
                    "Laudos de exames detalhados",
                    "Recursos financeiros repassados"
                ],
                correct: 2,
                explanation: "O SIA não armazena laudos completos, mas sim informações consolidadas sobre procedimentos realizados e recursos financeiros."
            },
            {
                id: 96,
                category: "conhecimentos-especificos",
                subject: "Saúde Pública",
                question: "O que é o Sistema de Informações sobre Nascidos Vivos (SINASC)?",
                options: [
                    "Banco de dados nacional de nascimentos",
                    "Sistema de acompanhamento pré-natal",
                    "Registro de fertilizações in vitro",
                    "Plataforma de adoção"
                ],
                correct: 0,
                explanation: "O SINASC é o sistema nacional que coleta dados sobre nascimentos no país, fundamental para políticas de saúde materno-infantil."
            },
            {
                id: 97,
                category: "conhecimentos-especificos",
                subject: "Saúde Pública",
                question: "Qual desses NÃO é um objetivo do SINASC (Sistema de Informações sobre Nascidos Vivos)?",
                options: [
                    "Identificar características dos nascimentos",
                    "Subsidiar políticas de saúde infantil",
                    "Monitorar taxas de natalidade",
                    "Controlar estoques de vacinas"
                ],
                correct: 3,
                explanation: "O SINASC não gerencia estoques de vacinas, mas fornece dados epidemiológicos sobre nascimentos."
            },
            {
                id: 98,
                category: "conhecimentos-especificos",
                subject: "Saúde Pública",
                question: "O que é o Sistema de Informações sobre Imunizações (SI-PNI)?",
                options: [
                    "Sistema que registra vacinas aplicadas no país",
                    "Banco de dados de reações adversas",
                    "Plataforma de pesquisa de novas vacinas",
                    "Sistema de controle de epidemias"
                ],
                correct: 0,
                explanation: "O SI-PNI registra as doses de vacinas aplicadas no Brasil, permitindo o monitoramento da cobertura vacinal."
            },
            {
                id: 99,
                category: "conhecimentos-especificos",
                subject: "Saúde Pública",
                question: "Qual desses NÃO é um tipo de informação disponível no SI-PNI (Sistema de Informações sobre Imunizações)?",
                options: [
                    "Doses aplicadas por tipo de vacina",
                    "Cobertura vacinal por região",
                    "Prontuários completos dos vacinados",
                    "Estoques de vacinas por município"
                ],
                correct: 2,
                explanation: "O SI-PNI não armazena prontuários completos, mas sim informações consolidadas sobre aplicação de vacinas."
            },
            {
                id: 100,
                category: "conhecimentos-especificos",
                subject: "Saúde Pública",
                question: "O que é o Sistema de Informações sobre Agravos de Notificação (SINAN)?",
                options: [
                    "Banco de dados de doenças de notificação compulsória",
                    "Sistema de alerta epidemiológico",
                    "Plataforma de pesquisa clínica",
                    "Registro de surtos infecciosos"
                ],
                correct: 0,
                explanation: "O SINAN é o sistema nacional que coleta dados sobre doenças e agravos de notificação compulsória no Brasil."
            }
        ],
        'outros': [
            {
                id: 17,
                category: "conhecimentos-especificos",
                subject: "Governança de TI",
                question: "No contexto de governança de TI, o framework COBIT tem como objetivo principal:",
                options: [
                    "Substituir todos os outros frameworks de governança",
                    "Alinhar TI aos objetivos de negócio",
                    "Reduzir custos de infraestrutura",
                    "Automatizar todos os processos de TI"
                ],
                correct: 1,
                explanation: "O COBIT (Control Objectives for Information and Related Technologies) é um framework para alinhar TI aos objetivos de negócio e garantir governança eficaz."
            },
            {
                id: 24,
                category: "conhecimentos-especificos",
                subject: "Tecnologia",
                question: "O blockchain no setor público pode ser aplicado para:",
                options: [
                    "Eliminar completamente a necessidade de confiança",
                    "Rastreabilidade de processos e documentos",
                    "Substituir todos os bancos de dados tradicionais",
                    "Eliminar a necessidade de regulamentação"
                ],
                correct: 1,
                explanation: "Blockchain é útil para rastreabilidade e segurança de processos, mas não elimina completamente a necessidade de confiança ou regulamentação."
            },
            {
                id: 25,
                category: "conhecimentos-especificos",
                subject: "Inteligência Artificial",
                question: "Qual desses NÃO é um desafio da inteligência artificial no setor público?",
                options: [
                    "Viés algorítmico",
                    "Falta de dados de qualidade",
                    "Necessidade de capacitação técnica",
                    "Excesso de regulamentação específica"
                ],
                correct: 3,
                explanation: "A IA no setor público enfrenta mais a falta de regulamentação adequada do que excesso de normas específicas."
            },
            {
                id: 39,
                category: "conhecimentos-especificos",
                subject: "Licitações",
                question: "No contexto de contratações de TI pelo governo, o que é pregão eletrônico?",
                options: [
                    "Modalidade de licitação realizada exclusivamente por meio eletrônico",
                    "Sistema de compras diretas sem licitação",
                    "Processo de contratação emergencial",
                    "Modalidade exclusiva para compra de softwares"
                ],
                correct: 0,
                explanation: "Pregão eletrônico é modalidade de licitação realizada em sessão pública por meio eletrônico, prevista na Lei 10.520/2002."
            },
            {
                id: 40,
                category: "conhecimentos-especificos",
                subject: "Software Livre",
                question: "Qual desses NÃO é um benefício do software livre no setor público?",
                options: [
                    "Independência de fornecedores",
                    "Redução de custos com licenças",
                    "Maior controle sobre o código-fonte",
                    "Garantia absoluta de segurança"
                ],
                correct: 3,
                explanation: "Software livre não garante segurança absoluta, que depende da implementação e manutenção adequadas."
            },
            {
                id: 46,
                category: "conhecimentos-especificos",
                subject: "Computação em Nuvem",
                question: "Qual desses NÃO é um benefício da computação em nuvem para o governo?",
                options: [
                    "Escalabilidade de recursos",
                    "Redução de custos com infraestrutura física",
                    "Eliminação completa de riscos de segurança",
                    "Maior flexibilidade para inovação"
                ],
                correct: 2,
                explanation: "A nuvem não elimina completamente riscos de segurança, que devem ser gerenciados com políticas e controles adequados."
            },
            {
                id: 47,
                category: "conhecimentos-especificos",
                subject: "Inteligência Artificial",
                question: "No contexto de inteligência artificial, o que é \"bias algorítmico\"?",
                options: [
                    "Tendência do algoritmo a produzir resultados distorcidos ou discriminatórios",
                    "Método para otimização de processamento",
                    "Técnica de aprendizado de máquina supervisionado",
                    "Erro aleatório em sistemas de IA"
                ],
                correct: 0,
                explanation: "Bias algorítmico refere-se a tendências discriminatórias ou distorcidas nos resultados de sistemas de IA, muitas vezes refletindo vieses presentes nos dados de treinamento."
            },
            {
                id: 48,
                category: "conhecimentos-especificos",
                subject: "Tecnologia",
                question: "Qual dessas tecnologias é mais adequada para garantir autenticidade de documentos digitais?",
                options: [
                    "Blockchain",
                    "Computação em nuvem",
                    "Big Data",
                    "Internet das Coisas"
                ],
                correct: 0,
                explanation: "Blockchain é especialmente útil para garantir autenticidade e não repúdio em documentos digitais devido às suas características de imutabilidade e descentralização."
            },
            {
                id: 50,
                category: "conhecimentos-especificos",
                subject: "Cidades Inteligentes",
                question: "Qual desses NÃO é um desafio na implementação de cidades inteligentes?",
                options: [
                    "Integração de sistemas heterogêneos",
                    "Proteção de privacidade e dados pessoais",
                    "Falta de padrões e interoperabilidade",
                    "Excesso de regulamentação específica"
                ],
                correct: 3,
                explanation: "O desafio nas cidades inteligentes é mais a falta de regulamentação adequada do que excesso de normas específicas."
            },
            {
                id: 53,
                category: "conhecimentos-especificos",
                subject: "Sustentabilidade",
                question: "No contexto de contratação de soluções de TI pelo governo, o que é TIC Verde?",
                options: [
                    "Uso de tecnologias da informação com menor impacto ambiental",
                    "Software exclusivo para monitoramento ambiental",
                    "Sistema de compras sustentáveis",
                    "Plataforma para denúncias de crimes ambientais"
                ],
                correct: 0,
                explanation: "TIC Verde refere-se ao uso de tecnologias da informação e comunicação com menor impacto ambiental, considerando todo o ciclo de vida."
            },
            {
                id: 54,
                category: "conhecimentos-especificos",
                subject: "Governo Eletrônico",
                question: "Qual desses é um componente da arquitetura de serviços do governo eletrônico?",
                options: [
                    "Blockchain obrigatório",
                    "Serviços centralizados em um único órgão",
                    "Padrões de interoperabilidade",
                    "Eliminação de todos os sistemas legados"
                ],
                correct: 2,
                explanation: "Padrões de interoperabilidade são essenciais para arquitetura de serviços no governo eletrônico, permitindo integração entre sistemas."
            },
            {
                id: 55,
                category: "conhecimentos-especificos",
                subject: "Gestão de TI",
                question: "O que é o Sistema de Administração dos Recursos de Tecnologia da Informação (SISP)?",
                options: [
                    "Conjunto de normas para gestão de TI no governo federal",
                    "Software único para todos os órgãos públicos",
                    "Sistema de compras centralizadas de TI",
                    "Programa de capacitação em TI para servidores"
                ],
                correct: 0,
                explanation: "O SISP é o sistema que estabelece normas e diretrizes para gestão de TI no âmbito do governo federal brasileiro."
            },
            {
                id: 56,
                category: "conhecimentos-especificos",
                subject: "UX",
                question: "Qual desses NÃO é um princípio do design centrado no usuário para serviços públicos digitais?",
                options: [
                    "Complexidade para garantir segurança",
                    "Acessibilidade",
                    "Simplicidade",
                    "Eficiência"
                ],
                correct: 0,
                explanation: "Design centrado no usuário busca simplicidade e usabilidade, sem sacrificar segurança, mas evitando complexidade desnecessária."
            },
            {
                id: 57,
                category: "conhecimentos-especificos",
                subject: "Governança Digital",
                question: "O que é o Digital Governance Framework (DGF) do governo federal?",
                options: [
                    "Modelo de governança para transformação digital dos serviços públicos",
                    "Sistema de certificação digital obrigatório",
                    "Plataforma única de serviços ao cidadão",
                    "Programa de substituição de sistemas legados"
                ],
                correct: 0,
                explanation: "O DGF é o modelo de governança que estabelece padrões e diretrizes para a transformação digital no governo federal."
            },
            {
                id: 59,
                category: "conhecimentos-especificos",
                subject: "Gestão de Dados",
                question: "Qual desses NÃO é um componente típico de uma arquitetura de dados governamental?",
                options: [
                    "Data Lake",
                    "Catálogo de dados",
                    "API de integração",
                    "Processador de texto simples"
                ],
                correct: 3,
                explanation: "Processador de texto simples não é componente de arquitetura de dados, que inclui soluções como data lakes, catálogos e APIs para integração."
            },
            {
                id: 61,
                category: "conhecimentos-especificos",
                subject: "Identidade Digital",
                question: "Qual desses NÃO é um benefício da identidade digital no governo?",
                options: [
                    "Redução de fraudes",
                    "Maior conveniência para o cidadão",
                    "Eliminação completa de documentos físicos",
                    "Simplificação de acesso a serviços"
                ],
                correct: 2,
                explanation: "A identidade digital não elimina completamente a necessidade de documentos físicos em todas as situações, embora reduza significativamente."
            },
            {
                id: 66,
                category: "conhecimentos-especificos",
                subject: "Sistemas Governamentais",
                question: "O que é o Sistema de Informações do Governo Federal (SIGF)?",
                options: [
                    "Plataforma única de dados abertos",
                    "Conjunto integrado de sistemas para gestão governamental",
                    "Sistema de inteligência artificial para políticas públicas",
                    "Banco de dados centralizado de todos os cidadãos"
                ],
                correct: 1,
                explanation: "O SIGF é o conjunto de sistemas integrados para gestão de processos governamentais no âmbito federal."
            },
            {
                id: 69,
                category: "conhecimentos-especificos",
                subject: "Governança Digital",
                question: "Qual desses NÃO é um componente da Estratégia de Governança Digital?",
                options: [
                    "Interoperabilidade",
                    "Segurança e privacidade",
                    "Centralização absoluta de todos os sistemas",
                    "Atendimento digital"
                ],
                correct: 2,
                explanation: "A EGD prega integração e coordenação, não centralização absoluta de sistemas."
            },
            {
                id: 70,
                category: "conhecimentos-especificos",
                subject: "Integração de Sistemas",
                question: "O que é o Programa Conecta Gov?",
                options: [
                    "Rede de fibra óptica exclusiva para órgãos governamentais",
                    "Plataforma de integração e interoperabilidade do governo federal",
                    "Programa de inclusão digital em áreas remotas",
                    "Sistema de wi-fi público gratuito"
                ],
                correct: 1,
                explanation: "O Conecta Gov é a plataforma de integração e interoperabilidade que conecta sistemas do governo federal."
            },
            {
                id: 71,
                category: "conhecimentos-especificos",
                subject: "Arquitetura de Sistemas",
                question: "Qual desses NÃO é um benefício da arquitetura de serviços (SOA) no governo?",
                options: [
                    "Reúso de componentes",
                    "Redução de redundâncias",
                    "Aumento do acoplamento entre sistemas",
                    "Maior agilidade no desenvolvimento"
                ],
                correct: 2,
                explanation: "SOA busca reduzir acoplamento entre sistemas, não aumentá-lo."
            },
            {
                id: 72,
                category: "conhecimentos-especificos",
                subject: "Arquitetura de Sistemas",
                question: "O que é o Modelo de Referência em Arquitetura (MRA) do governo federal?",
                options: [
                    "Padrão para construção de prédios públicos",
                    "Conjunto de normas para arquitetura de sistemas de informação",
                    "Modelo de organização de secretarias",
                    "Guia para contratação de arquitetos"
                ],
                correct: 1,
                explanation: "O MRA estabelece padrões e diretrizes para arquitetura de sistemas de informação no governo federal."
            },
            {
                id: 73,
                category: "conhecimentos-especificos",
                subject: "Arquitetura de Sistemas",
                question: "Qual desses NÃO é um domínio do Modelo de Referência em Arquitetura?",
                options: [
                    "Negócio",
                    "Aplicação",
                    "Infraestrutura",
                    "Recursos humanos"
                ],
                correct: 3,
                explanation: "Os domínios do MRA são: Negócio, Aplicação, Dados e Infraestrutura."
            },
            {
                id: 74,
                category: "conhecimentos-especificos",
                subject: "Interoperabilidade",
                question: "O que é o Padrão de Interoperabilidade de Governo Eletrônico (e-PING)?",
                options: [
                    "Conjunto de normas técnicas para integração de sistemas governamentais",
                    "Sistema de mensagens instantâneas para servidores",
                    "Protocolo de segurança para transações eletrônicas",
                    "Padrão para construção de portais governamentais"
                ],
                correct: 0,
                explanation: "O e-PING estabelece normas técnicas para garantir interoperabilidade entre sistemas governamentais."
            },
            {
                id: 75,
                category: "conhecimentos-especificos",
                subject: "Interoperabilidade",
                question: "Qual desses NÃO é um componente do e-PING (Padrão de Interoperabilidade de Governo Eletrônico)?",
                options: [
                    "Interconexão",
                    "Segurança",
                    "Organograma",
                    "Dados"
                ],
                correct: 2,
                explanation: "Os componentes do e-PING são: Interconexão, Segurança, Dados e Organização da Informação."
            },
            {
                id: 76,
                category: "conhecimentos-especificos",
                subject: "Sistemas Governamentais",
                question: "O que é o Sistema de Informações Gerenciais do Governo Federal (SIGA)?",
                options: [
                    "Sistema de gestão de documentos eletrônicos",
                    "Plataforma integrada para gestão de processos administrativos",
                    "Ferramenta de business intelligence exclusiva para ministros",
                    "Sistema de compras governamentais"
                ],
                correct: 1,
                explanation: "O SIGA é a plataforma integrada para gestão de processos administrativos no governo federal."
            },
            {
                id: 77,
                category: "conhecimentos-especificos",
                subject: "Sistemas Governamentais",
                question: "Qual desses NÃO é um módulo do SIGA (Sistema de Informações Gerenciais do Governo Federal )?",
                options: [
                    "Protocolo",
                    "Processo",
                    "Recursos humanos",
                    "Patrimônio"
                ],
                correct: 2,
                explanation: "O SIGA possui módulos como Protocolo, Processo, Patrimônio e Almoxarifado, mas não de RH."
            },
            {
                id: 78,
                category: "conhecimentos-especificos",
                subject: "Sistemas Governamentais",
                question: "O que é o Sistema Eletrônico de Informações (SEI)?",
                options: [
                    "Sistema de gestão de documentos e processos administrativos digitais",
                    "Plataforma de inteligência artificial governamental",
                    "Banco de dados centralizado de informações sigilosas",
                    "Sistema de votação eletrônica"
                ],
                correct: 0,
                explanation: "O SEI é o sistema de gestão de documentos e processos administrativos em meio digital, amplamente utilizado no governo federal."
            },
            {
                id: 79,
                category: "conhecimentos-especificos",
                subject: "Sistemas Governamentais",
                question: "Qual desses NÃO é um benefício do SEI (Sistema Eletrônico de Informações?",
                options: [
                    "Eliminação completa de documentos físicos",
                    "Redução de custos com papel e impressão",
                    "Maior agilidade nos processos",
                    "Rastreabilidade de documentos"
                ],
                correct: 0,
                explanation: "O SEI reduz mas não elimina completamente documentos físicos, que ainda são necessários em alguns casos."
            },
            {
                id: 82,
                category: "conhecimentos-especificos",
                subject: "Sistemas Governamentais",
                question: "O que é o Sistema Integrado de Administração Financeira (SIAFI)?",
                options: [
                    "Sistema de gestão financeira do governo federal",
                    "Plataforma de investimentos para servidores",
                    "Banco de dados de fornecedores do governo",
                    "Sistema de controle de estoques"
                ],
                correct: 0,
                explanation: "O SIAFI é o sistema que gerencia a execução orçamentária, financeira e patrimonial do governo federal."
            },
            {
                id: 83,
                category: "conhecimentos-especificos",
                subject: "Sistemas Governamentais",
                question: "Qual desses NÃO é um módulo do SIAFI(Sistema Integrado de Administração Financeira)?",
                options: [
                    "Contabilidade",
                    "Orçamento",
                    "Gestão de pessoas",
                    "Patrimônio"
                ],
                correct: 2,
                explanation: "O SIAFI possui módulos como Orçamento, Contabilidade e Patrimônio, mas não de Gestão de Pessoas."
            },
            {
                id: 84,
                category: "conhecimentos-especificos",
                subject: "Licitações",
                question: "O que é o Comprasnet?",
                options: [
                    "Portal de compras do governo federal",
                    "Rede de fornecedores preferenciais",
                    "Sistema de comércio eletrônico para servidores",
                    "Plataforma de leilões de bens apreendidos"
                ],
                correct: 0,
                explanation: "O Comprasnet é o portal onde são realizadas as compras e licitações do governo federal."
            },
            {
                id: 85,
                category: "conhecimentos-especificos",
                subject: "Licitações",
                question: "Qual desses NÃO é um tipo de licitação disponível no Comprasnet?",
                options: [
                    "Pregão eletrônico",
                    "Concorrência",
                    "Tomada de preços",
                    "Leilão reverso"
                ],
                correct: 3,
                explanation: "Leilão reverso não é modalidade de licitação, mas técnica que pode ser usada em pregões."
            },
            {
                id: 86,
                category: "conhecimentos-especificos",
                subject: "Sistemas Governamentais",
                question: "O que é o Sistema de Informações Contábeis e Fiscais (SICONFI)?",
                options: [
                    "Sistema de gestão financeira dos estados e municípios",
                    "Banco de dados de contadores públicos",
                    "Plataforma de fiscalização federal",
                    "Sistema de controle de dívidas públicas"
                ],
                correct: 0,
                explanation: "O SICONFI é o sistema onde estados e municípios prestam informações sobre suas finanças públicas."
            },
            {
                id: 87,
                category: "conhecimentos-especificos",
                subject: "Sistemas Governamentais",
                question: "Qual desses NÃO é um objetivo do SICONFI (Sistema de Informações Contábeis e Fiscais)?",
                options: [
                    "Transparência das contas públicas",
                    "Fiscalização pelo Tribunal de Contas",
                    "Controle social dos gastos",
                    "Substituição total dos sistemas locais"
                ],
                correct: 3,
                explanation: "O SICONFI não substitui sistemas locais, mas coleta informações padronizadas para análise comparativa."
            }
        ]
    };
}

// Iniciar quiz de assunto específico
function startSubjectQuiz(subject) {
    currentSubject = subject;
    
    // Obter questões do assunto
    const subjectQuestions = window.allQuestions[subject] || [];
    
    if (subjectQuestions.length === 0) {
        alert('Questões para este assunto ainda não estão disponíveis. Tente outro assunto.');
        return;
    }

    // Embaralhar questões
    questions = shuffleArray([...subjectQuestions]);
    userAnswers = new Array(questions.length).fill(null);
    currentQuestionIndex = 0;
    isQuizActive = true;

    // Atualizar interface
    document.getElementById('current-subject').textContent = subjectNames[subject];
    document.getElementById('subject-result').textContent = `Assunto: ${subjectNames[subject]}`;

    // Esconder seleção de assunto e mostrar quiz
    document.getElementById('subject-selection').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');

    // Exibir primeira questão
    displayQuestion();
    updateProgress();
}

// Mostrar seleção de assunto
function showSubjectSelection() {
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('results-container').classList.add('hidden');
    document.getElementById('subject-selection').classList.remove('hidden');
    
    // Reset do quiz
    currentQuestionIndex = 0;
    questions = [];
    userAnswers = [];
    currentSubject = '';
    isQuizActive = false;
}

// Embaralhar array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Exibir questão atual
function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const question = questions[currentQuestionIndex];
    
    // Atualizar elementos da questão
    document.getElementById('question-number').textContent = `Questão ${currentQuestionIndex + 1}`;
    document.getElementById('question-text').textContent = question.question;
    
    // Criar opções de resposta
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-option w-full p-4 text-left rounded-lg transition-all duration-200 hover:bg-blue-50';
        button.innerHTML = `
            <div class="flex items-center">
                <span class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3 text-sm font-medium">
                    ${String.fromCharCode(65 + index)}
                </span>
                <span>${option}</span>
            </div>
        `;
        
        button.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(button);
    });

    // Restaurar resposta selecionada se existir
    if (userAnswers[currentQuestionIndex] !== null) {
        selectAnswer(userAnswers[currentQuestionIndex], false);
    }

    // Esconder feedback
    document.getElementById('feedback-container').classList.add('hidden');
    
    // Atualizar botões de navegação
    updateNavigationButtons();
}

// Selecionar resposta
function selectAnswer(answerIndex, saveAnswer = true) {
    // Remover seleção anterior
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.classList.remove('selected');
    });

    // Selecionar nova opção
    options[answerIndex].classList.add('selected');

    if (saveAnswer) {
        userAnswers[currentQuestionIndex] = answerIndex;
        showFeedback(answerIndex);
    }

    updateNavigationButtons();
}

// Mostrar feedback
function showFeedback(selectedAnswer) {
    const question = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correct;
    
    const feedbackContainer = document.getElementById('feedback-container');
    const feedbackContent = document.getElementById('feedback-content');
    
    // Atualizar estilos das opções
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((option, index) => {
        option.classList.add('disabled');
        
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedAnswer && !isCorrect) {
            option.classList.add('incorrect');
        }
    });

    // Mostrar feedback
    feedbackContent.innerHTML = `
        <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
                <div class="w-10 h-10 rounded-full flex items-center justify-center ${isCorrect ? 'bg-green-100' : 'bg-red-100'}">
                    <svg class="w-6 h-6 ${isCorrect ? 'text-green-600' : 'text-red-600'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        ${isCorrect 
                            ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>'
                            : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>'
                        }
                    </svg>
                </div>
            </div>
            <div class="flex-1">
                <h4 class="text-lg font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'} mb-2">
                    ${isCorrect ? 'Resposta Correta!' : 'Resposta Incorreta'}
                </h4>
                <p class="text-gray-700 mb-3">
                    <strong>Resposta correta:</strong> ${String.fromCharCode(65 + question.correct)}) ${question.options[question.correct]}
                </p>
                <p class="text-gray-600">
                    <strong>Explicação:</strong> ${question.explanation}
                </p>
            </div>
        </div>
    `;
    
    feedbackContainer.classList.remove('hidden');
}

// Configurar navegação do quiz
function setupQuizNavigation() {
    const prevButton = document.getElementById('prev-question');
    const nextButton = document.getElementById('next-question');

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                displayQuestion();
                updateProgress();
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                displayQuestion();
                updateProgress();
            } else {
                showResults();
            }
        });
    }
}

// Atualizar botões de navegação
function updateNavigationButtons() {
    const prevButton = document.getElementById('prev-question');
    const nextButton = document.getElementById('next-question');

    if (prevButton) {
        prevButton.disabled = currentQuestionIndex === 0;
    }

    if (nextButton) {
        const hasAnswer = userAnswers[currentQuestionIndex] !== null;
        nextButton.disabled = !hasAnswer;
        
        if (currentQuestionIndex === questions.length - 1) {
            nextButton.textContent = 'Ver Resultados';
        } else {
            nextButton.textContent = 'Próxima →';
        }
    }
}

// Atualizar progresso
function updateProgress() {
    const progressText = document.getElementById('progress-text');
    const progressBar = document.getElementById('progress-bar');

    if (progressText) {
        progressText.textContent = `${currentQuestionIndex + 1} de ${questions.length}`;
    }

    if (progressBar) {
        const percentage = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.width = `${percentage}%`;
    }
}

// Mostrar resultados
function showResults() {
    // Calcular estatísticas
    const correctAnswers = userAnswers.filter((answer, index) => 
        answer === questions[index].correct
    ).length;
    
    const incorrectAnswers = questions.length - correctAnswers;
    const correctPercentage = Math.round((correctAnswers / questions.length) * 100);
    const incorrectPercentage = 100 - correctPercentage;

    // Esconder quiz e mostrar resultados
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('results-container').classList.remove('hidden');

    // Atualizar estatísticas
    document.getElementById('correct-count').textContent = correctAnswers;
    document.getElementById('incorrect-count').textContent = incorrectAnswers;
    document.getElementById('total-questions').textContent = questions.length;
    document.getElementById('correct-percentage').textContent = `${correctPercentage}%`;
    document.getElementById('incorrect-percentage').textContent = `${incorrectPercentage}%`;

    // Gerar recomendações
    generateRecommendations(correctPercentage, incorrectAnswers);
}

// Gerar recomendações de estudo
function generateRecommendations(correctPercentage, incorrectAnswers) {
    const recommendationsContent = document.getElementById('recommendations-content');
    let recommendations = '';

    // Recomendações baseadas no desempenho
    if (correctPercentage >= 80) {
        recommendations += `
            <div class="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                <h4 class="text-green-800 font-semibold mb-2">Excelente Domínio do Assunto! 🎉</h4>
                <p class="text-green-700">Você demonstrou um ótimo conhecimento em ${subjectNames[currentSubject]}. Continue praticando outros assuntos!</p>
            </div>
        `;
    } else if (correctPercentage >= 60) {
        recommendations += `
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <h4 class="text-yellow-800 font-semibold mb-2">Bom Conhecimento! 👍</h4>
                <p class="text-yellow-700">Você tem uma base sólida em ${subjectNames[currentSubject]}. Revise os conceitos que erraram para aperfeiçoar ainda mais.</p>
            </div>
        `;
    } else {
        recommendations += `
            <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <h4 class="text-red-800 font-semibold mb-2">Precisa Estudar Mais Este Assunto 📚</h4>
                <p class="text-red-700">Dedique mais tempo ao estudo de ${subjectNames[currentSubject]}. Considere revisar materiais básicos e fazer mais exercícios.</p>
            </div>
        `;
    }

    // Sugestões específicas por assunto
    const subjectTips = {
        'cts': [
            'Estude as relações entre ciência, tecnologia e sociedade',
            'Analise casos de impactos tecnológicos na sociedade',
            'Compreenda os aspectos éticos da ciência e tecnologia'
        ],
        'ctbs': [
            'Revise conceitos de biosegurança',
            'Estude normas e protocolos de segurança biológica',
            'Analise riscos biológicos em diferentes contextos'
        ],
        'gestao-projetos': [
            'Estude as metodologias de gestão de projetos (PMBOK, SCRUM)',
            'Pratique com casos reais de gestão de projetos',
            'Compreenda as fases e processos de um projeto'
        ],
        'metodologia': [
            'Revise métodos de pesquisa científica',
            'Estude tipos de pesquisa e suas aplicações',
            'Pratique elaboração de projetos de pesquisa'
        ],
        'tics-dados': [
            'Estude tecnologias da informação e comunicação',
            'Compreenda gestão e análise de dados',
            'Analise tendências tecnológicas atuais'
        ],
        'politicas-cti': [
            'Estude políticas públicas de CT&I no Brasil',
            'Analise marcos regulatórios de ciência e tecnologia',
            'Compreenda sistemas de inovação'
        ],
        'lgpd': [
            'Reveja os princípios da LGPD',
            'Estude as bases legais para tratamento de dados',
            'Compreenda as funções do controlador e operador',
            'Analise casos práticos de aplicação da lei'
        ],
        'governo-digital': [
            'Estude a Estratégia de Governança Digital',
            'Compreenda os princípios do governo digital',
            'Analise casos de transformação digital no setor público',
            'Reveja sistemas como Gov.br e Conecta Gov'
        ],
        'seguranca': [
            'Reveja a tríade CIA (Confidencialidade, Integridade, Disponibilidade)',
            'Estude normas como ISO/IEC 27001',
            'Compreenda tipos de ameaças cibernéticas',
            'Analise práticas de segurança da informação no governo'
        ],
        'saude-publica': [
            'Estude os principais sistemas de informação em saúde (SIOPS, SIM, SINASC)',
            'Compreenda o fluxo de dados no SUS',
            'Analise indicadores de saúde pública',
            'Reveja políticas de financiamento da saúde'
        ],
        'outros': [
            'Reveja temas diversos como blockchain, TIC Verde e arquitetura de sistemas',
            'Estude sistemas governamentais como SIAFI e SEI',
            'Compreenda processos de contratação de TI no governo',
            'Analise frameworks de governança como COBIT'
        ]
    };

    if (subjectTips[currentSubject]) {
        recommendations += `
            <div class="bg-blue-50 border-l-4 border-blue-400 p-4">
                <h4 class="text-blue-800 font-semibold mb-2">Dicas de Estudo para ${subjectNames[currentSubject]}:</h4>
                <ul class="text-blue-700 space-y-1">
        `;
        
        subjectTips[currentSubject].forEach(tip => {
            recommendations += `<li>• ${tip}</li>`;
        });
        
        recommendations += `
                </ul>
            </div>
        `;
    }

    recommendationsContent.innerHTML = recommendations;
}
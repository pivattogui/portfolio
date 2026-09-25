import { education, experience, profile, projects, type Education, type Experience, type Profile, type Project } from "./portfolio";

export type Locale = "en" | "pt";

const portugueseProfile: Profile = {
  ...profile,
  role: "Engenheiro de software",
  focus: "IA aplicada e sistemas de software",
  introduction: "Desenvolvo produtos com IA e sistemas de software que sustentam operações reais. Combino domínio de IA aplicada, visão de produto e engenharia de sistemas para criar soluções úteis, confiáveis e prontas para crescer.",
  location: "São Leopoldo, Brasil",
  resume: "https://rxresu.me/pivatto/resume-pt",
  about: [
    "Sou engenheiro de software especializado em IA aplicada. Desenvolvo produtos de ponta a ponta, combinando visão de produto, engenharia de sistemas e profundidade técnica para transformar problemas complexos em software útil e pronto para produção.",
    "Minha atuação reúne experiência em produtos de escala e uma prática contínua de projetos independentes. Exploro novas tecnologias, construo ferramentas próprias e levo iniciativas de IA da ideia à produção, sempre com foco no valor que o software entrega.",
  ],
};

const portugueseExperience: Experience[] = [{
  ...experience[0],
  industry: "Tecnologia em saúde · SaaS B2B",
  role: "Engenheiro de software",
  period: "Jan 2022 — Jun 2026",
  summary: "Ajudei a levar uma plataforma SaaS B2B do MVP a um produto omnichannel distribuído, atuando da definição técnica à operação em produção.",
  chapters: [
    {
      title: "Escala e confiabilidade",
      highlights: [
        "Consolidei a arquitetura AWS ECS de 400 serviços para 15, uma redução de 96,25% e economia anual estimada de US$ 126 mil; reconstruí a infraestrutura como código.",
        "Reconstruí a plataforma distribuída com uma equipe de seis pessoas usando Kafka, Elixir e Go; ela chegou aos primeiros clientes em três meses e hoje processa 700 mil mensagens diárias.",
        "Substituí deploys manuais por pipelines do GitHub Actions para testes, builds, provisionamento gradual e releases no AWS ECS.",
      ],
    },
    {
      title: "Produto e mercado",
      highlights: [
        "Levei o produto além da troca de mensagens com automação, CRM, fluxos visuais, integrações de saúde e análise de atendimento para cerca de 450 clientes.",
        "Liderei integrações oficiais com WhatsApp Business e Instagram até a aprovação no App Review, transformando um produto restrito ao WhatsApp em uma plataforma omnichannel.",
      ],
    },
    {
      title: "IA e experiência de desenvolvimento",
      highlights: [
        "Criei o Forge, um orquestrador multiagente para mudanças entre serviços; padrões de projeto e testes end-to-end melhoraram a velocidade e a qualidade das entregas.",
        "Ampliei um agente de atendimento em Python com RAG e chamadas de ferramentas para gerenciar conversas e dados do CRM; adicionei avaliações pós-conversa.",
      ],
    },
  ],
}];

const portugueseProjects: Project[] = [
  {
    ...projects[0],
    category: "Operação de servidores self-hosted",
    description: "Um painel self-hosted para servidores Minecraft Java que reúne sessões de terminal, gerenciamento de arquivos e backups em uma interface operacional.",
    technicalOverview: "A aplicação Phoenix gerencia processos Java e arquivos em um único nó. Um cliente React separado usa REST para operações e configuração, e Channels para console, estado e métricas em tempo real. Administradores podem provisionar servidores, editar arquivos, agendar backups e restaurar arquivos.",
    technicalHighlights: [
      "Cada servidor roda em uma árvore de supervisão OTP isolada; um lock por servidor serializa alterações sem bloquear os demais.",
      "As especificações de execução separam a orquestração de processos do Ecto, enquanto o Oban persiste agendamentos de backup e reinicialização.",
      "O acesso a arquivos permanece dentro do diretório de cada servidor, e importações são analisadas antes da extração.",
    ],
    image: projects[0].image && { ...projects[0].image, alt: "Console do Allay com métricas do servidor, logs em tempo real e entrada de comandos", caption: "Interface do Allay · console e métricas em tempo real" },
  },
  {
    ...projects[1],
    category: "API para desenvolvedores",
    description: "Uma API de conversão de JSON para TOML com a lógica de conversão separada da camada HTTP.",
    technicalOverview: "POST /convert recebe JSON e retorna TOML em texto puro. O conversor serializa valores escalares e arrays e, depois, emite objetos aninhados como tabelas TOML. Tabelas muito profundas e arrays de tabelas ficam fora do escopo, deixando explícito o formato suportado.",
    technicalHighlights: [
      "Controllers Phoenix cuidam da interface HTTP; o conversor é responsável pela transformação do formato.",
      "40 testes cobrem conversão, casos extremos e comportamento do endpoint; uma rota de health check apoia a operação.",
    ],
  },
  {
    ...projects[2],
    category: "API de encurtamento de URLs",
    description: "Um serviço persistente de resolução de URLs com caminhos distintos para criação e redirecionamento de links.",
    technicalOverview: "O Linkify armazena cada URL original com um endereço curto gerado. POST /shorten cria o mapeamento; GET /:shortUrl resolve o endereço e redireciona para o destino. A camada HTTP usa Express e TypeScript, com Prisma para acesso ao banco de dados.",
    technicalHighlights: [
      "Os endpoints de criação e redirecionamento separam escritas de consultas.",
      "O Prisma persiste os mapeamentos; UUID gera identificadores distintos para os links curtos.",
    ],
  },
];

const portugueseEducation: Education[] = [
  {
    ...education[0],
    degree: "Bacharelado em Sistemas de Informação",
    period: "Fev 2021 — Jun 2027",
    description: "Comecei a graduação em Ciência da Computação e migrei para Sistemas de Informação para aproximar engenharia de software, produto e negócio. O curso acrescentou processos organizacionais, gestão e o papel da tecnologia nas decisões a uma base técnica construída com Java, C#, C, bancos de dados e desenvolvimento web.",
    note: "Previsão de conclusão",
  },
  {
    ...education[1],
    degree: "Curso técnico integrado em Informática",
    period: "Fev 2019 — Dez 2021",
    description: "Construí minha base em programação, desenvolvimento web, bancos de dados e redes. No TCC, desenvolvi o MVP para iOS e Android da TranspoLife, uma startup de transporte de cargas apresentada a uma banca de investidores, usando React Native, TypeScript, MySQL, WebSockets, Firebase e APIs do Google Maps.",
  },
];

const englishLabels = {
  skip: "Skip to content", backToTop: "Back to top ↑", headerDiscipline: "Applied AI / distributed systems",
  navigation: ["About", "Experience", "Projects", "Contact"], mainNavigation: "Main navigation", mobileNavigation: "Mobile navigation",
  openMenu: "Open menu", closeMenu: "Close menu", availability: "São Leopoldo, Brazil · Available worldwide",
  portfolio: "Portfolio", heroTitle: ["Software", "engineer."], specialty: ["Applied AI", "Product engineering", "Distributed systems"],
  contactAction: "Get in touch", resume: "Résumé", moreAbout: "More about me", profiles: "Guilherme's profiles",
  aboutIndex: "01 / About", aboutTitle: ["From product problem", "to production."], yearsCount: "4.5+", years: "Years turning product problems into production systems",
  skillsLabel: "Areas of practice / Selected tools", skillsTitle: ["Product thinking.", "Systems depth."],
  skillsAreas: "Applied AI · Full-stack development · Cloud & operations", scrollExplore: "Scroll to explore →", skillsAria: "Technologies I work with",
  experienceIndex: "02 / Experience",
  projectsIndex: "03 / Selected projects", projectsTitle: "Selected projects.", projectsIntro: "Independent products where I turn personal interests into working software, explore new ideas, and keep expanding my technical range.",
  allRepositories: "All repositories", viewRepository: "View repository", liveDemo: "Live demo", technologies: "technologies",
  educationIndex: "04 / Education", educationTitle: ["Foundations for", "what I build."],
  contactIndex: "05 / Contact", contactTitle: ["Let’s build what", "comes next."], contactIntro: ["Have a software engineering opportunity?", "Get in touch."], email: "Email", resumePdf: "Résumé",
} as const;

const portugueseLabels: { [K in keyof typeof englishLabels]: typeof englishLabels[K] extends readonly string[] ? readonly string[] : string } = {
  skip: "Ir para o conteúdo", backToTop: "Voltar ao topo ↑", headerDiscipline: "IA aplicada / sistemas distribuídos",
  navigation: ["Sobre", "Experiência", "Projetos", "Contato"], mainNavigation: "Navegação principal", mobileNavigation: "Navegação móvel",
  openMenu: "Abrir menu", closeMenu: "Fechar menu", availability: "São Leopoldo, Brasil · Disponível globalmente",
  portfolio: "Portfólio", heroTitle: ["Engenheiro", "de software."], specialty: ["IA aplicada", "Engenharia de produto", "Sistemas distribuídos"],
  contactAction: "Entre em contato", resume: "Currículo", moreAbout: "Mais sobre mim", profiles: "Perfis de Guilherme",
  aboutIndex: "01 / Sobre", aboutTitle: ["Do problema de produto", "à produção."], yearsCount: "4,5+", years: "Anos transformando problemas de produto em sistemas em produção",
  skillsLabel: "Áreas de atuação / Ferramentas", skillsTitle: ["Visão de produto.", "Profundidade técnica."],
  skillsAreas: "IA aplicada · Desenvolvimento full-stack · Nuvem e operações", scrollExplore: "Role para explorar →", skillsAria: "Tecnologias com que trabalho",
  experienceIndex: "02 / Experiência",
  projectsIndex: "03 / Projetos selecionados", projectsTitle: "Projetos selecionados.", projectsIntro: "Produtos independentes em que transformo interesses pessoais em software funcional, exploro novas ideias e amplio continuamente meu repertório técnico.",
  allRepositories: "Todos os repositórios", viewRepository: "Ver repositório", liveDemo: "Demonstração", technologies: "tecnologias",
  educationIndex: "04 / Formação", educationTitle: ["As bases do", "que construo."],
  contactIndex: "05 / Contato", contactTitle: ["Vamos construir", "o que vem a seguir."], contactIntro: ["Tem uma oportunidade em engenharia de software?", "Entre em contato."], email: "E-mail", resumePdf: "Currículo",
};

export function getPortfolioContent(locale: Locale) {
  return locale === "pt"
    ? { profile: portugueseProfile, experience: portugueseExperience, projects: portugueseProjects, education: portugueseEducation, labels: portugueseLabels }
    : { profile, experience, projects, education, labels: englishLabels };
}

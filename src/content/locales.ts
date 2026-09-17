import { education, experience, profile, projects, type Education, type Experience, type Profile, type Project } from "./portfolio";

export type Locale = "en" | "pt";

const portugueseProfile: Profile = {
  ...profile,
  role: "Engenheiro de software",
  focus: "Full-stack e sistemas distribuídos",
  introduction: "Desenvolvo sistemas backend, integro plataformas e evoluo infraestrutura em nuvem. Das decisões de arquitetura ao software em produção.",
  location: "São Leopoldo, Brasil",
  resume: "https://rxresu.me/pivatto/resume-pt",
  about: [
    "Sou engenheiro de software com 4,5 anos de experiência em desenvolvimento backend, APIs e sistemas distribuídos. Trabalho da arquitetura à operação em produção, principalmente com Node.js, Go e AWS.",
    "Ajudei a evoluir uma plataforma SaaS B2B, liderando decisões técnicas de infraestrutura e integrações. Minha experiência também inclui desenvolvimento frontend e agentes de atendimento com IA.",
  ],
};

const portugueseExperience: Experience[] = [{
  ...experience[0],
  industry: "Tecnologia em saúde · SaaS B2B",
  role: "Engenheiro de software",
  period: "Jan 2022 — Jun 2026",
  summary: "Engenharia full-stack com foco em backend, mensageria, integrações e infraestrutura, da definição técnica à produção.",
  highlights: [
    "Liderei a migração da arquitetura AWS ECS de 400 serviços para 15, com economia anual estimada de US$ 126 mil em infraestrutura, e reconstruí a infraestrutura como código.",
    "Projetei e construí uma plataforma omnichannel distribuída em três meses, implementando backend, mensageria e infraestrutura para 450 clientes e 700 mil mensagens diárias.",
    "Liderei integrações oficiais com WhatsApp Business e Instagram, incluindo a revisão de aplicativo pela Meta e o processamento de eventos.",
    "Substituí deploys manuais por pipelines do GitHub Actions para testes, builds, provisionamento gradual e implantação no AWS ECS.",
    "Desenvolvi agentes de atendimento em Python com RAG e chamadas de ferramentas, integrados ao CRM e ao fluxo de atendimento, além de avaliações pós-conversa.",
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
  { ...education[0], degree: "Bacharelado em Sistemas de Informação", period: "2021 — Atualmente", note: "Previsão de conclusão: 2027" },
  { ...education[1], degree: "Curso técnico em Tecnologia da Informação" },
];

const englishLabels = {
  skip: "Skip to content", backToTop: "Back to top ↑", headerDiscipline: "Software engineering / systems",
  navigation: ["About", "Experience", "Projects", "Contact"], mainNavigation: "Main navigation", mobileNavigation: "Mobile navigation",
  openMenu: "Open menu", closeMenu: "Close menu", availability: "São Leopoldo, Brazil · Available worldwide",
  portfolio: "Portfolio", heroTitle: ["Software", "engineer."], specialty: ["Backend systems", "Integrations", "Cloud infrastructure"],
  contactAction: "Get in touch", resume: "Résumé", moreAbout: "More about me", profiles: "Guilherme's profiles",
  aboutIndex: "01 / About", aboutTitle: ["I work where", "complexity lives."], yearsCount: "04.5+", years: "Years shaping reliable software products",
  skillsLabel: "Areas of practice / Selected tools", skillsTitle: ["Built across the stack.", "Owned in production."],
  skillsAreas: "Backend systems · Cloud & operations · Applied AI", scrollExplore: "Scroll to explore →", skillsAria: "Technologies I work with",
  experienceIndex: "02 / Experience", experienceTitle: "Built in the real world.", experienceNote: "Systems · infrastructure · integrations",
  projectsIndex: "03 / Selected projects", projectsTitle: "Selected projects.", projectsIntro: "Independent systems for operating game servers, transforming configuration data, and resolving short links.",
  allRepositories: "All repositories", viewRepository: "View repository", liveDemo: "Live demo", technologies: "technologies",
  educationIndex: "04 / Education", educationTitle: ["Foundations for", "what I build."],
  contactIndex: "05 / Contact", contactTitle: ["Let’s build what", "comes next."], contactIntro: ["Have a software engineering opportunity?", "Get in touch."], email: "Email", resumePdf: "Résumé",
} as const;

const portugueseLabels: { [K in keyof typeof englishLabels]: typeof englishLabels[K] extends readonly string[] ? readonly string[] : string } = {
  skip: "Ir para o conteúdo", backToTop: "Voltar ao topo ↑", headerDiscipline: "Engenharia de software / sistemas",
  navigation: ["Sobre", "Experiência", "Projetos", "Contato"], mainNavigation: "Navegação principal", mobileNavigation: "Navegação móvel",
  openMenu: "Abrir menu", closeMenu: "Fechar menu", availability: "São Leopoldo, Brasil · Disponível globalmente",
  portfolio: "Portfólio", heroTitle: ["Engenheiro", "de software."], specialty: ["Sistemas backend", "Integrações", "Infraestrutura em nuvem"],
  contactAction: "Entre em contato", resume: "Currículo", moreAbout: "Mais sobre mim", profiles: "Perfis de Guilherme",
  aboutIndex: "01 / Sobre", aboutTitle: ["Trabalho onde mora", "a complexidade."], yearsCount: "04,5+", years: "Anos construindo produtos de software confiáveis",
  skillsLabel: "Áreas de atuação / Ferramentas", skillsTitle: ["Atuação em toda a stack.", "Responsabilidade em produção."],
  skillsAreas: "Sistemas backend · Nuvem e operações · IA aplicada", scrollExplore: "Role para explorar →", skillsAria: "Tecnologias com que trabalho",
  experienceIndex: "02 / Experiência", experienceTitle: "Experiência em produção.", experienceNote: "Sistemas · infraestrutura · integrações",
  projectsIndex: "03 / Projetos selecionados", projectsTitle: "Projetos selecionados.", projectsIntro: "Sistemas independentes para operar servidores de jogos, transformar dados de configuração e resolver links curtos.",
  allRepositories: "Todos os repositórios", viewRepository: "Ver repositório", liveDemo: "Demonstração", technologies: "tecnologias",
  educationIndex: "04 / Formação", educationTitle: ["As bases do", "que construo."],
  contactIndex: "05 / Contato", contactTitle: ["Vamos construir", "o que vem a seguir."], contactIntro: ["Tem uma oportunidade em engenharia de software?", "Entre em contato."], email: "E-mail", resumePdf: "Currículo",
};

export function getPortfolioContent(locale: Locale) {
  return locale === "pt"
    ? { profile: portugueseProfile, experience: portugueseExperience, projects: portugueseProjects, education: portugueseEducation, labels: portugueseLabels }
    : { profile, experience, projects, education, labels: englishLabels };
}

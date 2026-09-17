export interface Profile {
	name: string;
	role: string;
	focus: string;
	introduction: string;
	location: string;
	email: string;
	github: string;
	linkedin: string;
	resume: string;
	about: string[];
}

export interface Experience {
	company: string;
	industry: string;
	role: string;
	period: string;
	summary: string;
	highlights: string[];
}

export interface Project {
	name: string;
	category: string;
	description: string;
	technicalOverview: string;
	technicalHighlights: string[];
	technologies: string[];
	repository: string;
	demo?: string;
	image?: { src: string; alt: string; caption: string };
}

export interface Education {
	institution: string;
	degree: string;
	period: string;
	note?: string;
}

export const profile: Profile = {
	name: "Guilherme Pivatto",
	role: "Software Engineer",
	focus: "Full-Stack & distributed systems",
	introduction:
		"I build backend systems, integrate platforms, and evolve cloud infrastructure. From architectural decisions to the software running in production.",
	location: "São Leopoldo, Brazil",
	email: "mail+jobs@pivatto.dev",
	github: "https://github.com/pivattogui",
	linkedin: "https://www.linkedin.com/in/guilherme-pivatto/",
	resume: "https://rxresu.me/pivatto/resume-en",
	about: [
		"I’m a software engineer with 4.5 years of experience in backend development, APIs, and distributed systems. My work spans architecture, implementation, and production operations, primarily with Node.js, Go, and AWS.",
		"I’ve helped evolve a B2B SaaS platform, leading technical decisions across infrastructure and integrations. My experience also includes frontend development and AI-powered customer service agents.",
	],
};

export const experience: Experience[] = [
	{
		company: "Clinia",
		industry: "Healthtech · B2B SaaS",
		role: "Software Engineer",
		period: "Jan 2022 — Jun 2026",
		summary:
			"Full-stack engineering with a focus on backend, messaging, integrations, and infrastructure, from technical definition to production.",
		highlights: [
			"Led an AWS ECS architecture migration from 400 services to 15, with estimated annual infrastructure savings of US$126,000, and rebuilt the infrastructure as code.",
			"Designed and built a distributed omnichannel platform in three months, implementing backend, messaging, and infrastructure for 450 customers and 700,000 daily messages.",
			"Led official WhatsApp Business and Instagram integrations, including Meta App Review and event processing.",
			"Replaced manual deployments with GitHub Actions pipelines for tests, builds, gradual provisioning, and deployment to AWS ECS.",
			"Built customer service agents in Python with RAG and tool calling, integrated with CRM and inbox workflows, and developed post-conversation evaluations.",
		],
	},
];

export const projects: Project[] = [
	{
		name: "Allay",
		category: "Self-hosted server operations",
		description:
			"A self-hosted control plane for Minecraft Java servers, replacing scattered shell sessions, file tools, and backup scripts with one operational interface.",
		technicalOverview:
			"The Phoenix application owns Java processes and managed files on a single node. A separate React client uses REST for operations and configuration, and Channels for live console output, status, and metrics. Administrators can provision servers, edit files, schedule backups, and restore archives.",
		technicalHighlights: [
			"Each server runs in an isolated OTP supervision tree; a per-server lock serializes mutations without blocking other servers.",
			"Runtime specs keep process orchestration independent of Ecto, while Oban persists backup and restart schedules.",
			"File access stays within each managed server directory, and imports are analyzed before extraction.",
		],
		technologies: ["Elixir", "Phoenix", "React", "TypeScript", "Docker"],
		repository: "https://github.com/pivattogui/allay",
		image: {
			src: "/projects/allay-console.webp",
			alt: "Allay console with server metrics, live logs, and command input",
			caption: "Allay interface · live console and server metrics",
		},
	},
	{
		name: "Tomlify",
		category: "Developer API",
		description:
			"A JSON-to-TOML API with conversion logic kept separate from the HTTP layer.",
		technicalOverview:
			"POST /convert accepts JSON and returns plain-text TOML. The converter serializes scalar values and arrays, then emits nested objects as TOML tables. It deliberately stops short of deeply nested tables and arrays of tables, keeping the supported format explicit.",
		technicalHighlights: [
			"Phoenix controllers handle the HTTP boundary; the converter owns the format transformation.",
			"40 tests exercise conversion, edge cases, and endpoint behavior; a health route supports service checks.",
		],
		technologies: ["Elixir", "Phoenix", "REST API"],
		repository: "https://github.com/pivattogui/tomlify",
	},
	{
		name: "Linkify",
		category: "URL shortener API",
		description:
			"A persistent URL-resolution service with distinct paths for link creation and redirection.",
		technicalOverview:
			"Linkify stores each original URL alongside a generated short address. POST /shorten creates the mapping; GET /:shortUrl resolves it on later requests and redirects to the destination. The HTTP layer uses Express and TypeScript, with Prisma for database access.",
		technicalHighlights: [
			"The creation and redirect endpoints keep writes separate from lookups.",
			"Prisma persists URL mappings; UUID generates distinct short-link identifiers.",
		],
		technologies: ["TypeScript", "Express", "Prisma", "UUID"],
		repository: "https://github.com/pivattogui/linkify",
	},
];

export const featuredTechnologies = [
	"TypeScript",
	"Node.js",
	"Elixir",
	"Phoenix",
	"Go",
	"Python",
	"React",
	"Next.js",
	"GCP",
	"Docker",
	"Apache Kafka",
	"MongoDB",
	"Redis",
	"GitHub Actions",
	"LangChain",
] as const;

export const education: Education[] = [
	{
		institution: "Unisinos",
		degree: "Bachelor’s degree in Information Systems",
		period: "2021 — Present",
		note: "Expected graduation: 2027",
	},
	{
		institution: "Colégio Concórdia",
		degree: "Technical diploma in Information Technology",
		period: "2019 — 2021",
	},
];

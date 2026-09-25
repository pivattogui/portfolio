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
	chapters: Array<{
		title: string;
		highlights: string[];
	}>;
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
	focus: "Full-stack engineering & distributed systems",
	introduction:
		"I build full-stack products, integrate platforms, and work on cloud infrastructure. From interfaces and APIs to software in production.",
	location: "São Leopoldo, Brazil",
	email: "mail+jobs@pivatto.dev",
	github: "https://github.com/pivattogui",
	linkedin: "https://www.linkedin.com/in/guilherme-pivatto/",
	resume: "https://rxresu.me/pivatto/resume-en",
	about: [
		"I’m a software engineer with 4.5 years of experience in full-stack development, APIs, and distributed systems. My work spans architecture, implementation, and production operations, primarily with Node.js, Go, and AWS.",
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
			"Helped evolve a B2B SaaS platform from its MVP into a distributed omnichannel product, working from technical definition through production operations.",
		chapters: [
			{
				title: "Scale & reliability",
				highlights: [
					"Consolidated AWS ECS from 400 services to 15, cutting the service count by 96.25% and saving an estimated US$126,000 annually; rebuilt the infrastructure as code.",
					"Rebuilt the distributed platform with a six-person team using Kafka, Elixir, and Go; reached the first customers in three months and now handles 700,000 messages daily.",
					"Replaced manual deployments with GitHub Actions pipelines for tests, builds, gradual provisioning, and AWS ECS releases.",
				],
			},
			{
				title: "Product & market",
				highlights: [
					"Expanded the product beyond messaging with automation, CRM, visual workflows, healthcare integrations, and service analytics used by about 450 customers.",
					"Led official WhatsApp Business and Instagram integrations through Meta App Review, turning a WhatsApp-only product into an omnichannel platform.",
				],
			},
			{
				title: "AI & developer experience",
				highlights: [
					"Created Forge, a multi-agent orchestrator for cross-service changes; project conventions and end-to-end tests improved delivery speed and quality.",
					"Extended a Python service agent with RAG and tool calling to manage conversations and CRM data; added post-conversation evaluations.",
				],
			},
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

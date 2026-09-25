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
	architecture?: {
		ariaLabel: string;
		stages: Array<{ label: string; detail: string }>;
		status: string;
		caption: string;
	};
}

export interface Education {
	institution: string;
	degree: string;
	period: string;
	description: string;
	note?: string;
}

export const profile: Profile = {
	name: "Guilherme Pivatto",
	role: "Software Engineer",
	focus: "Applied AI & software systems",
	introduction:
		"I build AI-powered products and software systems that support real operations. I combine applied AI expertise with product judgment and systems engineering to create useful, reliable solutions built to grow.",
	location: "São Leopoldo, Brazil",
	email: "mail+jobs@pivatto.dev",
	github: "https://github.com/pivattogui",
	linkedin: "https://www.linkedin.com/in/guilherme-pivatto/",
	resume: "https://rxresu.me/pivatto/resume-en",
	about: [
		"I’m a software engineer specialized in applied AI. I build products end to end, combining product judgment, systems engineering, and technical depth to turn complex problems into useful software that is ready for production.",
		"My work brings together experience with products at scale and an ongoing practice of building independent projects. I explore new technologies, create my own tools, and take AI initiatives from idea to production with a clear focus on the value the software delivers.",
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
		name: "pivatto.dev",
		category: "Portfolio & cloud delivery",
		description:
			"A bilingual portfolio designed as a focused product: it turns engineering decisions, production outcomes, and independent work into a clear professional narrative.",
		technicalOverview:
			"React and TypeScript keep the experience fast and content-driven, while Pulumi defines the complete AWS delivery path. The static build is served from a private S3 bucket through CloudFront, with Origin Access Control, managed TLS, immutable asset caching, and automated publication from GitHub Actions.",
		technicalHighlights: [
			"Infrastructure, application checks, deployment, cache invalidation, and production smoke tests live in the same repository and delivery workflow.",
			"The release strategy uploads versioned assets first and index.html last, reducing the chance of a page referencing assets that are not yet available.",
			"The interface supports English and Brazilian Portuguese, responsive editorial layouts, reduced motion, and progressive enhancement without a runtime backend.",
		],
		technologies: ["React", "TypeScript", "Pulumi", "AWS", "GitHub Actions"],
		repository: "https://github.com/pivattogui/portfolio",
		demo: "https://pivatto.dev",
		architecture: {
			ariaLabel:
				"Delivery architecture from source code to the portfolio visitor",
			stages: [
				{ label: "Source", detail: "React + Pulumi" },
				{ label: "Delivery", detail: "GitHub Actions" },
				{ label: "Origin", detail: "Private S3" },
				{ label: "Edge", detail: "CloudFront + TLS" },
			],
			status: "Production delivery verified",
			caption:
				"One repository · product, infrastructure, and release automation",
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
		period: "Feb 2021 — Jun 2027",
		description:
			"I started in Computer Science and moved to Information Systems to connect software engineering with product and business. The degree added organizational processes, management, and the role of technology in decision-making to a technical foundation built across Java, C#, C, databases, and web development.",
		note: "Expected graduation",
	},
	{
		institution: "Colégio Luterano Concórdia",
		degree: "Integrated technical diploma in Information Technology",
		period: "Feb 2019 — Dec 2021",
		description:
			"I built my foundation in programming, web development, databases, and networking. For the final project, I developed the iOS and Android MVP for TranspoLife, a freight startup presented to a panel of investors, using React Native, TypeScript, MySQL, WebSockets, Firebase, and Google Maps APIs.",
	},
];

# Guilherme Pivatto

Personal portfolio for Guilherme Pivatto, a software engineer specialized in applied AI, product engineering, and distributed systems.

The site presents professional experience, selected projects, education, and ways to get in touch. It is available in English and Brazilian Portuguese, with English selected by default.

## Built with

- React 19 and TypeScript
- Vite
- CSS
- GSAP and Lenis for motion and scrolling
- Lucide and Simple Icons

The portfolio is a static client-side application. It has no backend or runtime requests to GitHub.

Production hosting uses AWS S3 and CloudFront. The site infrastructure, GitHub Actions workflow, and first deployment steps are documented in [`infra/README.md`](infra/README.md).

## Run locally

Requires Node.js 22.12+ and npm.

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

Vite prints the local address in the terminal. To preview a production build:

```sh
npm run build
npm run infra:typecheck
npm run preview -- --host 127.0.0.1
```

## Content and assets

Portfolio content lives in the source code:

- `src/content/portfolio.ts` contains the English profile, experience, projects, technologies, and education.
- `src/content/locales.ts` contains Portuguese content and interface labels.
- `public/projects/` holds project screenshots.

Add a project by appending a `Project` object to `projects`. A project requires a unique repository URL; `demo` and `image` are optional. Use root-relative paths for files in `public`, such as `/projects/example.webp`.

Update résumé URLs in the content files when they change. If the professional positioning changes, also update the title and meta description in `index.html`.

## Development

```sh
npm run typecheck
npm run lint
npm run build
```

`dist/` is generated output. Make changes in `src/` instead.

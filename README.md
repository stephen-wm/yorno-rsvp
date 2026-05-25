# <img src="./assets/yorno-primary.svg#gh-light-mode-only" alt="Yorno logo" height="40" /><img src="./assets/yorno-outline.svg#gh-dark-mode-only" alt="Yorno logo" height="40" />

![License](https://img.shields.io/github/license/stephen-wm/yorno-rsvp?color=blue)
![Version](https://img.shields.io/github/v/tag/stephen-wm/yorno-rsvp?label=version)
![Build](https://img.shields.io/github/actions/workflow/status/stephen-wm/yorno-rsvp/ci.yml)
![Last Commit](https://img.shields.io/github/last-commit/stephen-wm/yorno-rsvp?color=yellow)
![Contributors](https://img.shields.io/github/contributors/stephen-wm/yorno-rsvp?color=5d00ff)
![Open Issues](https://img.shields.io/github/issues/stephen-wm/yorno-rsvp?color=ff0000)
![GitHub Repo stars](https://img.shields.io/github/stars/stephen-wm/yorno-rsvp)

Yorno is a modern event management and RSVP platform built for small-to-medium gatherings, both private and public.\
Create beautiful event pages, manage guest lists, track RSVPs in real time, and simplify event planning without the complexity of enterprise event software.

> [!WARNING]
> Yorno is currently under active development and some features may change before the first stable release.

## Quick Start

The live application is available at [yorno.rsvp](https://yorno-rsvp.vercel.app/).

## Project Structure

```ASCII
yorno-rsvp/
├─ .agents/                       # AI agent configurations, prompts, and automation workflows
├─ .claude/                       # Claude Code workspace settings, commands, and AI development context
├─ .cspell/                       # Spell-check dictionaries
├─ .github/                       # GitHub configuration (Actions workflows, issue/PR templates, labels, etc.)
│  ├─ hooks/                      # Repository automation scripts and GitHub workflow helpers
│  ├─ ISSUE_TEMPLATE/             # Structured templates for bug reports and feature requests
│  ├─ workflows/                  # GitHub Actions CI, release, and Dependabot auto-merge workflows
│  └─ ...                         # CODEOWNERS, dependabot.yml, pull_request_template.md, SECURITY.md, stale.yml
├─ .husky/                        # Git hooks for enforcing code quality and commit standards
├─ .vscode/                       # VS Code workspace settings
├─ assets/                        # Repository-level assets (branding, logos, social preview images)
├─ prisma/                        # Prisma schema, migrations, and database seed scripts
├─ public/                        # Static assets served directly by Next.js (favicon, images, etc.)
├─ src/                           # Application source code
│  ├─ app/                        # Next.js App Router (routes, layouts, pages, API routes)
│  │  ├─ (app)/                   # Authenticated app routes (dashboard, events, settings)
│  │  ├─ (auth)/                  # Authentication routes (sign-in, sign-up, forgot-password)
│  │  ├─ (marketing)/             # Public-facing marketing pages (landing, pricing, about, etc.)
│  │  ├─ (public)/                # Public-facing event pages (event discovery, individual event + RSVP)
│  │  ├─ api                      # Route handlers and API endpoints
│  │  ├─ healthz/                 # Health check endpoint for uptime monitoring and orchestration
│  │  ├─ error.tsx                # Route-level error boundary UI
│  │  ├─ global-error.tsx         # Global application error boundary UI
│  │  ├─ layout.tsx               # Root application layout
│  │  ├─ loading.tsx              # Global loading UI fallback
│  │  ├─ manifest.ts              # Web app manifest configuration for PWA metadata
│  │  └─ not-found.tsx            # Custom 404 page
│  ├─ components/                 # Reusable UI components
│  │  ├─ layout/                  # Layout-specific components (headers, footers, shells, navigation)
│  │  ├─ shared/                  # Shared application components used across features
│  │  └─ ui/                      # shadcn/ui component library
│  ├─ config/                     # App configuration (metadata defaults, nav items, plan features)
│  ├─ features/                   # Feature-colocated business logic (actions, queries, schemas, types per feature)
│  ├─ generated/                  # Prisma generated source files (types, clients, schemas, etc.)
│  ├─ hooks/                      # Custom React hooks
│  ├─ lib/                        # Shared libraries, utilities, helpers, and integrations
│  ├─ providers/                  # React context and application providers
│  ├─ stores/                     # Zustand stores
│  ├─ styles/                     # Global styles
│  ├─ types/                      # Shared TypeScript type definitions and global augmentations
│  ├─ instrumentation-client.ts   # Client-side observability and telemetry instrumentation
│  ├─ instrumentation.ts          # Server-side observability and telemetry instrumentation
│  └─ proxy.ts                    # Next.js network proxy (request interception, bot protection, routing rules)
├─ .browserslistrc                # Target browser support configuration for CSS autoprefixing and JS transpilation (used by Autoprefixer, PostCSS, and compatibility tooling)
├─ .editorconfig                  # Editor-agnostic coding style rules
├─ .env.example                   # Example .env file for contributors
├─ .gitattributes                 # Git behavior settings (line endings, diff rules, etc.)
├─ .gitignore                     # Files and directories excluded from version control
├─ .lintstagedrc.json             # lint-staged configuration for running checks on staged files
├─ .markdownlint.json             # Markdown linting configuration
├─ .npmrc                         # npm configuration (dependency behavior, install settings)
├─ .nvmrc                         # Node.js version for local development consistency
├─ .prettierignore                # Files ignored by Prettier
├─ .release-it.json               # Release-it configuration for versioning and changelog
├─ AGENTS.md                      # Guidelines for AI agents/tools interacting with the codebase
├─ CHANGELOG.md                   # Project changelog (Keep a Changelog format)
├─ CLAUDE.md                      # Project-specific instructions and context for Claude AI
├─ CODE_OF_CONDUCT.md             # Community standards and enforcement guidelines
├─ commitlint.config.mjs          # Commit message linting rules (Conventional Commits)
├─ components.json                # shadcn/ui component registry
├─ CONTRIBUTING.md                # Contribution guidelines, workflow, and coding standards
├─ cspell.json                    # Spell checking configuration for code and docs
├─ eslint.config.mjs              # ESLint flat config
├─ LICENSE                        # Project license (MIT)
├─ lychee.toml                    # Dead link checker configuration
├─ next.config.ts                 # Next.js configuration
├─ package-lock.json              # Locked dependency versions for reproducible installs
├─ package.json                   # Project metadata, scripts, and dependencies
├─ plopfile.mjs                   # Code generators (scaffolding components, pages, etc.)
├─ postcss.config.mjs             # PostCSS configuration
├─ prettier.config.mjs            # Prettier formatting rules
├─ prisma.config.ts               # Prisma ORM configuration
├─ README.md                      # Project overview, setup, and usage instructions
├─ sentry.edge.config.ts          # Sentry configuration for Edge Runtime monitoring
├─ sentry.server.config.ts        # Sentry configuration for server-side monitoring
├─ skills-lock.json               # Locked AI/editor skills and capability versions
├─ tsconfig.json                  # TypeScript configuration
└─ vercel.json                    # Vercel deployment configuration
```

## Development Setup

### Prerequisites

- Node.js >= 20.x ([nvm](https://github.com/nvm-sh/nvm) recommended)
- npm >= 10.x

### Installation

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/stephen-wm/yorno-rsvp.git
   cd yorno-rsvp
   npm install
   ```

2. Configure environment variables:

   ```bash
   cp .env.example .env.local
   # Windows (CMD/Powershell)
   copy .env.example .env.local
   ```

   Fll in the required values &mdash; see `.env.example` for descriptions of each variable.

3. Start the development server:

   ```bash
   npm run dev
   ```

   The app will be available at [`http://localhost:3000`](https://localhost:3000)

4. You can start editing the project! The application automatically reloads as you edit files during development.

   > This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Inter](https://vercel.com/font), sans-serif font.

## Versioning

This project is currently in pre-1.0 development. Breaking changes may occur at any time.

Releases follow [Semantic Versioning](https://semver.org/) and are documented in [CHANGELOG.md](./CHANGELOG.md).

## Browser Support

This project defines supported browsers via Browserslist in `.browserslistrc`, used by build tools such as Autoprefixer, PostCSS, and compatibility linting.

## Author

Created and maintained by [@stephen-wm](https://github.com/stephen-wm/).

## Contributors

- [@stephen-wm](https://github.com/stephen-wm/)

## License

AGPL-3.0 © 2026 Yorno. See [LICENSE](./LICENSE) for details.

## Contact

For questions or support, open an issue or email [hello@yorno.rsvp](mailto:hello@yorno.rsvp).

---

Badges generated by [shields.io](https://shields.io/).

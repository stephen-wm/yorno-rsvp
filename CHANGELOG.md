# Changelog

All notable changes to Yorno will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) and [Conventional Commits](https://www.conventionalcommits.org/). The formatting for this document is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Sentry edge and server configuration, with client and server instrumentation
- Prisma ORM configuration and initial events schema definitions in `prisma/schema.prisma`
- Edge and standard logger with Pino
- PostHog provider for analytics
- Initial Arcjet configuration through Next.js proxy
- Toaster provider with Sonner
- Global error component with Sentry capture configuration
- `slugify` and `formatDate` functions in `src/lib/utils.ts`
- Empty `types`, `stores`, and `features` folders in the `src` directory
- Empty `api` folder in `src/app/` directory
- Initial authenticated and unauthenticated route groups in the `src/app/` directory (`(app)`, `(public)`, and `(auth)`)
- Health check endpoint for uptime monitoring and orchestration
- Neon-PostgreSQL skills in `.agents` directory
- shadcn/ui skeleton component for use with current theme toggler component implementation

### Changed

- Renamed `app/(marketing)` folder to `app/(public)`
- Moved initial marketing pages header to own component file in the layouts components folder
- Reorganized `.env.example`
- Moved `CODEOWNERS` from project root to `.github/` folder
- Imported and enabled Toaster provider in `src/providers/index.tsx`
- Added `healthz` to `misc` dictionary in the `.cspell` directory
- Ignored Prisma generated folder in ESLint configuration file
- Ignored `src/generated/prisma` folder in `.gitignore`
- Enabled Prettier editting of Prisma files in `.vscode/settings.json`
- Reduced column wrapping size and rulers position from 100 to 80 in `.vscode/settings.json`
- Add Prisma generated and migrations folder to CSpell configuration ignore paths list
- Modified `build` workflow:
  - Runs Prisma generate step (ensures Prisma client is available)
  - Added cache option to in Node setup step
- Added step to generate Prisma client in `ci` and `lint-and-format` workflows

## [0.1.3] - 2026-05-20

### Changed

- Add preceding commit message validation in `pre-commit` hook

## [0.1.2] - 2026-05-20

### Fixed

- All tag links in this CHANGELOG file

## [0.1.1] - 2026-05-20

### Added

- Vercel deployment configuration
- Update `README.md` with project overview and setup instructions
- `LICENSE` file
- Contributor and agent documentation (`AGENTS.md`, `CLAUDE.md`)
- GitHub issue templates, pull request templates, and repository automation configuration
- Dependabot configuration for dependency version management
- Repository governance and community health files
- Markdown linting and link checking (`.markdownlint.json`, `lychee.toml`)
- Release configuration (`.release-it.json`)
- `shadcn/ui` configuration and reusable UI components
- ESLint, Prettier, and formatting rules
- Commit linting and Git hooks via Husky + lint-staged
- Spell checking configuration with CSpell
- Custom hooks and initial application providers (`next-themes`)
- File generation with `plop`

### Changed

- Moved `src/app/globals.css` to `src/styles`
- Extended `globals.css` stylesheet with `shadcn/ui` theming and `tailwindcss/typography` plugin
- Moved `src/app/page.tsx` to `src/app/(marketing)`
- Updated fonts in root layout file, and enabled app providers

## [0.1.0] - 2026-05-19

### Added

- Initial project setup using Next.js (App Router) with TypeScript

[Unreleased]: https://github.com/stephen-wm/yorno-rsvp/compare/v0.1.3...HEAD
[0.1.3]: https://github.com/stephen-wm/yorno-rsvp/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/stephen-wm/yorno-rsvp/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/stephen-wm/yorno-rsvp/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/stephen-wm/yorno-rsvp/releases/tag/v0.1.0

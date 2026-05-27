# Changelog

All notable changes to Yorno will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) and [Conventional Commits](https://www.conventionalcommits.org/). The formatting for this document is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed

- Bumped `eslint-plugin-react-you-might-not-need-an-effect` version from v0.10.1 to v0.10.2
  - [Release notes](https://github.com/nickjvandyke/eslint-plugin-react-you-might-not-need-an-effect/releases)
- Bumped `posthog-js` version from v1.376.0 to v1.376.3
  - [Release notes](https://github.com/PostHog/posthog-js/releases)

## [0.2.6] - 2026-05-27

### Changed

- Updated the `User Persona` field in the `user_story.yml` GitHub Issue Form from a single-select dropdown to multi-select checkboxes to allow stories to target multiple user types.
- Updated the `Affected Area` field in the `user_story.yml` GitHub Issue Form from a single-select dropdown to multi-select checkboxes so stories can span multiple product domains.

### Fixed

- Corrected typo in `User Persona` option:
  - `pubic event page visitors` → `public event page visitors`
- Corrected typo in `Detailed Description` help text:
  - `thew user` → `the user`

## [0.2.4] - 2026-05-27

### Refactor

- Prisma client generation step in `ci` workflow for both dependabot and non-dependabot triggers
- Add fallback dummy values for needed environment variables in `ci` workflow

## [0.2.3] - 2026-05-27

### Changed

- Bumped `actions/github-script` from v7 to v9

## [0.2.2] - 2026-05-26

### Changed

- Build command configuration in `vercel.json`

## [0.2.1] - 2026-05-26

### Added

- `vercel-builds` script in `package.json` to ensure Vercel production deployments generate Prisma client and deploy migrations

## [0.2.0] - 2026-05-26

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
- Added `postinstall` script to automatically run Prisma client generation after dependency installation
- Simplified CI workflows by removing explicit Prisma generate steps
- Added cache option in Node setup step for `build` workflow
- Reorganized order of steps to have environment secrets set prior to dependency installation in `build` workflow
- Removed `postinstall` script in `package.json` and added explicit Prisma generate step in relevant workflows

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

[Unreleased]: https://github.com/stephen-wm/yorno-rsvp/compare/v0.2.6...HEAD
[0.2.4]: https://github.com/stephen-wm/yorno-rsvp/compare/v0.2.3...v0.2.4
[0.2.3]: https://github.com/stephen-wm/yorno-rsvp/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/stephen-wm/yorno-rsvp/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/stephen-wm/yorno-rsvp/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/stephen-wm/yorno-rsvp/compare/v0.1.2...v0.2.0
[0.1.3]: https://github.com/stephen-wm/yorno-rsvp/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/stephen-wm/yorno-rsvp/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/stephen-wm/yorno-rsvp/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/stephen-wm/yorno-rsvp/releases/tag/v0.1.0
[0.2.6]: https://github.com/stephen-wm/yorno-rsvp/compare/v0.2.4...v0.2.6

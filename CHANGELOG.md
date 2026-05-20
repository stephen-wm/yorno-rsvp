# Changelog

All notable changes to Yorno will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) and [Conventional Commits](https://www.conventionalcommits.org/). The formatting for this document is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

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

[Unreleased]: https://github.com/stephen-wm/yorno-rsvp/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/stephen-wm/yorno-rsvp/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/stephen-wm/yorno-rsvp/releases/tag/v0.1.0

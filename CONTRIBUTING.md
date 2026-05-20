# Contributing to Yorno

Thank you for your interest in contributing to Yorno. This document is the single source of truth for how we develop, review, and ship changes. Read it fully before opening your first pull request — it will save you time and prevent your contribution from being sent back for procedural reasons.

---

## Table of Contents

1. [Before You Start](#1-before-you-start)
2. [Development Environment Setup](#2-development-environment-setup)
3. [Project Structure Overview](#3-project-structure-overview)
4. [Branching Strategy](#4-branching-strategy)
5. [Commit Message Convention](#5-commit-message-convention)
6. [Development Workflow](#6-development-workflow)
7. [Code Standards](#7-code-standards)
8. [Testing Requirements](#8-testing-requirements)
9. [Pull Request Process](#9-pull-request-process)
10. [Database & Schema Changes](#10-database--schema-changes)
11. [Environment Variables](#11-environment-variables)
12. [Writing Documentation](#12-writing-documentation)
13. [Reporting Bugs](#13-reporting-bugs)
14. [Requesting Features](#14-requesting-features)
15. [Release Process](#15-release-process)
16. [Getting Help](#16-getting-help)

---

## 1. Before You Start

### Check the issue tracker first

Before writing any code, check whether an issue already exists for what you want to work on. If it does, comment on it to indicate you're working on it. If it doesn't, open one and wait for a maintainer to acknowledge it before investing significant time — this prevents duplicate effort and ensures the change aligns with the project's direction.

For small, obvious fixes (typos, broken links, trivial bugs with a clear solution), you may open a PR directly without a preceding issue.

### Understand the license

Yorno is proprietary software. By submitting a contribution, you agree that your contribution becomes the intellectual property of the project owner under the terms of the project's license. Do not contribute code copied from third-party sources without explicit license compatibility checks.

### Understand what we will and won't merge

We will merge contributions that:

- Fix confirmed bugs
- Improve performance without changing behavior
- Improve test coverage for existing functionality
- Fix accessibility issues
- Clarify documentation

We will not merge contributions that:

- Add features not discussed and approved in an issue first
- Introduce new dependencies without prior discussion
- Reformat code unrelated to the stated change
- Change architectural patterns without prior RFC discussion

---

## 2. Development Environment Setup

### Prerequisites

Ensure the following are installed before proceeding:

| Requirement | Minimum Version | Notes                                                       |
| ----------- | --------------- | ----------------------------------------------------------- |
| Node.js     | 20.x LTS        | Use [nvm](https://github.com/nvm-sh/nvm) to manage versions |
| npm         | 10.x            | Comes with Node.js 20                                       |
| Git         | 2.40+           | Required for Husky hooks                                    |
| VS Code     | Latest          | Recommended editor (see extensions below)                   |

### First-time setup

**1. Fork and clone the repository**

```bash
git clone https://github.com/your-username/Yorno.git
cd Yorno
```

**2. Install dependencies**

```bash
npm install
```

This also runs `husky install` automatically via the `prepare` script in `package.json`, setting up your Git hooks.

### Lockfile consistency (required)

CI uses `npm ci`, which will fail if `package.json` and `package-lock.json` are out of sync.

You must:

- Commit `package-lock.json` whenever dependencies change
- Never modify the lockfile manually
- Resolve `npm ci` errors by running `npm install` locally and committing the result

PRs with an out-of-sync lockfile will fail CI and will not be merged.

**3. Configure environment variables**

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in the required values. Refer to the [Environment Variables](#11-environment-variables) section and the comments in `.env.example` for guidance on obtaining each value.

At minimum for local development you need:

- `DATABASE_URL` — a Neon database connection string
- `BETTER_AUTH_SECRET` — any random string (`openssl rand -base64 32`)
- `BETTER_AUTH_URL` — `http://localhost:3000`
- `RESEND_API_KEY` — from [resend.com](https://resend.com)

**4. Push the database schema**

For local development, use schema push (no migration files needed):

```bash
npx drizzle-kit push
```

**5. (Optional) Seed the database**

```bash
npx tsx src/scripts/seed.ts
```

This creates a test organization, a test user, and sample projects and issues so you have something to look at immediately.

**6. Start the development server**

```bash
npm run dev
```

The app is now running at `http://localhost:3000`.

**7. Verify your setup**

Run the full check suite to confirm everything is working:

```bash
npm run typecheck   # TypeScript
npm run lint        # ESLint
npm run test        # Vitest
npm run build       # Next.js production build
```

All four must pass before you start making changes. If any fail on a clean checkout, open an issue.

---

### Recommended VS Code Extensions

Install these for the best development experience. When you open the project, VS Code will prompt you to install them via the `.vscode/extensions.json` workspace file.

| Extension                                               | Purpose               |
| ------------------------------------------------------- | --------------------- |
| ESLint (`dbaeumer.vscode-eslint`)                       | Inline lint errors    |
| Prettier (`esbenp.prettier-vscode`)                     | Format on save        |
| Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss`) | Class autocomplete    |
| TypeScript Error Lens (`usernamehw.errorlens`)          | Inline type errors    |
| Drizzle ORM (`drizzle-team.drizzle-vscode`)             | Schema syntax support |
| Playwright (`ms-playwright.playwright`)                 | Run/debug E2E tests   |
| GitLens (`eamodio.gitlens`)                             | Git history inline    |

---

## 3. Project Structure Overview

Yorno follows a **feature-module architecture**. Understanding this is essential before writing any code.

```
src/
├── app/           Next.js App Router — routing and layouts ONLY.
│                  No business logic lives here. Pages import from features/.
│
├── features/      The core of the application.
│                  Each subdirectory is a self-contained feature module.
│                  A feature owns its own components, hooks, server actions,
│                  Zod schemas, and types.
│
├── components/    Shared UI components used by 2+ features.
│   ├── ui/        shadcn/ui generated components. Do not hand-edit these.
│   ├── layout/    App shell: sidebar, header, breadcrumbs.
│   └── common/    Reusable non-feature components: empty states,
│                  data tables, confirmation dialogs, etc.
│
├── lib/           Initialized singletons and shared utilities.
│                  The database client, auth client, email client, etc.
│                  These are NOT React components.
│
├── hooks/         React hooks used by 2+ features.
├── stores/        Zustand stores for client UI state.
├── types/         Global TypeScript type definitions.
├── config/        Static configuration: plan limits, nav items, constants.
└── middleware.ts  Edge middleware: Arcjet security + auth session guard.
```

### The rule for deciding where code goes

Ask yourself: **"Is this used by only one feature, or more than one?"**

- Used by one feature only → `src/features/[feature-name]/`
- Used by two or more features → `src/components/common/` or `src/hooks/`
- Initializes a third-party client → `src/lib/`
- Configures Next.js routing → `src/app/`

If you are unsure, default to placing it inside the feature. It is easy to promote code from a feature to shared later. It is harder to disentangle shared code that became too feature-specific.

---

## 4. Branching Strategy

We use a two-branch integration model:

```
main       — production. Every commit here is deployed to Yorno.xyz.
develop    — integration. Features merge here first before going to main.
```

**All feature work branches off `develop`, not `main`.**

### Branch naming

Branch names must follow this format: `type/short-description`

| Type        | When to use                                   |
| ----------- | --------------------------------------------- |
| `feat/`     | New feature or significant enhancement        |
| `fix/`      | Bug fix                                       |
| `chore/`    | Dependency updates, config, no feature or fix |
| `refactor/` | Code restructure with no behavior change      |
| `docs/`     | Documentation only                            |
| `test/`     | Adding or fixing tests only                   |
| `ci/`       | CI/CD pipeline changes                        |
| `perf/`     | Performance improvements                      |

**Examples:**

```bash
feat/kanban-drag-drop
fix/auth-token-refresh-race
chore/upgrade-drizzle-0.32
refactor/extract-issue-card-component
docs/update-env-var-reference
test/add-billing-lifecycle-integration
```

Use hyphens, lowercase, no slashes within the description. Keep it short enough to recognize at a glance.

### Creating a branch

Always branch from an up-to-date `develop`:

```bash
git checkout develop
git pull origin develop
git checkout -b feat/your-feature-name
```

---

## 5. Commit Message Convention

We enforce [Conventional Commits](https://www.conventionalcommits.org/). Commitlint runs on every commit via a Husky `commit-msg` hook and will reject messages that don't conform. This is not optional — it is required for automated changelog generation and semantic versioning.

### Format

```
type(scope): subject

[optional body]

[optional footer]
```

### Types

| Type       | When to use                                      |
| ---------- | ------------------------------------------------ |
| `feat`     | Introduces a new feature visible to users        |
| `fix`      | Fixes a bug                                      |
| `perf`     | Improves performance with no behavior change     |
| `refactor` | Code change that is neither a fix nor a feature  |
| `test`     | Adds or corrects tests                           |
| `docs`     | Documentation changes only                       |
| `chore`    | Dependency updates, build config, tooling        |
| `ci`       | CI/CD workflow changes                           |
| `style`    | Formatting changes only (whitespace, semicolons) |
| `revert`   | Reverts a previous commit                        |
| `build`    | Changes to the build system                      |

### Scopes

Scope must be one of:

`auth` · `issues` · `projects` · `orgs` · `billing` · `docs` · `roadmap` · `members` · `notifications` · `activity` · `analytics` · `files` · `time` · `api` · `db` · `ui` · `deps`

### Subject rules

- Use the **imperative present tense**: "add" not "added" or "adds"
- Do **not** capitalize the first letter
- Do **not** end with a period
- Maximum **72 characters**

### Examples

```bash
feat(issues): add drag-and-drop between kanban columns
fix(auth): resolve token expiry race condition on silent refresh
chore(deps): upgrade drizzle-orm to 0.32.0
refactor(projects): extract project card into shared component
test(billing): add vitest coverage for seat count proration
docs(contributing): clarify branch naming convention
perf(issues): memoize kanban column to prevent unnecessary re-renders
ci(release): add drizzle-kit migrate step before release-it
```

### Breaking changes

Append `!` after the type/scope and add a `BREAKING CHANGE:` footer:

```bash
feat(api)!: change issue status enum values

BREAKING CHANGE: The "in_progress" status value has been renamed to
"in-progress" to align with the REST API conventions. Clients must
update their status references accordingly.
```

Breaking changes trigger a major version bump in the automated release.

### What NOT to do

```
# Too vague
fix: fix bug

# Not imperative tense
feat(issues): added kanban board

# Missing scope
feat: add drag and drop

# Too long
feat(issues): add drag-and-drop functionality to the kanban board columns so that users can move issue cards between status columns without needing to open the issue detail page

# Wrong type (this is a feat, not a chore)
chore(issues): add drag-and-drop
```

---

## 6. Development Workflow

### Day-to-day workflow

```
1. Pick up an issue from the tracker
2. Branch off develop: git checkout -b feat/your-feature
3. Make changes in small, logical commits
4. Push to remote: git push origin feat/your-feature
5. Open a PR targeting develop
6. CI runs: typecheck, lint, test, build must all pass
7. PR is reviewed and approved
8. Squash merge into develop
9. When develop is ready for release → PR from develop to main
10. Merge commit into main triggers release.yml
11. release-it bumps version, writes changelog, creates GitHub Release
12. Vercel detects push to main and deploys to production
```

### Keeping your branch up to date

If `develop` has moved on while you were working on your branch, rebase rather than merge:

```bash
git fetch origin
git rebase origin/develop
```

Rebasing keeps the commit history linear. Merge commits on feature branches create noise. If you encounter conflicts during rebase, resolve them file by file, then `git rebase --continue`.

**Never force-push to `develop` or `main`.** Only force-push to your own feature branches, and only when you have explicitly rebased.

### Running checks locally before pushing

```bash
npm run typecheck     # Must pass
npm run lint          # Must pass
npm run test          # Must pass
npm run test:e2e      # Run for significant UI changes
```

The pre-commit hook runs `lint-staged` automatically, but it only checks staged files. Run the full suite manually before pushing to catch issues across the whole codebase.

CSpell is also configured to do active spellchecking during development and when staged files are committed.
Should any spelling errors be detected, make sure to fix them before proceding. Spelling errors triggered by reference of dependency names, e.g. import statements, should be placed in `.cspell/dependencies.txt` file. All other instances of CSpell reported errors that are NOT spelling mistakes should be placed in `.cspell/misc.txt`.

---

## 7. Code Standards

### TypeScript

- **Strict mode is non-negotiable.** All TypeScript strict flags are enabled, including `noUncheckedIndexedAccess`. Do not use `// @ts-ignore` or `// @ts-expect-error` without a comment explaining exactly why and a link to a tracking issue for resolving it.
- **No `any`.** Use `unknown` when the type is genuinely unknown. Use generics when the type varies. If you find yourself reaching for `any`, you are solving the wrong problem.
- **Explicit return types on exported functions.** Inference is fine for internal functions, but exported functions must declare their return type explicitly so callers have clear documentation.
- **`import type` for type-only imports.** Always use `import type { Foo }` when importing a TypeScript type. This is enforced by ESLint.

```ts
// ✅ Correct
import type { Issue } from '@/types';
// ❌ Wrong
import { Issue } from '@/types';

import { createIssue } from '@/features/issues/actions/create-issue';

export async function getIssue(id: string): Promise<Issue | null> {
	// ...
}

// Should be import type
export async function getIssue(id) {
	// Missing types
	// ...
}
```

### React & Components

- **Server Components by default.** Every component in the App Router is a Server Component unless it explicitly needs client-side interactivity. Add `"use client"` only when you need `useState`, `useEffect`, event handlers, or browser APIs. Keep the client boundary as deep in the tree as possible.
- **No business logic in page files.** `app/**/page.tsx` files should be thin — they fetch data and pass it to feature components. All logic lives in `features/`.
- **Props interfaces over inline types.** Define a named interface for component props rather than inlining the type.

```tsx
// ✅ Correct
interface IssueCardProps {
  issue: Issue;
  onStatusChange: (status: IssueStatus) => void;
}

export function IssueCard({ issue, onStatusChange }: IssueCardProps) { ... }

// ❌ Wrong
export function IssueCard({ issue, onStatusChange }: { issue: Issue; onStatusChange: (status: IssueStatus) => void }) { ... }
```

- **No inline styles.** Use Tailwind utility classes. If a style requires values outside Tailwind's scale, add it to `tailwind.config.ts` as a design token, not as an inline `style` prop.
- **Accessible by default.** All interactive elements must be keyboard accessible and have appropriate ARIA attributes. Prefer semantic HTML elements (`<button>`, `<nav>`, `<main>`) over `<div>` with event handlers. The ESLint `jsx-a11y` plugin catches many violations automatically.

### Server Actions

- All mutations (create, update, delete) use Next.js Server Actions, not API routes, unless the endpoint is part of the public API.
- Server actions must validate input with Zod before touching the database.
- Server actions must check authorization before performing any operation. Never assume a session is sufficient — always verify the user has permission within the relevant organization.

```ts
// ✅ Correct server action pattern
'use server';

import { createIssueSchema } from '@/features/issues/schemas/issue.schema';
import { checkMembership } from '@/features/members/utils';
import { auth } from '@/lib/auth/server';

export async function createIssue(input: unknown) {
	// 1. Authenticate
	const session = await auth.api.getSession({ headers: headers() });
	if (!session) throw new Error('Unauthorized');

	// 2. Validate input
	const data = createIssueSchema.parse(input);

	// 3. Authorize
	await checkMembership(session.user.id, data.organizationId, ['admin', 'member']);

	// 4. Execute
	return await db.insert(issues).values(data).returning();
}
```

### Styling

- Use the `cn()` utility from `src/lib/utils.ts` for conditional class merging. It combines `clsx` and `tailwind-merge` to handle Tailwind class conflicts correctly.
- Do not use `@apply` in CSS files. It breaks Tailwind's JIT compilation and defeats the purpose of utility classes.
- Color values must reference the CSS variable tokens defined in `globals.css` via Tailwind's `var()` convention. Do not hardcode hex values in components.

### Logging

- Never use `console.log` in application code. Use the structured logger from `src/lib/logger.ts`. This is enforced by the `no-console` ESLint rule.
- In edge runtime code (`middleware.ts` only), use the edge-safe logger from `src/lib/edge-logger.ts`.
- Always include relevant context as the first argument to a log call: `log.info({ issueId, userId }, "Issue status updated")`.

---

## 8. Testing Requirements

### What to test

| Code type                | Test type        | Where                    |
| ------------------------ | ---------------- | ------------------------ |
| Zod schemas              | Unit test        | Colocated `.test.ts`     |
| Pure utility functions   | Unit test        | Colocated `.test.ts`     |
| React hooks              | Unit test        | Colocated `.test.ts`     |
| React components         | Component test   | Colocated `.test.tsx`    |
| Server actions (with DB) | Integration test | `src/tests/integration/` |
| Full user journeys       | E2E test         | `tests/e2e/`             |

### Coverage expectations

- All new utility functions and Zod schemas **must** have unit tests.
- New React hooks **must** have tests covering their primary states (loading, success, error).
- Bug fixes **must** include a regression test that would have caught the bug.
- Server actions for billing and auth flows **must** have integration tests.

You are not required to hit a specific coverage percentage, but PRs that introduce significant new logic without tests will be sent back.

### Running tests

```bash
# Unit and integration tests (Vitest)
npm run test              # Run once
npm run test:watch        # Watch mode for development
npm run test:coverage     # With coverage report

# E2E tests (Playwright)
npm run test:e2e          # Run all E2E tests
npm run test:e2e:ui       # Playwright UI mode (recommended for debugging)
npm run test:e2e:headed   # Run in headed browser (visible)
```

### Test quality guidelines

- **Test behavior, not implementation.** Test what the code does from the outside, not how it does it internally. Tests that rely on internal implementation details break when you refactor and give you a false sense of security.
- **One concept per test.** Each test should have a single, clear reason to fail. Long tests with many assertions test multiple behaviors — split them.
- **Use descriptive test names.** A failing test's name should tell you exactly what broke without needing to read the test body: `"shows error message when email is already registered"` not `"handles error"`.
- **Never use `test.only` in committed code.** The Playwright config sets `forbidOnly: true` in CI — this will fail the build.
- **Keep E2E tests independent.** Each Playwright test must be able to run in isolation. Never write tests that depend on the state left by a previous test.

---

## 9. Pull Request Process

### Before opening a PR

- [ ] Your branch is up to date with `develop` (rebased, not merged)
- [ ] All CI checks pass locally: `npm run typecheck && npm run lint && npm run test && npm run build`
- [ ] New env vars are documented in `.env.example`
- [ ] Database migrations are created if the schema changed
- [ ] Tests are written for new logic
- [ ] You have self-reviewed your diff in GitHub before marking ready for review

### PR title

Must follow the same Conventional Commits format as your commit messages:

```
feat(issues): add drag-and-drop between kanban columns
fix(auth): resolve token expiry race on silent refresh
```

### PR description

Fill out the pull request template completely. A PR with an empty description will be closed and asked to resubmit.

The template asks for:

- A summary of what changed and why
- The type of change
- A checklist of completion criteria
- Screenshots or screen recordings for UI changes

### Reviewing your own PR

Before requesting review (or before merging, if you're the maintainer), read your own diff on GitHub — not in your editor. GitHub's diff view is the same view a reviewer sees, and you will catch things you missed in your editor: debug log statements left in, commented-out code, TODO comments that shouldn't ship, unintended whitespace changes.

### Merge strategy

- Feature branches → `develop`: **Squash merge.** Your entire branch becomes a single commit on `develop` with the PR title as the commit message. This is why PR titles must follow Conventional Commits — the squash merge commit is what `release-it` reads to generate the changelog.
- `develop` → `main`: **Merge commit.** Preserves the boundary between release candidates and production clearly.

### Draft PRs

Open a Draft PR early if you want feedback on an approach before finishing the implementation. Prefix the title with `[WIP]` and explain in the description what you have and what you're looking for. Do not mark a PR ready for review until all checklist items are complete.

---

## 10. Database & Schema Changes

Database changes are among the most consequential changes in the codebase. They require extra care.

### Rules

1. **Never modify an existing migration file.** Migrations are immutable once committed. If you made a mistake, create a new migration that corrects it.
2. **Always use `drizzle-kit generate` for schema changes.** Never hand-write migration SQL unless you have an explicit reason. Generated migrations are predictable and reviewed before they run.
3. **Destructive changes require a migration plan.** Dropping a column, renaming a table, or changing a column type that contains production data must be discussed in the associated issue before the PR is opened. The standard approach is a two-phase migration (add new, migrate data, remove old) rather than a single destructive operation.
4. **Never use `drizzle-kit push` against a shared or production database.** Push is for local development only. Migration files run in the CI release pipeline.

### Workflow for schema changes

```bash
# 1. Edit the schema file in src/lib/db/schema/
# 2. Generate the migration
npx drizzle-kit generate

# 3. Review the generated SQL in drizzle/migrations/
# 4. Apply to your local database
npx drizzle-kit migrate

# 5. Commit both the schema file AND the migration file
git add src/lib/db/schema/issues.ts drizzle/migrations/
git commit -m "feat(db): add time_estimate column to issues table"
```

The migration file must be committed in the same PR as the schema change. Never commit a schema change without its corresponding migration.

---

## 11. Environment Variables

### Rules

- **Never commit `.env.local` or any file containing real credentials** to the repository. `.env.local` is in `.gitignore`.
- **Every environment variable used in the codebase must be documented in `.env.example`** with a comment explaining what it is and how to obtain it.
- **Prefix client-accessible variables with `NEXT_PUBLIC_`.** Variables without this prefix are server-only. Never expose server secrets with the `NEXT_PUBLIC_` prefix.
- **Access env vars through a validated config module**, not directly through `process.env`, in application code. This ensures you get a startup error if a required var is missing rather than a runtime error at the moment the code path is first hit.

### Adding a new environment variable

1. Add the variable to `.env.local` with its value
2. Add it to `.env.example` with a placeholder value and a comment
3. Add it to the `Environment Variables` section in `README.md`
4. Add it to the Vercel project dashboard (Settings → Environment Variables) for staging and production
5. If it's required in CI, add it to the GitHub repository secrets

---

## 12. Writing Documentation

### Code documentation

- **Document the why, not the what.** Code shows what is happening. Comments should explain why a non-obvious decision was made.
- **JSDoc for exported functions and types in `src/lib/`.** Functions that are used across the codebase benefit from a brief JSDoc comment documenting parameters, return value, and any edge cases.
- **Delete commented-out code.** Dead code creates confusion. If you want to preserve something for reference, use a git branch or a note in an issue. Do not commit commented-out code.

### README and docs updates

If your change introduces new setup steps, new environment variables, or changes an existing behavior documented in the README, update the README in the same PR. Documentation PRs that lag behind code changes become permanently out of date.

---

## 13. Reporting Bugs

Use the **Bug Report** issue template. An issue filed without the template information will be closed and asked to resubmit.

A good bug report includes:

- **Environment:** Browser, OS, account plan tier
- **Steps to reproduce:** Specific, numbered steps that reliably reproduce the bug starting from the login page
- **Expected behavior:** What should have happened
- **Actual behavior:** What actually happened
- **Screenshots or screen recordings:** For UI bugs, a recording is worth a thousand words
- **Console errors:** Open DevTools → Console and include any red errors
- **Network errors:** Open DevTools → Network, reproduce the bug, and note any failed requests with their status codes and response bodies

The most common reason bug reports are closed without action is that they cannot be reproduced. The more specific your steps, the faster the bug gets fixed.

---

## 14. Requesting Features

Use the **Feature Request** issue template. Before filing a feature request, search existing issues to see if it has been requested before. If it has, add a 👍 reaction to the existing issue rather than filing a duplicate.

A good feature request includes:

- **Problem statement:** What are you trying to do that you currently cannot? Frame it as a user need, not a technical solution.
- **Proposed solution:** Your idea for how to address the problem
- **Alternatives considered:** Other approaches you thought about and why you prefer your proposed solution
- **Who is affected:** Is this relevant to free users, org-tier users, all users?

Feature requests without a clear problem statement will be asked to revise before they are considered.

---

## 15. Release Process

Releases are fully automated. As a contributor, you do not manually trigger releases.

When a PR is merged into `main`, the `release.yml` GitHub Actions workflow:

1. Runs database migrations against the production database
2. Runs `release-it --ci`, which:
   - Reads all commits since the last tag
   - Determines the version bump (patch, minor, or major) from commit types
   - Updates `package.json` version
   - Updates `CHANGELOG.md` with the new entries
   - Creates a commit: `chore(release): vX.Y.Z [skip ci]`
   - Creates a git tag: `vX.Y.Z`
   - Pushes the commit and tag to `main`
   - Creates a GitHub Release with the changelog entries
3. Vercel detects the push to `main` and deploys to production

This is why commit message discipline matters. The entire changelog is generated from commit messages. A commit like `fix: stuff` contributes nothing readable to the changelog. A commit like `fix(auth): resolve token expiry race on silent refresh` tells users exactly what was fixed.

---

## 16. Getting Help

- **For questions about the codebase:** Open a GitHub Discussion in the Q&A category
- **For bug reports:** Open a GitHub Issue using the Bug Report template
- **For feature requests:** Open a GitHub Issue using the Feature Request template
- **For security vulnerabilities:** See [SECURITY.md](./.github/SECURITY.md) — do not use public issues

---

_This document is updated as the project evolves. If you followed this guide and something was unclear, inaccurate, or missing, please open a PR to improve it._

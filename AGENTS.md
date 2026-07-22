# Repository Guidelines

## Project Structure and Packages

Histoire is a pnpm monorepo. Core packages live in `packages/`: `histoire` contains the Node-side core and CLI, `histoire-app` the Vue UI, `histoire-controls` the built-in controls, `histoire-shared` shared utilities, and the `histoire-plugin-*` packages framework and service integrations. Runnable fixtures live in `examples/`, including Vue, Nuxt, and Svelte projects. Documentation lives in `docs/`.

Keep changes inside the narrowest owning package. Update an example when integration or browser behavior needs coverage. Do not edit generated or dependency directories such as `node_modules/`, `dist/`, `histoire-dist/`, `.histoire/dist/`, coverage output, or Cypress screenshots and videos.

## Build, Test, and Development Commands

Use pnpm; the root `packageManager` field and `pnpm-lock.yaml` are canonical.

- `pnpm install` installs all workspace dependencies.
- `pnpm watch` builds the packages and watches them in parallel for local development.
- `pnpm --dir examples/vue3 story:dev` runs the primary Vue example; `pnpm --dir examples/vue3 dev:hst` also watches the Histoire UI output.
- `pnpm lint` runs ESLint across the monorepo; `pnpm lint:fix` applies fixes.
- `pnpm test` runs package Vitest suites; `pnpm --filter <package> test` runs a focused package suite.
- `pnpm test:examples` runs the standard Vue example builds and Cypress suites; `pnpm test:examples:all` includes every example.
- `pnpm build` builds all packages; `pnpm docs:build` builds the VitePress documentation.

During non-trivial implementation, use the smallest affected checks repeatedly rather than waiting until the end. Exercise affected stories through the appropriate local example, inspect browser and server output, and stop long-running processes when finished.

## Coding Style and Testing

Follow the existing ESLint configuration and nearby code. Use two-space indentation, single quotes, and no semicolons. Prefer TypeScript and Vue Composition API with `<script setup>` where the surrounding package does. Use PascalCase for Vue components, camelCase for functions and composables, and preserve existing package naming conventions.

Add or update Vitest coverage for package behavior and Cypress coverage for end-to-end example behavior. Bug fixes should include a focused regression test when practical. Do not replace a focused test with a broad build-only check.

## Code Navigation and Editing

For source-code review, debugging, or editing, use the repository's available code-intelligence tools before broad source inspection when they can answer the question. GrepAI is useful for finding behavior or flow across unfamiliar code; Serena is useful for symbol-level inspection, references, declarations, diagnostics, and scoped edits. If either tool is unavailable or cannot answer the question, state the limitation briefly and use a focused fallback.

Use this order for source-code work:

- Unknown behavior, feature flow, impact area, or file location: search with GrepAI first when available.
- Known file but unknown symbol: use Serena's symbol overview, then inspect the relevant symbol.
- Known function, component, composable, store, utility, or other symbol: use Serena symbol lookup, including the body when needed.
- References, callers, or refactor scope: use Serena references; use GrepAI when the flow crosses unclear boundaries.
- Declarations, implementations, and diagnostics: use Serena when those capabilities are active.
- Literal strings, error messages, configuration keys, scripts, filenames, generated files, or non-code inventory: use `rg` or another targeted shell search.
- Markdown, JSON, TOML, YAML, package scripts, and other configuration or documentation files: targeted reads are allowed.

Keep source inspection focused:

- Do not read an entire source file just to locate or inspect a known symbol; use symbol-level lookup first.
- Before a full source-file read, explain why the available semantic tools are insufficient for that specific read.
- Do not treat a known path or prior context as a reason to skip the navigation step.
- If a semantic tool fails, correct the request and retry before falling back to raw search or file reads.

For edits contained within a clear function, component, composable, store, or other symbol boundary, prefer a symbol-scoped edit after inspecting that symbol. Use `apply_patch` for imports, constants, state wiring, edits spanning multiple regions, generated files, and non-code files.

## Subagent Orchestration

Use the main thread as the coordinator and final acceptance owner. Handle simple questions, documentation edits, and other work with one obvious owner directly. For non-trivial discovery, implementation, verification, review, or external research, assign only the specialist roles that materially help and give each one an explicit, non-overlapping scope.

Available specialist roles:

- `repo_explorer`: discover unfamiliar repository flows, dependencies, and edit surfaces.
- `researcher`: research current external documentation and specifications.
- `repo_implementer`: implement substantial repository changes.
- `patch_implementer`: make small, localized fixes.
- `test_runner`: run focused verification and report failures.
- `code_reviewer`: review completed changes before acceptance.

Use `test_runner` and `code_reviewer` before accepting non-trivial implementation, and return findings to an implementer. Do not use the research agent for repository inspection or the test runner for implementation.

For every named specialist spawn, explicitly set `fork_turns = "none"`. Its prompt must stand on its own and state the objective, ownership, constraints, relevant paths, and expected output; never rely on parent-thread history.

Run independent work in parallel whenever practical, including implementation. For example, one implementer can own package behavior while another owns Cypress coverage. Give each agent explicit, non-overlapping ownership of files, symbols, or artifacts, then integrate and accept the combined result in the main thread.

## Git and GitHub

- Treat `s-obvious` as the long-lived integration branch for personal Histoire changes. Base related work on it and target it for integration unless the user explicitly names another base.
- Write Conventional Commit subjects in the format `type(scope): subject`, using a lowercase imperative subject and the narrowest meaningful scope.
- Keep commits focused and preserve unrelated user or agent changes.
- Do not auto-push. When the user explicitly authorizes a push for completed GitHub issue work and the push succeeds, close the associated issue unless the user asked to leave it open.
- GitHub issue summaries should state what changed, how acceptance criteria were verified, and any notable design decisions or follow-up risk.

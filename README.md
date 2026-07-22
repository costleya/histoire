<p align="center">
  <img src="./logo.svg" alt="Histoire logo" width="256px" height="256px">
</p>

<br>

# Histoire

> Fast and beautiful interactive component playgrounds

[![Test status](https://github.com/histoire-dev/histoire/actions/workflows/test.yml/badge.svg)](https://github.com/histoire-dev/histoire/actions/workflows/test.yml)
[![Test status](https://github.com/histoire-dev/histoire/actions/workflows/test-vue3.yml/badge.svg)](https://github.com/histoire-dev/histoire/actions/workflows/test-vue3.yml)
[![Test status](https://github.com/histoire-dev/histoire/actions/workflows/test-svelte4.yml/badge.svg)](https://github.com/histoire-dev/histoire/actions/workflows/test-svelte4.yml)
[![Test status](https://github.com/histoire-dev/histoire/actions/workflows/test-sveltekit.yml/badge.svg)](https://github.com/histoire-dev/histoire/actions/workflows/test-sveltekit.yml)
[![Test status](https://github.com/histoire-dev/histoire/actions/workflows/test-nuxt4.yml/badge.svg)](https://github.com/histoire-dev/histoire/actions/workflows/test-nuxt4.yml)

[Read the Documentation](https://histoire.dev) |
[Discord server](https://discord.gg/KpCnT72rJk) | [Discussions board](https://github.com/histoire-dev/histoire/discussions)

⚡️ Lightning fast development and instant HMR thanks to [Vite](http://vitejs.dev)
👓 Build and visually test your components in isolation
📚 Document your components with stories and variants
📝 Generate source code examples automatically
🎨 Beautiful and customizable interface

![screenshot](./screenshot.png)

## Continuous Releases

You can install builds from any commit on the main branch from [here](https://nightly.akryum.dev/histoire-dev/histoire) or from any Pull Request.

## Contributing

See [Contributing Guide](https://github.com/Akryum/histoire/blob/main/CONTRIBUTING.md) to learn more about the repository and how you can contribute.

## Codex setup on `s-obvious`

The `s-obvious` branch includes repository-local Codex configuration for Serena, GrepAI, context-mode, specialist agents, and framework skills. Use Node 22.5 or newer and the pnpm version declared in `package.json`.

Install the local tooling before opening a new Codex task:

```sh
corepack enable
uv tool install --prerelease=allow serena-agent
brew install yoanbernabeu/tap/grepai
npm install --global context-mode
```

Make sure `serena`, `grepai`, `context-mode`, `node`, and `pnpm` are visible on the `PATH` inherited by Codex. The tracked `.codex/config.toml` starts the three MCP servers, but Codex must be restarted after a config, hook, installation, or `PATH` change.

Context-mode and pnpm need writable directories outside the repository when Codex uses a workspace-write sandbox. Merge these absolute paths into `~/.codex/config.toml` rather than redeclaring an existing table:

```toml
[sandbox_workspace_write]
writable_roots = [
  "/Users/YOUR_NAME/.codex/context-mode",
  "/Users/YOUR_NAME/Library/pnpm/store",
]
```

Do not run `context-mode upgrade` for this repository: it installs hooks in the global Codex configuration. Histoire uses only the tracked `.codex/hooks.json` lifecycle hooks.

GrepAI requires the LM Studio embedding model `text-embedding-mxbai-embed-large-v1` on `http://localhost:1234`. From the repository root, initialize it with the LM Studio provider and Gob storage, confirm `.grepai/config.yaml` names that model with `dimensions: 768`, then start its watcher:

```sh
grepai init --provider lmstudio --backend gob
grepai watch --background
grepai status
```

The MCP process does not start LM Studio or the watcher. After a full Codex restart, verify Serena reports project `histoire`, GrepAI reports indexed repository files, and a live context-mode tool call can use storage under `~/.codex/context-mode`. Tool names appearing in Codex do not by themselves prove that these backends are healthy.

## Sponsors

Become a sponsor!

- [Guillaume Chau](https://github.com/sponsors/Akryum)
- [Hugo Attal](https://github.com/sponsors/hugoattal)

We are very grateful to all our sponsors for their support:

### [Guillaume Chau](https://github.com/sponsors/Akryum)

<p align="center">
  <a href="https://guillaume-chau.info/sponsors/" target="_blank">
    <img src='https://akryum.netlify.app/sponsors.svg'/>
  </a>
</p>

## License

MIT

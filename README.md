# 📬 SendGrid Workspace

> **Telegram Bot messaging toolkit** — a monorepo with a core library, CLI tool, and MCP server for sending Telegram messages programmatically.

---

## 📦 What's Inside

This monorepo (`sendgrid-workspace`) contains three packages:

| Package | npm | Description |
|---------|-----|-------------|
| **`@nandansravesh/sendgrid-core`** | [![npm](https://img.shields.io/npm/v/@nandansravesh/sendgrid-core)](https://www.npmjs.com/package/@nandansravesh/sendgrid-core) | Core library — Zod-validated Telegram Bot API client |
| **`@nandansravesh/sendgrid-cli`** | [![npm](https://img.shields.io/npm/v/@nandansravesh/sendgrid-cli)](https://www.npmjs.com/package/@nandansravesh/sendgrid-cli) | CLI tool — send messages from your terminal |
| **`@nandansravesh/sendgrid-mcp`** | — | MCP server — for AI assistants (Claude, Cursor, VS Code) |

---

## ✨ Features

- **🚀 Simple API** — one function to send Telegram messages with full TypeScript types
- **✅ Zod validation** — runtime input safety for every parameter
- **🖥️ CLI** — quick terminal-based messaging with persistent config
- **🤖 MCP integration** — use with Claude Desktop, Cursor, VS Code, and any MCP-compatible client
- **🧩 Monorepo** — share code across packages using Bun workspaces
- **🔒 Lightweight** — zero external HTTP dependencies (uses native `fetch`)

---

## 🚀 Quick Start

### 1️⃣ Get a Telegram Bot Token

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Send `/newbot` and follow the prompts
3. Copy the HTTP API token

### 2️⃣ Use via CLI

```bash
npm install -g @nandansravesh/sendgrid-cli

sendgrid init --telegram-bot-token YOUR_BOT_TOKEN
sendgrid telegram 123456789 "Hello World!"
```

### 3️⃣ Use via Core Library

```bash
npm install @nandansravesh/sendgrid-core
```

```typescript
import { sendTelegramMessage } from "@nandansravesh/sendgrid-core";

const result = await sendTelegramMessage({
  chatId: "123456789",
  message: "Hello from sendgrid-core!",
  botToken: "YOUR_BOT_TOKEN",
});

console.log(result); // { ok: true, chatId: "123456789", messageId: "42" }
```

### 4️⃣ Use via MCP Server

Add to your MCP client config (`claude_desktop_config.json`, `.cursor/mcp.json`, `.vscode/mcp.json`):

```json
{
  "mcpServers": {
    "sendgrid": {
      "command": "node",
      "args": ["path/to/@nandansravesh/sendgrid-mcp/dist/index.js"],
      "env": {
        "TELEGRAM_BOT_TOKEN": "YOUR_BOT_TOKEN"
      }
    }
  }
}
```

---

## 📁 Package Breakdown

### 🔧 Core (`packages/core`)

**npm:** `@nandansravesh/sendgrid-core`

The lightweight core library. Exports one async function with full Zod validation.

```typescript
sendTelegramMessage(options: {
  chatId: string;   // Telegram chat ID
  message: string;  // Message text
  botToken: string; // Bot API token
}): Promise<{
  ok: true;
  chatId: string;
  messageId: string;
}>
```

### 🖥️ CLI (`packages/cli`)

**npm:** `@nandansravesh/sendgrid-cli`

Two commands:

| Command | Description |
|---------|-------------|
| `sendgrid init --telegram-bot-token <token>` | Save your bot token to `~/.config/sendGrid/config.json` |
| `sendgrid telegram <chatId> <message>` | Send a message |

### 🤖 MCP Server (`packages/local-mcp`)

**Package:** `@nandansravesh/sendgrid-mcp` (private)

Registers a single `telegram` tool with `chatId` and `message` parameters. The bot token is read from the `TELEGRAM_BOT_TOKEN` environment variable.

---

## 🛠️ Development

### Prerequisites

- [Bun](https://bun.sh) >= 1.x

### Setup

```bash
git clone <repo-url>
cd sendgrid
bun install
```

### Scripts

```bash
bun run format          # Format code with oxfmt
bun run lint            # Lint with oxlint
bun run typecheck       # TypeScript type checking
bun run build:core      # Build core package
bun run build:cli       # Build CLI package
bun run build:local-mcp # Build MCP server

# Run in dev mode
bun run dev:cli
bun run dev:local-mcp
```

### Publish

```bash
# Core
bun run build:core && cd packages/core && npm publish

# CLI (bump version first)
bun run build:cli && cd packages/cli && npm publish
```

---

## 🏗️ Project Structure

```
sendgrid/
├── apps/
│   └── remote-mcp/          # Remote MCP server (private)
├── packages/
│   ├── core/                # @nandansravesh/sendgrid-core
│   │   ├── src/
│   │   │   ├── index.ts     # Exports
│   │   │   ├── schema.ts    # Zod schemas & types
│   │   │   └── operations.ts # sendTelegramMessage
│   │   └── package.json
│   ├── cli/                 # @nandansravesh/sendgrid-cli
│   │   ├── src/
│   │   │   └── index.ts     # Commander setup
│   │   └── package.json
│   └── local-mcp/           # @nandansravesh/sendgrid-mcp
│       ├── src/
│       │   ├── index.ts     # MCP server setup
│       │   └── utils/
│       │       └── index.ts # Bot token from env
│       └── package.json
├── package.json             # Root workspace config
├── tsconfig.json
└── .mcp.json                # MCP server config for this repo
```

---

## 🧪 Tech Stack

- **Runtime:** [Bun](https://bun.sh)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Validation:** [Zod](https://zod.dev/)
- **CLI framework:** [Commander.js](https://github.com/tj/commander.js)
- **Build tool:** [tsdown](https://tsdown.dev/) (powered by [rolldown](https://rolldown.rs/))
- **MCP SDK:** [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk)
- **Linting:** [oxlint](https://oxc.rs/docs/guide/usage/linter.html)
- **Formatting:** [oxfmt](https://oxc.rs/docs/guide/usage/formatter.html)

---

## 📄 License

MIT

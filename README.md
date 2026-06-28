# 📬 SendGrid Workspace

> **Telegram Bot messaging toolkit** by **Sravesh Nandan** — TypeScript monorepo with a core library, CLI tool, local MCP server, and remote MCP server deployed on Render with Clerk OAuth authentication.

[![npm core](https://img.shields.io/npm/v/@nandansravesh/sendgrid-core)](https://www.npmjs.com/package/@nandansravesh/sendgrid-core)
[![npm cli](https://img.shields.io/npm/v/@nandansravesh/sendgrid-cli)](https://www.npmjs.com/package/@nandansravesh/sendgrid-cli)
[![GitHub stars](https://img.shields.io/github/stars/sraveshnandan/sendGrid?style=social)](https://github.com/sraveshnandan/sendGrid)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

Send Telegram messages from your terminal, code, or AI assistant. Built with TypeScript, Bun, Zod, and the MCP protocol — deployed as a remote MCP server on Render with Clerk OAuth for secure access.

---

## 📦 Latest Versions

| Package | Version | Link |
|---------|---------|------|
| `@nandansravesh/sendgrid-core` | `0.0.3` | [npm](https://www.npmjs.com/package/@nandansravesh/sendgrid-core) |
| `@nandansravesh/sendgrid-cli` | `0.0.5` | [npm](https://www.npmjs.com/package/@nandansravesh/sendgrid-cli) |
| `@nandansravesh/sendgrid-mcp` | `0.0.0` (private) | Local development only |
| `sendgrid-remote-mcp` | `0.0.1` | Deployed on Render |

---

## ✨ Features

- **🚀 Simple API** — one function to send Telegram messages with full TypeScript types
- **✅ Zod validation** — runtime input safety for every parameter
- **🖥️ CLI** — quick terminal-based messaging with persistent config (`~/.config/sendGrid/config.json`)
- **🤖 MCP integration** — use with Claude Desktop, Cursor, VS Code, and any MCP-compatible client
- **🌐 Remote MCP server** — deployed on Render with HTTPS, auto-scaling, and uptime monitoring
- **🔐 Clerk OAuth** — secure OAuth 2.0 Bearer Token authentication for the remote MCP server
- **🧩 Monorepo** — share code across packages using Bun workspaces
- **🔒 Lightweight** — zero external HTTP dependencies (uses native `fetch`)
- **📘 Skills.sh ready** — publishable Agent Skills file for Claude and other AI agents

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

### 4️⃣ Use via Local MCP Server

Add to your MCP client config:

```json
{
  "mcpServers": {
    "sendgrid": {
      "command": "npx",
      "args": ["-y", "@nandansravesh/sendgrid-mcp"],
      "env": {
        "TELEGRAM_BOT_TOKEN": "YOUR_BOT_TOKEN"
      }
    }
  }
}
```

### 5️⃣ Use via Remote MCP Server (Render)

Connect to the deployed remote MCP server:

```json
{
  "mcpServers": {
    "sendgrid-remote": {
      "type": "remote",
      "url": "https://sendgrid-remote-mcp.onrender.com/YOUR_BOT_TOKEN/mcp"
    }
  }
}
```

The remote server uses **Clerk OAuth 2.0** — your MCP client will handle the OAuth flow automatically.

---

## 📁 Package Breakdown

### 🔧 Core (`packages/core`)

**npm:** `@nandansravesh/sendgrid-core` | [README](packages/core/README.md)

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

**Dependencies:** `zod` only.

### 🖥️ CLI (`packages/cli`)

**npm:** `@nandansravesh/sendgrid-cli` | [README](packages/cli/README.md)

Two commands:

| Command | Description |
|---------|-------------|
| `sendgrid init --telegram-bot-token <token>` | Save your bot token to `~/.config/sendGrid/config.json` |
| `sendgrid telegram <chatId> <message>` | Send a message |

### 🤖 Local MCP Server (`packages/local-mcp`)

**Package:** `@nandansravesh/sendgrid-mcp` (private) | [README](packages/local-mcp/README.md)

Registers a single `telegram` tool with `chatId` and `message` parameters. Uses stdio transport. Bot token from `TELEGRAM_BOT_TOKEN` env var.

### 🌐 Remote MCP Server (`apps/remote-mcp`)

**Package:** `sendgrid-remote-mcp` (private, deployed on Render)

- **Endpoint:** `https://sendgrid-remote-mcp.onrender.com/:botToken/mcp`
- **Auth:** Clerk OAuth 2.0 Bearer Token
- **Health check:** `GET /health` → `{"status":"ok"}`
- **Port:** Configurable via `PORT` env (default `3300`)
- **Forwarded headers:** Supports `x-forwarded-proto` and `x-forwarded-host` for reverse proxy

**Endpoints:**

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Uptime health check |
| `GET` | `/.well-known/oauth-protected-resource/:botToken/mcp` | OAuth protected resource metadata |
| `POST` | `/:botToken/mcp` | MCP tool execution (authenticated) |

### 📘 Agent Skill (`skills/sendgrid`)

A publishable [Agent Skills](https://agentskills.io) file for Claude and other AI agents. Features MCP-first, CLI-fallback Telegram messaging with SEO-optimized metadata.

- **File:** `skills/sendgrid/SKILL.md`
- **Tags:** telegram, bot, messaging, notification, mcp, cli, sendgrid

---

## 🛠️ Development

### Prerequisites

- [Bun](https://bun.sh) >= 1.x

### Setup

```bash
git clone https://github.com/sraveshnandan/sendGrid.git
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
│   └── remote-mcp/          # Remote MCP server (deployed on Render)
│       ├── src/
│       │   └── index.ts     # Hono server with Clerk OAuth
│       └── package.json
├── packages/
│   ├── core/                # @nandansravesh/sendgrid-core
│   │   ├── src/
│   │   │   ├── index.ts     # Exports
│   │   │   ├── schema.ts    # Zod schemas & types
│   │   │   └── operations.ts # sendTelegramMessage
│   │   ├── README.md
│   │   └── package.json
│   ├── cli/                 # @nandansravesh/sendgrid-cli
│   │   ├── src/
│   │   │   └── index.ts     # Commander setup
│   │   ├── README.md
│   │   └── package.json
│   └── local-mcp/           # @nandansravesh/sendgrid-mcp
│       ├── src/
│       │   ├── index.ts     # MCP server setup
│       │   └── utils/
│       │       └── index.ts # Bot token from env
│       ├── README.md
│       └── package.json
├── skills/
│   └── sendgrid/
│       └── SKILL.md         # Agent Skills registry file
├── package.json             # Root workspace config
├── tsconfig.json
├── opencode.json            # OpenCode MCP config
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
- **OAuth:** [Clerk](https://clerk.com/) (`@clerk/backend`, `@clerk/mcp-tools`)
- **HTTP server:** [Hono](https://hono.dev/) (remote MCP)
- **Linting:** [oxlint](https://oxc.rs/docs/guide/usage/linter.html)
- **Formatting:** [oxfmt](https://oxc.rs/docs/guide/usage/formatter.html)
- **Agent Skills:** [agentskills.io](https://agentskills.io)
- **Hosting:** [Render](https://render.com/)

---

## 🔗 Links

- **GitHub:** [github.com/sraveshnandan/sendGrid](https://github.com/sraveshnandan/sendGrid)
- **npm core:** [npmjs.com/package/@nandansravesh/sendgrid-core](https://www.npmjs.com/package/@nandansravesh/sendgrid-core)
- **npm cli:** [npmjs.com/package/@nandansravesh/sendgrid-cli](https://www.npmjs.com/package/@nandansravesh/sendgrid-cli)
- **Author:** [github.com/sraveshnandan](https://github.com/sraveshnandan)

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.

---

<p align="center">Built by <a href="https://github.com/sraveshnandan"><strong>Sravesh Nandan</strong></a> — TypeScript · Telegram Bot API · MCP · Bun · Zod · Clerk OAuth</p>

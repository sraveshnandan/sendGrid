# @nandansravesh/sendgrid-mcp

MCP (Model Context Protocol) server for sending Telegram messages. Designed for use with AI assistants like Claude Desktop, Cursor, VS Code, and other MCP-compatible clients.

## Features

- Single `telegram` tool — send messages to Telegram via a bot
- Stdio transport for seamless local integration
- Reads bot token from environment variable
- Built on `@nandansravesh/sendgrid-core` with Zod validation

## Installation

```bash
npm install @nandansravesh/sendgrid-mcp
```

## Configuration

Add to your MCP client config (e.g., `claude_desktop_config.json`, `.cursor/mcp.json`, `.vscode/mcp.json`):

```json
{
  "mcpServers": {
    "sendgrid": {
      "command": "node",
      "args": ["path/to/sendgrid-mcp/dist/index.js"],
      "env": {
        "TELEGRAM_BOT_TOKEN": "YOUR_BOT_TOKEN"
      }
    }
  }
}
```

### How to get a Bot Token

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Send `/newbot` and follow the prompts
3. Copy the HTTP API token and set it as `TELEGRAM_BOT_TOKEN`

## Tool: `telegram`

| Parameter | Type     | Required | Description          |
|-----------|----------|----------|----------------------|
| chatId    | `string` | Yes      | Telegram chat ID     |
| message   | `string` | Yes      | Message text to send |

## Keywords

sendgrid mcp model-context-protocol telegram bot messaging ai assistant claude cursor

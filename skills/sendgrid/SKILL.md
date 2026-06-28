---
name: sendgrid
description: >-
  Send Telegram messages via bot using the SendGrid MCP server (preferred) or CLI (fallback).
  Use for sending notifications, alerts, status updates, or any message to a Telegram chat
  from an AI agent, terminal, or automated workflow. Requires a Telegram Bot API token from @BotFather.
---

# SendGrid — Telegram Messaging

Send messages to any Telegram chat using a bot. This skill supports two modes:
the **SendGrid MCP server** (preferred) and the **SendGrid CLI** (fallback).

## When to Use This Skill

Use this skill when the user asks to:
- Send a notification or alert to Telegram
- Notify a chat about deployment status, build results, or errors
- Send a message from the AI agent to a Telegram chat

## Tags

telegram bot messaging notification mcp cli sendgrid

## Prerequisites

1. Create a bot via [@BotFather](https://t.me/botfather) on Telegram
2. Copy the HTTP API token
3. Know the target chat ID (get it from `@userinfobot` or via `https://api.telegram.org/bot<token>/getUpdates`)

## Usage

### Via MCP (Recommended)

If the SendGrid MCP server is configured, use the `telegram` tool:

**Tool:** `telegram` (on the `sendgrid` MCP server)
**Parameters:**
- `chatId` (string, required) — Telegram chat ID
- `message` (string, required) — Message text to send

The bot token is read from the `TELEGRAM_BOT_TOKEN` environment variable.

### Via CLI (Fallback)

If the MCP server is unavailable, use the globally installed CLI:

```bash
# First time setup (one-time)
sendgrid init --telegram-bot-token YOUR_TOKEN

# Send a message
sendgrid telegram CHAT_ID "Your message here"
```

## Examples

User prompts this skill handles:

- "Send a Telegram message to 123456789 saying 'Deploy complete'"
- "Notify my Telegram about the build failure"
- "Send 'Server is back online' to chat ID 987654321"
- "Tell me the latest status and send it to my Telegram"
- "Send a test message to myself on Telegram"

## Guidelines

- Always confirm the `chatId` before sending
- Prefer the MCP tool over the CLI when both are available
- Keep messages concise and actionable
- If the message contains dynamic data (build status, errors), include the full context

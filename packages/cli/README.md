# @nandansravesh/sendgrid-cli

CLI tool to send Telegram messages from the terminal.

## Installation

```bash
npm install -g @nandansravesh/sendgrid-cli
```

## Commands

### `sendgrid init`

Save your Telegram bot token (stored at `~/.config/sendGrid/config.json`).

```bash
sendgrid init --telegram-bot-token YOUR_BOT_TOKEN
```

### `sendgrid telegram <chatId> <message>`

Send a message to a Telegram chat.

```bash
sendgrid telegram 123456789 "Hello from the CLI!"
```

Output:

```json
{ "ok": true, "chatId": "123456789", "messageId": "42" }
```

## How to get a Bot Token

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Send `/newbot` and follow the prompts
3. Copy the HTTP API token

## Keywords

sendgrid cli telegram bot messaging command-line terminal

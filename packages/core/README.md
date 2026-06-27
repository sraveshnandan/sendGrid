# @nandansravesh/sendgrid-core

Core library for sending Telegram messages via the Bot API. Provides Zod-validated schemas, TypeScript types, and a single async function.

## Features

- Send Telegram messages with Zod runtime validation
- Zero HTTP boilerplate — handles the Telegram Bot API for you
- Full TypeScript support with inferred types
- Lightweight, no external HTTP dependencies (uses native `fetch`)

## Installation

```bash
npm install @nandansravesh/sendgrid-core
```

## Usage

```typescript
import { sendTelegramMessage } from "@nandansravesh/sendgrid-core";

const result = await sendTelegramMessage({
  chatId: "123456789",
  message: "Hello from sendgrid-core!",
  botToken: "YOUR_BOT_TOKEN",
});

console.log(result);
// { ok: true, chatId: "123456789", messageId: "42" }
```

## API

### `sendTelegramMessage(options)`

| Param    | Type     | Description                |
|----------|----------|----------------------------|
| chatId   | `string` | Telegram chat ID           |
| message  | `string` | Message text to send       |
| botToken | `string` | Telegram Bot API token     |

Returns `Promise<{ ok: true; chatId: string; messageId: string }>`.

Throws on invalid input or Telegram API errors.

## Keywords

sendgrid telegram bot api messaging typescript zod validation

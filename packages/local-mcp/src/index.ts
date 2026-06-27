import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  sendTelegramMessage,
  TelegramMessageInput,
  telegramMessageInputSchema,
} from "sendgrid-core";
import { getTelegramBotToken } from "./utils";

const server = new McpServer({
  name: "sendgrid-local",
  version: "0.0.0",
});

server.registerTool(
  "telegram",
  {
    title: "Telegram",
    description: "Send messages to Telegram via a bot.",
    inputSchema: telegramMessageInputSchema.shape,
  },
  async (input: TelegramMessageInput) => {
    const result = await sendTelegramMessage({
      ...input,
      botToken: getTelegramBotToken(),
    });
    return {
      content: [
        {
          type: "text",
          text: `Message sent to Telegram: ${result.messageId} to chat ${result.chatId}`,
        },
      ],
      structuredContent: result,
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);

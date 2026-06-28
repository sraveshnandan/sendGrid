import { Hono, type Context } from "hono";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import {
  sendTelegramMessage,
  TelegramMessageInput,
  telegramMessageInputSchema,
} from "@nandansravesh/sendgrid-core";

import { createClerkClient } from "@clerk/backend";
import { generateClerkProtectedResourceMetadata } from "@clerk/mcp-tools/server";

const clerk_publishable_key = process.env.CLERK_PUBLISHABLE_KEY;
const clerk_secret_key = process.env.CLERK_SECRET_KEY;

if (!clerk_publishable_key || !clerk_secret_key) {
  throw new Error(
    "CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY environment variables are required",
  );
}

const clerkClient = createClerkClient({
  publishableKey: clerk_publishable_key,
  secretKey: clerk_secret_key,
});

function createServer(botToken: string) {
  const server = new McpServer({
    name: "sendgrid-remote-mcp",
    version: "0.0.1",
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
        botToken,
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
  return server;
}

const app = new Hono();

function protectedResourceMetaDataURL(c: Context, botToken: string) {
  return new URL(
    `/.well-known/oauth-protected-resource/${botToken}/mcp`,
    c.req.url,
  ).toString();
}

function unauthorisedMcpResponse(c: Context, botToken: string) {
  c.header(
    "WWW-Authenticate",
    `Bearer resource_metadata="${protectedResourceMetaDataURL(c, botToken)}"`,
  );
  return c.json({ error: "Unauthorized" }, 401);
}

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

app.get("/.well-known/oauth-protected-resource/:botToken/mcp", (c) => {
  const botToken = c.req.param("botToken");
  return c.json(
    generateClerkProtectedResourceMetadata({
      publishableKey: clerk_publishable_key,
      resourceUrl: new URL(
        `/${botToken}/mcp`,
        c.req.url,
      ).toString(),
    }),
  );
});

app.post("/:botToken/mcp", async (c) => {
  const botToken = c.req.param("botToken");
  const authHeader = c.req.header("authorization");

  if (!botToken) return c.text("botToken is required", 400);

  if (!authHeader?.startsWith("Bearer "))
    return unauthorisedMcpResponse(c, botToken);

  try {
    const requestState = await clerkClient.authenticateRequest(c.req.raw, {
      acceptsToken: "oauth_token",
    });

    if (!requestState.isAuthenticated)
      return unauthorisedMcpResponse(c, botToken);
  } catch {
    return unauthorisedMcpResponse(c, botToken);
  }

  const server = createServer(botToken);

  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });
  await server.connect(transport);

  try {
    return await transport.handleRequest(c.req.raw);
  } finally {
    await server.close();
  }
});

app.notFound((c) => {
  return c.json({ error: "not found" }, 404);
});

const port = Number(process.env.PORT || 3300);

export default {
  port,
  fetch: (req: Request) => {
    const url = new URL(req.url);
    url.protocol = req.headers.get("x-forwarded-proto") ?? url.protocol;
    url.host = req.headers.get("x-forwarded-host") ?? url.host;
    return app.fetch(new Request(url, req));
  },
};

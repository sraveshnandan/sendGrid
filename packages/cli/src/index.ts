#!/usr/bin/env node
import { Command } from "commander";
import "dotenv/config";
import { sendTelegramMessage } from "@nandansravesh/sendgrid-core";

import { homedir } from "node:os";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const program = new Command();

const configPath = join(homedir(), "config", "sendGrid", "config.json");

// const cliConfigSchema = z.object({
//   telegramBotToken: z.string().min(1).optional(),
// });

function writeTelegramBotToken(token: string): void {
  const configDir = join(homedir(), "config", "sendGrid");
  if (!existsSync(configDir)) {
    mkdirSync(configDir, { recursive: true });
  }
  writeFileSync(configPath, JSON.stringify({ telegramBotToken: token }));
}

function getTelegramBotToken(): string {
  // if (!existsSync(configPath)) {
  //   return "";
  // }
  const config = JSON.parse(readFileSync(configPath, "utf-8"));

  const token = config.telegramBotToken;
  if (!token || !existsSync(configPath)) {
    throw new Error(
      `Telegram bot token not found in config . run sendGrid init`,
    );
  }
  return token;
}

program.name("sendgrid").description("SendGrid CLI backed by SendGrid Core");

program
  .command("init")
  .description("Configure your SendGrid Local settings")
  .requiredOption("--telegram-bot-token <botToken>", "Telegram Bot Token")
  .action(async (option: { telegramBotToken: string }) => {
    const { telegramBotToken } = option;
    writeTelegramBotToken(telegramBotToken);
    console.log(`Telegram bot token saved successfully at ${configPath}`);
  });

program
  .command("telegram")
  .description("Send a telegram message")
  .argument("<chatId>", "Telegram chat ID")
  .argument("<message>", "Message text to send")
  .action(async (chatId: string, message: string) => {
    const response = await sendTelegramMessage({
      chatId,
      message,
      botToken: getTelegramBotToken(),
    });
    console.log(JSON.stringify(response));

    process.exit(0);
  });

program.parseAsync(process.argv).catch((error: unknown) => {
  console.log(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});

// to get messageId
// https://api.telegram.org/bot${token}/getUpdates

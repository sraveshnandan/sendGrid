import {
  TelegramMessageOption,
  telegramMessageOptionSchema,
  TelegramMessageOutput,
  telegramMessageOutputSchema,
  telegramResponseSchema,
  telegramSendMessageSchema,
} from "./schema";

export async function sendTelegramMessage(
  options: TelegramMessageOption,
): Promise<TelegramMessageOutput> {
  const parsedInput = telegramMessageOptionSchema.parse(options);

  const requestBody = telegramSendMessageSchema.parse({
    chat_id: parsedInput.chatId,
    text: parsedInput.message,
  });

  const response = await fetch(
    `https://api.telegram.org/bot${parsedInput.botToken}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    },
  );

  const data = telegramResponseSchema.parse(await response.json());

  if (!response.ok || !data.ok || !data.result) {
    throw new Error(data.description ?? "Telegram API error");
  }

  return telegramMessageOutputSchema.parse({
    ok: true,
    chatId: parsedInput.chatId,
    messageId: data.result.message_id.toString(),
  });
}

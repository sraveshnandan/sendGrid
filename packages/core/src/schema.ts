import { z } from "zod";

export const telegramMessageInputSchema = z.object({
  chatId: z.string().min(1, "Chat Id is required"),
  message: z.string().min(1, "Message is required"),
});

export const telegramMessageOptionSchema = telegramMessageInputSchema.extend({
  botToken: z.string().min(1, "Bot Token is required"),
});

export const telegramSendMessageSchema = z.object({
  chat_id: z.string(),
  text: z.string().min(1),
});

export const telegramResponseSchema = z.object({
  ok: z.boolean(),
  result: z
    .object({
      message_id: z.number(),
    })
    .optional(),
  description: z.string().optional(),
});

export const telegramMessageOutputSchema = z.object({
  ok: z.literal(true),
  chatId: z.string(),
  messageId: z.string(),
});

export type TelegramMessageInput = z.infer<typeof telegramMessageInputSchema>;
export type TelegramMessageOption = z.infer<typeof telegramMessageOptionSchema>;
export type TelegramMessageOutput = z.infer<typeof telegramMessageOutputSchema>;

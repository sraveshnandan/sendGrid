export const getTelegramBotToken = () => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is required. Configure it in your mcp client environment.");
  }
  return token;
};

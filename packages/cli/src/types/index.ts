type TelegramResponse = {
  ok: boolean;
  result?: {
    message_id?: number;
  };
  description?: string;
};

export { TelegramResponse };

const mongoose = require("mongoose");

const TelegramUserSchema = new mongoose.Schema({
  chatId: { type: String, required: true, unique: true },
  telegramUsername: { type: String, required: true, unique: true },
  systemUsername: { type: String, required: true, unique: true },
  // user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

module.exports = mongoose.model("TelegramUser", TelegramUserSchema);
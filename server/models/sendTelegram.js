const mongoose = require("mongoose");
const SendTelegramSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, text: true },
    phoneNumber: { type: String, required: true },
    pincode: { type: String, required: true },
    telegramChatId: { type: String, required: true },
    telegramMessageId: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SendTelegram", SendTelegramSchema);

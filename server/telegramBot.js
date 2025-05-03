const TelegramBot = require("node-telegram-bot-api");
const TelegramUser = require("./models/TelegramUser");

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(botToken, { polling: true });

bot.onText(/\/start(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const telegramUsername = msg.from.username;
  const systemUsername = match[1];

  if (!telegramUsername) {
    bot.sendMessage(chatId, "សូមកំណត់ឈ្មោះ Username Tetegram របស់អ្នកជាមុនសិនដើម្បីបន្ត...");
    return;
  }

  if (!systemUsername) {
    bot.sendMessage(
      chatId,
      "សូមផ្តល់ឈ្មោះប្រើប្រាស់នៅក្នងប្រព័ន្ធរបស់អ្នកជាទម្រង់៖\n/start <ឈ្មោះរបស់អ្នកនៅក្នុងប្រព័ន្ធ>\n\nបញ្ជាក់បន្ថែម : ជាឈ្មោះ (username) ដែលបានបានធ្វើការចុះឈ្មោះនៅក្នុងគេហទំព័ររបស់យើង\n\nឧទាហរណ៍៖ /start user123\nបើមានចម្ងល់អាចទាក់ទងមក : 📲 https://t.me/ronphearom"
    );
    return;
  }

  try {
    const existingUser = await TelegramUser.findOne({ chatId });
    if (existingUser) {
      existingUser.telegramUsername = `@${telegramUsername}`;
      existingUser.systemUsername = systemUsername;
      await existingUser.save();
      bot.sendMessage(chatId, `គណនីតេឡេក្រាមរបស់អ្នកត្រូវបានធ្វើបច្ចុប្បន្នភាពដើម្បីភ្ជាប់ទៅឈ្មោះ : ${systemUsername} នៅក្នុងប្រព័ន្ធរួចរាល់ `);
    } else {
      await TelegramUser.create({
        chatId,
        telegramUsername: `@${telegramUsername}`,
        systemUsername,
      });
      bot.sendMessage(chatId, `សូមស្វាគមន៍!\nគណនីតេឡេក្រាមរបស់អ្នកត្រូវបានភ្ជាប់ទៅនឹងប្រព័ន្ធដែលមានឈ្មោះថា : ${systemUsername}`);
    }
  } catch (error) {
    console.error("Error saving Telegram user:", error);
    bot.sendMessage(chatId, "Error linking your account. Please try again.");
  }
});

bot.on("polling_error", (error) => {
  console.error("Polling error:", error.message);
  if (error.code === "ETELEGRAM" && error.message.includes("409 Conflict")) {
    console.error("Stopping bot due to conflict...");
    bot.stopPolling();
  }
});

module.exports = bot;
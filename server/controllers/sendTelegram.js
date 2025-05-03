const mongoose = require("mongoose");
const axios = require("axios");
const Order = require("../models/Order");
const TelegramUser = require("../models/TelegramUser");

exports.SaveOrderTelegram = async (req, res) => {
  try {
    const { orderId } = req.body;

    // ค้นหาคำสั่งซื้อ
    const order = await Order.findById(orderId)
      .populate("products.product")
      .populate("orderBy");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const { products, cartTotal, shippingAddress } = order;
    const systemUsername = order.orderBy.username; // ดึง systemUsername จากผู้ใช้ที่สั่งซื้อ

    if (!systemUsername) {
      return res.status(400).json({
        message: "No system username found for this user",
        telegramSent: false,
      });
    }

    // ค้นหา chatId จาก systemUsername
    const telegramUser = await TelegramUser.findOne({ systemUsername });
    if (!telegramUser) {
      return res.status(400).json({
        message: "Telegram user not found. Please send /start <your_system_username> to link your account.",
        telegramSent: false,
      });
    }

    // สร้างข้อความ
    let message = `📦 *New Order Placed*\n\n`;
    message += `👤 Customer: ${shippingAddress.fullName}\n`;
    message += `📋 Order Details:\n`;

    products.forEach((item, index) => {
      const productName = item.product.title;
      const quantity = item.count;
      const price = item.discount
        ? (item.price - (item.price * item.discount) / 100).toFixed(2)
        : item.price.toFixed(2);
      const total = (price * quantity).toFixed(2);
      message += `${index + 1}. ${productName} (x${quantity}) = $${total}\n`;
    });

    message += `\n💵 Total: $${cartTotal.toFixed(2)}\n`;
    message += `\n📍 Shipping Address: ${shippingAddress.area}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.pincode}\n`;
    message += `📞 Phone: ${shippingAddress.phoneNumber}\n`;

    // ส่งข้อความไปยัง Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await axios.post(telegramApiUrl, {
      chat_id: telegramUser.chatId, // ใช้ chatId จากฐานข้อมูล
      text: message,
      parse_mode: "Markdown",
    });

    if (response.data.ok) {
      res.status(200).json({
        message: "Telegram message sent successfully",
        telegramSent: true,
      });
    } else {
      res.status(400).json({
        message: "Failed to send Telegram message",
        telegramSent: false,
      });
    }
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    res.status(500).json({
      error: "Internal server error",
      telegramSent: false,
    });
  }
};
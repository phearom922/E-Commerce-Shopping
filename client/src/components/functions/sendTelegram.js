// import axios from "axios";
// export const createOrderTelegram = async (token, orderTelegram) => {
//   return await axios.post(
//     `${import.meta.env.REACT_APP_KEY}/save-order-telegram`,
//     { orderTelegram },
//     {
//       headers: {
//         token,
//       },
//     }
//   );
// };


import axios from "axios";

export const sendTelegramMessage = async (orderId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found, please login");
    }

    const response = await axios.post(
      "/api/send-telegram/save-order-telegram",
      { orderId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    return { telegramSent: false, error: error.message || "Failed to send Telegram message" };
  }
};




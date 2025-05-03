const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "product",
        },
        count: Number,
        discount: Number,
        price: Number,
      },
    ],
    discountTotal: Number,
    cartTotal: Number,
    shippingAddress: {
      fullName: String,
      phoneNumber: Number,
      pincode: Number,
      area: String,
      city: String,
      state: String,
      usernameTelegram: String,
    },
    orderStatus: {
      type: String,
      default: "Not Process",
    },
    orderBy: {
      type: ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = order = mongoose.model("order", OrderSchema);

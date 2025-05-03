const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CartSchema = new mongoose.Schema(
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
    orderBy: {
      type: ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = cart = mongoose.model("cart", CartSchema);

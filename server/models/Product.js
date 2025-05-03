const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, text: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    sold: {
      type: Number,
      default: 0,
    },
    images: { type: Array },
    category: { type: ObjectId, ref: "category" },
    productCode: { type: String, required: true, unique: true, },
    quantity: Number,
    discount: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = product = mongoose.model("product", ProductSchema);

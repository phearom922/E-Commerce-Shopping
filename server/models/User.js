const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String },
    email: { type: String, unique: true, sparse: true },
    googleId: { type: String },
    role: { type: String, default: "user", },
    enabled: { type: Boolean, default: true, },
    profilePicture: { type: String, default: "https://avatar.iran.liara.run/public" },
    address: {
      fullName: String,
      phoneNumber: Number,
      pincode: Number,
      area: String,
      city: String,
      state: String,
      usernameTelegram: String,
    },
    wishlist: [{ type: ObjectId, ref: "product", },],
  },
  { timestamps: true, }
);

module.exports = user = mongoose.model("users", UserSchema);

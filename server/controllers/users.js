const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cloudinary = require("../config/cloudinary");

//Models
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

exports.listUsers = async (req, res) => {
  try {
    //check user
    const user = await User.find({}).select("-password").exec();
    if (!user) {
      return res.status(400).send("User Not Found!!");
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!");
  }
};

exports.readUsers = async (req, res) => {
  try {
    //check user
    const id = req.params.id;
    const user = await User.findOne({ _id: id }).select("-password").exec();
    if (!user) {
      return res.status(400).send("User Not Found!!");
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!");
  }
};

exports.updateUsers = async (req, res) => {
  try {
    var { id, password } = req.body.values;
    //1 gen salt
    const salt = await bcrypt.genSalt(10);
    //2 encrypt
    var enPassword = await bcrypt.hash(password, salt);
    const user = await User.findOneAndUpdate(
      { _id: id },
      { password: enPassword }
    ).exec();
    if (!user) {
      return res.status(400).send("User Not Found!!");
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!");
  }
};

exports.removeUsers = async (req, res) => {
  try {
    //check user
    const id = req.params.id;
    const user = await User.findOneAndDelete({ _id: id }).exec();
    if (!user) {
      return res.status(400).send("User Not Found!!");
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!");
  }
};

exports.changeStatus = async (req, res) => {
  try {
    //check user
    console.log(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { enabled: req.body.enabled }
    ).exec();
    if (!user) {
      return res.status(400).send("User Not Found!!");
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!");
  }
};

exports.changeRole = async (req, res) => {
  try {
    //check user
    console.log(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { role: req.body.role }
    ).exec();
    if (!user) {
      return res.status(400).send("User Not Found!!");
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!");
  }
};

exports.userCart = async (req, res) => {
  try {
    const { cart } = req.body;
    //Check User
    let user = await User.findOne({ username: req.user.username }).exec();
    //array []
    let products = [];
    // Remove old cart if exists
    await Cart.findOneAndDelete({ orderBy: user._id }).exec();

    // Prepare Product
    for (let i = 0; i < cart.length; i++) {
      let object = {};

      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.price = cart[i].price;
      object.discount = cart[i].discount;

      products.push(object);
    }

    // Calculate Discount Total ===by AI===
    let discountTotal = products.reduce((total, item) => {
      return total + (item.price * item.count * item.discount) / 100;
    }, 0);

    // Calculate Cart Total ===by AI===
    let cartTotal = products.reduce((total, item) => {
      return (
        total +
        item.price * item.count -
        (item.discount * item.price * item.count) / 100
      );
    }, 0);

    let newCart = await new Cart({
      products,
      discountTotal,
      cartTotal,
      orderBy: user._id,
    }).save();

    console.log(newCart);
    res.send("userCart OK!");
  } catch (err) {
    console.log(err);
    res.status(500).send("User Cart Sever Error");
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    let cart = await Cart.findOne({ orderBy: user._id })
      .populate("products.product", "_id title price images productCode")
      .exec();

    const { products, cartTotal, discountTotal } = cart;
    res.json({ products, cartTotal, discountTotal });
  } catch (err) {
    res.status(500).send("get user cart Error");
  }
};

exports.saveAddress = async (req, res) => {
  try {
    const userAddress = await User.findOneAndUpdate(
      { username: req.user.username },
      { address: req.body.address },
    ).exec();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).send("Save address Error");
  }
};

//Wishlist
exports.addToWishList = async (req, res) => {
  try {
    //
    const { productId } = req.body;
    let user = await User.findOneAndUpdate(
      { username: req.user.username },
      { $addToSet: { wishlist: productId } }
    ).exec();
    res.send(user);
  } catch (err) {
    res.status(500).send("Add Wishlist Error");
  }
};

//Add to user
exports.getToWishList = async (req, res) => {
  try {
    //
    let list = await User.findOne({ username: req.user.username })
      .select("wishlist")
      .populate("wishlist")
      .exec();
    res.json(list);
  } catch (err) {
    res.status(500).send("Get Wishlist Error");
  }
};

//Add to user
exports.removeToWishList = async (req, res) => {
  try {
    //
    ////https//localhost/user/wishlist/52048825527572
    const { productId } = req.params;
    let user = await User.findOneAndUpdate(
      { username: req.user.username },
      { $pull: { wishlist: productId } }
    ).exec();
    res.send(user);
  } catch (err) {
    res.status(500).send("Get Wishlist Error");
  }
};

//Clear Cart
exports.emptyCart = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();
    empty = await Cart.findOneAndDelete({ orderBy: user._id }).exec();
    res.send(empty);
  } catch (err) {
    res.status(500).send("Remove cart Error");
  }
};


exports.saveOrder = async (req, res) => {
  try {
    const user = await User
      .findOne({ username: req.user.username })
      .exec();

    const userCart = await Cart
      .findOne({ orderBy: user._id })
      .exec();

    // ตรวจสอบว่ามีที่อยู่ใน user หรือไม่
    if (!user.address) {
      return res.status(400).send("User address not found");
    }

    // ตรวจสอบว่ามีตะกร้าสินค้าหรือไม่
    if (!userCart) {
      return res.status(400).send("Cart not found");
    }

    const order = new Order({
      products: userCart.products,
      orderBy: user._id,
      cartTotal: userCart.cartTotal,
      discountTotal: userCart.discountTotal,
      shippingAddress: user.address,
    });

    // บันทึกคำสั่งซื้อและเก็บผลลัพธ์
    const savedOrder = await order.save();

    // อัปเดตจำนวนสินค้าในสต็อก
    let bulkOption = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } }
        }
      };
    });

    await Product.bulkWrite(bulkOption, {});

    // ส่งข้อมูลคำสั่งซื้อกลับไป
    res.json({ order: savedOrder });
  } catch (err) {
    console.error("Save Order Error:", err);
    res.status(500).send("Save Order Error");
  }
};


exports.getOrders = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    let order = await Order.find({ orderBy: user._id })
      .populate("products.product")
      .exec();

    res.json(order);
  } catch (err) {
    res.status(500).send("get order Error");
  }
};


exports.updateUsername = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "jwtSecret");
    const userId = decoded._id;

    const { newUsername } = req.body;
    if (!newUsername || newUsername.trim() === "") {
      return res.status(400).json({ error: "New username is required" });
    }

    // ตรวจสอบว่า username ใหม่ซ้ำหรือไม่
    const existingUser = await User.findOne({ username: newUsername });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // อัปเดต username
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username: newUsername },
      { new: true }
    ).exec();

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "Username updated successfully",
      user: { username: updatedUser.username },
    });
  } catch (err) {
    console.error("Error in updateUsername:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "jwtSecret");
    const user = await User.findById(decoded._id).exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error in getUserProfile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "jwtSecret");
    const { address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      decoded._id,
      { address },
      { new: true }
    ).exec();

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("Error in updateAddress:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Upload File

exports.uploadProfilePicture = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "jwtSecret");
    const userId = decoded._id;

    // ตรวจสอบว่า req.file มีหรือไม่
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // อัปโหลดไปยัง Cloudinary
    console.log("Received file:", req.file);
    console.log("Uploading to Cloudinary...");
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "profile_pictures" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary error:", error);
            reject(error);
          } else {
            console.log("Cloudinary result:", result);
            resolve(result);
          }
        }
      );
      stream.end(req.file.buffer);
    });

    // อัปเดต URL ใน MongoDB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: result.secure_url },
      { new: true }
    ).exec();

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "Profile picture updated successfully",
      profilePicture: updatedUser.profilePicture,
    });
  } catch (err) {
    console.error("Error in uploadProfilePicture:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};
const express = require("express");
const router = express.Router();

//Controllers
const {
  listUsers,
  readUsers,
  updateUsers,
  removeUsers,
  changeStatus,
  changeRole,
  userCart,
  getUserCart,
  saveAddress,
  saveOrder,
  addToWishList,
  getToWishList,
  removeToWishList,
  emptyCart,
  getOrders,
} = require("../controllers/users");

// Middleware
const { auth, adminCheck } = require("../middleware/auth");

router.get("/users", auth, adminCheck, listUsers);
router.get("/users/:id", readUsers);
router.put("/users/:id", auth, adminCheck, updateUsers);
router.delete("/users/:id", removeUsers);
router.post("/change-status", auth, adminCheck, changeStatus);
router.post("/change-role", auth, adminCheck, changeRole);
router.post("/user/cart", auth, userCart);
router.get("/user/cart", auth, getUserCart);
//Save Address
router.post("/user/address", auth, saveAddress);

//Save Order
router.post("/user/order", auth, saveOrder);
router.get("/user/orders", auth, getOrders);

//Wishlist
router.post("/user/wishlist", auth, addToWishList);
router.get("/user/wishlist", auth, getToWishList);
router.put("/user/wishlist/:productId", auth, removeToWishList);

//remove cart
router.delete("/user/cart", auth, emptyCart);



module.exports = router;

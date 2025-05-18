const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
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
  updateUsername,
  getUserProfile,
  updateAddress,
  uploadProfilePicture
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

//Update User
router.get("/profile", auth, getUserProfile);
router.post("/update-username", auth, updateUsername);
router.post("/update-address", auth, updateAddress);
router.post("/upload-profile-picture", auth, upload.single("profilePicture"), uploadProfilePicture);


module.exports = router;

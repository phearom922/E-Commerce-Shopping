const express = require("express");
const router = express.Router();

// Middleware
const { auth, adminCheck } = require("../middleware/auth");

//Controllers
const { changeOrderStatus, getAllOrder } = require("../controllers/admin");

router.put("/admin/order-status", auth, changeOrderStatus);

router.get("/admin/manage-order", auth, getAllOrder);

module.exports = router;

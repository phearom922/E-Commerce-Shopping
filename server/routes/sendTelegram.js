const express = require("express");
const router = express.Router();
const { SaveOrderTelegram } = require("../controllers/sendTelegram");
const { auth } = require("../middleware/auth");

router.post("/api/send-telegram/save-order-telegram", auth, (req, res, next) => {
    console.log("Received request to /send-telegram/save-order-telegram");
    next();
  }, SaveOrderTelegram);

module.exports = router;

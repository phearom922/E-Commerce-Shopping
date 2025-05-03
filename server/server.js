const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const { readdirSync } = require("fs");
const connectDB = require("./config/db");
const telegramBot = require("./telegramBot");
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "200mb" }));
app.use(cors());

// Auto load routes==============
app.use("/api", (req, res, next) => {
  console.log("Request received at /api:", req.path);
  next();
});

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

const port = process.env.PORT || 5000;
app.listen(port,  () => {
  console.log("✅ Server is running on port:", port);
});

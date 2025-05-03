const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      console.log("No token provided in request:", req.url);
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "jwtSecret");
    if (!decoded) {
      console.log("Invalid token in request:", req.url);
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await User.findById(decoded._id);
    if (!user) {
      console.log("User not found for token in request:", req.url);
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.adminCheck = async (req, res, next) => {
  try {
    const { username } = req.user;
    const adminUser = await User.findOne({ username }).exec();
    if (adminUser.role !== "admin") {
      return res.status(403).send(err, "Admin Access denied");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(401).send("Admin Access denied");
  }
};





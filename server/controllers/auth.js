const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const admin = require("../firebaseAdmin");


exports.register = async (req, res) => {
  try {
    console.log("Received request to /register:", req.body);
    const { username, password } = req.body;

    // ตรวจสอบผู้ใช้
    const userExists = await User.findOne({ username });
    console.log("Checked user existence:", userExists);
    if (userExists) {
      return res.status(400).send("User Already exists");
    }

    const salt = await bcrypt.genSalt(10);
    console.log("Generated salt:", salt);

    // สร้างผู้ใช้ใหม่
    const user = new User({
      username,
      password,
    });
    console.log("Created new user object:", user);

    // เข้ารหัส password
    user.password = await bcrypt.hash(password, salt);
    console.log("Hashed password:", user.password);

    // บันทึกผู้ใช้
    await user.save();
    console.log("User saved successfully:", user);

    res.send("Register success");
  } catch (err) {
    console.error("Error in register:", err);
    res.status(500).send("Server Error!!");
  }
};



























exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login attempt:", { username });

    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found:", username);
      return res.status(400).json({ error: "User not found" });
    }

    if (user.googleId && !user.password) {
      console.log("User registered via Google:", username);
      return res.status(400).json({ error: "Please login with Google" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("Incorrect password for user:", username);
      return res.status(400).json({ error: "Incorrect password" });
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET || "jwtSecret",
      { expiresIn: "1h" }
    );

    res.json({
      token,
      payload: {
        user: {
          username: user.username,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.currentUser = async (req, res) => {
  try {
    const user = req.user; // ใช้ req.user จาก middleware
    res.json({
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    console.error("Error in currentUser:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};






exports.listUser = async (req, res) => {
  try {
    res.send("User List");
  } catch (err) {
    console.log(err);
    res.status(500).end("Server Error!!");
  }
};

exports.editUser = async (req, res) => {
  try {
    res.send("edit user");
  } catch (err) {
    console.log(err);
    res.status(500).end("Server Error!!");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    res.send("remove user");
  } catch (err) {
    console.log(err);
    res.status(500).end("Server Error!!");
  }
};


exports.googleLogin = async (req, res) => {
  console.log("Received request to /google-login:", req.body);
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log("Decoded Firebase token:", decodedToken);
    const { email, name } = decodedToken;

    let user = await User.findOne({ email });
    console.log("Found user in database:", user);

    if (!user) {
      let baseUsername = email.split("@")[0];
      let username = baseUsername;
      let counter = 1;

      while (await User.findOne({ username })) {
        username = `${baseUsername}${counter}`;
        counter++;
      }

      user = new User({
        email,
        username,
        password: "",
        role: "user",
        googleId: decodedToken.uid,
      });
      await user.save();
      console.log("Created new user:", user);
    } else {
      if (!user.googleId) {
        user.googleId = decodedToken.uid;
        await user.save();
        console.log("Updated user with googleId:", user);
      }
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET || "jwtSecret",
      { expiresIn: "1h" }
    );
    console.log("Generated JWT:", token);

    res.status(200).json({
      token,
      payload: {
        user: {
          username: user.username,
          role: user.role,
        }
      }
    });
    console.log("Response sent to client:", { token, username: user.username, role: user.role });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(400).json({ error: "Google login failed" });
  }
};
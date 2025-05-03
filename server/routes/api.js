const express = require("express");
const router = express.Router();

//Controllers
const {
  register,
  login,
  currentUser,
  googleLogin
} = require("../controllers/auth");

// Middleware
const { auth, adminCheck } = require("../middleware/auth");

//***********************POST******************* */
//http://localhost:3000/api/register
//Post យើងដើម្បី បញ្ជុនទិន្ន័យទៅឲ្យ User or form Backend
router.post("/register", register);

//http://localhost:3000/api/login
//Post យើងដើម្បី បញ្ជុនទិន្ន័យទៅឲ្យ User or form Backend
router.post("/login", login);

//http://localhost:3000/api/current-user
//Post យើងដើម្បី បញ្ជុនទិន្ន័យទៅឲ្យ User or form Backend
router.post("/current-user", auth, currentUser);

//http://localhost:3000/api/current-admin
//Post យើងដើម្បី បញ្ជុនទិន្ន័យទៅឲ្យ User or form Backend
router.post("/current-admin", auth, adminCheck, currentUser);

router.post("/google-login", googleLogin);
module.exports = router;

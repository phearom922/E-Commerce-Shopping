const express = require("express");
const router = express.Router();

//Controller
const { createImage, removeImage, createImageProfile, removeImageProfile } = require("../controllers/cloudinary");

//Middleware
const { auth, adminCheck } = require("../middleware/auth");

//================create route==============
//@Endpoint  http://localhost:5000/api/images
//Product
router.post("/images", auth, adminCheck, createImage);
router.post("/removeimages", auth, adminCheck, removeImage);

//User Profile
router.post("/images-profile", auth, createImageProfile);
router.post("/removeimages-profile", auth, removeImageProfile);

module.exports = router;

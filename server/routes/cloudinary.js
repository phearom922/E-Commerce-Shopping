const express = require("express");
const router = express.Router();

//Controller
const { createImage, removeImage } = require("../controllers/cloudinary");

//Middleware
const { auth, adminCheck } = require("../middleware/auth");

//================create route==============
//@Endpoint  http://localhost:5000/api/images

router.post("/images", auth, adminCheck, createImage);
router.post("/removeimages", auth, adminCheck, removeImage);

module.exports = router;

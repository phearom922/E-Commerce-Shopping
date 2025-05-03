const express = require("express");
const router = express.Router();

//Controller
const {
  List,
  Create,
  Read,
  Update,
  Remove,
} = require("../controllers/category");

//Middleware
const { auth, adminCheck } = require("../middleware/auth");

//================create route==============
//@Endpoint  http://localhost:5000/api/category

router.get("/category", List); //Read all Category
router.post("/category",auth, adminCheck, Create); //Create Category
router.get("/category/:id",auth, adminCheck, Read); //Read one Category
router.put("/category/:id",auth, adminCheck, Update); //Update Category
router.delete("/category/:id",auth, adminCheck, Remove); //Remove Category

module.exports = router;

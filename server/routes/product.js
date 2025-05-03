const express = require("express");
const router = express.Router();

//Controller
const {
  CreateProduct,
  List,
  Remove,
  Read,
  Update,
  ListBy,
  SearchFilters,
} = require("../controllers/product");

//Middleware
const { auth, adminCheck } = require("../middleware/auth");
// const { get } = require("mongoose");
//==============================
router.post("/product", auth, adminCheck, CreateProduct); //Read all Category
router.get("/product/:count", List);
router.delete("/product/:id", auth, adminCheck, Remove);

router.get("/products/:id", Read);
router.put("/product/:id", auth, adminCheck, Update);

router.post("/productby", ListBy);

router.post("/search/filters", SearchFilters);

module.exports = router;

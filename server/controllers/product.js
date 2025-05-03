//Model
const Product = require("../models/Product");

exports.CreateProduct = async (req, res) => {
  try {
    console.log(req.body);
    // const { name } = req.body;
    const product = await new Product(req.body).save();
    res.send(product);
  } catch (err) {
    res.status(500).send("Create Product fail !!", err);
  }
};

exports.List = async (req, res) => {
  try {
    const count = parseInt(req.params.count);

    const product = await Product.find()
      .limit(count)
      .populate("category")
      .sort([["createdAt", "desc"]]);

    res.send(product);
  } catch (err) {
    res.status(500).send("Create Product fail !!");
  }
};

exports.Remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({
      _id: req.params.id,
    }).exec();
    res.send(deleted);
  } catch (err) {
    res.status(500).send("Serve Remove Error!!");
  }
};

exports.Read = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id })
      .populate("category")
      .exec();
    res.send(product);
  } catch (err) {
    res.status(500).send("Read Product Error!!");
  }
};

exports.Update = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    }).exec();
    res.send(product);
  } catch (err) {
    res.status(500).send("Update Product Error!!");
  }
};

exports.ListBy = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;

    const product = await Product.find()
      .limit(limit)
      .populate("category")
      .sort([[sort, order]]);

    res.send(product);
  } catch (err) {
    res.status(500).send("LisBy Product fail !!");
  }
};

const handleQuery = async (req, res, query) => {
  let products = await Product.find({ $text: { $search: query } }).populate(
    "category",
    "_id name"
  );

  res.send(products);
};

const handlePrice = async (req, res, price) => {
  let products = await Product.find({
    price: {
      $gte: price[0],
      $lte: price[1],
    },
  }).populate("category", "_id name");

  res.send(products);
};

//Filter Category
const handleCategory = async (req, res, category) => {
  let products = await Product.find({ category }).populate(
    "category",
    "_id name"
  );

  res.send(products);
};

exports.SearchFilters = async (req, res) => {
  const { query, price, category } = req.body;

  if (query) {
    console.log("query", query);
    await handleQuery(req, res, query);
  }

  //Price [0,200]
  if (price !== undefined) {
    console.log(price);
    await handlePrice(req, res, price);
  }
  //Price [_id, _id]
  if (category) {
    console.log(category);
    await handleCategory(req, res, category);
  }
};

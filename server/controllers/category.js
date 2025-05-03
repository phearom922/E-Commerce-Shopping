//Model
const Category = require("../models/Category");

exports.List = async (req, res) => {
  try {
    const category = await Category.find({}).exec();
    res.send(category);
  } catch (err) {
    res.status(500).send("Serve List Error!!");
  }
};

exports.Create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({ name }).save();
    res.send(category);
  } catch (err) {
    res.status(500).send("Serve Create Error!!");
  }
};

exports.Read = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findOne({ _id: id });
    res.send(category);
  } catch (err) {
    res.status(500).send("Serve Read Error!!");
  }
};

// exports.Update = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { name } = req.body;
//     const category = await Category.findOneAndUpdate(
//       { _id: id },
//       { name: name }
//     );
//     res.send(category);
//   } catch (err) {
//     res.status(500).send("Serve Update Error!!");
//   }
// };

exports.Remove = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findOneAndDelete({ _id: id });
    res.send(category);
  } catch (err) {
    res.status(500).send("Serve Remove Error!!");
  }
};

exports.Update = async (req, res) => {
  try {
    const { id, name } = req.body.newCategory;

    // const id = req.params.id;
    // const { name } = req.body.newCategory

    const category = await Category.findOneAndUpdate(
      { _id: id },
      { name: name }
    );
    res.send(category);
  } catch (err) {
    res.status(500).send("Serve Update Error!!");
  }
};

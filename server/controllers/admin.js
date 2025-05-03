const Order = require("../models/Order");

exports.changeOrderStatus = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body;

    let orderUpdate = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );
    res.send(orderUpdate);
  } catch (err) {
    res.status(500).send("Change Status Order Error!!");
  }
};

exports.getAllOrder = async (req, res) => {
  try {
    let order = await Order.find()
    .populate("products.product")
    .populate("orderBy" , "username")
    .exec();

    res.json(order);
  } catch (err) {
    res.status(500).send("get all-order Error");
  }
};

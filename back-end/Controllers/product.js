const Product = require("../Models/products");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(201).json({ data: products });
  } catch (err) {
    console.log("there is an err" + err);
  }
};

module.exports = { getProducts };

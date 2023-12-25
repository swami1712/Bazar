const Product = require("../Models/productsModel");

const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.pageNumber) || 1;
    const pageLimit = process.env.PAGE_LIMIT;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageLimit)
      .skip(pageLimit * (page - 1));
    const pages = Math.ceil(count / pageLimit);
    res.status(201).json({ data: products, page, pages });
  } catch (err) {
    console.log("there is an err" + err);
  }
};
const getProductDetails = async (req, res) => {
  try {
    const productId = req.params.id;
    const products = await Product.findById(productId);
    res.status(201).json({ data: products });
  } catch (err) {
    console.log("there is an err" + err);
  }
};
const getProductReviews = async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: "you have already reviewed this product" });
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating = parseFloat(
      (
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length
      ).toFixed(1)
    );
    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404).json({ message: "review unsuccessful" });
  }
};

module.exports = { getProducts, getProductDetails, getProductReviews };

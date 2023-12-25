const express = require("express");
const {
  getProducts,
  getProductDetails,
  getProductReviews,
} = require("../Controllers/product");
const { authenticate } = require("../Middlewares/authMiddleware");

const router = express.Router();

router.get("/products", getProducts);
router.get("/product/:id", getProductDetails);
router.post("/reviews/:id", authenticate, getProductReviews);

module.exports = router;

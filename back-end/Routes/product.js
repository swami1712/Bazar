const express = require("express");
const { getProducts } = require("../Controllers/product");

const router = express.Router();

router.get("/products", getProducts);

module.exports = router;

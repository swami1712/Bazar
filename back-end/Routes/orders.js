const express = require("express");
const {
  addOrderItems,
  getOrderById,
  getMyOrders,
  checkoutOrder,
  getKey,
  verifyPayment,
} = require("../Controllers/orders");
const { authenticate } = require("../Middlewares/authMiddleware");

const router = express.Router();
router.route("/").post(authenticate, addOrderItems);
router.route("/getkey").get(authenticate, getKey);
router.route("/checkout").post(authenticate, checkoutOrder);
router.route("/verifypayment").post(verifyPayment);
router.route("/myorders").get(authenticate, getMyOrders);
router.route("/:id").get(getOrderById);

module.exports = router;

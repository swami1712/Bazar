const Order = require("../Models/orderModel");
const Product = require("../Models/productsModel");
const calcPrices = require("../Utils/calcPrice");
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const {
  verifyPayPalPayment,
  checkIfNewTransaction,
} = require("../Utils/paypal");

const addOrderItems = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;
  //   const data = req.body;
  //   console.log("orderItems are=================>" + orderItems[0].name);
  if (orderItems && orderItems?.length === 0) {
    res.status(400).json({ message: "no order items" });
  } else {
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });
    // itemsFromDB = orderItems.map((x) => x._id);
    // console.log(itemsFromDB);
    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );
      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB?.price,
        _id: undefined,
      };
    });
    // const dbOrderItems2 = [
    //   {
    //     name: "Swami Mahale",
    //     qty: "2",
    //     image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    //     price: "109.95",
    //     product: "6560567bfa75fb13c14aef75",
    //   },
    // ];
    // calculate prices
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
};
const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name userName"
  );
  console.log(req.params.id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: "order not found", success: false });
  }
};

const getKey = (req, res) => {
  // console.log(process.env.RAZORPAY_KEY_ID);
  res.status(201).json({ key: process.env.RAZORPAY_KEY_ID });
};

const checkoutOrder = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });
    // console.log(instance);
    const options = {
      amount: Number(req.body.amount * 100), // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    const order = await instance.orders.create(options);
    // console.log(process.env.RAZORPAY_KEY_ID);

    res.status(201).json(order);
  } catch (error) {
    console.log(error);
  }
};

const verifyPayment = (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  console.log(res.body);
  const secretKey = process.env.RAZORPAY_SECRET_KEY; // Replace with your actual Razorpay secret key

  // Concatenate the order ID, payment ID, and your secret key
  const expectedSignature = crypto
    .createHmac("sha256", secretKey)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");
  // console.log("expected signature == " + expectedSignature);
  // console.log("razorpay signature ==  " + razorpay_signature);
  // Verify if the calculated signature matches the received signature
  if (expectedSignature === razorpay_signature) {
    // Signature is valid, process the payment confirmation
    // You can update your database, fulfill the order, or perform any other necessary actions
    res.redirect(`http://localhost:3000/orderdetails/65784a8350a1533c287f59d4`);
    // res
    //   .status(200)
    //   .json({ success: true, message: "Payment verified successfully" });
  } else {
    // Signature is not valid, handle the error
    res.status(400).json({
      success: false,
      message: "Invalid signature. Payment verification failed",
    });
  }
};
const getMyOrders = (req, res) => {
  const orders = Order.findById({ user: req.user._id });
};
const updateOrderToPaid = async (req, res) => {
  // NOTE: here we need to verify the payment was made to PayPal before marking
  // the order as paid
  const { verified, value } = await verifyPayPalPayment(req.body.id);
  if (!verified) throw new Error("Payment not verified");

  // check if this transaction has been used before
  const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
  if (!isNewTransaction) throw new Error("Transaction has been used before");

  const order = await Order.findById(req.params.id);

  if (order) {
    // check the correct amount was paid
    const paidCorrectAmount = order.totalPrice.toString() === value;
    if (!paidCorrectAmount) throw new Error("Incorrect amount paid");

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
};

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getKey,
  checkoutOrder,
  verifyPayment,
  getMyOrders,
};

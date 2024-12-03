const express = require("express");
const cors = require("cors");
const userRoute = require("./Routes/user");
const productRoute = require("./Routes/product");
const orderRoute = require("./Routes/orders");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/", userRoute);
app.use("/", productRoute);
app.use("/api/order", orderRoute);

app.listen(PORT, () => {
  console.log("app is running on port " + PORT);
});

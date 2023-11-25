const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./Routes/user");
const productRoute = require("./Routes/product");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use("/", userRoute);
app.use("/", productRoute);

app.listen(PORT, () => {
  console.log("app is running on port " + PORT);
});

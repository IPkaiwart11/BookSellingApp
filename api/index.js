
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const bodyParser = require('body-parser');
const cors = require('cors');
const Razorpay = require('razorpay');
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => {
    console.error("MongoDB connection error", err);
  });

app.use(
  cors({
    origin: 'https://ipbookstore.vercel.app', // Change this to specific origin in production
    // origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
  })
);
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

const razorpay = new Razorpay({
  key_id: 'rzp_test_cLK4B8WKJo7zsZ',
  key_secret: '7vrVSt7ygksy8jI3YCCl8KYt',
});
app.post('/api/carts', async (req, res) => {
  const { amount, currency='INR', receipt, notes } = req.body;
    // Convert amount to smallest currency unit (paise)
    const amountInPaise = parseInt(amount) * 100;
  const options = {
    amount: amountInPaise, // amount in smallest currency unit
    currency,
    receipt,
    notes
  };
  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend server is running on port ${port}!`);
});

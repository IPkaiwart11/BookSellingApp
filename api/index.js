// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config();
// const userRoute = require("./routes/user");
// const authRoute = require("./routes/auth");
// const productRoute = require("./routes/product");
// const cartRoute = require("./routes/cart");
// const orderRoute = require("./routes/order");
// const cors = require("cors");


// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => console.log("DB Connection Successfull!"))
//   .catch((err) => {
//     console.log("mongodb connection error", err);
//   });

// // app.use(cors());
// app.use(cors({
//   origin: 'https://book-selling-app.vercel.app',
//   // origin: 'https://localhost:3000',
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE' , 'HEAD' , 'PATCH'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'token'], 
// }));


// app.use(express.json());

// app.use("/api/auth", authRoute);
// app.use("/api/users", userRoute);
// app.use("/api/products", productRoute);
// app.use("/api/carts", cartRoute);
// app.use("/api/orders", orderRoute);

// const port = process.env.PORT || 5000
// app.listen(port, () => {
//   console.log("Backend server is running!");
// });



const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const cors = require("cors");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => {
    console.error("MongoDB connection error", err);
  });

app.use(
  cors({
    origin: 'https://book-selling-app.vercel.app', // Change this to specific origin in production
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
  })
);

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend server is running on port ${port}!`);
});

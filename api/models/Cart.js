
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  img: { type: String, required: true },
  categories: { type: Array },
  language: { type: Array, required: true },
  typeOfBook: { type: Array, required: true },
  price: { type: Number, required: true },
  // inStock: { type: Boolean, default: true },
});

const CartItemSchema = new mongoose.Schema({
  product: { type: ProductSchema, required: true },
  quantity: { type: Number, default: 1 },
});

const CartSchema = new mongoose.Schema(
  {
    // userId: { type: String, required: true }, // Assuming you have a user ID associated with the cart
    products: [CartItemSchema],
    total: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);

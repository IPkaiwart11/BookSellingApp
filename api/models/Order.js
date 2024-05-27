const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String},
  desc: { type: String},
  img: { type: String},
  categories: { type: Array },
  language: { type: Array},
  typeOfBook: { type: Array},
  price: { type: Number},
  // inStock: { type: Boolean, default: true },
});

// const CartItemSchema = new mongoose.Schema({
//   product: { type: ProductSchema},
//   productID: {type: String},
//   quantity: { type: Number, default: 1 },
// });

// const CartSchema = new mongoose.Schema(
//   {
//     // userId: { type: String, required: true }, // Assuming you have a user ID associated with the cart
//     products: [CartItemSchema],
//     total: { type: Number },
//   },
//   { timestamps: true }
// );

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        product:{type : ProductSchema},
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    total: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);


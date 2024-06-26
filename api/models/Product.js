const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ProductSchema = new mongoose.Schema(
  {
    // title: { type: String, required: true, unique: true },
    title: { type: String, required:true},
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    language: { type: Array, required:true},
    typeOfBook: { type: Array, required:true},
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    reviews: [ReviewSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);

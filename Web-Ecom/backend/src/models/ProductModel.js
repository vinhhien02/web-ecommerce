// ProductModel.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number },
    thumb: { type: String, required: true },
    images: { type: Array, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    status: { type: Boolean, default: true, required: true },
    checkByAdmin: { type: Boolean, default: true, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);


productSchema.index({ name: "text" });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

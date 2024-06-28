const mongoose = require("mongoose");
const favoriteSchema = new mongoose.Schema({
  reason: { type: String },
  view: { type: Boolean, default: false, required: true },
  status: { type: Boolean, default: true, required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  // Người dùng  báo cáo
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  createdAt: { type: Date, default: Date.now },
});
const Report = mongoose.model("Report", favoriteSchema);
module.exports = Report;

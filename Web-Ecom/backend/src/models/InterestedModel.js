const mongoose = require("mongoose");
const interestedSchema = new mongoose.Schema({
  reason: { type: String },
  view: { type: Boolean, default: false, required: true },
  status: { type: Boolean, default: true, required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  // Người dùng  báo cáo
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  // Người dùng bị báo cáo
  reportedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  nameUser: { type: String },
  phoneUser: { type: String },
  addressUser: { type: String },

  createdAt: { type: Date, default: Date.now },
});
const Interested = mongoose.model("Interested", interestedSchema);
module.exports = Interested;

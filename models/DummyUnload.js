const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DummyUnloadSchema = new Schema({
  id: {
    type: String
  },
  manifestId: {
    type: Number,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  to: {
    type: String,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  valueofGoods: {
    type: String,
    required: true,
  },
  consignorName: {
    type: String,
    required: true,
  },
  consigneeName: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
});


module.exports = DummyUnload = mongoose.model("DummyUnloads",DummyUnloadSchema);
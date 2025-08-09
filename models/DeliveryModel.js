const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DeliverySchema = new Schema({
  id: {
    type: String
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  manifestId: {
    type: Number,
  },
  to: {
    type: String,
    required: true,
  },
  Courier:{
    type:String,
    required:true,
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




module.exports = DeliveryModel = mongoose.model("Delivery",DeliverySchema);

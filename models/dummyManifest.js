const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DummyManifestSchema = new Schema({
  id: {
    type: String,
  },
  manifestDate: {
    type: Date,
    default: Date.now,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  vehicleNo:{
    type:String,
    required:true,
  },
  amount: {
    type: String,
    required: true,
  },
  advancePayment: {
    type: String,
    required: true,
  },
  dueBalance: {
    type: String,
    required: true,
  },
  Remarks: {
    type: String,
    required: true,
  },
});


module.exports = DummyManifest = mongoose.model("Dummymanifests",DummyManifestSchema);

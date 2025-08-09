const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ConsignmentSchema = new Schema({
  id: {
    type: String
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  manifestId: {
    type: Number,
    required: true,
  },
  cityReference: {
    type: String,
    required: true,
  },
  transportationMode:{
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
  blockchainid:{
    type:String,
    required:true
  },
  blockchainHash:{
    type:String,
    required:true
  }
});


ConsignmentIdSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  seq: { type: Number, default: 0 }
});

var consignmentId = mongoose.model('consignmentId', ConsignmentIdSchema);

ConsignmentSchema.pre('save', function(next) {
  var doc = this;
  consignmentId.findByIdAndUpdate({_id: 'consId'}, {$inc: { seq: 1} }, {new: true, upsert: true}).then(function(count) {
      //console.log("...count: "+JSON.stringify(count));
      doc.id = count.seq;
      next();
  })
  .catch(function(error) {
      console.error("consignment Id error-> : "+error);
      throw error;
  });
});


module.exports = Consignment = mongoose.model("consignments",ConsignmentSchema);

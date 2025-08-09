const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const manifestId = require('./ManifestId')

// Create Schema
const ManifestSchema = new Schema({
  id: {
    type: String
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



ManifestSchema.pre('save', function(next) {
  var doc = this;
  manifestId.findByIdAndUpdate({_id: 'mftId'}, {$inc: { seq: 1} }, {new: true, upsert: true}).then(function(count) {
      //console.log("...count: "+JSON.stringify(count));
      doc.id = count.seq;
      next();
  })
  .catch(function(error) {
      console.error("manifest Id error-> : "+error);
      throw error;
  });
});

module.exports = Manifest = mongoose.model("manifests",ManifestSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DispatchSchema = new Schema({
    id: {
        type: String,
        required:true
      },
      dispatchDate: {
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
      dispatchStatus:{
          type:Boolean,
          default:false
      }
      
});

/*
DispatchIdSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  seq: { type: Number, default: 0 }
});

var DispatchId = mongoose.model('DispatchId', DispatchIdSchema);

DispatchSchema.pre('save', function(next) {
  var doc = this;
  DispatchId.findByIdAndUpdate({_id: 'dfId'}, {$inc: { seq: 1} }, {new: true, upsert: true}).then(function(count) {
      //console.log("...count: "+JSON.stringify(count));
      doc.id = count.seq;
      next();
  })
  .catch(function(error) {
      console.error("Dispatch Id error-> : "+error);
      throw error;
  });
});
*/

module.exports = Dispatch = mongoose.model("Dispatches",DispatchSchema);

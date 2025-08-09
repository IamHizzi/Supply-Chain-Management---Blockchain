const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const ItemSchema = new Schema({
  id: {
    type: String
  },
  manifestId: {
    type: Number,
    required: true
  },
  productDetails: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required:true
  },
  quantity: {
    type: Number,
    required:true
  },
  TaxRate:{
    type:String,
    required:true
  },
  to:{
     type:String,
     required:true 
  }
});


CounterSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  seq: { type: Number, default: 0 }
});

var counter = mongoose.model('counter', CounterSchema);

ItemSchema.pre('save', function(next) {
  var doc = this;
  counter.findByIdAndUpdate({_id: 'itemId'}, {$inc: { seq: 1} }, {new: true, upsert: true}).then(function(count) {
      console.log("...count: "+JSON.stringify(count));
      doc.id = count.seq;
      next();
  })
  .catch(function(error) {
      console.error("counter error-> : "+error);
      throw error;
  });
});

module.exports = Item = mongoose.model('items', ItemSchema);

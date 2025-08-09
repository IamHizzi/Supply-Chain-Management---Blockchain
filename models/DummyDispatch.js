const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DummyDispatchSchema = new Schema({
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

module.exports = DummyDispatch = mongoose.model("DummyDispatches",DummyDispatchSchema);

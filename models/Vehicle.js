const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const VehicleSchema = new Schema({
  RegistrationNumber: {
    type: String,
    required: true
  },
  Model: {
    type: Number,
    required: true
  },
  Type: {
    type: String,
    required: true
  },
  DriverName:{
    type: String,
    required: true
      
  }
  
});

module.exports = Vehicle = mongoose.model('Vehicles', VehicleSchema);

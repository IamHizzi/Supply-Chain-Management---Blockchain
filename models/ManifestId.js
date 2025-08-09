const mongoose = require("mongoose");
const Schema = mongoose.Schema;

ManifestIdSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
  });
  
module.exports = manifestId = mongoose.model('manifestId', ManifestIdSchema);

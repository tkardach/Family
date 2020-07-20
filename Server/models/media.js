const Joi = require("joi");
const mongoose = require("mongoose");
Joi.objectId = require('joi-objectid')(Joi);


const mediaSchema = new mongoose.Schema({
  filename: {type: String, required: true, immutable: true},
  url: {type: String, required: true, immutable: true},
  name: {type: String, required: true},
  description: {type: String},
  categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
  family: [{type: mongoose.Schema.Types.ObjectId, ref: 'Family'}],
  path: {type: String, required: true, immutable: true},
  mimetype: {type: String, required: true, immutable: true}
}, 
{timestamps: true});

const Media = mongoose.model("Media", mediaSchema);

// Validates a /PUT request
function validatePutMedia(req) {
  const schema = {
  };

  return Joi.validate(req, schema);
}

module.exports.Media = Media;
module.exports.validatePutMedia = validatePutMedia;
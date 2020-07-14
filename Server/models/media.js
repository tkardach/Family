const Joi = require("joi");
const mongoose = require("mongoose");
Joi.objectId = require('joi-objectid')(Joi);


const mediaSchema = new mongoose.Schema({
  url: {type: String, required: true},
  name: {type: String, required: true},
  description: {type: String},
  categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
  family: [{type: mongoose.Schema.Types.ObjectId, ref: 'Family'}]
}, 
{timestamps: true});

const Media = mongoose.model("Media", mediaSchema);

// Validates a /POST request
function validatePostMedia(req) {
  const schema = {
    categories: Joi.alternatives().try(
      Joi.array().items(Joi.string()),
      Joi.array().items(Joi.objectId())
    ),
    family: Joi.alternatives().try(
      Joi.string(),
      Joi.objectId()
    ),
    url: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.description().optional()
  };

  return Joi.validate(req, schema);
}

// Validates a /PUT request
function validatePutMedia(req) {
  const schema = {
  };

  return Joi.validate(req, schema);
}

module.exports.Media = Media;
module.exports.validatePostMedia = validatePostMedia;
module.exports.validatePutMedia = validatePutMedia;
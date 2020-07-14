const Joi = require("joi");
const mongoose = require("mongoose");
Joi.objectId = require('joi-objectid')(Joi);


const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  birth: {
    type: Date,
    required: true
  }
});

const Category = mongoose.model("Category", categorySchema);

// Validates a /POST request
function validatePostCategory(req) {
  const schema = {
    name: Joi.string().required(),
    birth: Joi.date().required()
  };

  return Joi.validate(req, schema);
}

// Validates a /PUT request
function validatePutCategory(req) {
  const schema = {
    name: Joi.string().optional(),
    birth: Joi.date().optional()
  };

  return Joi.validate(req, schema);
}

module.exports.Category = Category;
module.exports.validatePostCategory = validatePostCategory;
module.exports.validatePutCategory = validatePutCategory;
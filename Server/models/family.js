const Joi = require("joi");
const mongoose = require("mongoose");
Joi.objectId = require('joi-objectid')(Joi);


const familySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  birth: { type: Date, required:true}
});

const Family = mongoose.model("Family", familySchema);

// Validates a /POST request
function validatePostFamily(req) {
  const schema = {
    name: Joi.string().required(),
    birth: Joi.date().required()
  };

  return Joi.validate(req, schema);
}

// Validates a /PUT request
function validatePutFamily(req) {
  const schema = {
    name: Joi.string().optional(),
    birth: Joi.date().optional()
  };

  return Joi.validate(req, schema);
}

module.exports.Family = Family;
module.exports.validatePostFamily = validatePostFamily;
module.exports.validatePutFamily = validatePutFamily;
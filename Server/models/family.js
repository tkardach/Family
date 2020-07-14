const Joi = require("joi");
const mongoose = require("mongoose");
Joi.objectId = require('joi-objectid')(Joi);



const familySchema = new mongoose.Schema({

});

const Family = mongoose.model("Family", familySchema);

// Validates a /POST request
function validatePostFamily(req) {
  const schema = {
  };

  return Joi.validate(req, schema);
}

// Validates a /PUT request
function validatePutFamily(req) {
  const schema = {
  };

  return Joi.validate(req, schema);
}

module.exports.Family = Family;
module.exports.validatePostFamily = validatePostFamily;
module.exports.validatePutFamily = validatePutFamily;
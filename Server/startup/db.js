
/**
 * db.js initalizes the database
 */

const mongoose = require('mongoose');
const config = require('config');
const {logError, logInfo} = require('../debug/logging');

if (!config.get('db')) {
  logError("config cannot find 'db' environment variable");
  process.exit(1);
}

module.exports = async function () {
  const db = config.get('db');
  await mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    logInfo('Connected to MongoDB database.');
  })
  .catch((err) => {
    logError(err);
  });
}
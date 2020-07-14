const {logUncaughtExc} = require('../debug/logging');

module.exports = function (err, req, res, next) {
  logUncaughtExc(err);

  res.status(500).send('Internal server error.');
}
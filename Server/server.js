
/**
 *  server.js intializes the entire application and hosts it on the specified port
 */

const app = require('./app.js');
const config = require('config')
const {logInfo} = require('./debug/logging');

// Define server port
const port = process.env.PORT || config.get('port');

// Start and return the server object
const server = app.listen(port, () => {
  logInfo(`App listening on port ${port}`);
});

module.exports = server;
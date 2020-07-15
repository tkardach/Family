
/**
 *  app.js establishes all things related to the backend and initializes them.
 */

const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const config = require('config');
const error = require('./middleware/error');
const {uuidv4} = require('./shared/utility');


app.use('/images', express.static(config.get('imageDir')));
app.use('/thumbnails', express.static(config.get('thumbnailDir')));
app.use('/videos', express.static(config.get('videoDir')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: config.get('sessionSecret'),
  genid: function(req) {
    return uuidv4();
  },
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 36000000,
    httpOnly: true
  }
}));

app.use(function(req, res, next) {
  var regList = [
    'http.*:\/\/localhost.*',
    'http.*:\/\/127.0.0.1.*',
    'http.*:\/\/.*kardachkandles.com.*'
  ]

  let reg = new RegExp(regList.join("|"));

  var origin = req.headers.origin;
  if (origin && reg.test(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");

  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    //respond with 200
    res.sendStatus(200);
  }
  else {
  //move on
    next();
  }
});

// Check configuration
require('./startup/config');

// Initialize api routes
require('./startup/routes')(app);

// Initialize Database
require('./startup/db')();

// Error handling middleware
app.use(error);

module.exports = app;
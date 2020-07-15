const express = require('express');
const router = express.Router();
const {logInfoClient} = require('../debug/logging');


router.post('/', (req, res) => {
  logInfoClient(req.body);
})

module.exports = router;
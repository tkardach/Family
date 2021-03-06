
const express = require('express');
const router = express.Router();
const {logInfoClient} = require('../debug/logging');


// GET home page
router.get('/', async (req, res) => {
  return res.status(200).send();
});

router.post('/logs', (req, res) => {
  logInfoClient(req.body);
})

module.exports = router;
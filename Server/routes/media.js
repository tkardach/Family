const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = require('config');
const {Media, validatePostMedia, validatePutMedia} = require('../models/media');


const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      let type = req.params.type;
      let path;
      if (type === 'video')
        path = config.get('videoDir')
      if (type === 'image')
        path = config.get('imageDir')
      callback(null, path);
    }
  })
});


router.get('/', (req, res) => {
  return res.status(200).send();
});


const mediaUpload = upload.fields([
  {name: 'video', maxCount: 5},
  {name: 'image', maxCount: 25}
])

router.post('/upload', mediaUpload, async (req, res) => {
  console.log(req.body);
  console.log(req.files);
})

module.exports = router;
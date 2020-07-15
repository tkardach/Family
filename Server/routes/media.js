const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = require('config');
const {Media, validatePutMedia} = require('../models/media');
const {RegexStrings} = require('../shared/strings');
const {uuidv4} = require('../shared/utility');

// Create an upload middleware that takes only video and images and puts them in their respective directories
const upload = multer({
  storage: multer.diskStorage({
    // Filter file types into their correct directories
    destination: (req, file, callback) => {
      let path;
      let type = file.mimetype;
      if (RegexStrings.Files.Video.test(type))
        path = config.get('videoDir')
      else if (RegexStrings.Files.Image.test(type))
        path = config.get('imageDir');
      callback(null, path);
    },
    // Create a unique filename
    filename: (req, file, callback) => {
      let ext = file.originalname.match(RegexStrings.Files.Extension)[0];
      let name = uuidv4() + ext;
      callback(null, name)
    }
  }),
  // Filter the files and only accept image and video types
  fileFilter: function (req, file, callback) {
    let type = file.mimetype;
    if (RegexStrings.Files.Video.test(type) || RegexStrings.Files.Image.test(type))
      return callback(null, true);
    req.fileValidationError = 'Only image and video types are supported for upload.';
    callback(new Error(req.fileValidationError), false);
  }
});


router.get('/', (req, res) => {
  return res.status(200).send();
});


const mediaUpload = upload.fields([
  {name: 'file', maxCount: 25}
])

router.post('/upload', (req, res) => {
  mediaUpload(req, res, async function(err) {
    if (req.fileValidationError)
      return res.status(400).send(req.fileValidationError);
    
    let file = req.files.file;

    // const media = new Media({
    //   _id: file.filename,
    //   filename: file.filename,
    //   url
    // })
  });
})

module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = require('config');
const path = require('path');
const fs = require('fs');
const {Media, validatePutMedia} = require('../models/media');
const {RegexStrings, Constants, Errors, Messages} = require('../shared/strings');
const {uuidv4, generateUrl} = require('../shared/utility');
const {logError, logInfo} = require('../debug/logging');
const imagemod = require('../modules/image');
const async = require('async');


// Create an upload middleware that takes only video and images and puts them in their respective directories
const upload = multer({
  storage: multer.diskStorage({
    // Filter file types into their correct directories
    destination: (req, file, callback) => {
      let path;
      let type = file.mimetype;
      if (RegexStrings.Files.Video.test(type)) {
        path = config.get('videoDir');
        req.imageType = false;
      }
      else if (RegexStrings.Files.Image.test(type)) {
        path = config.get('imageDir');
        req.imageType = true;
      }
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
    req.fileValidationError = Errors.HTTP400.FileValidationError;
    callback(new Error(req.fileValidationError), false);
  }
});


/**
 * Deletes all database references and files of all media types
 * @param {string} filename Name of the file to remove
 */
async function deleteMedia(filename) {
  // Generate paths for all media types
  const videoPath = path.join(config.get('videoDir'), filename);
  const thumbPath = path.join(config.get('thumbnailDir'), filename);
  const imagePath = path.join(config.get('imageDir'), filename);

  if (fs.existsSync(videoPath))
    fs.unlink(videoPath, (err) => {if (err) logError(err)});
  if (fs.existsSync(thumbPath))
    fs.unlink(thumbPath, (err) => {if (err) logError(err)});
  if (fs.existsSync(imagePath))
    fs.unlink(imagePath, (err) => {if (err) logError(err)});
  
  await Media.deleteMany({filename: filename }, (err) => {if (err) logError(err)});
}

/**
 * Adds the files and corresponding thumbnail to database
 * @param {boolean} imageType True if file is an image type 
 * @param {Express.Multer.File} filename Name of the file
 */
async function addMediaToDatabase(imageType, file) {
  const thumbnailLongSide = 500;
  // Add image to database
  let destPath = imageType ? Constants.Paths.Images : Constants.Paths.Videos;
  let destUrl = generateUrl(config.get('domain'), destPath, file.filename);

  const media = new Media({
    filename: file.filename,
    url: destUrl,
    name: file.originalname,
    path: file.path,
    mimetype: file.mimetype
  });
  
  // Generate thumbnail
  let thumbPath = path.join(config.get('thumbnailDir'), file.filename);
  let thumbUrl = generateUrl(config.get('domain'), Constants.Paths.Thumbnails, file.filename);
  
  if (imageType) {
    await imagemod.generateThumbnailByLongSide(file.path, thumbPath, thumbnailLongSide);
  }

  const thumbnail = new Media({
    filename: file.filename,
    url: thumbUrl,
    name: file.originalname,
    path: thumbPath,
    mimetype: file.mimetype
  });

  await media.save();
  await thumbnail.save();
}

router.get('/', (req, res) => {
  return res.status(200).send();
});


const mediaUpload = upload.array('file', 25);

router.post('/upload', (req, res) => {
  mediaUpload(req, res, async function(err) {
    if (req.fileValidationError)
      return res.status(400).send(req.fileValidationError);
    
    let file = req.files[0];
    
    try {
      await addMediaToDatabase(req.imageType, file);
      return res.status(200).send('Successfully uploaded media')
    } catch (err) {
      await deleteMedia(file.filename);
      logError(err);
      return res.status(500).send('Error occured while uploading media')
    }
  });
})

module.exports = router;
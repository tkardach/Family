const {logError} = require('../debug/logging');
const imageThumbnail = require('image-thumbnail');
var ExifImage = require('exif').ExifImage;


/**
 * Get the EXIF data of the given image
 * @param {string} url - URL location of the image
 */
function getExifData(url) {
  try {
    new ExifImage({ image : url }, function (err, exifData) {
        if (err)
          logError(err)
        else
          return exifData
    });
  } catch (err) {
    logError(err)
  }
}


/**
 * Generate a thumbnail and return the image buffer
 * @param {string} url - The location of the image
 * @param {Object} opts - Thumbnail options
 * @param {number} opts.percentage - Percentage of the image size for thumbnail
 * @param {number} opts.width - Integer width of the thumbnail
 * @param {number} opts.height - Integer height of the thumbnail
 * @param {string} opts.responseType - Buffer type of thumbnail ['buffer', 'base64']
 * @param {Object} opts.jpegOptions - Jpeg options for thumbnail generation
 * @param {boolean} opts.jpegOptions.force - Force jpeg quality option
 * @param {number} opts.jpegOptions.quality - Quality of the jpeg image
 */
async function getThumbnail(url, opts) {
  let options = null;
  if (opts) {
    options = {};

    if (opts['percentage']) options.percentage = opts['percentage'];
    if (opts['width'] && opts['height']) {
      options.width = opts['width'];
      options.height = opts['height'];
    }
    if (opts['responseType']) options.responseType = opts['responseType'];
    if (opts['jpegOptions']) options.jpegOptions = opts['jpegOptions'];
  }

  try {
    const thumbnail = options ? await imageThumbnail(url, options) : await imageThumbnail(url);
    return thumbnail;
  } catch (err) {
    logError(err);
  }
}


module.exports.getThumbnail = getThumbnail;
module.exports.getExifData = getExifData;
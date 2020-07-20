const {logError} = require('../debug/logging');
const imageThumbnail = require('image-thumbnail');
const jimp = require('jimp')
const fs = require('fs');
const {Constants} = require('../shared/strings');
const { intToRGBA } = require('jimp');

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
    return null;
  }
}


/**
 * Generate a thumbnail and return the image buffer
 * @param {Buffer} buffer - The image buffer
 * @param {Object} opts - Thumbnail options
 * @param {number} opts.percentage - Percentage of the image size for thumbnail
 * @param {number} opts.width - Integer width of the thumbnail
 * @param {number} opts.height - Integer height of the thumbnail
 * @param {string} opts.responseType - Buffer type of thumbnail ['buffer', 'base64']
 * @param {Object} opts.jpegOptions - Jpeg options for thumbnail generation
 * @param {boolean} opts.jpegOptions.force - Force jpeg quality option
 * @param {number} opts.jpegOptions.quality - Quality of the jpeg image
 */
async function getThumbnailFromBuffer(buffer, opts) {
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
    const thumbnail = options ? await imageThumbnail(buffer, options) : await imageThumbnail(buffer);
    return thumbnail;
  } catch (err) {
    logError(err);
    return null;
  }
}

/**
 * Generate a thumbnail and save it at the destination path
 * @param {string} url The location of the image
 * @param {string} dest The destination of the thumbnail
 * @param {number} longSideLen The desired length of the long side of the image
 */
async function generateThumbnailByLongSide(url, dest, longSideLen) {
  const image = await jimp.read(url);
  
  const width = image.getWidth();
  const height = image.getHeight();
  const longSide = width > height ? width : height;

  const perc = calculateScale(longSide, longSideLen);
  
  const buffer = await imagemod.getThumbnailFromBuffer(await image.getBufferAsync(Constants.Mimetypes.Jpeg), {percentage: perc});
  if (!buffer)
    throw new Error('generateThumbnail: Failed to generate thumbnail');
  
  fs.writeFileSync(dest, buffer);
}

/**
 * Generate a thumbnail and save it at the destination path
 * @param {string} url - The location of the image
 * @param {string} dest - The destination of the thumbnail
 * @param {Object} opts - Thumbnail options
 * @param {number} opts.percentage - Percentage of the image size for thumbnail
 * @param {number} opts.width - Integer width of the thumbnail
 * @param {number} opts.height - Integer height of the thumbnail
 * @param {string} opts.responseType - Buffer type of thumbnail ['buffer', 'base64']
 * @param {Object} opts.jpegOptions - Jpeg options for thumbnail generation
 * @param {boolean} opts.jpegOptions.force - Force jpeg quality option
 * @param {number} opts.jpegOptions.quality - Quality of the jpeg image
 */
async function generateThumbnail(url, dest, opts) {
  const image = await jimp.read(url);
  const buffer = await imagemod.getThumbnailFromBuffer(await image.getBufferAsync(Constants.Mimetypes.Jpeg), opts);
  if (!buffer)
    throw new Error('generateThumbnail: Failed to generate thumbnail');
  
  fs.writeFileSync(dest, buffer);
}


/**
 * Returns the percentage necessary to scale the image to the desired length
 * @param {number} len Length of the image you want to scale
 * @param {number} desLen Desired length
 * @return {number} The percentage scale necessary to get the desired length
 */
function calculateScale(len, desLen) {
  return ((desLen / len) * 100) | 0;
}

const imagemod = {
  getThumbnail: getThumbnail,
  generateThumbnail: generateThumbnail,
  getThumbnailFromBuffer: getThumbnailFromBuffer,
  generateThumbnailByLongSide: generateThumbnailByLongSide
}

module.exports = imagemod;
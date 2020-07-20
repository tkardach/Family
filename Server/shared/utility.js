const url = require('url');
/**
 * Delay operation by given time in milliseconds
 * @param {number} ms - Time in milliseconds to delay 
 */
const delay = ms => new Promise(res => setTimeout(res, ms));

/**
 * Generate a standardized error response
 * @param {number} status : HTTP Response Status
 * @param {string} message : HTTP Response Text
 */
function errorResponse(status, message) {
  return {
    status: status,
    message: message
  }
}


function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


/**
 * Generate a url from the provided string arguments
 */
function generateUrl() {
  const args = arguments;
  if (args.length === 0) return "";

  // Check if argument is acceptable
  function checkString(str) {
    if (!(typeof str === "string"))
      throw new Error("generateUrl: argument must be a string type");
  }

  // Remove the heading and trailing slashes from string
  function removeSlashes(str) {
    // Remove all trailing / characters
    while(str.slice(-1) === '/')
      str = str.slice(0, -1);
    // Remove all heading / characters
    while (str[0] === '/')
      str = str.substring(1);
    return str;
  }

  checkString(args[0]);

  if (args.length === 1)
    return removeSlashes(args[0])

  let finalUrl = args[0];
  for (let i=1; i<args.length; i++) {
    let arg = args[i];
    checkString(arg);

    finalUrl = removeSlashes(finalUrl);
    // Add trailing / character
    finalUrl = finalUrl + '/';
    
    arg = removeSlashes(arg);

    finalUrl = url.resolve(finalUrl, arg);
  }

  return finalUrl;
}

module.exports.uuidv4 = uuidv4;
module.exports.delay = delay;
module.exports.errorResponse = errorResponse;
module.exports.generateUrl = generateUrl;
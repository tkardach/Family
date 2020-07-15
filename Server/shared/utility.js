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

module.exports.uuidv4 = uuidv4;
module.exports.delay = delay;
module.exports.errorResponse = errorResponse;
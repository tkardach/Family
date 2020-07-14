
/**
 * Delay operation by given time in milliseconds
 * @param {ms} ms - Time in milliseconds to delay 
 */
const delay = ms => new Promise(res => setTimeout(res, ms));

/**
 * Generate a standardized error response
 * @param {status} status : HTTP Response Status
 * @param {*} message : HTTP Response Text
 */
function errorResponse(status, message) {
  return {
    status: status,
    message: message
  }
}

module.exports.delay = delay;
module.exports.errorResponse = errorResponse;
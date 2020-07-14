const nodemailer = require('nodemailer');
const config = require('config');

/**
 * Send an email using the configured email account
 * @param {subject} subject - Subject of the email
 * @param {body} body - Body of the email
 * @param {*} to - Receipient of the email
 */
async function sendEmail(subject, body, to) {
  var smtpTransport = nodemailer.createTransport({
    service: config.get('emailService'),
    auth: {
      user: config.get('emailAccount'),
      pass: config.get('emailPass')
    }
  });
  var mailOptions = {
    to: to,
    from: config.get('emailAccount'),
    subject: subject,
    text: body
  };
  await smtpTransport.sendMail(mailOptions);
}

module.exports.sendEmail = sendEmail;
const sendEmail = require('./send-mail');
const checkEmailExist = require('./check-email-exist')
const canAccessFormOfUser = require('./can-access-form-submit');

module.exports = {
    sendEmail,
    checkEmailExist,
    canAccessFormOfUser
}
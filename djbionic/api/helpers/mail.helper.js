const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASS
    }
});

// from: '',
// to: ',
// subject: '',
// html: ``

const sentMailSync = (mailOptions, callback) => {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            callback(error)
        } else {
            callback(null, info)
        }
    });
}


const sentMail = (mailOptions) => {
    transporter.sendMail(mailOptions, function (error, info) { });
}

module.exports = {
    sentMail,
    sentMailSync
};

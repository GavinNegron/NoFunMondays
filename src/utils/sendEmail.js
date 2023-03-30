const nodemailer = require('nodemailer');

const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASS,
        },
        secure: true,
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
        }
    });
};

module.exports = sendEmail;
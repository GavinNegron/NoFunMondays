const sgMail = require('@sendgrid/mail');
const EmailVerification = require('../../models/EmailVerification');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async (req, newUser) => {
    const otp = Math.floor(100000 + Math.random() * 900000);

    await new EmailVerification({ userId: newUser._id, otp: otp }).save();
    const otpVerificationLink = `https://nofunmondays.com/account/verify-email/`

    const msg = {
        to: newUser.email, 
        from: 'no-reply@nofunmondays.com', 
        subject: 'Verify your Email',
        text: `${otpVerificationLink}, This OTP is valid for 15 minutes. If you didn't request this OTP, please ignore this email.${otp}`
    };

    try {
        await sgMail.send(msg);
        console.log('Email sent');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendVerificationEmail;
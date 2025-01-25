const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendPasswordResetEmail = async (email, resetLink, name) => {
  const msg = {
    to: email,
    from: 'no-reply@nofunmondays.com',
    subject: 'Password Reset Link',
    text: `Hello ${name}, please click the link below to reset your password. ${resetLink}`
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendPasswordResetEmail;
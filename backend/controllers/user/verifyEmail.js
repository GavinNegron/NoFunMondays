const EmailVerification = require("../../models/EmailVerification");
const User = require("../../models/User");
const sendVerificationEmail = require("../../utils/email/sendVerificationEmail");

const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body

    if(!email || !otp) return res.status(400).json({ status: "Failed", message: "All fields are required"})

    const existingUser = await User.findOne({ email });

    if (!existingUser) return res.status(400).json({ status: "Failed", message: "Email doesn't exist" })

    if (existingUser.is_verified) return res.status(200).json({ status: "Success", message: "Email is already verified"} )

    const emailVerification = await EmailVerification.findOne({ userId: existingUser._id, otp })
    
    if (!emailVerification) {
      if (!existingUser.is_verified) {
        await sendVerificationEmail(req, existingUser);
        return res.status(400).json({ statis: "Failed", message: `Invalid OTP, New OTP sent to your email` })
      }

      const currentTime = new Date();
      const expirationTime = new Date(emailVerification.createdAt.getTime() + 15 * 60 * 1000);

      if (!currentTime > expirationTime) {
        await sendVerificationEmail(req, existingUser);
        return res.status(400).json({ status: "Failed", message: "OTP expired, new OTP sent to your email" })
      }
    }

    existingUser.is_verified = true;
    await existingUser.save();

    await EmailVerification.deleteMany({ userId: existingUser._id });

    return res.status(200).json({ status: "Success", message: "Successfully verified email"} )

    } catch (error) {
      return res.status(500).json({ 
        status: "failed", 
        message: "Unable to verify email address please try again later.", 
        error: `Error: ${error}`
      });
    }
};

module.exports = { verifyEmail }
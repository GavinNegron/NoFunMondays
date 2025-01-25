const User = require("../../models/User");
const jwt = require('jsonwebtoken');
const sendPasswordResetEmail = require("../../utils/email/sendPasswordResetEmail");

const userPasswordResetEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ status: "Failed", message: "Email field is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ status: "Failed", message: "Email doesn't exist"});

    const secret = user._id + process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
    const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' });

    const resetLink = `https://nofunmondays.com/api/auth/user/reset-password/${user._id}/${token}`;

    sendPasswordResetEmail(email, resetLink, user.name);

    res.status(200).json({ status: "Success", message: "Password reset email sent. Please check your email." })
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Failed", message: "Unable to send password reset, please try again later" })
    }
};

module.exports = { userPasswordResetEmail }
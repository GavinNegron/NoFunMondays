const User = require('../../models/User');
const bcrypt = require('bcrypt');

const changeUserPassword = async (req, res) => {
  try {
    const { password, password_confirmation } = req.body;

    if (!password || !password_confirmation) return res.status(400).json({ status: "Failed", message: "All fields are required"} );

    if (password !== password_confirmation) return res.status(400).json({ status: "Failed", message: "Passwords do not match"} );

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const newHashPassword = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(req.user._id, {
        $set: {
            password: newHashPassword
        }
    });

    res.status(200).json({ status: "Success", message: "Password changed successfully"});

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Failed", message: "Unable to create new password. Please try again later" })
    }
};

module.exports = { changeUserPassword }
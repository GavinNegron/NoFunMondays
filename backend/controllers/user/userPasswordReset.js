const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const userPasswordReset = async (req, res) => {
    try {
        const { password, password_confirmation } = req.body;
        const { id, token } = req.params;

        const user = await User.findById(id);
        if(!user) return res.status(404).json({ status: "Failed", message: "User not found"});

        const new_secret = user._id + process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
        jwt.verify(token, new_secret);

        if (!password || !password_confirmation) return res.status(400).json({ status: "Failed", message: "All fields are required"} );

        if (password !== password_confirmation) return res.status(400).json({ status: "Failed", message: "Passwords do not match"});

        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);

        await User.findByIdAndUpdate(user._id, { $set: { password: newHashPassword }});

        res.status(200).json({ status: "Success", message: "Password successfully reset"} );

    } catch (error) {
        if (error.name === "TokenExpiredError") return res.status(400).json({ status: "Failed", message: "Token expired. Please try again later. "});
        return res.status(500).json({ status: "Failed", message: "Unable to reset password. Please try again later."});
    }
}

module.exports = { userPasswordReset };
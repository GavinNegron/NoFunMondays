const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');


exports.forgotpassword = async(req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next(new ErrorResponse('We could not find an account with that email!'), 401);
        }
        const resetToken = user.getResetPasswordToken();

        await user.save();

        const resetUrl = `https://localhost:3000/login/forgot-password/${resetToken}`;

        const message = Math.floor(100000 + Math.random() * 900000);
        try {
            await sendEmail({
                to: user.email,
                subject: 'Password reset.',
                text: `${message}`
            });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return next(new ErrorResponse(error), 401);
        };
    } catch (error) {
        next(error);
    }
    res.redirect('/login/forgot-password/')
}
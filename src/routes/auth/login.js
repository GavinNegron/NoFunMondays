const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { loginValidation, newPasswordValidate } = require('../../middleware/validation');
const ErrorResponse = require('../../utils/errorResponse');
const sendEmail = require('../../utils/sendEmail');

module.exports = function(app){
    app.get('/login', (req, res) => {
        const error = req.session.error;
        res.render('login', {
            error: error
        });
        req.session.save(err => {
            if (err) {
              throw err;
            };
          });
    });

    app.post('/login', async (req, res, next) => {
        const { error } = loginValidation(req.body);
        if (error) {
            req.session.error = error.message;
            return res.status(401).redirect('login');
        };

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            req.session.error = 'Email or password is incorrect!';
            return res.status(401).redirect('login');
        };
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
            req.session.error = 'Email or password is incorrect!';
            return res.status(401).redirect('login');
        };
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).redirect('/dashboard');
    });
    
    app.get('/login/forgot-password', (req, res, next) => {
        const error = req.session.error;
        const codeSent = req.session.codeSent;
        res.render('login/forgot-password', {
            error: error,
            codeSent: codeSent
        });
        req.session.error = undefined
        req.session.codeSent = undefined
        req.session.save(err => {
            if (err) {
              throw err;
            };
          });
    });

    app.post('/login/forgot-password', async(req, res, next) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                req.session.error = 'We could not find an account with that email!';
                return res.status(401).redirect('forgot-password');
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
            req.session.codeSent = true;
            return res.status(401).redirect('forgot-password');
        } catch (error) {
            return next(new ErrorResponse(error), 401);
        };
    });
    
    app.post('/login/new-password', async(req, res, next) => {
        try {
            const { error } = newPasswordValidate(req.body);
            if (error) {
                req.session.codeSent = true;
                req.session.error = error.message;
                return res.status(401).redirect('forgot-password');
            };
            if(req.body.password != req.body.confirm_password) {
                req.session.codeSent = true;
                req.session.error = 'Passwords do not match!';
                return res.status(401).redirect('forgot-password');
            }
        } catch (error) {
            return next(new ErrorResponse(error), 401);
        };
    })
};
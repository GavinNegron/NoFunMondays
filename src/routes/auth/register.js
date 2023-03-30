const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { registerValidation } = require('../../middleware/validation');
const ErrorResponse = require('../../utils/errorResponse');

module.exports = function(app){
    app.get('/register', (req, res) => {
        if(req.session.error) {
            res.render('register/index.ejs', {
                error: req.session.error
            });
            req.session.error = undefined;
            req.session.save(err => {
                if (err) {
                  throw err;
                };
              });
        } else {
            res.render('register/index.ejs', {
                error: undefined
            });
        }
    });

    app.post('/register', async (req, res, next) => {
        const { error } = registerValidation(req.body);
        const email = (req.body.email).trim();
        const username = (req.body.username).trim();
        const password = (req.body.password).trim();
    if (error) {
        req.session.error = error.message;
        return res.status(401).redirect('register');    
    }
    if(req.body.password != req.body.confirm_password) {
        req.session.error = "Passwords do not match!";
        return res.status(401).redirect('register');
    }    
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
        req.session.error = 'Email is already taken!';
        return res.status(401).redirect('register');    
    }
    const usernameExists = await User.findOne({ username: username });
    if (usernameExists) {
        req.session.error = 'Username is already taken!';
        return res.status(401).redirect('register'); 
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.redirect('/register');
    } catch (err) {
        return next(new ErrorResponse(err), 401);
    }
    })
}
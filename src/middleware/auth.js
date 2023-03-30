const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

exports.protect = async(req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return next(new ErrorResponse("Not authorized to access this page", 401))

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return next(new ErrorResponse("Not authorized to access this page", 401))
    };
};
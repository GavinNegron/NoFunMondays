const rateLimit = require('express-rate-limit');

const rateLimits = {
    loginLimiter: rateLimit({
        windowMs: 15 * 60 * 1000,  
        max: 5, 
        message: 'Too many login attempts from this IP, please try again later'
    }),
    registerLimiter: rateLimit({
        windowMs: 60 * 60 * 1000,  
        max: 10, 
        message: 'Too many registration attempts from this IP, please try again later'
    }),
    contactLimiter: rateLimit({
        windowMs: 60 * 60 * 1000,  
        max: 3, 
        message: 'Too many contact requests from this IP, please try again later'
    })
};

module.exports = rateLimits;
const mongoose = require('mongoose')

const { userDB } = require('../config/db'); 

const user = userDB(); 

const emailVerificationSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: '15m'
    }
})

module.exports = user.model('EmailVerification', emailVerificationSchema, 'EmailVerification');
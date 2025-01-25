const mongoose = require('mongoose')

const { userDB } = require('../config/db'); 

const user = userDB(); 

const userRefreshTokenSchema = new mongoose.Schema({
    userId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true
    },
    blacklisted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '5d'
    }
})

module.exports = user.model('UserRefreshToken', userRefreshTokenSchema, 'UserRefreshToken');
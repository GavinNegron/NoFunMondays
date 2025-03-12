const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');
const { dashboardDB } = require('../config/db'); 

const dashboard = dashboardDB(); 

const emailSchema = new mongoose.Schema({
    from: { 
        type: String, 
        required: true 
    },
    subject: { 
        type: String, 
        required: true 
    },
    body: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
})

emailSchema.pre("save", function (next) {
  this.email = CryptoJS.AES.encrypt(this.email, process.env.ENCRYPTION_KEY);
  next();
})

module.exports = dashboard.model('Email', emailSchema);
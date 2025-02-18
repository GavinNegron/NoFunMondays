const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');
const { dashboardDB } = require('../config/db'); 

const dashboard = dashboardDB(); 

const contactSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true
  },
  name: {
    type: String, 
    required: true
  },
  message: {
    type: String, 
    required: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
    required: true,
  }
})

contactSchema.pre("save", function (next) {
  this.email = CryptoJS.AES.encrypt(this.email, process.env.ENCRYPTION_KEY);
  next();
})

module.exports = dashboard.model('Contact', contactSchema);
const mongoose = require('mongoose')

const { userDB } = require('../config/db'); 

const user = userDB(); 

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: true 
  },
  roles: {
    type: [String],
    enum: ["user", "admin"],
    default: ["user"]
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
    required: true,
  }
})

module.exports = user.model('Users', userSchema);
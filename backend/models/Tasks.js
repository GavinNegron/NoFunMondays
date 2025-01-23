const mongoose = require('mongoose')
const { dashboardDB } = require('../config/db'); 

const admin = dashboardDB(); 

const taskSchema = new mongoose.Schema({
  content: { 
    type: String, 
    required: true
  },
  tag: {
    type: String, 
    required: true
  },
  status: {
    type: String, 
    required: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
    required: true,
  }
})

module.exports = admin.model('Tasks', taskSchema);
const mongoose = require('mongoose')
const { logDB } = require('../config/db') 

const log = logDB() 

const logSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  meta: {
    type: mongoose.Schema.Types.Mixed, 
    default: {},
  },
}, { collection: 'logs' }) 

module.exports = log.model('Logs', logSchema);
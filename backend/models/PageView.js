const mongoose = require('mongoose')
const { blogDB } = require('../config/db'); 

const blog = blogDB(); 

const pageViewSchema = new mongoose.Schema({
    postSlug: { 
        type: String, 
        required: true, 
        index: true 
    },
    userId: { 
        type: String, 
        required: true 
    },
    browser: {
        type: String,
        required: true
    },
    referrer: {
        type: String, 
        default: 'direct'
    },
    region: {
        type: String, 
        default: 'unknown'
    },
    timezone: {
        type: String, 
        default: 'unknown'
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
})

module.exports = blog.model('PageView', pageViewSchema, 'PageView');
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
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
})

module.exports = blog.model('PageView', pageViewSchema, 'PageView');
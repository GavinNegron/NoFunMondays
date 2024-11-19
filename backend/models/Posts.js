const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        required: true,
        default: Date.now
    },
    imageUrl: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Posts', blogPostSchema);
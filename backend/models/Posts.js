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
        default: Date.now,
        required: true,

    },
    imageUrl: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
        unique: true,
        required: true
    }
})

module.exports = mongoose.model('Posts', blogPostSchema);
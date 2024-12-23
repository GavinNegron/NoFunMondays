const mongoose = require('mongoose')

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
    required: false,
  },
  featured: {
    type: Boolean,
    default: false,
    required: true
  },
  slug: {
    type: String, 
    required: true
  },
  elements: [
    {
      id: { type: String, required: true }, 
      type: { type: String, required: true }, 
      content: { type: String, required: true },
      imageUrl: { type: String, required: false },
      style: { type: Object, default: {} }
    },
  ]
})

module.exports = mongoose.model('Posts', blogPostSchema)

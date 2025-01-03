const { lowerCase } = require('lodash')
const mongoose = require('mongoose')

const blogPostSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    unique: true 
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
    required: true,
    unique: true
  },
  status: {
    type: String,
    required: true,
    lowerCase: true,
  },
  elements: [
    {
      id: { type: String, required: true }, 
      type: { type: String, required: true }, 
      content: { type: String, required: true },
      imageUrl: { type: String, required: false },
      listItems: { type: Array, required: false, default: undefined },
      style: { type: Object, default: {} }
    },
  ]
})

module.exports = mongoose.model('Posts', blogPostSchema)

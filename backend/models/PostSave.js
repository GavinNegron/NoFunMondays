const mongoose = require('mongoose')
const { blogDB } = require('../config/db'); 

const blog = blogDB(); 

const blogPostSaveSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    unique: true 
  },
  imageUrl: { 
    type: String,
    required: false,
  },
  slug: {
    type: String, 
    required: true,
    unique: true
  },
  status: {
    type: String,
    required: true,
    default: 'draft'
  },
  elements: [
    {
      id: { type: String, required: true }, 
      type: { type: String, required: true }, 
      content: { type: String, required: true },
      imageUrl: { type: String, required: false },
      listItems: { type: Array, required: false, default: undefined },
      twitterId: { type: String, required: false, default: undefined },
      style: { type: Object, default: {} }
    },
  ]
})

module.exports = blog.model('PostSave', blogPostSaveSchema, 'PostSave');
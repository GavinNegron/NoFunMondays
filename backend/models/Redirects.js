const mongoose = require('mongoose');
const { blogDB } = require('../config/db');

const blog = blogDB();

const redirectSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  redirectSlugs: {
    type: [String], 
    required: true
  }
}, { timestamps: true });

module.exports = blog.model('Redirects', redirectSchema, 'Redirects');
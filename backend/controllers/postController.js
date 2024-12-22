const Posts = require('../models/Posts');
const { Storage } = require('@google-cloud/storage');
require('dotenv').config();
const axios = require('axios');
const { ObjectId } = require('mongoose').Types;
const multer = require('multer');
const storage = new Storage({
    keyFilename: undefined,
    credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/admin-805%40nofunmondays.iam.gserviceaccount.com',
    },
});

const bucketName = "nofunmondays";

// Set up multer for file handling (in-memory storage for image uploads)
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

// Get all posts
const getPosts = async (req, res) => {
  try {
      const posts = await Posts.find().lean();
      res.status(200).json(posts);
  } catch (error) {
      res.status(500).json({ message: `Server Error: \n ${error}` });
  }
};

// Get recent posts with a limit
const getRecentPosts = async (req, res) => {
  try {
      const { limit = 8, excludeFeatured = false } = req.query;
      let postsQuery = Posts.find().sort({ createdAt: -1 }).limit(parseInt(limit)).lean();

      if (excludeFeatured === 'true') {
          const featuredPost = await Posts.findOne({ featured: true }).lean();
          if (featuredPost) {
              postsQuery = postsQuery.where('_id').ne(featuredPost._id); 
          }
      }

      const posts = await postsQuery;
      res.status(200).json(posts);
  } catch (error) {
      res.status(500).json({ message: `Server Error: \n ${error}` });
  }
};

// Get featured post
const getFeaturedPost = async (req, res) => {
    try {
        const featuredPost = await Posts.findOne({ featured: true });
        if (!featuredPost) {
            return res.status(404).json({ message: 'No featured post found.' });
        }
        res.status(200).json(featuredPost);
    } catch (error) {
        res.status(500).json({ message: `Server Error: \n ${error}` });
    }
};

// Set a post as featured
const setFeaturedPost = async (req, res) => {
    try {
        const { postId } = req.params;
        await Posts.updateMany({}, { featured: false });
        await Posts.findByIdAndUpdate(postId, { featured: true });

        const updatedPost = await Posts.findById(postId);
        res.status(200).json(updatedPost);
    } catch(error) {
        res.status(500).json({ message: `Server Error: \n ${error}` });
    }
};

// Create a new post
const setPost = async (req, res) => {
  const { title, description, imageUrl, elements, customCss } = req.body;

  if (!title || !description || !elements || !imageUrl) {
      return res.status(400).json({ error: 'Title, description, elements, and image URL are required' });
  }

  function generateSlug(title) {
      return title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') 
        .replace(/[^a-z0-9-]/g, '')
  }

  try {
      let publicUrl;

      // Handle URL image or file upload
      if (imageUrl.startsWith('http')) {
          const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
          const contentType = response.headers['content-type'];
          const fileName = `images/${Date.now()}-${Math.random().toString(36).substring(7)}`;
          const bucket = storage.bucket(bucketName);
          const file = bucket.file(fileName);

          await file.save(response.data, { metadata: { contentType } });
          publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      } else {
          // Handle base64 encoded image upload
          const buffer = Buffer.from(imageUrl, 'base64');
          const contentType = 'image/jpeg';  // Adjust content type based on the file type
          const fileName = `images/${Date.now()}-${Math.random().toString(36).substring(7)}`;
          const bucket = storage.bucket(bucketName);
          const file = bucket.file(fileName);

          await file.save(buffer, { metadata: { contentType } });
          publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      }

      const post = await Posts.create({
          title,
          description,
          imageUrl: publicUrl,
          slug: generateSlug(title),
          elements,
          customCss: customCss || '', 
      });

      res.status(201).json(post);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Update a post
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description, imageUrl, elements, customCss } = req.body;

  if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
  }

  try {
      const post = await Posts.findById(id);
      if (!post) {
          return res.status(404).json({ message: 'Post not found' });
      }

      const updates = { title, description, elements, customCss: customCss || post.customCss };

      if (imageUrl && imageUrl !== post.imageUrl) {
          const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
          const contentType = response.headers['content-type'];
          const fileName = `images/${Date.now()}-${Math.random().toString(36).substring(7)}`;
          const bucket = storage.bucket(bucketName);
          const file = bucket.file(fileName);

          await file.save(response.data, { metadata: { contentType } });
          updates.imageUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      }

      const updatedPost = await Posts.findByIdAndUpdate(id, updates, { new: true });

      res.status(200).json(updatedPost);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Delete a post
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid post ID' });
        }

        const post = await Posts.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await post.remove();
        return res.status(200).json({ message: 'Post deleted successfully', id });
    } catch (error) {
        return res.status(500).json({ message: `Server Error: \n ${error.message}` });
    }
};

// Delete a post element
const deletePostElement = async (req, res) => {
    const { id, elementId } = req.params

    try {
        const post = await Posts.findById(id)

        if (!post) {
            return res.status(404).json({ message: 'Post not found' })
        }

        post.elements = post.elements.filter(element => element.id !== elementId)
        
        await post.save()

        res.status(200).json({ message: 'Element deleted successfully' })
    } catch (error) {
        console.error('Error deleting post element:', error)
        res.status(500).json({ message: 'Failed to delete element' })
    }
};

// Update a post's image
const updatePostImage = async (req, res) => {
    const { id } = req.params;
    const { imageUrl } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    try {
      const post = await Posts.findById(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      if (imageUrl && imageUrl !== post.imageUrl) {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const contentType = response.headers['content-type'];
        const fileName = `images/${Date.now()}-${Math.random().toString(36).substring(7)}`;
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(fileName);

        await file.save(response.data, { metadata: { contentType } });
        const newImageUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

        post.imageUrl = newImageUrl;
        await post.save();
        return res.status(200).json({ message: 'Image URL updated successfully', imageUrl: newImageUrl });
      }

      res.status(400).json({ message: 'Image URL is the same as the current one' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getRecentPosts, 
    getFeaturedPost, 
    setFeaturedPost, 
    setPost, 
    updatePost, 
    deletePost, 
    deletePostElement,
    getPosts,
    updatePostImage
};

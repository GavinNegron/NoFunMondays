const axios = require('axios');
const Posts = require('../../models/Posts');
const { generateSlug } = require('../../utils/posts/generateSlug');
const { storage, bucketName } = require('../../config/googleCloudStorage');

const createPost = async (req, res) => {
    const { title, imageUrl, status } = req.body;
  
    if (!title || !imageUrl) {
        return res.status(400).json({ error: 'Title and image URL are required' });
    }
  
    try {
        let publicUrl;
        if (imageUrl.startsWith('http')) {
            const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const contentType = response.headers['content-type'];
            const fileName = `images/${Date.now()}-${Math.random().toString(36).substring(7)}`;
            const bucket = storage.bucket(bucketName);
            const file = bucket.file(fileName);
  
            await file.save(response.data, { metadata: { contentType } });
            publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
        } else if (imageUrl.startsWith('data:image/')) {
            const matches = imageUrl.match(/^data:(image\/[a-zA-Z]*);base64,(.*)$/);
            if (!matches) {
                return res.status(400).json({ error: 'Invalid base64 string format' });
            }
            const contentType = matches[1];
            const base64Data = matches[2];
            const buffer = Buffer.from(base64Data, 'base64');
            const fileName = `images/${Date.now()}-${Math.random().toString(36).substring(7)}`;
            const bucket = storage.bucket(bucketName);
            const file = bucket.file(fileName);
  
            await file.save(buffer, { metadata: { contentType } });
            publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
        } else {
            return res.status(400).json({ error: 'Invalid image URL or base64 string' });
        }
  
        const post = await Posts.create({
            title,
            imageUrl: publicUrl,
            slug: generateSlug(title),
            status: status,
        });
  
        res.status(201).json(post);
    } catch (error) {
        if (error.code === 11000) {
            const duplicateField = Object.keys(error.keyPattern).join(', ');
            return res.status(400).json({ error: `${duplicateField} must be unique` });
        }
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
  };
  

module.exports = { createPost };
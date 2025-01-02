const axios = require('axios')
const Posts = require('../../models/Posts');
const { storage, bucketName } = require('../../config/googleCloudStorage');
const { generateSlug } = require('../../utils/posts/generateSlug')
const { ObjectId } = require('mongoose').Types;

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, imageUrl, elements, status } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid post ID' });
  }

  try {
    const post = await Posts.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const updates = { title, elements, status };

    if (imageUrl && imageUrl !== post.imageUrl) {
      let publicUrl;

      if (imageUrl.startsWith('data:image')) {
        const buffer = Buffer.from(imageUrl.split(',')[1], 'base64');
        const contentType = 'image/jpeg';  // Adjust if needed based on the image type
        const fileName = `images/${Date.now()}-${Math.random().toString(36).substring(7)}`;
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(fileName);

        await file.save(buffer, { metadata: { contentType } });
        publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      } else if (imageUrl.startsWith('http')) {  // If it's a URL
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const contentType = response.headers['content-type'];
        const fileName = `images/${Date.now()}-${Math.random().toString(36).substring(7)}`;
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(fileName);

        await file.save(response.data, { metadata: { contentType } });
        publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      }

      updates.imageUrl = publicUrl;
    }

    if (title && title !== post.title) {
      updates.slug = generateSlug(title);
    }
    const updatedPost = await Posts.findByIdAndUpdate(id, updates, { new: true });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { updatePost }
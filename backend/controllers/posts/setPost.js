const axios = require ('axios');
const Posts = require('../../models/Posts');
const { generateSlug } = require('../../utils/posts/generateSlug');
const { storage, bucketName } = require('../../config/googleCloudStorage');
  
const setPost = async (req, res) => {
  const { title, description, imageUrl, elements } = req.body;

  if (!title || !description || !elements || !imageUrl) {
      return res.status(400).json({ error: 'Title, description, elements, and image URL are required' });
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
      } else {
          const buffer = Buffer.from(imageUrl, 'base64');
          const contentType = 'image/jpeg';  
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
          elements
         });

      res.status(201).json(post);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

module.exports = { setPost }
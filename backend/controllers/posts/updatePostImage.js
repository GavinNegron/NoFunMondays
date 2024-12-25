const axios = require ('axios');
const Posts = require('../../models/Posts');
const { storage, bucketName } = require('../../config/googleCloudStorage');
const { ObjectId } = require('mongoose').Types;

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

      post.imageUrl = publicUrl;
      await post.save();

      res.status(200).json({ message: 'Post image updated successfully' });
    } catch (error) {
      res.status(500).json({ message: `Server Error: \n ${error}` });
    }
};

module.exports = { updatePostImage }
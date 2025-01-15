const axios = require('axios');
const Posts = require('../../models/Posts');
const { storage, bucketName } = require('../../config/googleCloudStorage');
const { generateSlug } = require('../../utils/posts/generateSlug');
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
    let publicUrl;

    const saveImageToGoogleCloud = async (imgUrl) => {
      if (imgUrl.startsWith('data:image')) {
        const buffer = Buffer.from(imgUrl.split(',')[1], 'base64');
        const contentType = 'image/jpeg';
        const fileName = `images/${Date.now()}-${Math.random().toString(36).substring(7)}`;
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(fileName);

        await file.save(buffer, { metadata: { contentType } });
        return `https://storage.googleapis.com/${bucketName}/${fileName}`;
      } else if (imgUrl.startsWith('http') && !imgUrl.includes('storage.googleapis.com')) {
        const response = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        const contentType = response.headers['content-type'];
        const fileName = `images/${Date.now()}-${Math.random().toString(36).substring(7)}`;
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(fileName);

        await file.save(response.data, { metadata: { contentType } });
        return `https://storage.googleapis.com/${bucketName}/${fileName}`;
      }
      return imgUrl;
    };

    if (imageUrl && imageUrl !== post.imageUrl) {
      publicUrl = await saveImageToGoogleCloud(imageUrl);
      updates.imageUrl = publicUrl;
    }

    if (elements) {
      for (let element of elements) {
        if (element.type === 'image' && element.imageUrl) {
          const existingElement = post.elements.find(e => e.type === 'image' && e.imageUrl === element.imageUrl);
          if (!existingElement || (existingElement && existingElement.imageUrl !== element.imageUrl)) {
            element.imageUrl = await saveImageToGoogleCloud(element.imageUrl);
          }
        }
      }
      updates.elements = elements;
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

module.exports = { updatePost };

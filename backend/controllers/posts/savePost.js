const PostSave = require('../../models/PostSave');
const { storage, bucketName } = require('../../config/googleCloudStorage');
const { generateSlug } = require('../../utils/posts/generateSlug')
const { ObjectId } = require('mongoose').Types;

const savePost = async (req, res) => {
  const { id } = req.params;
  const { title, imageUrl, elements, status } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid post ID' });
  }

  try {
    let post = await PostSave.findById(id);
    if (!post) {
      post = await PostSave.create({ _id: id, title, elements: [], slug: generateSlug(title) });
    }

    const updates = { title, elements, status };

    if (imageUrl && imageUrl !== post.imageUrl) {
      updates.imageUrl = await imageUrl;
    }

    if (elements && Array.isArray(elements)) {
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].type === 'image' && elements[i].imageUrl.startsWith('data:image')) {
          elements[i].imageUrl = elements[i].imageUrl;
        }
      }
    }

    const updatedPost = await PostSave.findByIdAndUpdate(id, updates, { new: true });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { savePost };
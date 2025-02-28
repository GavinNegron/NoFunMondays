const PostSave = require('../../models/PostSave');
const { storage, bucketName } = require('../../config/googleCloudStorage');
const { generateSlug } = require('../../utils/posts/generateSlug');
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

    const updates = { title, imageUrl, elements, status };

    if (imageUrl && imageUrl.startsWith('data:image')) {
      updates.imageUrl = await processImageUpload(imageUrl);
    }

    if (elements && Array.isArray(elements)) {
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].type === 'image' && elements[i].imageUrl.startsWith('data:image')) {
          elements[i].imageUrl = await processImageUpload(elements[i].imageUrl);
        }
      }
    }

    const updatedPost = await PostSave.findByIdAndUpdate(id, updates, { new: true });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const processImageUpload = async (base64Image) => {
  const buffer = Buffer.from(base64Image.split(',')[1], 'base64');
  const contentType = 'image/jpeg';
  const fileName = `images/${Date.now()}-${Math.random().toString(36).substring(7)}`;
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(fileName);

  await file.save(buffer, { metadata: { contentType } });

  return `https://storage.googleapis.com/${bucketName}/${fileName}`;
};

module.exports = { savePost };

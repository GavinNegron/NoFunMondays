const Post = require('../../models/Posts');
const PostSave = require('../../models/PostSave');
const { storage, bucketName } = require('../../config/googleCloudStorage');
const { generateSlug } = require('../../utils/posts/generateSlug');
const { ObjectId } = require('mongoose').Types;

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, imageUrl, elements, status } = req.body;
  console.log(elements)

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const updates = { title, elements, status, updatedAt: new Date() };

    if (imageUrl && imageUrl !== post.imageUrl) {
      updates.imageUrl = await processImageUpload(imageUrl);
    }

    if (elements && Array.isArray(elements)) {
      for (let i = 0; i < elements.length; i++) {
        if (
          elements[i].type === "image" &&
          elements[i].imageUrl.startsWith("data:image")
        ) {
          elements[i].imageUrl = await processImageUpload(elements[i].imageUrl);
        }
      }
    }

    if (title && title !== post.title) {
      const newSlug = generateSlug(title);
    
      if (newSlug !== post.slug) {
        updates.slug = newSlug;
    
        // Remove any existing redirect that matches the new slug
        const filteredRedirects = post.redirects.filter((redirect) => redirect !== newSlug);
    
        // Only add the old slug if it's not already in the filtered list
        if (!filteredRedirects.includes(post.slug)) {
          filteredRedirects.push(post.slug);
        }
    
        updates.redirects = filteredRedirects;
      }
    }
    

    const updatedPost = await Post.findByIdAndUpdate(id, updates, { new: true });
    await PostSave.updateMany({ postId: id }, { $set: updates });


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

module.exports = { updatePost };

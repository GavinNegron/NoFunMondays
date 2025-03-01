const Post = require('../../models/Posts');
const Redirect = require('../../models/Redirects');
const PostSave = require('../../models/PostSave');
const { storage, bucketName } = require('../../config/googleCloudStorage');
const { generateSlug } = require('../../utils/posts/generateSlug');
const { ObjectId } = require('mongoose').Types;

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, elements, status, featured, challenge, description } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const updates = { title, elements, status, featured, challenge, description, updatedAt: new Date() };

    if (elements && Array.isArray(elements)) {
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].type === "image" && elements[i].imageUrl.startsWith("data:image")) {
          elements[i].imageUrl = await processImageUpload(elements[i].imageUrl);
        }
      }
    }

    if (title && title !== post.title) {
      const existingPostSave = await PostSave.findOne({ title });
      if (existingPostSave && existingPostSave._id.toString() !== id) {
        return res.status(400).json({ message: "Title already exists" });
      }

      const newSlug = generateSlug(title);
      if (newSlug !== post.slug) {
        updates.slug = newSlug;

        const redirect = await Redirect.findOne({ slug: post.slug });

        if (redirect) {
          redirect.redirectSlugs = redirect.redirectSlugs.filter(redirectSlug => redirectSlug !== post.slug);

          redirect.redirectSlugs = redirect.redirectSlugs.filter(redirectSlug => redirectSlug !== newSlug);

          redirect.slug = newSlug;

          if (!redirect.redirectSlugs.includes(post.slug)) {
            redirect.redirectSlugs.push(post.slug);
          }

          await redirect.save();
        } else {
          await Redirect.create({
            slug: newSlug, 
            redirectSlugs: [post.slug] 
          });
        }

        updates.redirects = [post.slug]; 
      }        
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updates, { new: true });

    await PostSave.updateMany(
      { _id: id },
      { $set: updates }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate title error" });
    }
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
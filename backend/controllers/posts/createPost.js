const axios = require('axios');
const Post = require('../../models/Posts');
const { generateSlug } = require('../../utils/posts/generateSlug');
const { storage, bucketName } = require('../../config/googleCloudStorage');

const createPost = async (req, res) => {
    const { title, imageUrl, status } = req.body;

    if (!title || !imageUrl) {
        return res.status(400).json({ error: 'Title and image URL are required' });
    }

    try {
        let publicUrl;
        
        if (!imageUrl.startsWith('http') && !imageUrl.startsWith('data:image/')) {
            return res.status(400).json({ error: 'Invalid image URL or base64 string' });
        }

        if (imageUrl.startsWith('http')) {
            try {
                const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                const contentType = response.headers['content-type'];
                const fileName = `images/${Date.now()}-${Math.random().toString(36).substring(7)}`;
                const bucket = storage.bucket(bucketName);
                const file = bucket.file(fileName);

                await file.save(response.data, { metadata: { contentType } });
                publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
            } catch (error) {
                console.error("Error fetching image from URL:", error);
                return res.status(500).json({ error: 'Failed to fetch image from URL' });
            }
        } 
        
        // Handling base64 image
        else if (imageUrl.startsWith('data:image/')) {
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
        }

        const slug = generateSlug(title);

        const post = await Post.create({
            title,
            imageUrl: publicUrl,
            slug: slug,
            status: status,
        });

        res.status(201).json(post);

    } catch (error) {
        console.error("Error details:", error);
        if (error.code === 11000) {
            const duplicateField = Object.keys(error.keyPattern).join(', ');
            return res.status(400).json({ error: `${duplicateField} must be unique` });
        }
        res.status(500).json({ error: error.message || 'An internal server error occurred' });
    }
};

module.exports = { createPost };
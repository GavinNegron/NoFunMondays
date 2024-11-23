const Posts = require('../models/Posts');
const axios = require('axios');
const { Storage } = require('@google-cloud/storage');
const { googleCloud } = require('../config/config');

const storage = new Storage({
    keyFilename: googleCloud.keyFilename,
    projectId: googleCloud.projectId,
});

const bucketName = googleCloud.bucketName;




// getPosts()
const getPosts = async (req, res) => {
    try {
        const posts = await Posts.find();

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: `Server Error: \n ${error}` });
    }
};

// getRecentPost()
const getRecentPosts = async (req, res) => {
    try {
        const { limit = 8 } = req.query;
        const featuredPost = await Posts.findOne({ featured: true });

        const posts = await Posts.find({ _id: { $ne: featuredPost?._id }})
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .lean();

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: `Server Error: \n ${error}` });
    }
};

// getFeaturedPost()
const getFeaturedPost = async (req, res) => {
    try {
        const featuredPost = await Posts.findOne({ featured: true });
        if (!featuredPost) {
            return res.status(404).json({ message: 'No featured post found.' });
        }
        res.status(200).json(featuredPost);
    } catch (error) {
        res.status(500).json({ message: `Server Error: \n ${error}` });
    }
};

// setFeaturedPost()
const setFeaturedPost = async (req, res) => {
    try {
        const { postId } = req.params;
        // Set all other posts labeled as featured to false
        await Posts.updateMany({}, { featured: false });

        // Set selected post as featured
        await Posts.findByIdAndUpdate(postId, { featured: true });
        
        //Respond with the update post
        const updatedPost = await Posts.findById(postId);
        res.status(200).json(updatedPost);
    } catch(error) {
        res.status(500).json({ message: `Server Error: \n ${error}` });
    }
}

// setPost()
const setPost = async (req, res) => {
    const { title, description, imageUrl } = req.body;

    if (!imageUrl) {
        return res.status(400).json({ error: 'Image URL is required' });
    }

    try {
        // Fetch the image from the provided URL
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        // Extract the content type of the image
        const contentType = response.headers['content-type'];

        // Generate a unique file name for the image
        const fileName = `images/${Date.now()}-${Math.random().toString(36).substring(7)}`;

        // Upload the image to Google Cloud Storage
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(fileName);

        await file.save(response.data, {
            metadata: { contentType },
        });

        // Construct the public URL of the uploaded image
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

        // Save the post to the database
        const post = await Posts.create({
            title,
            description,
            imageUrl: publicUrl, // Use the URL from Google Cloud Storage
        });

        res.status(201).json(post);
    } catch (error) {
        console.error('Error handling image:', error.message);
        res.status(500).json({ error: 'Unable to process image' });
    }
}

// updatePost()
const updatePost = async (req, res) => {
    res.status(200).json({ 
        message: 'Test Update'
    })
}

// deletePost()
const deletePost = async (req, res) => {
    try {
        const posts = await Posts.findById(req.params.id)
        if(!posts) {
            res.status(400)
            throw new Error('Post not found');
        }
        await posts.remove()
    } catch(error) {
        res.status(500).json({ message: `Server Error: \n ${error}`});
    }
    res.status(200).json({ id: req.params.id });
}

module.exports = {
    getRecentPosts, 
    getFeaturedPost, 
    setFeaturedPost, 
    setPost, 
    updatePost, 
    deletePost, 
    getPosts,
}
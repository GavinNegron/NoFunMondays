const Posts = require('../models/Posts');
const axios = require('axios');

// getRecentPost()
const getRecentPost = async (req, res) => {
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
        console.log(postId)
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
        // Fetch the image from the URL (this is the important part)
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        // Extract the image content type (e.g., image/png, image/jpeg)
        const contentType = response.headers['content-type'];

        // Create a new post with the image data
        const post = await Posts.create({
            title,
            description,
            imageUrl,  // Save the original URL
            imgData: Buffer.from(response.data),  // Save the binary image data in MongoDB
            imgContentType: contentType  // Save the MIME type
        });

        res.status(201).json(post);  // Respond with the created post
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

// getImage()
const getImage = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post || !post.imgData) {
            return res.status(404).json({ error: 'Image not found' });
        }

        res.set('Content-Type', post.imgContentType); // Set the correct MIME type
        res.send(post.imgData); // Send the image data as a response
    } catch (error) {
        console.error('Error fetching image:', error.message);
        res.status(500).json({ error: 'Unable to fetch image' });
    }
}

module.exports = {
    getRecentPost, 
    getFeaturedPost, 
    setFeaturedPost, 
    setPost, 
    updatePost, 
    deletePost, 
    getImage,
}
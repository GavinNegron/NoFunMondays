const Posts = require('../models/Posts')

// getRecentPost()
const getRecentPost = async (req, res) => {
    try {
        const posts = await Posts.find()
            .sort({ createdAt: -1 }) 
            .limit(8);

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
    try {
        const { title, description, imageUrl } = req.body;
        const posts = await Posts.create({
            title,
        description,
        imageUrl,
        }) 
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: `Server Error: \n ${error}`});
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
    getRecentPost, 
    getFeaturedPost, 
    setFeaturedPost, 
    setPost, 
    updatePost, 
    deletePost
}
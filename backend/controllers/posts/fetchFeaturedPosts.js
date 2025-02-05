const Posts = require('../../models/Posts');

const getFeaturedPosts = async (req, res) => {
    try {
        const featuredPost = await Posts.findOne({ featured: true });
        if (!featuredPost) {
            return res.status(204).json({ message: 'No featured post found.' });
        }
        res.status(200).json(featuredPost);
    } catch (error) {
        res.status(500).json({ message: `Server Error: \n ${error}` });
    }
};

module.exports = { getFeaturedPosts }
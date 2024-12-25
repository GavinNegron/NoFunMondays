const Posts = require('../../models/Posts');

const setFeaturedPost = async (req, res) => {
    try {
        const { postId } = req.params;
        await Posts.updateMany({}, { featured: false });
        await Posts.findByIdAndUpdate(postId, { featured: true });

        const updatedPost = await Posts.findById(postId);
        res.status(200).json(updatedPost);
    } catch(error) {
        res.status(500).json({ message: `Server Error: \n ${error}` });
    }
};

module.exports = { setFeaturedPost }
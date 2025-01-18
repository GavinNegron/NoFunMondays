const Post = require('../../models/Posts'); 

const findTitle = async (req, res) => {
    const { title } = req.query;

    try {
        const existingPost = await Post.findOne({ title });

        if (existingPost) {
            return res.status(200).json({ available: false });
        }

        return res.status(200).json({ available: true }); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error checking title availability' });
    }
};

module.exports = { findTitle };
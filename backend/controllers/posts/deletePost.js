const Posts = require('../../models/Posts');
const PageView = require('../../models/PageView');
const { ObjectId } = require('mongoose').Types;

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid post ID' });
        }

        const post = await Posts.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Delete Post & Any views from PageView
        await Posts.deleteOne({ _id: id });
        await PageView.deleteMany({ postSlug: post.slug });

        return res.status(200).json({ message: 'Post and associated page views deleted successfully', id });
    } catch (error) {
        return res.status(500).json({ message: `Server Error: \n ${error.message}` });
    }
};

module.exports = { deletePost };
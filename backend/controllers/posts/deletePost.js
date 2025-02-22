const Posts = require('../../models/Posts');
const PostSave = require('../../models/PostSave');
const PageView = require('../../models/PageView');
const { ObjectId } = require('mongoose').Types;

const deletePost = async (req, res) => {
    try {
        const { ids } = req.body; 

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: 'Invalid post ID(s)' });
        }

        const validIds = ids.filter(ObjectId.isValid);
        if (validIds.length === 0) {
            return res.status(400).json({ message: 'Invalid post ID(s)' });
        }

        const posts = await Posts.find({ _id: { $in: validIds } });
        const savedPosts = await PostSave.find({ _id: { $in: validIds } });

        if (posts.length === 0 && savedPosts.length === 0) {
            return res.status(404).json({ message: 'No posts found' });
        }

        await Posts.deleteMany({ _id: { $in: validIds } });
        await PostSave.deleteMany({ _id: { $in: validIds } });
        await PageView.deleteMany({ postSlug: { $in: posts.map(post => post.slug) } });

        return res.status(200).json({ message: 'Posts and associated page views deleted successfully', ids: validIds });
    } catch (error) {
        return res.status(500).json({ message: `Server Error: \n ${error.message}` });
    }
};

module.exports = { deletePost };
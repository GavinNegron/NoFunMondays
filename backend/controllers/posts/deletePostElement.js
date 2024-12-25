const Posts = require('../../models/Posts');

const deletePostElement = async (req, res) => {
    const { id, elementId } = req.params

    try {
        const post = await Posts.findById(id)

        if (!post) {
            return res.status(404).json({ message: 'Post not found' })
        }

        post.elements = post.elements.filter(element => element.id !== elementId)
        
        await post.save()

        res.status(200).json({ message: 'Element deleted successfully' })
    } catch (error) {
        console.error('Error deleting post element:', error)
        res.status(500).json({ message: 'Failed to delete element' })
    }
};

module.exports = { deletePostElement }
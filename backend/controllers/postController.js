const Posts = require('../models/Posts')
const ErrorResponse = require('../utils/errorResponse');

const getPost = async (req, res) => {
    try {
        const posts = await Posts.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: `Server Error: \n ${error}` });
    }
};
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

const updatePost = async (req, res) => {
    res.status(200).json({ 
        message: 'Test Update'
    })
}

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
    getPost, setPost, updatePost, deletePost
}
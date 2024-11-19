const Posts = require('../../models/Posts');
const { getPost, setPost, updatePost, deletePost } = require('../../controllers/postController')

module.exports = function(app){
    app.get('/api/posts/', getPost)

    app.post('/api/posts/', setPost)

    app.put('/api/posts/:id', updatePost)

    app.delete('/api/posts/:id', deletePost)
};
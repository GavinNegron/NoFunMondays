const Posts = require('../../models/Posts');
const { getRecentPost, getFeaturedPost, setFeaturedPost, setPost, updatePost, deletePost, getImage } = require('../../controllers/postController')

module.exports = function(app){
    app.get('/api/posts/', getRecentPost)
    
    app.get('/api/posts/featured', getFeaturedPost);

    app.put('/api/posts/featured/:postId', setFeaturedPost)

    app.post('/api/posts/', setPost)

    app.put('/api/posts/:id', updatePost)

    app.delete('/api/posts/:id', deletePost)

    app.get('/api/posts/:id/image', getImage)
};
const Posts = require('../../models/Posts');
const { getRecentPosts, getFeaturedPost, setFeaturedPost, setPost, updatePost, deletePost, deletePostElement, getPosts, updatePostImage} = require('../../controllers/postController')

module.exports = function(app){
    app.get('/api/posts/', getPosts)

    app.get('/api/posts/recent', getRecentPosts)
    
    app.get('/api/posts/featured', getFeaturedPost);

    app.put('/api/posts/featured/:postId', setFeaturedPost)

    app.post('/api/posts/', setPost)

    app.put('/api/posts/:id', updatePost)

    app.delete('/api/posts/:id', deletePost)

    app.delete('/api/posts/:id/elements/:elementId', deletePostElement)

    app.patch('/api/posts/:id/image', updatePostImage)
};
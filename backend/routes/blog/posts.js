const { getPosts } = require('../../controllers/posts/getPosts');
const { getRecentPosts } = require('../../controllers/posts/getRecentPosts');
const { getFeaturedPosts } = require('../../controllers/posts/getFeaturedPosts');
const { setFeaturedPost } = require('../../controllers/posts/setFeaturedPost');
const { setPost } = require('../../controllers/posts/setPost');
const { updatePost } = require('../../controllers/posts/updatePost');
const { deletePost } = require('../../controllers/posts/deletePost');
const { deletePostElement } = require('../../controllers/posts/deletePostElement');
const { updatePostImage } = require('../../controllers/posts/updatePostImage');

module.exports = function(app){
    
    app.get('/api/posts/', getPosts)

    app.get('/api/posts/recent', getRecentPosts)
    
    app.get('/api/posts/featured', getFeaturedPosts);

    app.put('/api/posts/featured/:postId', setFeaturedPost)

    app.post('/api/posts/', setPost)

    app.put('/api/posts/:id', updatePost)

    app.delete('/api/posts/:id', deletePost)

    app.delete('/api/posts/:id/elements/:elementId', deletePostElement)

    app.patch('/api/posts/:id/image', updatePostImage)
};
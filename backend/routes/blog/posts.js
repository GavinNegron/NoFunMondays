const { getPosts } = require('../../controllers/posts/getPosts');
const { getRecentPosts } = require('../../controllers/posts/getRecentPosts');
const { getFeaturedPosts } = require('../../controllers/posts/getFeaturedPosts');
const { setFeaturedPost } = require('../../controllers/posts/setFeaturedPost');
const { createPost } = require('../../controllers/posts/createPost');
const { updatePost } = require('../../controllers/posts/updatePost');
const { deletePost } = require('../../controllers/posts/deletePost');
const { deletePostElement } = require('../../controllers/posts/deletePostElement');
const { updatePostImage } = require('../../controllers/posts/updatePostImage');
const { findTitle } = require('../../controllers/posts/findTitle');
const { fetchSlug } = require('../../controllers/posts/fetchSlug');

module.exports = function(app){
    
    app.get('/api/posts/', getPosts)

    app.get('/api/posts/recent', getRecentPosts)
    
    app.get('/api/posts/featured', getFeaturedPosts);

    app.put('/api/posts/featured/:postId', setFeaturedPost)

    app.post('/api/posts/', createPost)

    app.put('/api/posts/:id', updatePost)

    app.delete('/api/posts/:id', deletePost)

    app.delete('/api/posts/:id/elements/:elementId', deletePostElement)

    app.patch('/api/posts/:id/image', updatePostImage)

    app.get('/api/posts/title', findTitle)
    
    app.get('/api/posts/slug/:slug', fetchSlug)
};
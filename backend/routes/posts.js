
const authenticate = require('../middleware/setAuthHeader')

const { getPosts } = require('../controllers/posts/fetchPosts');
const { getRecentPosts } = require('../controllers/posts/fetchRecentPosts');
const { getFeaturedPosts } = require('../controllers/posts/fetchFeaturedPosts');
const { setFeaturedPost } = require('../controllers/posts/setFeaturedPost');
const { createPost } = require('../controllers/posts/createPost');
const { updatePost } = require('../controllers/posts/updatePost');
const { deletePost } = require('../controllers/posts/deletePost');
const { deletePostElement } = require('../controllers/posts/deletePostElement');
const { findTitle } = require('../controllers/posts/fetchTitle');
const { fetchSlug } = require('../controllers/posts/fetchSlug');

module.exports = function(app){
    app.get('/api/posts/', getPosts)

    app.get('/api/posts/recent', getRecentPosts)
    
    app.get('/api/posts/featured', getFeaturedPosts);

    app.get('/api/posts/slug/:slug', fetchSlug)

    app.get('/api/posts/title', findTitle)

    app.post('/api/posts/', authenticate, createPost)

    app.put('/api/posts/featured/:postId', authenticate, setFeaturedPost)

    app.put('/api/posts/:id', authenticate, updatePost)

    app.delete('/api/posts/:id', authenticate, deletePost)

    app.delete('/api/posts/:id/elements/:elementId', authenticate, deletePostElement)

};
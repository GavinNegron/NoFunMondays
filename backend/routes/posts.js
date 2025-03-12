
const { getPosts } = require('../controllers/posts/fetchPosts');
const { getRecentPosts } = require('../controllers/posts/fetchRecentPosts');
const { setFeaturedPost } = require('../controllers/posts/setFeaturedPost');
const { createPost } = require('../controllers/posts/createPost');
const { savePost } = require('../controllers/posts/savePost');
const { signedUrl } = require('../controllers/posts/signedUrl');
const { updatePost } = require('../controllers/posts/updatePost');
const { deletePost } = require('../controllers/posts/deletePost');
const { deletePostElement } = require('../controllers/posts/deletePostElement');
const { fetchTitle } = require('../controllers/posts/fetchTitle');
const { fetchSlug } = require('../controllers/posts/fetchSlug');
const { fetchSlugAdmin } = require('../controllers/posts/fetchSlugAdmin');
const { fetchPostViews } = require('../controllers/analytics/fetchPostViews');
const { getRedirect } = require('../controllers/posts/getRedirect');

const { verifyToken } = require('../middleware/verifyToken');

module.exports = function(app){
    // PUBLIC ROUTES
    app.get('/api/posts/recent', getRecentPosts);
    
    app.get('/api/posts/slug/:slug', fetchSlug);

    app.get('/api/posts/title', fetchTitle);

    app.get('/api/posts/redirects/:slug', getRedirect);


    // PROTECTED ROUTES
    app.get('/api/posts/', verifyToken, getPosts);

    app.get('/api/posts/edit/slug/:slug', verifyToken, fetchSlugAdmin);

    app.post('/api/posts/', verifyToken, createPost);

    app.put('/api/posts/featured/:postId', verifyToken, setFeaturedPost);

    app.put('/api/posts/:id', verifyToken, updatePost);

    app.put('/api/posts/save/:id', verifyToken, savePost);
    
    app.get('/api/upload/signed-url', verifyToken, signedUrl);

    app.delete('/api/posts/',  deletePost);

    app.delete('/api/posts/:id/elements/:elementId', verifyToken, deletePostElement);

    app.get('/api/posts/analytics/views/', verifyToken, fetchPostViews);
};
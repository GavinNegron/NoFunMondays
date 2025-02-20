
const { getPosts } = require('../controllers/posts/fetchPosts');
const { getRecentPosts } = require('../controllers/posts/fetchRecentPosts');
const { setFeaturedPost } = require('../controllers/posts/setFeaturedPost');
const { createPost } = require('../controllers/posts/createPost');
const { savePost } = require('../controllers/posts/savePost');
const { updatePost } = require('../controllers/posts/updatePost');
const { deletePost } = require('../controllers/posts/deletePost');
const { deletePostElement } = require('../controllers/posts/deletePostElement');
const { fetchTitle } = require('../controllers/posts/fetchTitle');
const { fetchSlug } = require('../controllers/posts/fetchSlug');
const { fetchSlugAdmin } = require('../controllers/posts/fetchSlugAdmin');
const { fetchPostViews } = require('../controllers/analytics/fetchPostViews');

const passport = require('passport');
const setAuthHeader = require('../middleware/setAuthHeader');
const { accessTokenAutoRefresh } = require('../middleware/accessTokenAutoRefresh');

module.exports = function(app){

    // PUBLIC ROUTES

    app.get('/api/posts/recent', getRecentPosts)
    
    app.get('/api/posts/slug/:slug', fetchSlug)

    app.get('/api/posts/title', fetchTitle)

    // PROTECTED ROUTES
    app.get('/api/posts/', accessTokenAutoRefresh, setAuthHeader, passport.authenticate('jwt', { session: false }), getPosts)

    app.get('/api/posts/edit/slug/:slug', fetchSlugAdmin)

    app.post('/api/posts/', accessTokenAutoRefresh, setAuthHeader, passport.authenticate('jwt', { session: false }), createPost)

    app.put('/api/posts/featured/:postId', accessTokenAutoRefresh, setAuthHeader, passport.authenticate('jwt', { session: false }), setFeaturedPost)

    app.put('/api/posts/:id', accessTokenAutoRefresh, setAuthHeader, passport.authenticate('jwt', { session: false }), updatePost)

    app.put('/api/posts/save/:id', accessTokenAutoRefresh, setAuthHeader, passport.authenticate('jwt', { session: false }), savePost)

    app.delete('/api/posts/:id', accessTokenAutoRefresh, setAuthHeader, passport.authenticate('jwt', { session: false }), deletePost)

    app.delete('/api/posts/:id/elements/:elementId', accessTokenAutoRefresh, setAuthHeader, passport.authenticate('jwt', { session: false }), deletePostElement)

    app.get('/api/posts/analytics/views/', accessTokenAutoRefresh, setAuthHeader, passport.authenticate('jwt', { session: false }), fetchPostViews)
};
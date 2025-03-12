const { pageViews } = require('../controllers/public/pageViews');
const { contactForm } = require('../controllers/public/contactForm');

const { contactLimiter } = require('../config/rate-limits');

module.exports = function(app) {
    app.post('/api/public/page-views/', pageViews);

    app.post('/api/public/contact/', contactLimiter, contactForm);
};

const { fetchMessages } = require('../controllers/admin/fetchMessages');
const { addEmail } = require('../controllers/admin/addEmail');

const { verifyToken } = require('../middleware/verifyToken');

module.exports = function(app){
    app.get('/api/admin/messages', verifyToken, fetchMessages);

    app.post('/api/admin/email/', verifyToken, addEmail);
};
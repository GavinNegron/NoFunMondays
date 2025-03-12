const { userLogin } = require('../controllers/user/userLogin');

module.exports = function(app){
      app.post('/api/user/login/', userLogin);
};
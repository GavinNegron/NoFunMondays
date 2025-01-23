const { login } = require('../../controllers/auth/login');
const { register } = require('../../controllers/auth/register');

module.exports = function(app){
      app.post('/api/login/', login)

      app.post('/api/register/', register)
};
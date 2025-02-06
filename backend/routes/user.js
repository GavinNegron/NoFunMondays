const { userLogin } = require('../controllers/user/userLogin');
const { userRegister } = require('../controllers/user/userRegister');
const { verifyEmail } = require('../controllers/user/verifyEmail');
const { refreshToken } = require('../controllers/user/refreshToken');
const { userProfile } = require('../controllers/user/userProfile');
const { changeUserPassword } = require('../controllers/user/changeUserPassword');
const { userLogout } = require('../controllers/user/userLogout');
const { userPasswordResetEmail } = require('../controllers/user/userPasswordResetEmail');
const { userPasswordReset } = require('../controllers/user/userPasswordReset');
const { pageViews } = require('../controllers/views/page-views');

const passport = require('passport');
const setAuthHeader = require('../middleware/setAuthHeader');
const { accessTokenAutoRefresh } = require('../middleware/accessTokenAutoRefresh');

module.exports = function(app){
      
      // PUBLIC ROUTES
      app.post('/api/auth/user/login/', userLogin);

      app.post('/api/auth/user/register/', userRegister);

      app.post('/api/auth/user/verifiy-email/', verifyEmail);

      app.post('/api/auth/user/refresh-token/', refreshToken);

      app.post('/api/auth/user/reset-password-link/', userPasswordResetEmail);
      
      app.post('/api/auth/user/reset-password/:id/:token', userPasswordReset);

      app.get('/api/page-views/', pageViews);

      // PROTECTED ROUTES
      app.get('/api/user/profile/', accessTokenAutoRefresh, setAuthHeader, passport.authenticate('jwt', { session: false }), userProfile);

      app.post('/api/user/change-password/', accessTokenAutoRefresh, setAuthHeader, passport.authenticate('jwt', { session: false }), changeUserPassword);

      app.post('/api/user/logout/', accessTokenAutoRefresh, setAuthHeader, passport.authenticate('jwt', { session: false }), userLogout);
};
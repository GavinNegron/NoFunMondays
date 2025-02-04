const { fetchTasks } = require('../controllers/tasks/fetchTasks');
const { createTask } = require('../controllers/tasks/createTask');
const { updateTask } = require('../controllers/tasks/updateTask');

const passport = require('passport');
const setAuthHeader = require('../middleware/setAuthHeader');
const { accessTokenAutoRefresh } = require('../middleware/accessTokenAutoRefresh');

module.exports = function(app){
    app.get('/api/tasks/', fetchTasks)

    app.post('/api/tasks/', accessTokenAutoRefresh, setAuthHeader, passport.authenticate('jwt', { session: false }), createTask)

    app.put('/api/tasks/:taskId', accessTokenAutoRefresh, setAuthHeader, passport.authenticate('jwt', { session: false }), updateTask)
};
const { fetchTasks } = require('../controllers/tasks/fetchTasks');
const { createTask } = require('../controllers/tasks/createTask');
const { updateTask } = require('../controllers/tasks/updateTask');

module.exports = function(app){
    app.get('/api/tasks/', fetchTasks)

    app.post('/api/tasks/', createTask)

    app.put('/api/tasks/:taskId', updateTask)
};
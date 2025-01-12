const { getTasks } = require('../../controllers/tasks/getTasks');
const { createTask } = require('../../controllers/tasks/createTask');

module.exports = function(app){
    app.get('/api/tasks/', getTasks)

    app.post('/api/tasks/', createTask)
};
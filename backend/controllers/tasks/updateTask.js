const Task = require('../../models/Tasks');

const updateTask = async (req, res) => {
    const { taskId, taskStatus } = req.body;
  
    if (!taskId || !taskStatus) {
      return res.status(400).json({ message: 'Task ID and status are required' });
    }
    
    try {
      const task = await Task.findByIdAndUpdate(
        taskId,
        { status: taskStatus },
      );
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.json(task); 
    } catch (error) {
      res.status(500).json({ message: 'Error updating task status' });
    }
};

module.exports = { updateTask };
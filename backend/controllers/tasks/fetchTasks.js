const Tasks = require('../../models/Tasks');

const fetchTasks = async (req, res) => {
  const { taskLimit } = req.query;
  try {
    const limit = taskLimit ? parseInt(taskLimit, 10) : undefined; 
    const result = await Tasks.find().limit(limit).lean(); 
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: `Server Error: \n ${error}` });
  }
};

module.exports = { fetchTasks };
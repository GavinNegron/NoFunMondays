const Tasks = require('../../models/Tasks');

const getTasks = async (req, res) => {
  try {
      const result = await Tasks.find().lean();
      res.status(200).json(result);
  } catch (error) {
      res.status(500).json({ message: `Server Error: \n ${error}` });
  }
};

module.exports = { getTasks };
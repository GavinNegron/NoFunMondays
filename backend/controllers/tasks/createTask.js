const Tasks = require('../../models/Tasks');

const createTask = async (req, res) => {
    const { content, tag, status } = req.body;

    if (!content || !tag || !status) {
        return res.status(400).json({ error: 'Content, tag and status are required' });
    }
  
    try {
        const task = await Tasks.create({
            content: content,
            tag: tag,
            status,
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: 'An internal server error occurred' });
    }
};

module.exports = { createTask };
const Email = require('../../models/Email');

const addEmail = async (req, res) => {
    try {
        const { from, subject, body, date } = req.body;
        
        await Email.create({ from, subject, body, date });
        res.json({ message: "Email stored successfully." });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports = { addEmail }
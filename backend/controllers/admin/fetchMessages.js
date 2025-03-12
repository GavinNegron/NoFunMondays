const Contact = require('../../models/Contact');
const CryptoJS = require('crypto-js');

const fetchMessages = async (req, res) => {
    const { limit = 6 } = req.query;
    try {
        const messages = await Contact.find({}).sort({ createdAt: -1 }).limit(limit);
        const decryted = messages.map(message => ({
            ...message._doc,
            email: CryptoJS.AES.decrypt(message.email, process.env.ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8),
        }));

        res.json(decryted);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

module.exports = { fetchMessages };
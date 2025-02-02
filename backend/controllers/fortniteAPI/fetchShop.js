const axios = require('axios');

const fetchShop = async (req, res) => {
    try {
        const response = await axios.get('https://fortnite-api.com/v2/shop');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch item shop', error });
    }
};

module.exports = { fetchShop };
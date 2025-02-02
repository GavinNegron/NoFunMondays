
const { fetchShop } = require('../controllers/fortniteAPI/fetchShop');

module.exports = function(app){
    app.get('/api/fortniteAPI/item-shop/', fetchShop)
};
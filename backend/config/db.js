const mongoose = require('mongoose');
require('dotenv').config();

// Add the strictQuery setting before the connection
mongoose.set('strictQuery', true);

const dbConn = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process if connection fails
    }
};

module.exports = dbConn;
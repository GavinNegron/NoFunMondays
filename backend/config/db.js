const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', true);

const connectToDatabase = (dbUrl, dbName) => {
    const connection = mongoose.createConnection(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    connection.on('error', (err) => {
        console.error(`ERROR connecting to ${dbName}: ${err}`);
    });

    return connection;
};

    const blogDB = () => connectToDatabase(process.env.DB_CONNECT_BLOG, 'Blog Database');
    const adminDB = () => connectToDatabase(process.env.DB_CONNECT_ADMIN, 'Admin Database');

module.exports = {
    blogDB,
    adminDB,
};
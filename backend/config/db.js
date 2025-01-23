const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', true);

const connectToDatabase = (dbUrl, dbName) => {
    const connection = mongoose.createConnection(dbUrl);

    connection.on('error', (err) => {
        console.error(`ERROR connecting to ${dbName}: ${err}`);
    });

    return connection;
};

    const blogDB = () => connectToDatabase(process.env.DB_CONNECT_BLOG, 'Blog Database');
    const dashboardDB = () => connectToDatabase(process.env.DB_CONNECT_DASHBOARD, 'DASHBOARD Database');
    const logDB = () => connectToDatabase(process.env.DB_CONNECT_LOGS, 'Log Database');

module.exports = {
    blogDB,
    dashboardDB,
    logDB,
};
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

    const blogDB = () => connectToDatabase(`${process.env.MONGO_URI}/blog`, 'Blog Database');
    const dashboardDB = () => connectToDatabase(`${process.env.MONGO_URI}/dashboard`, 'Dashboard Database');
    const logDB = () => connectToDatabase(`${process.env.MONGO_URI}/logs`, 'Logs Database');
    const userDB = () => connectToDatabase(`${process.env.MONGO_URI}/users`, 'Users Database');

module.exports = {
    blogDB,
    dashboardDB,
    logDB,
    userDB
};
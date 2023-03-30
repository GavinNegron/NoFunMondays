const mongoose = require('mongoose');

const dbConn = async() => {
    await mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
}

module.exports = dbConn;
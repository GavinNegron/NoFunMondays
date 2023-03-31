require('dotenv').config();
const express = require('express');
const app = express();
const dbConn = require('./src/config/db');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');

// Mongoose Connection
dbConn();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('Public'));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "public/views"));
app.disable('x-powered-by');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

// Route Handler
async function routeHandler(folderName) {
    const files = await fs.promises.readdir(folderName);
    for (const file of files) {
        const fullName = path.join(folderName, file);
        const stat = await fs.promises.lstat(fullName);
        if (stat.isDirectory()) {
            await routeHandler(fullName);
        } else if (file.toLowerCase().endsWith('.js')) {
            require(path.join(__dirname, fullName))(app);
        }
    }
}
routeHandler('./src/routes');

// Error Handler (404)


const port = process.env.PORT;
// Connect to server
const server = app.listen(port || 2001, () =>
    console.log(`Server Up and running on port ${port}`)
);

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err}`);
    server.close(() => process.exit(1));
});

module.exports = app;

require('dotenv').config();
const express = require('express');
const app = express();
const dbConn = require('./config/db');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const cors = require('cors');

// Mongoose Connection
dbConn();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('Public')); // For public assets like images, styles, etc.
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "public/views"));
app.disable('x-powered-by');

// Serve React build directory for static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/build')));  // Adjust if your React app's build directory is different
}

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

// CORS setup
app.use(cors({
    origin: 'http://localhost:3000', // Allow the frontend on port 3000
    methods: ['GET', 'POST'],       // Allow specific methods
    allowedHeaders: ['Content-Type'], // Allow certain headers
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
            require(fullName)(app);
        }
    }
}
routeHandler(path.join(__dirname, '/routes'));

// Fallback route to serve React's index.html for SPA
app.get('*', (req, res) => {
    if (process.env.NODE_ENV === 'production') {
        res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));  // Ensure correct path to your React app's build
    } else {
        res.send('App is running, but React frontend is not built yet.');
    }
});

const port = process.env.PORT || 2001;
// Connect to server
const server = app.listen(port, () =>
    console.log(`Server Up and running on port ${port}`),
    console.log(`Open website: http://localhost:${port}`)
);

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err}`);
    server.close(() => process.exit(1));
});

module.exports = app;

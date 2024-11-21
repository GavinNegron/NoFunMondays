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
app.use(express.static('Public'));  // Serve any public files from 'Public' folder

// Set up for serving the React app's static files after build
app.use(express.static(path.join(__dirname, 'build')));  // Serve the React static build files

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "public/views"));
app.disable('x-powered-by');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

// Enable CORS for the frontend (React) on port 3000 during development
app.use(cors({
    origin: 'http://localhost:3000', // Allow the frontend on port 3000 during dev
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

// Serve routes (for API)
async function routeHandler(folderName) {
    const files = await fs.promises.readdir(folderName);
    for (const file of files) {
        const fullName = path.join(folderName, file);
        const stat = await fs.promises.lstat(fullName);
        if (stat.isDirectory()) {
            await routeHandler(fullName);
        } else if (file.toLowerCase().endsWith('.js')) {
            require(fullName)(app); // Include the route file
        }
    }
}

// Dynamically import routes (in '/routes' folder)
routeHandler(path.join(__dirname, '/routes'));

// Handle all other routes (for React Router)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));  // Serve the React index.html for all unmatched routes
});

const port = process.env.PORT || 2001;
// Connect to the server
const server = app.listen(port, () =>
    console.log(`Server up and running on port ${port}`),
    console.log(`Open website: http://localhost:${port}`)
);

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err}`);
    server.close(() => process.exit(1));
});

module.exports = app;
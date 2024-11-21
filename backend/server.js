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
// Ensure the React build folder is correctly placed after running 'npm run build' in the frontend directory
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));  // Serve the React static build files

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "public/views"));
app.disable('x-powered-by');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
<<<<<<< HEAD
<<<<<<< HEAD

// Enable CORS for the frontend (React) on port 3000 during development
=======
>>>>>>> parent of fb91f89 (Updated featured post to not show up in recent posts)
=======
>>>>>>> parent of fb91f89 (Updated featured post to not show up in recent posts)
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
// This serves the index.html file for all unmatched routes, ensuring that React's routing works
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));  // Corrected path to serve the React index.html
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

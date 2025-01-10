const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const dbConn = require('./config/db');

const app = express();

// Mongoose Connection
dbConn();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' })) 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })) 
app.use(express.json());
app.use(express.static('Public'));
app.use('/images', express.static(path.join(__dirname, 'public/images'))); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/views'));

app.disable('x-powered-by');
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
);

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'], 
        allowedHeaders: ['Content-Type'], 
    })
);

const reactBuildPath = path.join(__dirname, '../frontend/build');
app.use(express.static(reactBuildPath));

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

app.get(/^(?!\/api\/).*/, (req, res) => {
    res.sendFile(path.join(reactBuildPath, 'index.html'));
});

const port = process.env.PORT || 2001;
const server = app.listen(port, () => {
    console.log(`Server Up and running on port ${port}`);
    console.log(`Open website: http://localhost:${port}`);
});

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err}`);
    server.close(() => process.exit(1));
});

module.exports = app;

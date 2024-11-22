const express = require('express');
const axios = require('axios'); // For HTTP requests
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
app.use(express.json());
app.use(express.static('Public'));
app.use('/images', express.static(path.join(__dirname, 'public/images'))); // Serve images
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
        origin: 'http://localhost:3000', // Allow the frontend on port 3000
        methods: ['GET', 'POST'], // Allow specific methods
        allowedHeaders: ['Content-Type'], // Allow certain headers
    })
);

// Serve static files from the React frontend build directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Proxy Image and Store Route
app.post('/api/posts', async (req, res) => {
    const { imageUrl, ...postData } = req.body;

    if (!imageUrl) {
        return res.status(400).json({ error: 'Image URL is required' });
    }

    try {
        // Fetch the image from the external URL
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        // Define a path to store the image
        const fileName = `image-${Date.now()}.png`; // Adjust extension based on content type
        const filePath = path.join(__dirname, 'public/images', fileName);

        // Save the image locally
        fs.writeFileSync(filePath, response.data);

        // Generate the URL for the stored image
        const proxiedImageUrl = `/images/${fileName}`; // Adjust based on your static file path

        // Save the post data to the database (with the new image URL)
        const post = new Post({
            ...postData,
            imageUrl: proxiedImageUrl, // Replace the original image URL
        });
        await post.save();

        // Respond with the new post
        res.status(201).json(post);
    } catch (error) {
        console.error('Error handling image:', error.message);
        res.status(500).json({ error: 'Unable to process image' });
    }
});

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


const port = process.env.PORT || 2001;
// Connect to server
const server = app.listen(port, () => {
    console.log(`Server Up and running on port ${port}`);
    console.log(`Open website: http://localhost:${port}`);
});

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err}`);
    server.close(() => process.exit(1));
});

module.exports = app;

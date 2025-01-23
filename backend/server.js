const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const fs = require('fs')
const path = require('path')
const rateLimit = require('express-rate-limit')
const { blogDB, dashboardDB, logDB } = require('./config/db')

const app = express()

// Initialize DB connections
const blogDbConn = blogDB();
const dashboardDBConn = dashboardDB();
const logDBConn = logDB();

blogDbConn.on('connected', () => {
    console.log('MongoDB: Blog Database CONNECTED')
})

dashboardDBConn.on('connected', () => {
    console.log('MongoDB: Dashboard Database CONNECTED')
})

logDBConn.on('connected', () => {
    console.log('MongoDB: Log Database CONNECTED')
})

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  
    max: 100, 
    message: 'Too many requests from this IP, please try again later'
})

// Middleware
app.use(morgan('combined'))  
app.use(limiter)  
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

app.disable('x-powered-by') 

// CORS Configuration 
app.use(
    cors({
        origin: ['http://localhost:3000', 'https://nofunmondays.com', 'https://staging.nofunmondays.com'],
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
    })
)

app.use(helmet())  
app.use(helmet.xContentTypeOptions())  
app.use(helmet.frameguard({ action: 'deny' })) 
app.use(helmet.hsts({
    maxAge: 31536000,  
    includeSubDomains: true,  
    preload: true  
}))

async function routeHandler(folderName) {
    try {
        const files = await fs.promises.readdir(folderName)
        for (const file of files) {
            const fullName = path.join(folderName, file)
            const stat = await fs.promises.lstat(fullName)
            if (stat.isDirectory()) {
                await routeHandler(fullName)
            } else if (file.toLowerCase().endsWith('.js')) {
                require(fullName)(app)
            }
        }
    } catch (err) {
        console.error(`Error loading route files from ${folderName}:`, err)
    }
}

routeHandler(path.join(__dirname, '/routes'))

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    console.log(`Server Up and running on port ${port}`)
})

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err}`)
    server.close(() => process.exit(1))  
})

module.exports = app
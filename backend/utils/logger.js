const winston = require('winston')
require('winston-mongodb') 

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() 
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
 
    new winston.transports.MongoDB({
      db: `${process.env.MONGO_URI}/logs`,
      collection: 'logs', 
      level: 'info'
    }),
  ],
})

module.exports = logger
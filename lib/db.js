const mongoose = require('mongoose')
const config = require('../config/config')

module.exports = () => {
  let dbURI = config.MONGO_DB_URI
  
  mongoose.connect(dbURI, 
    { 
      useNewUrlParser: true,
      useCreateIndex: true
    })

  mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
  })

  mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error:', err);
  })

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  })

  gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
      console.log(`Mongoose disconnected through ${msg}`);
      callback();
    })
  }

  // For nodemon restarts
  // listens for SIGUSR2, which is what nodemon uses
  process.once("SIGUSR2", () => {
    gracefulShutdown('nodemon restart', () => {
      process.kill(process.pid, 'SIGUSR2');
    })
  })

  // For app termination
  // listen for SIGINT to be emitted upon application termination
  process.once('SIGINT', () => {
    gracefulShutdown('app termination', () => {
      process.exit(0);
    })
  })

  // For heroku app termination
  // listen for SIGTERM to be emitted when heroku shuts down the process
  process.once('SIGTERM', () => {
    gracefulShutdown('Heroku application shutdown', () => {
      process.exit(0);
    })
  })
}
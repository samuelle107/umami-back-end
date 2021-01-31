const mongoose = require('mongoose');
const log = require('loglevel');

mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
  log.warn('Connected to the database');
});

db.on('disconnected', () => {
  log.warn('The database has disconnected successfully');
});

db.on('error', (error) => {
  log.warn(error);
});

require('dotenv').config();

const {
  NODE_ENV = process.env.NODE_ENV || 'develop',
  JWT_SECRET = process.env.JWT_SECRET || 'dev-some-secret-key',
  PORT = process.env.PORT || 3000,
} = process.env;

const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME || 'localhost';
const MONGO_PORT = process.env.MONGO_PORT || '27017';
const MONGO_DB = process.env.MONGO_DB || 'bitfilmsdb';
const DB_URL = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;

module.exports = {
  NODE_ENV,
  JWT_SECRET,
  PORT,
  DB_URL,
};

require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes/index');

const { errorsHandler } = require('./middlewares/errorsHandler');
const { MONGO_DB_LINK } = require('./utils/constants');

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_DB_LINK);

app.use(express.json());

app.use(cookieParser());

app.use('/', router);

app.use(errorsHandler); // centralized error handler

module.exports = app;

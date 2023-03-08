const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const router = require('./routes/index');

const { errorsHandler } = require('./middlewares/errorsHandler');
const { limiter } = require('./middlewares/expressLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { DB_URL } = require('./config');

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect(DB_URL);

app.use(limiter);
app.use(helmet());

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);

app.use(errors()); // celebrate error handler
app.use(errorsHandler); // centralized error handler

module.exports = app;

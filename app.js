require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes/index');

const { createUser } = require('./controllers/users');

const { errorsHandler } = require('./middlewares/errorsHandler');

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(express.json());

app.post('/signup', createUser);

app.use((req, res, next) => {
  req.user = {
    _id: '63fe41341248f5a21db8fb9e' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/', router);

app.use(errorsHandler); // centralized error handler

module.exports = app;

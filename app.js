require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const { createUser } = require('./controllers/users');

const app = express();

app.use(express.json());

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.post('/signup', createUser);

app.use('/users', userRouter);
app.use('/movies', movieRouter);

module.exports = app;

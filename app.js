require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

module.exports = app;

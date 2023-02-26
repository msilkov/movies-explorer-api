const mongoose = require('mongoose');
const { REG_LINK } = require('../utils/constants.js');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    match: REG_LINK,
  },
  trailerLink: {
    type: String,
    required: true,
    match: REG_LINK,
  },
  thumbnail: {
    type: String,
    required: true,
    match: REG_LINK,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    required: true,
    // id фильма, который содержится в ответе сервиса MoviesExplorer.
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);

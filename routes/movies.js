const movieRouter = require('express').Router;

const { getUserFilms, addUserFilm, deleteUserFilm } = require('../controllers/movies');

movieRouter.get('/', getUserFilms);
movieRouter.post('/', addUserFilm);
movieRouter.delete('/_id', deleteUserFilm);

module.exports = movieRouter;

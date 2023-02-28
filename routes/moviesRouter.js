const moviesRouter = require('express').Router();

const { getUserFilms, addUserFilm, deleteUserFilm } = require('../controllers/movies');

moviesRouter.get('/', getUserFilms);
moviesRouter.post('/', addUserFilm);
moviesRouter.delete('/_id', deleteUserFilm);

module.exports = moviesRouter;

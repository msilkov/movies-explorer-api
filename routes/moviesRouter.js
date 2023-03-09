const moviesRouter = require('express').Router();

const { getUserFilms, addUserFilm, deleteUserFilm } = require('../controllers/movies');
const {
  idValidation, createMovieValidation,
} = require('../middlewares/requetsValidation');

moviesRouter.get('/', getUserFilms);
moviesRouter.post('/', createMovieValidation, addUserFilm);
moviesRouter.delete('/:_id', idValidation, deleteUserFilm);

module.exports = moviesRouter;

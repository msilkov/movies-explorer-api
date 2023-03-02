const BadRequestError = require('../errors/bad-req-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const Movie = require('../models/movie');
const { STATUS_OK, CREATED } = require('../utils/constants');

const getUserFilms = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(STATUS_OK).send(movies))
    .catch(next);
};
const addUserFilm = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};
const deleteUserFilm = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(new NotFoundError('card'))
    .then((movie) => {
      const currnetUserId = req.user._id;
      const MovieOwnerId = movie.owner._id.toString();
      if (currnetUserId !== MovieOwnerId) {
        throw new ForbiddenError('card');
      }

      return movie.remove();
    })
    .then((movie) => {
      res.status(STATUS_OK).send(movie);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};

module.exports = {
  getUserFilms,
  addUserFilm,
  deleteUserFilm,
};

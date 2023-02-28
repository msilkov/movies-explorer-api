const Movie = require('../models/movie');
const { STATUS_OK } = require('../utils/constants');

const getUserFilms = (req, res, next) => {
  Movie.findById(req.params._id)
    .populate(['owner'])
    .then((movies) => res.status(STATUS_OK).send(movies))
    .catch(next);
};
const addUserFilm = () => {};
const deleteUserFilm = () => {};

module.exports = {
  getUserFilms,
  addUserFilm,
  deleteUserFilm,
};

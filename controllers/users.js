const bcrypt = require('bcrypt');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-req-err');

const User = require('../models/user');
const { STATUS_OK } = require('../utils/constants');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(STATUS_OK).send(user);
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('user'))
    .then((user) => {
      res.status(STATUS_OK).send(user);
    })
    .catch(next);
};

const patchUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  const currentUserId = req.user._id;
  User.findByIdAndUpdate(
    currentUserId,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('user'))
    .then((user) => {
      res.status(STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};

module.exports = {
  getUserInfo,
  patchUserInfo,
  createUser,
};

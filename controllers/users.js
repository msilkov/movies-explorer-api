const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-req-err');
const ConflictError = require('../errors/conflict-err');

const User = require('../models/user');
const { STATUS_OK } = require('../utils/constants');
const { userResFormat } = require('../utils/utils');
const { NODE_ENV, JWT_SECRET } = require('../config');

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
      res.status(STATUS_OK).send(userResFormat(user));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError());
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError('email'));
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-some-secret-key',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'none',
          secure: false,
          domain: NODE_ENV === 'production' ? 'msilkov.diploma.nomoredomains.work' : 'localhost',
        })
        .status(STATUS_OK)
        .send(userResFormat(user));
    })
    .catch(next);
};

const logout = (req, res, next) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      domain: NODE_ENV === 'production' ? 'msilkov.diploma.nomoredomains.work' : 'localhost',
    }).send({ message: 'logout complete' });
  } catch (err) {
    next(err);
  }
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('user'))
    .then((user) => {
      res.status(STATUS_OK).send(userResFormat(user));
    })
    .catch(next);
};

const patchUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('user'))
    .then((user) => {
      res.status(STATUS_OK).send(userResFormat(user));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError());
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError('email'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getUserInfo,
  patchUserInfo,
  createUser,
  login,
  logout,
};

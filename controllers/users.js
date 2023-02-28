const bcrypt = require('bcrypt');
const User = require('../models/user');
const { STATUS_OK } = require('../utils/constants');

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
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
    .then((user) => {
      res.status(STATUS_OK).send(user);
    })
    .catch(next);
};

const patchUserInfo = (req, res, next) => {
  res.status(STATUS_OK).send({ message: 'user was patched' });
};

module.exports = {
  getUserInfo,
  patchUserInfo,
  createUser,
};

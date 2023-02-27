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
    .catch((err) => {
      console.log(`При выполнении кода произошла ошибка ${err.name} c текстом ${err.message}, но мы её обработали`);
    });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(STATUS_OK).send(user);
    })
    .catch((err) => {
      console.log(`При выполнении кода произошла ошибка ${err.name} c текстом ${err.message}, но мы её обработали`);
    });
};

const patchUserInfo = (req, res, next) => {

};

module.exports = {
  getUserInfo,
  patchUserInfo,
  createUser,
};

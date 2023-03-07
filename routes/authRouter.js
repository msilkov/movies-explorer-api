const authRouter = require('express').Router();

const { createUser, login, logout } = require('../controllers/users');
const {
  signInValidation,
  signUpValidation,
} = require('../middlewares/requetsValidation');

authRouter.post('/signup', signUpValidation, createUser);
authRouter.post('/signin', signInValidation, login);
authRouter.post('/signout', logout);

module.exports = authRouter;

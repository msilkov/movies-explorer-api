const authRouter = require('express').Router();

const { createUser, login, logout } = require('../controllers/users');

authRouter.post('/signup', createUser);
authRouter.post('/signin', login);
authRouter.post('/signout', logout);

module.exports = authRouter;

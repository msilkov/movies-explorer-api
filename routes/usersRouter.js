const usersRouter = require('express').Router();

const { getUserInfo, patchUserInfo } = require('../controllers/users');
// импорт мидлвар

usersRouter.get('/me', getUserInfo);

usersRouter.patch('/me', patchUserInfo);

module.exports = usersRouter;

const userRouter = require('express').Router;

const { getUserInfo, patchUserInfo } = require('../controllers/users');
// импорт мидлвар

userRouter.get('/me', getUserInfo);

userRouter.patch('/me', patchUserInfo);

module.exports = userRouter;

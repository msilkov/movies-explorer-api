const usersRouter = require('express').Router();

const { getUserInfo, patchUserInfo } = require('../controllers/users');
const { patchUserValidation } = require('../middlewares/requetsValidation');

usersRouter.get('/me', getUserInfo);

usersRouter.patch('/me', patchUserValidation, patchUserInfo);

module.exports = usersRouter;

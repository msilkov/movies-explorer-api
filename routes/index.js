const router = require('express').Router();
const {
  incorrectRouteHandler,
} = require('../middlewares/incorrectRouteHandler');
const { auth } = require('../middlewares/auth');
const usersRouter = require('./usersRouter');
const moviesRouter = require('./moviesRouter');
const authRouter = require('./authRouter');

router.use('/auth', authRouter);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use('*', auth, incorrectRouteHandler);

module.exports = router;

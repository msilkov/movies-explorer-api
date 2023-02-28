const router = require('express').Router();
const { incorrectRouteHandler } = require('../middlewares/incorrectRouteHandler');
const usersRouter = require('./usersRouter');
const moviesRouter = require('./moviesRouter');

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use('*', incorrectRouteHandler);

module.exports = router;

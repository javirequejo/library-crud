'use strict'
const router = require('express').Router();

const titlesRouter = require('./title.routes');
const authorsRouter = require('./author.routes');
const formatsRouter = require('./format.routes');

router.use('/titles', titlesRouter);
router.use('/authors', authorsRouter);
router.use('/formats', formatsRouter);

module.exports = router;

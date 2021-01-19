'use strict'
const router = require('express').Router();

const titlesRouter = require('./titles.routes');
const authorsRouter = require('./authors.routes');
const formatsRouter = require('./formats.routes');

router.use('/titles', titlesRouter);
router.use('/authors', authorsRouter);
router.use('/formats', formatsRouter);

module.exports = router;

'use strict'
const router = require('express').Router();

const titleRouter = require('./title.routes');
const authorRouter = require('./author.routes');
const formatRouter = require('./format.routes');

router.use('/titles', titleRouter);
router.use('/authors', authorRouter);
router.use('/formats', formatRouter);

module.exports = router;

const router = require('express').Router();

const titlesRouter = require('./titles');
const authorsRouter = require('./authors.routes');
const formatsRouter = require('./formats');

app.use('/titles', titlesRouter);
app.use('/authors', authorsRouter);
app.use('/formats', formatsRouter);

module.exports = router;

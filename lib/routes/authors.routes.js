'use strict'
const router = require('express').Router();

/* GET authors listing. */
router.get('/', function(req, res, next) {
  res.send('Authors');
});

module.exports = router;
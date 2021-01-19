const router = require('express').Router();

/* GET titles listing. */
router.get('/', function(req, res, next) {
  res.send('Titles');
});

module.exports = router;
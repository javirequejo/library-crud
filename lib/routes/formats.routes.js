const router = require('express').Router();

/* GET formats listing. */
router.get('/', function(req, res, next) {
  res.send('Formats');
});

module.exports = router;
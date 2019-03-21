var express = require('express');
var router = express.Router();

/* GET initialization */
router.post('/', function(req, res, next) {
  console.log(req.body.code);
  res.send('done');
});

module.exports = router;

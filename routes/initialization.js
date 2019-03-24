var express = require('express');
var router = express.Router();

/* GET initialization */
router.post('/', function(req, res, next) {
  res.render('initialization', { arm: req.body.arm_code, c: req.body.c_code });
});

module.exports = router;

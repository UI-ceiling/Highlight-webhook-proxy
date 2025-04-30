var express = require('express');
var {push_plmm} = require('../utils/every_day')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  push_plmm();
  res.send('推送plmm');
});

module.exports = router;

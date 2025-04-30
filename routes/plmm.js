var express = require('express');
var {push_plmm} = require('../utils/every_day')
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  await push_plmm();
  res.send('推送plmm');
});

module.exports = router;

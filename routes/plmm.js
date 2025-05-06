var express = require('express');
var {push_plmm} = require('../utils/every_day')
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const r = await push_plmm('手动访问触发', '探活');
  res.send(r);
});

module.exports = router;

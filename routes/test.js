var express = require('express');
var {test_hour} = require('../utils/every_day')
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const r = await test_hour();
  res.send(r);
});

module.exports = router;

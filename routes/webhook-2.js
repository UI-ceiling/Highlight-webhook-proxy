var express = require('express');
const {webhook} = require('../utils/webhook')
var router = express.Router();

/* GET home page. */
router.post('/', async function(req, res, next) {
  await webhook(req, '9-16')
  res.send('respond with a resource');
});

module.exports = router;

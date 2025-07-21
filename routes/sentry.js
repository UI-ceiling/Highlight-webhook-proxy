var express = require('express');
const {webhook} = require('../utils/sentry_webhook')
var router = express.Router();

/* GET home page. */
router.post('/:project', async function(req, res, next) {
  await webhook(req, req.params.project)
  res.send('webhook 已接收');
});

module.exports = router;

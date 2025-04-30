var express = require('express');
var {push_plmm} = require('../utils/every_day')
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try{
    await push_plmm();
  }catch(error){
    const webhookURL = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=d074b6c5-c660-4c30-88ee-114dc76f3a98'; // Replace this

    const response = await fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "msgtype": "text",
        "text": {
          "content": `push error: ${error.message}`,
          "mentioned_mobile_list":["18233279029"]
        }
      }),
    });
  }
  res.send('推送plmm');
});

module.exports = router;

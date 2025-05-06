var express = require('express');
const {get_plmm_video} = require('../utils/plmm')
var router = express.Router();

/* GET home page. */
router.post('/', async function(req, res, next) {
  await webhook(req)
  res.send('respond with a resource');
});

async function webhook(req){
  console.log(req)
  try {
    const {
      AlertName,
      ErrorTitle,
      ErrorURL,
      ErrorResolveURL,
      ErrorIgnoreURL,
      ErrorSnoozeURL,
      SessionURL,
      UserIdentifier,
      ErrorCount,
      // Query,
    } = req.body;

    // const q = parseParams(Query);
    const isProd = UserIdentifier.startsWith('prod');
    const env = UserIdentifier.split('-')[0];
    const {mp4_video} = await get_plmm_video();

    console.log(env)

    const payload = {
      msgtype: "template_card",
      template_card: {
        card_type: "text_notice",
        source: {
          icon_url: "https://s1.aigei.com/src/img/gif/4a/4a679daabe894daf8a7b5786375ac806.gif?e=2051020800&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:bPjMObt4ABe8t0Olsjns9o3DZXo=",
          desc: `${isProd ? '事情变得有趣起来了🧐' : '🙋‍♀️️'}  ${UserIdentifier}`,
          desc_color: isProd ? 2 : 1,
        },
        main_title: {
          title: `🌍:${env}`,
        },
        emphasis_content: {
          title: `${ErrorCount}`,
          desc: '出现次数'
        },
        quote_area: {
          type: 0,
          quote_text: `${ErrorTitle}`
        },
        card_action: {
          type: 1,
          url: mp4_video,
        }
      }
    };

    const webhookURL = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=5a2a39e1-37d7-4697-9e0b-796d68eb6b9c'; // Replace this

    const response = await fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('response => ', response.body)

    if (!response.ok) {
      throw new Error(`Forwarding failed with status ${response.status}`);
    }

// res.status(200).json({ message: 'Forwarded successfully' });
  } catch (error) {
    console.error('Webhook error:', error);
// res.status(500).json({ message: 'Internal Server Error' });
  }
}

// function parseParams(str) {
//   const obj = {};
//   str.split('&').forEach(pair => {
//     const [key, value] = pair.split('=');
//     if (key) obj[key] = value ?? '';
//   });
//   return obj;
// }


module.exports = router;

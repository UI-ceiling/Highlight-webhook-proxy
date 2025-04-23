var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', async function(req, res, next) {
  await webhook(req)
  res.send('respond with a resource');
  console.log('g3h21b3v')
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

    const payload = {
      msgtype: "template_card",
      template_card: {
        card_type: "text_notice",
        source: {
          icon_url: "https://s1.aigei.com/src/img/gif/4a/4a679daabe894daf8a7b5786375ac806.gif?e=2051020800&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:bPjMObt4ABe8t0Olsjns9o3DZXo=",
          desc: `🙋‍♀️ ${UserIdentifier}`,
          desc_color: 2
        },
        main_title: {
          // title: q.environment,
          // desc: "错误次数"
        },
        emphasis_content: {
          title: `${ErrorCount}`,
          desc: '出现次数'
        },
        quote_area: {
          type: 0,
          // url: ErrorURL,
          // title: "1",
          quote_text: `${ErrorTitle}\n\n${JSON.stringify(req.body)}`
        },
        // sub_title_text: "点击链接快速处理此错误",
        // horizontal_content_list: [
        //   {
        //     keyname: "查看",
        //     value: "错误详情",
        //     type: 1,
        //     url: ErrorURL
        //   },
        //   {
        //     keyname: "标记为已解决",
        //     value: "立即处理",
        //     type: 1,
        //     url: ErrorResolveURL
        //   },
        //   {
        //     keyname: "忽略错误",
        //     value: "不再提示",
        //     type: 1,
        //     url: ErrorIgnoreURL
        //   },
        //   {
        //     keyname: "稍后处理",
        //     value: "Snooze",
        //     type: 1,
        //     url: ErrorSnoozeURL
        //   }
        // ],
        // jump_list: [
        //   {
        //     type: 1,
        //     url: ErrorURL,
        //     title: "查看错误"
        //   }
        // ],
        card_action: {
          type: 1,
          url: ErrorURL
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

    console.log('response => ', response)

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

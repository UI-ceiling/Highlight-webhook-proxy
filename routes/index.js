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
      Query,
      ErrorCount
    } = req.body;

    const query = parseParams(Query)

    const payload = {
      msgtype: "template_card",
      template_card: {
        card_type: "text_notice",
        source: {
          icon_url: "https://storage.googleapis.com/organization-image-assets/highlightio-botAvatarSrcUrl-1718084264557.svg",
          desc: `🙋‍♀️ ${UserIdentifier}`,
          desc_color: 2
        },
        main_title: {
          title: `🐞${ErrorCount}😱`,
          desc: "错误次数"
        },
        emphasis_content: {
          title: query.environment,
          desc: `参数：${Query}`
        },
        quote_area: {
          type: 0,
          url: ErrorURL,
          // title: "错误详情",
          quote_text: ErrorTitle
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
        // card_action: {
        //   type: 1,
        //   url: ErrorURL
        // }
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

    if (!response.ok) {
      throw new Error(`Forwarding failed with status ${response.status}`);
    }

    // res.status(200).json({ message: 'Forwarded successfully' });
  } catch (error) {
    console.error('Webhook error:', error);
    // res.status(500).json({ message: 'Internal Server Error' });
  }
}

function parseParams(str) {
  const obj = {};
  str.split('&').forEach(pair => {
    const [key, value] = pair.split('=');
    if (key) obj[key] = value ?? '';
  });
  return obj;
}


module.exports = router;

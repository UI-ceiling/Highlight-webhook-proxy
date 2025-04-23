// File: api/webhook.js

export default async function handler(req) {
  // if (req.method !== 'POST') {
  //   return res.status(405).json({ message: 'Method Not Allowed' });
  // }

  try {
    const {
      AlertName,
      ErrorTitle,
      ErrorURL,
      ErrorResolveURL,
      ErrorIgnoreURL,
      ErrorSnoozeURL,
      SessionURL,
      UserIdentifier
    } = req.body;

    const payload = {
      msgtype: "template_card",
      template_card: {
        card_type: "text_notice",
        source: {
          icon_url: "https://wework.qpic.cn/wwpic/252813_jOfDHtcISzuodLa_1629280209/0",
          desc: "Highlight",
          desc_color: 0
        },
        main_title: {
          title: AlertName || "错误警报",
          desc: ErrorTitle || "有新的异常错误发生"
        },
        emphasis_content: {
          title: "1",
          desc: "错误次数"
        },
        quote_area: {
          type: 1,
          url: ErrorURL,
          title: "错误详情",
          quote_text: `用户：${UserIdentifier}\n查看会话：${SessionURL}`
        },
        sub_title_text: "点击链接快速处理此错误",
        horizontal_content_list: [
          {
            keyname: "查看",
            value: "错误详情",
            type: 1,
            url: ErrorURL
          },
          {
            keyname: "标记为已解决",
            value: "立即处理",
            type: 1,
            url: ErrorResolveURL
          },
          {
            keyname: "忽略错误",
            value: "不再提示",
            type: 1,
            url: ErrorIgnoreURL
          },
          {
            keyname: "稍后处理",
            value: "Snooze",
            type: 1,
            url: ErrorSnoozeURL
          }
        ],
        jump_list: [
          {
            type: 1,
            url: ErrorURL,
            title: "查看错误"
          }
        ],
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

    if (!response.ok) {
      throw new Error(`Forwarding failed with status ${response.status}`);
    }

    // res.status(200).json({ message: 'Forwarded successfully' });
  } catch (error) {
    console.error('Webhook error:', error);
    // res.status(500).json({ message: 'Internal Server Error' });
  }
}

const {get_plmm_video} = require("./plmm");

function arrayToObject(arr) {
  const result = {};
  for (const [key, value] of arr) {
    result[key] = value;
  }
  return result;
}


const format = (utcTime) => {
  const d = new Date(utcTime);
  const pad = (n) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} `
    + `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};


async function webhook(req, project){
    console.log(req)
    try {
        const {
          message,
          tags,
          contexts,
          environment,
          metadata,
          datetime,
          request,
        } = req.body.data?.error || req.body.data?.event;

        const tagsObject = arrayToObject(tags);

        // const q = parseParams(Query);
        const isProd = environment === 'production';
        // const env = UserIdentifier.split('-')[0];
        const {mp4_video} = await get_plmm_video();

        const payload = {
            msgtype: "template_card",
            template_card: {
                card_type: "text_notice",
                source: {
                    icon_url: "https://s1.aigei.com/src/img/gif/4a/4a679daabe894daf8a7b5786375ac806.gif?e=2051020800&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:bPjMObt4ABe8t0Olsjns9o3DZXo=",
                    desc: `🙋‍♀️️ ${tagsObject.user_info_job_number}-${tagsObject.user_info_user_name}`,
                    desc_color: isProd ? 2 : 1,
                },
                main_title: {
                    title: project,
                },
                // emphasis_content: {
                //     title: `${tagsObject.user}`,
                //     desc: `出现次数`
                // },
                quote_area: {
                    type: 0,
                    quote_text: metadata.value,
                },
                // sub_title_text: request.fragment,
                horizontal_content_list:[
                  {
                    keyname: "url",
                    value: request.fragment,
                  },
                  {
                    keyname: "env",
                    value: environment,
                  },
                  {
                    keyname: "time",
                    value: format(datetime),
                  },
                ],
                card_action: {
                    type: 1,
                    url: mp4_video,
                }
            }
        };

        const webhookURL = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=1845059e-ae9b-4a0b-96f5-16bd401cff1f'; // Replace this

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

module.exports = {
    webhook,
}
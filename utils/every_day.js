var {get_plmm_video, get_plmm_img} = require('./plmm');
var {get_today_is_work_day} = require('./work_day');
const cron = require('node-cron');

// module.exports = async function webhook(req){
async function every_day(){
  cron.schedule('15 8 * * *', async () => {
    if(await get_today_is_work_day()){
      morning();
    }
  });

  const hoursExecutionHours = [9, 10, 11, 13, 14, 15, 16, 17];

  hoursExecutionHours.forEach(hour => {
    cron.schedule(`10 ${hour} * * *`, async () => {
      try{
        if(await get_today_is_work_day()) {
          await push_plmm(`${hour}:10 自动触发`);
        }
        return 'success';
      }catch(e){
        await push('定时触发失败', 'error: ' + e.toString());
        return 'error' + e.toString();
      }
    });
  });
}


async function morning(){
  await push('工作日-' + new Date().toLocaleString(), '一切正常');
}

async function push_plmm(title, desc){
  return await push(title || '主动触发',  desc || '👌\n\nI\'m fine')
}

async function push(title, desc, img){
  try {
    const {mp4_video} = await get_plmm_video();
    const {url} = await get_plmm_img();

    const payload = {
      "msgtype": "news",
      "news": {
        "articles" : [
          {
            "title" : title || new Date().toLocaleString(),
            "description" : desc || "正常运行",
            "url" : mp4_video,
            "picurl" : img || url,
          }
        ]
      }
    };

    const webhookURL = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=d074b6c5-c660-4c30-88ee-114dc76f3a98'; // Replace this

    // const response = await fetch(webhookURL, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(payload),
    // });
    //
    // console.log('response => ', response.body)
    //
    // if (!response.ok) {
    //   throw new Error(`Forwarding failed with status ${response.status}`);
    // }

    return 'success';
// res.status(200).json({ message: 'Forwarded successfully' });
  } catch (error) {
    console.error('Webhook error:', error);
    await push('推送失败', 'error: ' + error.toString());
    return 'error' + error.toString();
// res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function test_hour(){
  try{
    if(await get_today_is_work_day()) {
      await push_plmm('手动访问触发', '测试');
    }
    return 'success';
  }catch(e){
    await push('定时触发失败', 'error: ' + e.toString());
    return 'error' + e.toString();
  }
}

module.exports = {
  every_day,
  push_plmm,
  test_hour,
}

const video_api = 'https://api.kuleu.com/api/MP4_xiaojiejie?type=json';
const img_api = 'https://api.52vmy.cn/api/img/tu/girl';

module.exports = {
  get_plmm_video,
  get_plmm_img,
}

async function get_plmm_video() {
  try {
    const res = await fetch(video_api, {
      method: 'GET',
    })

    // console.log(await res.json());

    return await res.json()
  } catch (e) {
    console.log('error', e)
    return {
      mp4_video: 'https://filehelper.weixin.qq.com/cgi-bin/mmwebwx-bin/webwxgetmsgimg?&MsgID=3505350264853555127&skey=%40crypt_92b1b847_6dc5d041d19c4558fbecc021f1659684&mmweb_appid=wx_webfilehelper&type=big',
    }
  }
}

async function get_plmm_img() {
  try {
    const res = await fetch(img_api, {
      method: 'GET',
    })

    // console.log(await res.json());

    return await res.json()
  } catch (e) {
    console.log('error', e)
    return {
      url: 'https://filehelper.weixin.qq.com/cgi-bin/mmwebwx-bin/webwxgetmsgimg?&MsgID=3505350264853555127&skey=%40crypt_92b1b847_6dc5d041d19c4558fbecc021f1659684&mmweb_appid=wx_webfilehelper&type=big',
    }
  }
}

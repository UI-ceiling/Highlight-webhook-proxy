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
      mp4_video: '',
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
      url: '',
    }
  }
}

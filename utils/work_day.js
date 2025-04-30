const api = 'https://timor.tech/api/holiday/info';

async function get_today_is_work_day(){
  try {
    const res = await fetch(api, {
      method: 'GET',
    })

    // console.log(await res.json());

    const is = await res.json();
    return !!is.holiday?.holiday;
  } catch (e) {
    console.log('error', e)
    return {
      mp4_video: '',
    }
  }
}

module.exports = {
  get_today_is_work_day,
}

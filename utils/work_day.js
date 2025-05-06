const api = 'https://timor.tech/api/holiday/info';

let cachedDate = null;
let cachedIsWorkDay = false;

async function get_today_is_work_day() {
  const todayStr = new Date().toISOString().slice(0, 10); // yyyy-mm-dd

  if (cachedDate === todayStr) {
    return cachedIsWorkDay;
  }

  try {
    const res = await fetch(api, { method: 'GET' });
    const data = await res.json();

    // holiday.holiday 存在表示是假日，反之为工作日
    const isHoliday = !!data.holiday?.holiday;
    cachedIsWorkDay = !isHoliday; // 转成“是否工作日”
    cachedDate = todayStr;

    return cachedIsWorkDay;
  } catch (e) {
    console.error('get_today_is_work_day error:', e);
    return false; // 默认认为非工作日，防止误发消息
  }
}

module.exports = {
  get_today_is_work_day,
};

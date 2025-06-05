const GOOGLE_API = 'https://script.google.com/macros/s/AKfycbzqQBAF8FWH4_2RfPMrMRVLrVVit6ETt9CXONfiz6glW2fjtwswuHaOkEMcKLWU9fwL/exec';

export default async function handler(req, res) {
  const key = req.query.key;
  if (!key) {
    res.status(400).json({ valid: false, msg: 'Thiếu key' });
    return;
  }

  try {
    const url = `${GOOGLE_API}?key=${encodeURIComponent(key)}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    if (!response.ok) {
      res.status(502).json({ valid: false, msg: 'Google API lỗi', debug: 'Status code ' + response.status });
      return;
    }
    const text = await response.text();
    try {
      const data = JSON.parse(text);
      res.status(200).json(data);
    } catch (err) {
      res.status(502).json({ valid: false, msg: 'Google API không trả về JSON', debug: text });
    }
  } catch (e) {
    res.status(500).json({ valid: false, msg: 'Lỗi proxy!', error: e.toString() });
  }
}

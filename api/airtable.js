export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing url' });

  const response = await fetch(decodeURIComponent(url), {
    method: req.method,
    headers: {
      'Authorization': 'Bearer patuF2mAnMjZOlGud.d10916dff91993663a472d845ab8c4b4422fe772b2d588a56a2f5d9b6de2d87a',
      'Content-Type': 'application/json'
    },
    body: req.method !== 'GET' && req.method !== 'OPTIONS' ? JSON.stringify(req.body) : undefined
  });

  const data = await response.json();
  res.status(response.status).json(data);
}

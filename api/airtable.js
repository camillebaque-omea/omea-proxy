import crypto from 'crypto';

function generateToken(prenom) {
  return crypto
    .createHmac('sha256', process.env.TOKEN_SECRET || 'omea-secret')
    .update(prenom.toLowerCase().trim())
    .digest('hex')
    .substring(0, 12);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url, client, token } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing url' });

  if (client && token) {
    const expected = generateToken(client);
    if (token !== expected) {
      return res.status(403).json({ error: 'Token invalide' });
    }
  }

  const response = await fetch(decodeURIComponent(url), {
    method: req.method,
    headers: {
      'Authorization': 'Bearer ' + process.env.AIRTABLE_TOKEN,
      'Content-Type': 'application/json'
    },
    body: req.method !== 'GET' && req.method !== 'OPTIONS' ? JSON.stringify(req.body) : undefined
  });

  const data = await response.json();
  res.status(response.status).json(data);
}

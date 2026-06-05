import crypto from 'crypto';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { client } = req.query;
  if (!client) return res.status(400).json({ error: 'Missing client' });

  const token = crypto
    .createHmac('sha256', process.env.TOKEN_SECRET || 'omea-secret')
    .update(client.toLowerCase().trim())
    .digest('hex')
    .substring(0, 12);

  res.status(200).json({ token });
}

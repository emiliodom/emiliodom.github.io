// Vercel Serverless Function for IP detection
// Returns the client's IP address

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://emiliodom.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Vercel provides IP in various headers
    const ip = req.headers['x-forwarded-for']?.split(',')[0] ||
               req.headers['x-real-ip'] ||
               req.socket?.remoteAddress ||
               'unknown';
    
    return res.status(200).json({ ip });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

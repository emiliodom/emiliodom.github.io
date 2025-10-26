// Vercel Serverless Function for NocoDB proxy
// Deploy to Vercel and set NOCODB_TOKEN as environment variable

export default async function handler(req, res) {
  const NOCODB_TOKEN = process.env.NOCODB_TOKEN;
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://emiliodom.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow from your domain
  const origin = req.headers.origin || req.headers.referer;
  if (origin && !origin.includes('emiliodom.github.io')) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Route: GET /api/greetings
  if (req.method === 'GET') {
    try {
      const nocodbUrl = 'https://app.nocodb.com/api/v2/tables/mtujnjge9o5j98m/records?viewId=vww985w35i0umz1g&limit=25&shuffle=0&offset=0';
      const response = await fetch(nocodbUrl, {
        headers: {
          'accept': 'application/json',
          'xc-token': NOCODB_TOKEN
        }
      });

      if (!response.ok) {
        throw new Error(`NocoDB GET failed: ${response.status}`);
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Route: POST /api/greetings
  if (req.method === 'POST') {
    try {
      const { Message, User, Notes } = req.body;
      
      // Validate required fields
      if (!Message || !User || !Notes) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Basic sanitization
      const sanitized = {
        Message: String(Message).substring(0, 500),
        User: String(User).substring(0, 100),
        Notes: String(Notes).substring(0, 50)
      };

      const nocodbUrl = 'https://app.nocodb.com/api/v2/tables/mtujnjge9o5j98m/records';
      const response = await fetch(nocodbUrl, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'xc-token': NOCODB_TOKEN
        },
        body: JSON.stringify(sanitized)
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`NocoDB POST failed: ${response.status} ${text}`);
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

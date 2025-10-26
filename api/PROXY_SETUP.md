# NocoDB API Proxy Setup Guide

## Security Problem
The current implementation exposes the NocoDB token in the frontend JavaScript, making it visible to anyone who visits the site.

## Solution: Serverless Proxy
Deploy a serverless function that acts as a proxy between your frontend and NocoDB. The token stays server-side and is never exposed.

---

## Option 1: Cloudflare Workers (Recommended - 100k req/day free)

### 1. Create Cloudflare Account
- Go to https://workers.cloudflare.com/
- Sign up (free tier: 100,000 requests/day)

### 2. Deploy Worker
```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create new worker project
wrangler init nocodb-proxy

# Copy the content from api/nocodb-proxy.js to src/index.js

# Configure wrangler.toml
cat > wrangler.toml << EOF
name = "nocodb-proxy"
main = "src/index.js"
compatibility_date = "2025-01-01"

[env.production]
vars = { }

[env.production.secrets]
NOCODB_TOKEN = "your-token-here"
EOF

# Set secret (interactive, won't be in file)
wrangler secret put NOCODB_TOKEN

# Deploy
wrangler deploy
```

### 3. Your Worker URL
After deploy, you'll get: `https://nocodb-proxy.YOUR-SUBDOMAIN.workers.dev`

Endpoints:
- `GET /api/greetings` - Fetch greetings
- `POST /api/greetings` - Submit greeting
- `GET /api/ip` - Get user's IP

---

## Option 2: Vercel Serverless Functions (Alternative)

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Create API directory structure
```bash
mkdir -p vercel-api/api
```

### 3. Create Vercel config
Create `vercel.json`:
```json
{
  "functions": {
    "api/**/*.js": {
      "memory": 128,
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "https://emiliodom.github.io" },
        { "key": "Access-Control-Allow-Methods", "value": "GET, POST, OPTIONS" },
        { "key": "Access-Control-Allow-Headers", "value": "Content-Type" }
      ]
    }
  ]
}
```

### 4. Create API endpoint
Create `vercel-api/api/greetings.js`:
```javascript
export default async function handler(req, res) {
  const NOCODB_TOKEN = process.env.NOCODB_TOKEN;
  
  // CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://emiliodom.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const response = await fetch(
        'https://app.nocodb.com/api/v2/tables/mtujnjge9o5j98m/records?viewId=vww985w35i0umz1g&limit=25',
        { headers: { 'accept': 'application/json', 'xc-token': NOCODB_TOKEN } }
      );
      const data = await response.json();
      return res.status(200).json(data);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const { Message, User, Notes } = req.body;
      const response = await fetch(
        'https://app.nocodb.com/api/v2/tables/mtujnjge9o5j98m/records',
        {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'xc-token': NOCODB_TOKEN
          },
          body: JSON.stringify({ Message, User, Notes })
        }
      );
      const data = await response.json();
      return res.status(200).json(data);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
```

### 5. Deploy
```bash
cd vercel-api
vercel --prod

# Set environment variable
vercel env add NOCODB_TOKEN
# Paste your token when prompted
# Select: Production
```

Your API will be at: `https://your-project.vercel.app/api/greetings`

---

## Step 3: Update Frontend Code

Once you deploy the proxy (Cloudflare or Vercel), update `nocodb-config.js`:

```javascript
// assets/js/nocodb-config.js
(function(){
  window.NOCODB_CONFIG = {
    // Use your proxy URL instead of direct NocoDB
    proxyUrl: 'https://nocodb-proxy.YOUR-SUBDOMAIN.workers.dev/api/greetings',
    // OR for Vercel:
    // proxyUrl: 'https://your-project.vercel.app/api/greetings',
    
    // No token needed - it's server-side now!
  };
})();
```

Update `greetings.js` to use proxy:
```javascript
async function fetchFromNocoDB(){
  const proxyUrl = NOCODB.proxyUrl;
  if(!proxyUrl) return null;
  try{
    const r = await fetch(proxyUrl); // No token header needed
    if(!r.ok) throw new Error('proxy fetch failed');
    const j = await r.json();
    // ... rest of parsing logic
  }catch(e){
    console.warn('fetchFromNocoDB failed', e);
    return null;
  }
}

async function postToNocoDB(message, user, notes){
  const proxyUrl = NOCODB.proxyUrl;
  if(!proxyUrl) throw new Error('Proxy not configured');
  try{
    const r = await fetch(proxyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Message: message, User: user, Notes: notes })
    });
    if(!r.ok) throw new Error(`Proxy POST failed: ${r.status}`);
    return await r.json();
  }catch(e){
    console.warn('postToNocoDB failed', e);
    throw e;
  }
}
```

---

## Step 4: Update GitHub Workflow

Remove token generation from `.github/workflows/deploy.yml`:

```yaml
- name: Checkout
  uses: actions/checkout@v4

# Remove the "Generate NocoDB Config with Secret Token" step entirely

- name: Setup Pages
  uses: actions/configure-pages@v4
```

The `nocodb-config.js` in the repo will now only contain the proxy URL (no secret).

---

## Benefits
✅ **Token never exposed** - Stays server-side only  
✅ **Free tier sufficient** - 100k req/day (Cloudflare) or 100k req/month (Vercel)  
✅ **CORS protection** - Only your domain can access  
✅ **Rate limiting** - Can add rate limits server-side  
✅ **IP forwarding** - Server can see real client IP  

---

## Which to choose?

| Feature | Cloudflare Workers | Vercel Functions |
|---------|-------------------|------------------|
| Free tier | 100k req/day | 100k req/month |
| Cold start | ~5ms | ~50-200ms |
| Deploy time | ~10 seconds | ~30 seconds |
| Ease of setup | Medium | Easy |

**Recommendation:** Start with **Cloudflare Workers** for better free tier.

---

## Quick Start Commands

### Cloudflare (fastest)
```bash
npm install -g wrangler
wrangler login
wrangler init nocodb-proxy
# Copy api/nocodb-proxy.js to src/index.js
wrangler secret put NOCODB_TOKEN
wrangler deploy
```

### Vercel (easiest)
```bash
npm install -g vercel
cd vercel-api
vercel --prod
vercel env add NOCODB_TOKEN
```

Let me know which option you prefer and I'll help you deploy it!

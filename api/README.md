# 🔒 Secure NocoDB Proxy

## Problem
Your NocoDB token is currently **exposed in public JavaScript**, making it visible to anyone.

## Solution
Deploy a serverless proxy that keeps the token server-side. Choose one option:

---

## 🚀 Quick Start

### Option 1: Cloudflare Workers (Recommended - 100k req/day free)

```bash
# 1. Deploy proxy
cd api
./deploy-cloudflare.sh

# 2. Copy your Worker URL (e.g., https://nocodb-proxy.abc123.workers.dev)

# 3. Update nocodb-config.js
# Replace the content with:
(function(){
  window.NOCODB_CONFIG = {
    proxyUrl: 'https://nocodb-proxy.YOUR-URL.workers.dev/api/greetings'
  };
})();

# 4. Update greetings.js
# Copy the updated functions from assets/js/greetings-proxy-version.js
# to replace fetchFromNocoDB, postToNocoDB, and getIp in assets/js/greetings.js

# 5. Update GitHub workflow
# Remove the "Generate NocoDB Config with Secret Token" step from:
# .github/workflows/deploy.yml

# 6. Commit and deploy
git add .
git commit -m "feat: Secure token using Cloudflare Workers proxy"
git push
```

### Option 2: Vercel (Alternative - 100k req/month free)

```bash
# 1. Deploy proxy
cd api
./deploy-vercel.sh

# 2-6. Same steps as Cloudflare but use Vercel URL
# (e.g., https://your-project.vercel.app/api/greetings)
```

---

## 📁 Files Created

```
api/
├── README.md                           # This file
├── PROXY_SETUP.md                      # Detailed setup guide
├── nocodb-proxy.js                     # Worker source code
├── deploy-cloudflare.sh                # Cloudflare deployment script
├── deploy-vercel.sh                    # Vercel deployment script
├── cloudflare/
│   ├── wrangler.toml                   # Cloudflare config
│   └── src/
│       └── index.js                    # Worker entry point
└── vercel/
    ├── vercel.json                     # Vercel config
    └── api/
        ├── greetings.js                # Greetings API endpoint
        └── ip.js                       # IP detection endpoint
```

---

## 🔐 Security Benefits

✅ **Token never exposed** - Stays on Cloudflare/Vercel servers  
✅ **CORS protection** - Only your domain can access  
✅ **Input sanitization** - Server validates all requests  
✅ **Rate limiting** - Can add rate limits easily  

---

## 🧪 Testing

After deployment, test your proxy:

```bash
# Test GET (fetch greetings)
curl https://your-proxy-url.workers.dev/api/greetings

# Test IP detection (optional)
curl https://your-proxy-url.workers.dev/api/ip

# Test from browser console (on your site)
fetch(window.NOCODB_CONFIG.proxyUrl)
  .then(r => r.json())
  .then(console.log)
```

---

## 📊 Comparison

| Feature | Cloudflare Workers | Vercel Functions |
|---------|-------------------|------------------|
| **Free tier** | 100k req/day | 100k req/month |
| **Cold start** | ~5ms | ~50-200ms |
| **Deploy time** | ~10 seconds | ~30 seconds |
| **Global edge** | Yes (300+ locations) | Yes (30+ regions) |
| **Setup difficulty** | Medium | Easy |

**Recommendation:** Use **Cloudflare Workers** for better free tier and performance.

---

## ❓ Need Help?

1. **Cloudflare login issues?**
   ```bash
   wrangler logout
   wrangler login
   ```

2. **Vercel not deploying?**
   ```bash
   vercel --prod --force
   ```

3. **CORS errors?**
   - Check that `Access-Control-Allow-Origin` matches your domain
   - Test from `https://emiliodom.github.io` (not localhost)

4. **401 Unauthorized?**
   - Verify secret is set: `wrangler secret list`
   - Update secret: `wrangler secret put NOCODB_TOKEN`

---

## 🎯 Next Steps After Deployment

1. ✅ Deploy proxy (Cloudflare or Vercel)
2. ✅ Update `nocodb-config.js` with proxy URL
3. ✅ Update `greetings.js` with proxy-compatible functions
4. ✅ Remove token generation from GitHub workflow
5. ✅ Test on production site
6. ✅ Revoke old NocoDB token (optional but recommended)
7. ✅ Generate new token in NocoDB for the proxy

---

**Questions?** Check `PROXY_SETUP.md` for detailed instructions.

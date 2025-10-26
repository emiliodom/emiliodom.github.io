// NocoDB Proxy Configuration (Secure Version)
// After deploying your proxy (Cloudflare Workers or Vercel), update the proxyUrl below

(function(){
  window.NOCODB_CONFIG = {
    // INSTRUCTIONS:
    // 1. Deploy proxy using api/PROXY_SETUP.md
    // 2. Uncomment ONE of the proxyUrl options below based on what you deployed
    // 3. Remove the old postUrl/getUrl/token lines
    
    // Option A: Cloudflare Workers (after running: wrangler deploy)
    // proxyUrl: 'https://nocodb-proxy.YOUR-SUBDOMAIN.workers.dev/api/greetings',
    
    // Option B: Vercel Serverless (after running: vercel --prod)
    // proxyUrl: 'https://your-project.vercel.app/api/greetings',
    
    // Option C: For local testing, use the old config (INSECURE - for development only)
    postUrl: 'https://app.nocodb.com/api/v2/tables/mtujnjge9o5j98m/records',
    getUrl: 'https://app.nocodb.com/api/v2/tables/mtujnjge9o5j98m/records?viewId=vww985w35i0umz1g&limit=25&shuffle=0&offset=0',
    token: '', // EMPTY - token should never be in frontend code in production!
    
    // Optional: Proxy for IP detection (if you want server-side IP)
    // ipProxyUrl: 'https://nocodb-proxy.YOUR-SUBDOMAIN.workers.dev/api/ip',
    // OR for Vercel: 'https://your-project.vercel.app/api/ip'
  };
})();

#!/bin/bash
# Quick deploy script for Cloudflare Workers

set -e

echo "🚀 NocoDB Proxy - Cloudflare Workers Deployment"
echo "================================================"
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Check if logged in
echo "🔐 Checking Cloudflare authentication..."
if ! wrangler whoami &> /dev/null; then
    echo "🔑 Please login to Cloudflare:"
    wrangler login
fi

# Navigate to cloudflare directory
cd "$(dirname "$0")/cloudflare"

# Check if token is set
echo ""
echo "🔑 Checking if NOCODB_TOKEN secret is set..."
if ! wrangler secret list 2>/dev/null | grep -q "NOCODB_TOKEN"; then
    echo "⚠️  NOCODB_TOKEN secret not found."
    echo "📝 Please enter your NocoDB token (it will be stored securely):"
    wrangler secret put NOCODB_TOKEN
else
    echo "✅ NOCODB_TOKEN secret is already set"
    echo "   (To update it, run: wrangler secret put NOCODB_TOKEN)"
fi

# Deploy
echo ""
echo "🚀 Deploying to Cloudflare Workers..."
wrangler deploy

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Copy the Worker URL from above (e.g., https://nocodb-proxy.YOUR-SUBDOMAIN.workers.dev)"
echo "   2. Update assets/js/nocodb-config.js with:"
echo "      proxyUrl: 'https://nocodb-proxy.YOUR-SUBDOMAIN.workers.dev/api/greetings'"
echo "   3. Update assets/js/greetings.js using the code from assets/js/greetings-proxy-version.js"
echo "   4. Remove the token generation step from .github/workflows/deploy.yml"
echo "   5. Commit and push!"
echo ""
echo "🧪 Test your proxy:"
echo "   curl https://nocodb-proxy.YOUR-SUBDOMAIN.workers.dev/api/greetings"
echo ""

#!/bin/bash
# Quick deploy script for Vercel Serverless Functions

set -e

echo "🚀 NocoDB Proxy - Vercel Deployment"
echo "===================================="
echo ""

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Navigate to vercel directory
cd "$(dirname "$0")/vercel"

# Check if logged in
echo "🔐 Checking Vercel authentication..."
vercel whoami || vercel login

# Deploy
echo ""
echo "🚀 Deploying to Vercel..."
vercel --prod

# Set environment variable
echo ""
echo "🔑 Setting NOCODB_TOKEN environment variable..."
echo "   (You'll be prompted to enter your token)"
vercel env add NOCODB_TOKEN production

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Copy the Production URL from above (e.g., https://your-project.vercel.app)"
echo "   2. Update assets/js/nocodb-config.js with:"
echo "      proxyUrl: 'https://your-project.vercel.app/api/greetings'"
echo "   3. Update assets/js/greetings.js using the code from assets/js/greetings-proxy-version.js"
echo "   4. Remove the token generation step from .github/workflows/deploy.yml"
echo "   5. Commit and push!"
echo ""
echo "🧪 Test your proxy:"
echo "   curl https://your-project.vercel.app/api/greetings"
echo ""

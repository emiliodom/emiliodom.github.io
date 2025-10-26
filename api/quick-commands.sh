#!/bin/bash
# Quick reference commands for NocoDB proxy management

echo "🔐 NocoDB Proxy - Quick Commands Reference"
echo "=========================================="
echo ""

show_help() {
    echo "Available commands:"
    echo ""
    echo "  ./quick-commands.sh cloudflare-deploy    Deploy to Cloudflare Workers"
    echo "  ./quick-commands.sh vercel-deploy        Deploy to Vercel"
    echo "  ./quick-commands.sh cloudflare-logs      View Cloudflare Worker logs"
    echo "  ./quick-commands.sh vercel-logs          View Vercel function logs"
    echo "  ./quick-commands.sh test-proxy URL       Test a proxy URL"
    echo "  ./quick-commands.sh update-token         Update NocoDB token"
    echo "  ./quick-commands.sh status               Check deployment status"
    echo ""
}

case "$1" in
    cloudflare-deploy)
        echo "🚀 Deploying to Cloudflare Workers..."
        cd cloudflare && wrangler deploy
        ;;
    
    vercel-deploy)
        echo "🚀 Deploying to Vercel..."
        cd vercel && vercel --prod
        ;;
    
    cloudflare-logs)
        echo "📋 Fetching Cloudflare Worker logs..."
        cd cloudflare && wrangler tail
        ;;
    
    vercel-logs)
        echo "📋 Fetching Vercel function logs..."
        cd vercel && vercel logs
        ;;
    
    test-proxy)
        if [ -z "$2" ]; then
            echo "❌ Error: Please provide proxy URL"
            echo "Usage: ./quick-commands.sh test-proxy https://your-proxy.workers.dev/api/greetings"
            exit 1
        fi
        echo "🧪 Testing proxy at: $2"
        echo ""
        echo "Testing GET request..."
        curl -v "$2"
        echo ""
        echo ""
        echo "Testing POST request..."
        curl -v -X POST "$2" \
          -H "Content-Type: application/json" \
          -d '{"Message":"Test message","User":"test-ip","Notes":"😊"}'
        ;;
    
    update-token)
        echo "🔑 Update NocoDB token"
        echo ""
        echo "Choose platform:"
        echo "1) Cloudflare Workers"
        echo "2) Vercel"
        read -p "Enter choice (1 or 2): " choice
        
        case $choice in
            1)
                echo "Updating Cloudflare Worker secret..."
                cd cloudflare && wrangler secret put NOCODB_TOKEN
                ;;
            2)
                echo "Updating Vercel environment variable..."
                cd vercel && vercel env rm NOCODB_TOKEN production && vercel env add NOCODB_TOKEN production
                ;;
            *)
                echo "❌ Invalid choice"
                exit 1
                ;;
        esac
        ;;
    
    status)
        echo "📊 Checking deployment status..."
        echo ""
        
        echo "Cloudflare Workers:"
        if command -v wrangler &> /dev/null; then
            cd cloudflare && wrangler deployments list 2>/dev/null || echo "  Not deployed or not logged in"
        else
            echo "  Wrangler not installed"
        fi
        
        echo ""
        echo "Vercel:"
        if command -v vercel &> /dev/null; then
            cd vercel && vercel ls 2>/dev/null || echo "  Not deployed or not logged in"
        else
            echo "  Vercel CLI not installed"
        fi
        ;;
    
    *)
        show_help
        ;;
esac

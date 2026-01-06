#!/bin/bash
set -e

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Error: .env file not found. Please create one based on .env.example"
    exit 1
fi

# Load environment variables
export $(grep -v '^#' .env | xargs)

# Validate required variables
if [ -z "$CAPROVER_HOST" ] || [ -z "$CAPROVER_PASSWORD" ] || [ -z "$CAPROVER_APP_NAME" ]; then
    echo "Error: Required deployment variables (CAPROVER_HOST, CAPROVER_PASSWORD, CAPROVER_APP_NAME) are not set in .env"
    exit 1
fi

echo "Building Next.js static site..."
npm run build

echo "Copying deployment files to out directory..."
cp nginx.conf captain-definition Dockerfile out/

echo "Deploying to CapRover..."
cd out
git init
git add .
git commit -m "deploy" || true
caprover deploy -h "$CAPROVER_HOST" -p "$CAPROVER_PASSWORD" -a "$CAPROVER_APP_NAME" -b "${CAPROVER_BRANCH:-main}"
cd ..

# Purge Cloudflare cache if credentials are provided
if [ ! -z "$CLOUDFLARE_ZONE_ID" ] && [ ! -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "Purging Cloudflare cache..."
    curl -X POST "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache" \
        -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
        -H "Content-Type: application/json" \
        --data '{"purge_everything":true}' \
        -s -o /dev/null
    
    if [ $? -eq 0 ]; then
        echo "✓ Cloudflare cache purged successfully"
    else
        echo "⚠ Warning: Cloudflare cache purge failed (check your credentials)"
    fi
else
    echo "ℹ Cloudflare credentials not provided, skipping cache purge"
    echo "  To enable cache purging, add CLOUDFLARE_ZONE_ID and CLOUDFLARE_API_TOKEN to .env"
fi

echo "Deployment complete!"

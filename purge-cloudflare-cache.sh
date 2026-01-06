#!/bin/bash
# Standalone script to purge Cloudflare cache
# Usage: ./purge-cloudflare-cache.sh

set -e

# Load environment variables from .env if it exists
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Check if credentials are provided
if [ -z "$CLOUDFLARE_ZONE_ID" ] || [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "Error: CLOUDFLARE_ZONE_ID and CLOUDFLARE_API_TOKEN must be set"
    echo ""
    echo "You can either:"
    echo "  1. Add them to your .env file"
    echo "  2. Export them as environment variables"
    echo ""
    echo "To get your Zone ID:"
    echo "  - Go to Cloudflare Dashboard > Your Domain > Overview"
    echo "  - Zone ID is shown in the right sidebar"
    echo ""
    echo "To create an API Token:"
    echo "  - Go to Cloudflare Dashboard > My Profile > API Tokens"
    echo "  - Create token with 'Zone.Cache Purge' permission"
    exit 1
fi

echo "Purging Cloudflare cache for zone: ${CLOUDFLARE_ZONE_ID}..."

# Purge everything
response=$(curl -X POST "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache" \
    -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
    -H "Content-Type: application/json" \
    --data '{"purge_everything":true}' \
    -w "\n%{http_code}" \
    -s)

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" -eq 200 ]; then
    echo "✓ Cloudflare cache purged successfully!"
    echo "$body" | grep -o '"success":[^,]*' || echo "Cache cleared"
else
    echo "✗ Error: Failed to purge cache (HTTP $http_code)"
    echo "$body"
    exit 1
fi


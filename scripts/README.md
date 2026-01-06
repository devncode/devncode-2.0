# Image Generation Script

This script generates all required image sizes from `public/logo.png`.

## Generated Images

- `favicon.png` (32x32) - Browser favicon
- `apple-touch-icon.png` (180x180) - iOS home screen icon
- `og-image.jpg` (1200x630) - Open Graph image for social sharing
- `icon-192.png` (192x192) - PWA icon (small)
- `icon-512.png` (512x512) - PWA icon (large)

## Usage

### Option 1: Using Sharp (Recommended)

1. Install Sharp:
   ```bash
   npm install --save-dev sharp
   ```

2. Run the script:
   ```bash
   npm run generate-images
   ```

### Option 2: Using ImageMagick

1. Install ImageMagick:
   ```bash
   # macOS
   brew install imagemagick
   
   # Linux
   sudo apt-get install imagemagick
   ```

2. Run the script:
   ```bash
   npm run generate-images
   ```

The script will automatically detect which tool is available and use it.

## Requirements

- `public/logo.png` must exist
- Either Sharp (npm package) or ImageMagick (system tool) must be installed


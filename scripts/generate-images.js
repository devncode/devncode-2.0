#!/usr/bin/env node

/**
 * Generate all required images from logo.png
 * 
 * This script generates:
 * - favicon.ico (16x16, 32x32, 48x48)
 * - apple-touch-icon.png (180x180)
 * - og-image.jpg (1200x630 for Open Graph)
 * - icon-192.png, icon-512.png (for manifest.json)
 * 
 * Requirements:
 * - Install sharp: npm install --save-dev sharp
 * - Or use ImageMagick: brew install imagemagick (macOS)
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const LOGO_PATH = path.join(PUBLIC_DIR, 'logo.png');

// Required image sizes
const IMAGES = {
  'favicon.ico': [{ size: 16 }, { size: 32 }, { size: 48 }],
  'apple-touch-icon.png': [{ size: 180 }],
  'og-image.jpg': [{ width: 1200, height: 630 }],
  'icon-192.png': [{ size: 192 }],
  'icon-512.png': [{ size: 512 }],
};

async function generateWithSharp() {
  const sharp = require('sharp');
  
  console.log('📸 Generating images using Sharp...\n');
  
  // Check if logo exists
  if (!fs.existsSync(LOGO_PATH)) {
    console.error(`❌ Logo not found at: ${LOGO_PATH}`);
    process.exit(1);
  }
  
  // Generate favicon.ico (multi-size ICO)
  try {
    const faviconSizes = [16, 32, 48];
    const faviconImages = await Promise.all(
      faviconSizes.map(size =>
        sharp(LOGO_PATH)
          .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .png()
          .toBuffer()
      )
    );
    
    // For ICO, we'll create a PNG and rename (browsers accept PNG as favicon)
    await sharp(faviconImages[1]) // Use 32x32 as base
      .resize(32, 32)
      .png()
      .toFile(path.join(PUBLIC_DIR, 'favicon.png'));
    
    console.log('✓ Generated favicon.png (32x32)');
  } catch (error) {
    console.warn('⚠ Could not generate favicon:', error.message);
  }
  
  // Generate apple-touch-icon.png
  try {
    await sharp(LOGO_PATH)
      .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));
    console.log('✓ Generated apple-touch-icon.png (180x180)');
  } catch (error) {
    console.warn('⚠ Could not generate apple-touch-icon:', error.message);
  }
  
  // Generate og-image.jpg
  try {
    await sharp(LOGO_PATH)
      .resize(1200, 630, { 
        fit: 'contain', 
        background: { r: 20, g: 20, b: 20, alpha: 1 } // Dark background
      })
      .jpeg({ quality: 90 })
      .toFile(path.join(PUBLIC_DIR, 'og-image.jpg'));
    console.log('✓ Generated og-image.jpg (1200x630)');
  } catch (error) {
    console.warn('⚠ Could not generate og-image:', error.message);
  }
  
  // Generate manifest icons
  try {
    await sharp(LOGO_PATH)
      .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(PUBLIC_DIR, 'icon-192.png'));
    console.log('✓ Generated icon-192.png');
    
    await sharp(LOGO_PATH)
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(PUBLIC_DIR, 'icon-512.png'));
    console.log('✓ Generated icon-512.png');
  } catch (error) {
    console.warn('⚠ Could not generate manifest icons:', error.message);
  }
  
  console.log('\n✅ Image generation complete!');
}

async function generateWithImageMagick() {
  const { execSync } = require('child_process');
  
  console.log('📸 Generating images using ImageMagick...\n');
  
  if (!fs.existsSync(LOGO_PATH)) {
    console.error(`❌ Logo not found at: ${LOGO_PATH}`);
    process.exit(1);
  }
  
  try {
    // Favicon (32x32 PNG, browsers accept PNG as favicon)
    execSync(`convert "${LOGO_PATH}" -resize 32x32 -background transparent "${path.join(PUBLIC_DIR, 'favicon.png')}"`, { stdio: 'inherit' });
    console.log('✓ Generated favicon.png');
    
    // Apple touch icon
    execSync(`convert "${LOGO_PATH}" -resize 180x180 -background transparent "${path.join(PUBLIC_DIR, 'apple-touch-icon.png')}"`, { stdio: 'inherit' });
    console.log('✓ Generated apple-touch-icon.png');
    
    // OG Image
    execSync(`convert "${LOGO_PATH}" -resize 1200x630 -background "#141414" -gravity center -extent 1200x630 "${path.join(PUBLIC_DIR, 'og-image.jpg')}"`, { stdio: 'inherit' });
    console.log('✓ Generated og-image.jpg');
    
    // Manifest icons
    execSync(`convert "${LOGO_PATH}" -resize 192x192 -background transparent "${path.join(PUBLIC_DIR, 'icon-192.png')}"`, { stdio: 'inherit' });
    console.log('✓ Generated icon-192.png');
    
    execSync(`convert "${LOGO_PATH}" -resize 512x512 -background transparent "${path.join(PUBLIC_DIR, 'icon-512.png')}"`, { stdio: 'inherit' });
    console.log('✓ Generated icon-512.png');
    
    console.log('\n✅ Image generation complete!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Main execution
async function main() {
  // Try Sharp first (Node.js solution)
  try {
    require.resolve('sharp');
    await generateWithSharp();
  } catch (error) {
    // Try ImageMagick
    try {
      require('child_process').execSync('which convert', { stdio: 'ignore' });
      await generateWithImageMagick();
    } catch (error2) {
      console.error('❌ Neither Sharp nor ImageMagick found!\n');
      console.log('Please install one of the following:');
      console.log('  1. Sharp (recommended): npm install --save-dev sharp');
      console.log('  2. ImageMagick: brew install imagemagick (macOS) or apt-get install imagemagick (Linux)');
      process.exit(1);
    }
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { generateWithSharp, generateWithImageMagick };


#!/usr/bin/env node

/**
 * Generate email icon images
 * 
 * This script generates PNG icons for email templates:
 * - calendar-icon.png (terracotta #cc775c)
 * - location-icon.png (terracotta #cc775c)
 * - facebook-icon.png (white #ffffff)
 * - instagram-icon.png (white #ffffff)
 * - linkedin-icon.png (white #ffffff)
 * 
 * Requirements:
 * - Install sharp: npm install --save-dev sharp
 */

const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '..', 'public', 'icons');
const SIZE = 40; // 40x40px for retina, will be displayed at 20x20

// Ensure icons directory exists
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

// SVG templates for each icon
const ICONS = {
  'calendar-icon.png': {
    color: '#cc775c',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 24 24" fill="none" stroke="#cc775c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>`
  },
  'location-icon.png': {
    color: '#cc775c',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 24 24" fill="none" stroke="#cc775c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>`
  },
  'facebook-icon.png': {
    color: '#ffffff',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 24 24" fill="#ffffff">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
    </svg>`
  },
  'instagram-icon.png': {
    color: '#ffffff',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 24 24" fill="#ffffff">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
    </svg>`
  },
  'linkedin-icon.png': {
    color: '#ffffff',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 24 24" fill="#ffffff">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
    </svg>`
  }
};

async function generateWithSharp() {
  const sharp = require('sharp');
  
  console.log('📸 Generating email icons using Sharp...\n');
  
  for (const [filename, { svg }] of Object.entries(ICONS)) {
    try {
      const outputPath = path.join(ICONS_DIR, filename);
      const svgBuffer = Buffer.from(svg);
      
      await sharp(svgBuffer)
        .resize(SIZE, SIZE)
        .png()
        .toFile(outputPath);
      
      console.log(`✓ Generated ${filename} (${SIZE}x${SIZE})`);
    } catch (error) {
      console.error(`❌ Error generating ${filename}:`, error.message);
    }
  }
  
  console.log('\n✅ Email icon generation complete!');
  console.log(`📁 Icons saved to: ${ICONS_DIR}`);
}

async function main() {
  try {
    require.resolve('sharp');
    await generateWithSharp();
  } catch (error) {
    console.error('❌ Sharp not found!\n');
    console.log('Please install Sharp:');
    console.log('  npm install --save-dev sharp');
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { generateWithSharp };

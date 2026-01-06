# DevnCode 2.0 🚀

**Connecting Developers, City by City.**

DevnCode exists to strengthen developer communities — city by city — by helping developers discover events, connect with peers, and level up through real-world learning and collaboration.

## 🌟 About DevnCode

**Developers don't grow alone.** We grow by learning together, sharing real experiences, and showing up for each other.

DevnCode helps developers discover events, connect with peers, and grow through real-world learning and collaboration. No noise. No gatekeeping. Just community.

## 🎯 Vision

A strong developer community in every city.

## 🚀 Mission

To help developers discover events, connect with peers, and grow through real-world learning and collaboration.

## ✨ Features

- **Modern Design**: Clean, responsive UI with dark mode support
- **Event Showcase**: Dedicated pages for signature events like "Hitting The AI"
- **Team Profiles**: Meet the people driving DevnCode's mission forward
- **Community Focus**: Built to inspire and connect developers across Pakistan
- **Fully Responsive**: Optimized for mobile, tablet, and desktop experiences
- **SEO Optimized**: Complete metadata, Open Graph tags, structured data, and sitemap
- **Analytics Ready**: Mixpanel integration with event tracking
- **Security Hardened**: Comprehensive security headers and best practices
- **Accessibility**: ARIA labels, skip links, semantic HTML, and keyboard navigation

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Font**: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) via Next.js Font Optimization
- **Analytics**: Mixpanel
- **SEO**: Open Graph, Twitter Cards, Structured Data (JSON-LD)
- **Deployment**: Static export with nginx/CapRover

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/devncode/devncode-2.0.git
cd devncode-2.0
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` and configure the following variables:

```env
# Mixpanel Analytics (optional but recommended)
NEXT_PUBLIC_MIXPANEL_TOKEN=

# Site Configuration
NEXT_PUBLIC_SITE_URL=

# Registration Links
NEXT_PUBLIC_REGISTRATION_URL=
NEXT_PUBLIC_COMMUNITY_JOIN_URL=

# Deployment (for CapRover deployment)
CAPROVER_HOST=
CAPROVER_PASSWORD=
CAPROVER_APP_NAME=
CAPROVER_BRANCH=
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## 📁 Project Structure

```
devncode/
├── app/
│   ├── components/          # Reusable React components
│   │   ├── Header.js        # Navigation header with dark mode
│   │   ├── Footer.js        # Footer with social links
│   │   ├── ThemeProvider.js # Theme context provider
│   │   ├── Mixpanel.js      # Mixpanel integration
│   │   └── TrackedLink.js   # Link component with analytics
│   ├── lib/                 # Utility functions
│   │   └── mixpanel.js      # Mixpanel utilities
│   ├── meetup/              # Event pages
│   │   └── page.js          # "Hitting The AI" event page
│   ├── page.js              # Homepage
│   ├── layout.js            # Root layout with metadata
│   ├── not-found.js         # Custom 404 page
│   ├── sitemap.js           # Dynamic sitemap generation
│   └── globals.css          # Global styles
├── public/                  # Static assets
│   ├── .well-known/         # Well-known URLs
│   │   └── security.txt     # Security contact info
│   ├── robots.txt           # Search engine directives
│   └── security.txt         # Security.txt (legacy location)
├── nginx.conf               # Nginx configuration
├── Dockerfile               # Docker build configuration
├── deploy.sh                # Deployment script
└── tailwind.config.js       # Tailwind configuration
```

## 🎨 Design System

### Color Palette

- **Terracotta**: `#D97757` - Primary accent color
- **Beige**: `#F9F8F6` - Light theme background
- **Custom Black**: `#2a2a2c` - Dark theme background

### Typography

- **Primary Font**: Space Grotesk (optimized via Next.js font optimization)
- Responsive font sizes with mobile-first approach
- Automatic font subsetting and optimization for performance

## 📝 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (static export)
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint and fix auto-fixable issues
- `npm run generate-images` - Generate favicon, icons, and OG images from logo.png

### Analytics Setup

1. Create a Mixpanel project at [Mixpanel](https://mixpanel.com/)
2. Get your Project Token from your Mixpanel project settings
3. Add it to your `.env` file as `NEXT_PUBLIC_MIXPANEL_TOKEN`
4. The site will automatically track:
   - **Page views** (automatically tracked by Mixpanel on each page load)
   - Button clicks (Register, Join Community, etc.)
   - Social media link clicks
   - Theme toggles
   - Menu interactions

All events are tracked with useful properties like `category` and `label` for better segmentation in Mixpanel. Page views are automatically tracked by Mixpanel when each HTML page loads.

### SEO Configuration

The site includes:
- Open Graph metadata for social sharing
- Twitter Card support
- Structured data (JSON-LD) for Organization and Events
- Dynamic sitemap generation
- robots.txt configuration
- Canonical URLs

Update `NEXT_PUBLIC_SITE_URL` in your `.env` file to match your production domain.

### Security

Security features implemented:
- Content Security Policy (CSP)
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Referrer Policy
- Permissions Policy
- Security.txt file for responsible disclosure
- All external links use `rel="noopener noreferrer"`

For deployment, ensure your server supports HTTPS and configure HSTS headers appropriately.

### Code Style

This project follows Next.js and React best practices:

- Functional components with hooks
- Client components marked with `"use client"`
- Responsive design with Tailwind CSS utilities
- Dark mode support throughout

## 🤝 Contributing

We welcome contributions! If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🚀 Deployment

### Static Export

The site is configured for static export:

```bash
npm run build
```

This generates a static site in the `out/` directory.

### CapRover Deployment

1. Add deployment credentials to `.env`:
   ```env
   CAPROVER_HOST=your-captain-host
   CAPROVER_PASSWORD=your-password
   CAPROVER_APP_NAME=devncode2
   CLOUDFLARE_ZONE_ID=your-zone-id  # Optional
   CLOUDFLARE_API_TOKEN=your-api-token  # Optional
   ```

2. Deploy:
   ```bash
   ./deploy.sh
   ```

The script builds, deploys, and purges Cloudflare cache automatically.

### Cloudflare Cache

Cache is automatically purged on deployment. Add `CLOUDFLARE_ZONE_ID` and `CLOUDFLARE_API_TOKEN` to `.env` to enable.

**Cache Strategy:** HTML files are not cached (always fresh), static assets are cached for 1 year.

## 📄 License

This project is maintained by DevnCode. All rights reserved © 2026.

## 🔗 Connect With Us

- **Facebook**: [devncode17](https://www.facebook.com/devncode17)
- **Instagram**: [@devncode](https://www.instagram.com/devncode)
- **LinkedIn**: [devncode](https://www.linkedin.com/company/devncode/)

---

**Built with ❤️ by the DevnCode Team**

_Connecting Developers, City by City._

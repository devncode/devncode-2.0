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

Edit `.env` with your configuration.

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (static export)
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint and fix auto-fixable issues
- `npm run generate-images` - Generate favicon, icons, and OG images from logo.png

## 🚀 Deployment

### Static Export

```bash
npm run build
```

This generates a static site in the `out/` directory.

### CapRover Deployment

1. Add deployment credentials to `.env`:

2. Deploy:
```bash
./deploy.sh
```

The script builds, deploys, and purges Cloudflare cache automatically.

## 🤝 Contributing

We welcome contributions! If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is maintained by DevnCode. All rights reserved © 2026.

## 🔗 Connect With Us

- **Facebook**: [devncode17](https://www.facebook.com/devncode17)
- **Instagram**: [@devncode](https://www.instagram.com/devncode)
- **LinkedIn**: [devncode](https://www.linkedin.com/company/devncode/)

---

**Built with ❤️ by the DevnCode Team**

_Connecting Developers, City by City._

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
};

console.log('🔨 Building with:', {
  nodeEnv: process.env.NODE_ENV || 'development',
  hasMixpanel: !!process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://devncode.tech',
});

export default nextConfig;

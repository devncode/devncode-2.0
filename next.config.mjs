/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
};

// Only log build info in development
if (process.env.NODE_ENV === 'development') {
  console.log('🔨 Building with:', {
    nodeEnv: process.env.NODE_ENV || 'development',
    hasMixpanel: !!process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://devncode.tech',
  });
}

export default nextConfig;

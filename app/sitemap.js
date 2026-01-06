const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://devncode.tech";

// Required for static export
export const dynamic = 'force-static';

export default function sitemap() {
  const routes = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/meetup`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  return routes;
}


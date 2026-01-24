import { SITE_URL } from "./lib/config";
import { getCommunities } from "./lib/db";
import { generateSlug } from "./lib/slug";

// Required for static export
export const dynamic = 'force-static';

export default async function sitemap() {
  const baseRoutes = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/meetup`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/register`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/communities`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/events`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Fetch communities and generate dynamic routes
  try {
    const communities = await getCommunities();
    const activeCommunities = communities.filter(
      (c) => c.isActive && !c.isDeleted
    );
    
    const communityRoutes = activeCommunities.map((community) => ({
      url: `${SITE_URL}/communities/${generateSlug(community.title)}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    return [...baseRoutes, ...communityRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return base routes if community fetch fails
    return baseRoutes;
  }
}


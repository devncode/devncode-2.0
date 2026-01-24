import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BackNavigation from "../../components/BackNavigation";
import EventCard from "../../components/EventCard";
import ScrollAnimation from "../../components/ScrollAnimation";
import { getCommunities, getEvents } from "../../lib/db";
import { generateSlug, findCommunityBySlug } from "../../lib/slug";
import { SITE_URL } from "../../lib/config";

// Generate static params for all communities
export async function generateStaticParams() {
  const communitiesData = await getCommunities();
  const activeCommunities = communitiesData.filter(
    (c) => c.isActive && !c.isDeleted
  );

  return activeCommunities.map((community) => ({
    slug: generateSlug(community.title),
  }));
}

// Generate metadata for each community
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const communitiesData = await getCommunities();
  // Only search active, non-deleted communities
  const activeCommunities = communitiesData.filter(
    (c) => c.isActive && !c.isDeleted
  );
  const community = findCommunityBySlug(activeCommunities, slug);

  if (!community) {
    return {
      title: "Community Not Found | DevnCode",
    };
  }

  // Strip HTML from description for meta description
  const description = community.description
    ? community.description.replace(/<[^>]*>/g, "").substring(0, 160)
    : `${community.title} - Developer community in Pakistan`;

  return {
    title: `${community.title} | DevnCode Ecosystem`,
    description,
    openGraph: {
      title: `${community.title} | DevnCode Ecosystem`,
      description,
      url: `${SITE_URL}/communities/${slug}`,
      images: community.logo
        ? [
            {
              url: community.logo,
              width: 1200,
              height: 630,
              alt: community.title,
            },
          ]
        : [],
    },
  };
}

export default async function CommunityDetailPage({ params }) {
  const { slug } = await params;
  
  // Fetch data from MongoDB
  const communitiesData = await getCommunities();
  const eventsData = await getEvents();
  
  // Only search active, non-deleted communities
  const activeCommunities = communitiesData.filter(
    (c) => c.isActive && !c.isDeleted
  );
  const community = findCommunityBySlug(activeCommunities, slug);

  if (!community) {
    notFound();
  }

  // Find events for this community
  const communityEvents = eventsData
    .filter(
      (event) =>
        event.status === true &&
        !event.isDeleted &&
        event.community?.title === community.title
    )
    .sort((a, b) => {
      const dateA = a.start_datetime?.$date
        ? new Date(a.start_datetime.$date).getTime()
        : 0;
      const dateB = b.start_datetime?.$date
        ? new Date(b.start_datetime.$date).getTime()
        : 0;
      return dateB - dateA; // Descending (most recent first)
    });

  // Extract city from title
  const cityPatterns = [
    { pattern: /\bKarachi\b/i, city: "Karachi" },
    { pattern: /\bLahore\b/i, city: "Lahore" },
    { pattern: /\bIslamabad\b/i, city: "Islamabad" },
    { pattern: /\bPeshawar\b/i, city: "Peshawar" },
    { pattern: /\bHyderabad\b/i, city: "Hyderabad" },
    { pattern: /\bAbbottabad\b/i, city: "Abbottabad" },
    { pattern: /\bSahiwal\b/i, city: "Sahiwal" },
    { pattern: /\bRawalpindi\b/i, city: "Rawalpindi" },
  ];

  let city = null;
  for (const { pattern, city: cityName } of cityPatterns) {
    if (pattern.test(community.title)) {
      city = cityName;
      break;
    }
  }

  return (
    <>
      {/* Back Navigation */}
      <BackNavigation />

      {/* Hero Section */}
      <section className="pb-12 md:pb-20">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-lg overflow-hidden bg-black/5 dark:bg-white/10">
                {community.logo ? (
                  <Image
                    src={community.logo}
                    alt={community.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 128px, 160px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-black/20 dark:text-white/20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              {city && (
                <span className="inline-block text-sm text-terracotta font-semibold mb-3">
                  {city}
                </span>
              )}
              <h1 className="text-3xl md:text-5xl font-space-grotesk font-bold text-custom-black dark:text-beige mb-4">
                {community.title}
              </h1>

              {/* Categories */}
              {community.categories && community.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {community.categories.map((category, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 text-sm bg-terracotta/10 text-terracotta rounded-full font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}

              {/* Social Links */}
              <div className="flex flex-wrap gap-4 mb-6">
                {community.fb_link && (
                  <a
                    href={community.fb_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg hover:border-terracotta transition-colors text-custom-black dark:text-beige"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </a>
                )}
                {community.website_link && (
                  <a
                    href={community.website_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg hover:border-terracotta transition-colors text-custom-black dark:text-beige"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                    Website
                  </a>
                )}
                {community.fb_group && (
                  <a
                    href={community.fb_group}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg hover:border-terracotta transition-colors text-custom-black dark:text-beige"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook Group
                  </a>
                )}
              </div>

              {/* Description */}
              {community.description && (
                <div
                  className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-custom-black/70 dark:text-beige/70"
                  dangerouslySetInnerHTML={{ __html: community.description }}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      {communityEvents.length > 0 && (
        <ScrollAnimation>
          <section className="py-12 md:py-20 bg-black/[0.03] dark:bg-white/[0.03] transition-colors">
            <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
              <h2 className="text-2xl md:text-3xl font-space-grotesk font-semibold text-custom-black dark:text-beige mb-8">
                Events by {community.title}
              </h2>
              <div className="space-y-4">
                {communityEvents.map((event, index) => (
                  <ScrollAnimation key={event._id?.$oid || index} delay={index * 50}>
                    <EventCard event={event} communities={activeCommunities} />
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </section>
        </ScrollAnimation>
      )}
    </>
  );
}

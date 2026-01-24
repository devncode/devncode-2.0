import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import { generateSlug, findCommunityBySlug } from "../lib/slug";

export default function EventCard({ event, communities = [] }) {
  if (!event || !event.title) {
    return null;
  }

  const { title, cover_image, start_datetime, community, venue } = event;

  // Format date
  const eventDate = start_datetime?.$date
    ? new Date(start_datetime.$date)
    : null;
  const formattedDate = eventDate && !isNaN(eventDate.getTime())
    ? eventDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  // Check if community exists in communities before creating link
  const communitySlug = community?.title ? (() => {
    const activeCommunities = communities.filter(
      (c) => c.isActive && !c.isDeleted
    );
    const foundCommunity = findCommunityBySlug(activeCommunities, generateSlug(community.title));
    return foundCommunity ? generateSlug(community.title) : null;
  })() : null;

  return (
    <div className="bg-white dark:bg-white/5 p-4 md:p-6 rounded-lg border border-black/20 dark:border-white/20 transition-all duration-300 hover:border-terracotta dark:hover:border-terracotta hover:shadow-lg flex gap-4 md:gap-6 min-h-[120px] shadow-md w-full">
      {/* Cover Image */}
      <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 relative rounded-lg overflow-hidden bg-black/5 dark:bg-white/10">
        {cover_image ? (
          <Image
            src={cover_image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 96px, 128px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-black/20 dark:text-white/20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="text-lg md:text-xl font-space-grotesk font-bold text-custom-black dark:text-beige mb-2 leading-tight">
          {title}
        </h3>

        <div className="flex flex-wrap gap-3 md:gap-4 text-sm text-custom-black/80 dark:text-beige/80 mb-3">
          {formattedDate && (
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{formattedDate}</span>
            </div>
          )}

          {venue?.title && (
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="truncate">{venue.title}</span>
            </div>
          )}
        </div>

        {community && (
          <div className="flex items-center gap-2">
            {community.logo && (
              <div className="w-6 h-6 relative rounded overflow-hidden flex-shrink-0">
                <Image
                  src={community.logo}
                  alt={community.title}
                  fill
                  className="object-cover"
                  sizes="24px"
                />
              </div>
            )}
            {communitySlug ? (
              <Link
                href={`/communities/${communitySlug}`}
                className="text-sm text-terracotta hover:underline font-medium"
              >
                {community.title}
              </Link>
            ) : (
              <span className="text-sm text-custom-black/60 dark:text-beige/60">
                {community.title}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    cover_image: PropTypes.string,
    start_datetime: PropTypes.shape({
      $date: PropTypes.string,
    }),
    community: PropTypes.shape({
      title: PropTypes.string,
      logo: PropTypes.string,
    }),
    venue: PropTypes.shape({
      title: PropTypes.string,
    }),
  }).isRequired,
  communities: PropTypes.arrayOf(PropTypes.object),
};

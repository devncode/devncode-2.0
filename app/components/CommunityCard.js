import Image from "next/image";
import PropTypes from "prop-types";
import Link from "next/link";
import { generateSlug } from "../lib/slug";
import { event } from "../lib/mixpanel";
import { trackExternalLink } from "../lib/analytics";
import { FacebookIcon, GlobeIcon } from "./icons";

export default function CommunityCard({ title, logo, city, categories, fb_link, website_link }) {
  const slug = generateSlug(title);

  return (
    <Link
      href={`/communities/${slug}`}
      className="block h-full"
    >
      <div className="bg-white dark:bg-white/5 p-6 md:p-8 rounded-lg border border-black/10 dark:border-white/10 transition-all duration-300 hover:border-terracotta dark:hover:border-terracotta hover:shadow-xl hover:-translate-y-1 h-full flex flex-col cursor-pointer">
      {/* Logo */}
      <div className="w-20 h-20 mx-auto mb-4 relative rounded-lg overflow-hidden bg-black/5 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
        {logo ? (
          <Image
            src={logo}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80px, 80px"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "block";
            }}
          />
        ) : null}
        <svg
          className="w-10 h-10 text-black/20 dark:text-white/20"
          fill="currentColor"
          viewBox="0 0 24 24"
          style={{ display: logo ? "none" : "block" }}
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* City Badge */}
        {city && city !== "All Pakistan" && (
          <span className="inline-block text-xs text-terracotta font-semibold mb-2 self-start">
            {city}
          </span>
        )}

        {/* Title */}
        <h3 className="text-lg font-space-grotesk font-bold text-custom-black dark:text-beige mb-3 leading-tight">
          {title}
        </h3>

        {/* Categories */}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.slice(0, 2).map((category, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 text-xs bg-terracotta/10 text-terracotta rounded-full font-medium"
              >
                {category}
              </span>
            ))}
            {categories.length > 2 && (
              <span className="inline-block px-2 py-1 text-xs bg-black/5 dark:bg-white/10 text-custom-black dark:text-beige rounded-full font-medium">
                +{categories.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Social Links */}
        <div className="flex gap-3 mt-auto pt-2" onClick={(e) => e.stopPropagation()}>
          {fb_link && (
            <a
              href={fb_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => event(trackExternalLink("Facebook", fb_link))}
              className="text-custom-black/60 dark:text-beige/60 hover:text-terracotta transition-colors"
              aria-label={`${title} Facebook`}
            >
              <FacebookIcon />
            </a>
          )}
          {website_link && (
            <a
              href={website_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => event(trackExternalLink("Website", website_link))}
              className="text-custom-black/60 dark:text-beige/60 hover:text-terracotta transition-colors"
              aria-label={`${title} Website`}
            >
              <GlobeIcon />
            </a>
          )}
        </div>
      </div>
      </div>
    </Link>
  );
}

CommunityCard.propTypes = {
  title: PropTypes.string.isRequired,
  logo: PropTypes.string,
  city: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string),
  fb_link: PropTypes.string,
  website_link: PropTypes.string,
};

"use client";

import { event } from "../lib/mixpanel";
import { trackExternalLink } from "../lib/analytics";
import { FacebookIcon, GlobeIcon } from "./icons";

export default function CommunityExternalLinks({ fb_link, website_link, fb_group }) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {fb_link && (
        <a
          href={fb_link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => event(trackExternalLink("Facebook", fb_link))}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg hover:border-terracotta transition-colors text-custom-black dark:text-beige"
        >
          <FacebookIcon />
          Facebook
        </a>
      )}
      {website_link && (
        <a
          href={website_link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => event(trackExternalLink("Website", website_link))}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg hover:border-terracotta transition-colors text-custom-black dark:text-beige"
        >
          <GlobeIcon />
          Website
        </a>
      )}
      {fb_group && (
        <a
          href={fb_group}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => event(trackExternalLink("Facebook Group", fb_group))}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg hover:border-terracotta transition-colors text-custom-black dark:text-beige"
        >
          <FacebookIcon />
          Facebook Group
        </a>
      )}
    </div>
  );
}

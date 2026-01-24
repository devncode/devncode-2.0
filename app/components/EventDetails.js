"use client";

import PropTypes from "prop-types";
import { event } from "../lib/mixpanel";
import { trackExternalLink } from "../lib/analytics";

export default function EventDetails({ event }) {
  if (!event || !event.location) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 mt-10">
      <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start pt-6 border-t border-black/10 dark:border-white/10 transition-colors">
        {/* Date Box */}
        {event.date && (
          <div>
            <span className="inline-block text-xs mb-2 text-custom-black/60 dark:text-beige/60 uppercase tracking-wider font-semibold">
              Date & Time
            </span>
            <p className="m-0 font-semibold text-[1.1rem] text-custom-black dark:text-beige transition-colors">
              {event.date}
            </p>
            {event.time && (
              <p className="m-0 text-sm text-custom-black/70 dark:text-beige/70 transition-colors">
                {event.time}
                {event.timeNote && (
                  <span className="block text-xs opacity-80 mt-1">
                    {event.timeNote}
                  </span>
                )}
              </p>
            )}
          </div>
        )}

        {/* Location Box */}
        <div>
          <span className="inline-block text-xs mb-2 text-custom-black/60 dark:text-beige/60 uppercase tracking-wider font-semibold">
            Location
          </span>
          <div className="flex flex-col gap-1">
            <p className="m-0 font-semibold text-[1.1rem] text-custom-black dark:text-beige transition-colors">
              {event.location.name}
            </p>
            {event.location.address && (
              <p className="m-0 text-[0.95rem] text-custom-black/70 dark:text-beige/70 max-w-[300px] leading-normal transition-colors">
                {event.location.address}
              </p>
            )}
            {event.location.mapUrl && (
              <a
                href={event.location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => event(trackExternalLink("Map", event.location.mapUrl))}
                className="inline-flex items-center gap-1.5 mt-2 font-medium underline text-terracotta"
              >
                📍 View on Map
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

EventDetails.propTypes = {
  event: PropTypes.shape({
    date: PropTypes.string,
    time: PropTypes.string,
    timeNote: PropTypes.string,
    location: PropTypes.shape({
      name: PropTypes.string.isRequired,
      address: PropTypes.string,
      mapUrl: PropTypes.string,
    }).isRequired,
    agenda: PropTypes.arrayOf(
      PropTypes.shape({
        time: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        speaker: PropTypes.string,
      })
    ),
  }),
};


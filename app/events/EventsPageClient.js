"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import EventCard from "../components/EventCard";
import ScrollAnimation from "../components/ScrollAnimation";

// City extraction utility (same as communities)
function extractCity(title) {
  const cityPatterns = [
    { pattern: /\bKarachi\b/i, city: "Karachi" },
    { pattern: /\bLahore\b/i, city: "Lahore" },
    { pattern: /\bIslamabad\b/i, city: "Islamabad" },
    { pattern: /\bPeshawar\b/i, city: "Peshawar" },
    { pattern: /\bHyderabad\b/i, city: "Hyderabad" },
    { pattern: /\bAbbottabad\b/i, city: "Abbottabad" },
    { pattern: /\bSahiwal\b/i, city: "Sahiwal" },
    { pattern: /\bRawalpindi\b/i, city: "Rawalpindi" },
    { pattern: /\bQuetta\b/i, city: "Quetta" },
    { pattern: /\bFaisalabad\b/i, city: "Faisalabad" },
    { pattern: /\bMultan\b/i, city: "Multan" },
  ];

  for (const { pattern, city } of cityPatterns) {
    if (pattern.test(title)) {
      return city;
    }
  }

  return null;
}

// Process and filter events
function processEvents(data) {
  return data
    .filter((event) => event.status === true && !event.isDeleted)
    .map((event) => {
      const city =
        extractCity(event.venue?.title || "") ||
        extractCity(event.community?.title || "") ||
        null;
      return {
        ...event,
        city,
        year: event.start_datetime?.$date
          ? new Date(event.start_datetime.$date).getFullYear()
          : null,
        month: event.start_datetime?.$date
          ? new Date(event.start_datetime.$date).toLocaleString("default", {
              month: "long",
            })
          : null,
      };
    })
    .sort((a, b) => {
      const dateA = a.start_datetime?.$date
        ? new Date(a.start_datetime.$date).getTime()
        : 0;
      const dateB = b.start_datetime?.$date
        ? new Date(b.start_datetime.$date).getTime()
        : 0;
      return dateB - dateA; // Descending (most recent first)
    });
}

const ITEMS_PER_PAGE = 20;

export default function EventsPageClient({ events, communities }) {
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loadMoreRef = useRef(null);

  // Process events once
  const processedEvents = useMemo(() => processEvents(events), [events]);

  // Extract unique cities and years
  const cities = useMemo(() => {
    const citySet = new Set(
      processedEvents.map((e) => e.city).filter((c) => c !== null)
    );
    return ["All Cities", ...Array.from(citySet).sort()];
  }, [processedEvents]);

  const years = useMemo(() => {
    const yearSet = new Set(
      processedEvents.map((e) => e.year).filter((y) => y !== null)
    );
    return ["All Years", ...Array.from(yearSet).sort((a, b) => b - a)];
  }, [processedEvents]);

  // Filter events
  const filteredEvents = useMemo(() => {
    return processedEvents.filter((event) => {
      // City filter
      if (selectedCity !== "All Cities") {
        if (event.city !== selectedCity) {
          return false;
        }
      }

      // Year filter
      if (selectedYear !== "All Years") {
        if (event.year !== parseInt(selectedYear)) {
          return false;
        }
      }

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        if (!event.title.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      return true;
    });
  }, [processedEvents, selectedCity, selectedYear, searchTerm]);

  // Visible events (for infinite scroll)
  const visibleEvents = useMemo(() => {
    return filteredEvents.slice(0, visibleCount);
  }, [filteredEvents, visibleCount]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [selectedCity, selectedYear, searchTerm]);

  // Infinite scroll observer
  useEffect(() => {
    if (visibleEvents.length >= filteredEvents.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + ITEMS_PER_PAGE, filteredEvents.length)
          );
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [visibleEvents.length, filteredEvents.length]);

  // Group visible events by year/month for display
  const displayGroups = useMemo(() => {
    const groups = {};
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    
    visibleEvents.forEach((event) => {
      // Handle events without dates by putting them in "Unknown" group
      const year = event.year || "Unknown";
      const month = event.month || "Unknown";
      const key = `${year}-${month}`;
      
      if (!groups[key]) {
        groups[key] = {
          year,
          month,
          events: [],
        };
      }
      groups[key].events.push(event);
    });
    
    return Object.values(groups).sort((a, b) => {
      if (a.year === "Unknown") return 1;
      if (b.year === "Unknown") return -1;
      if (a.year !== b.year) return b.year - a.year;
      if (a.month === "Unknown" || b.month === "Unknown") return 0;
      return months.indexOf(b.month) - months.indexOf(a.month);
    });
  }, [visibleEvents]);

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[40vh] md:min-h-[50vh] flex items-center pt-[100px] md:pt-[140px] pb-[40px] md:pb-[60px]">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
          <div className="max-w-[800px] animate-fade-in">
            <span className="inline-block text-[0.75rem] md:text-[0.85rem] tracking-widest uppercase text-terracotta font-semibold mb-4">
              Event History
            </span>
            <h1 className="text-4xl md:text-6xl mb-6 font-space-grotesk font-semibold leading-tight dark:text-beige">
              525+ Events Hosted
            </h1>
            <p className="text-lg md:text-xl max-w-[600px] mb-8 text-custom-black/70 dark:text-beige/70 leading-relaxed transition-colors">
              Explore the developer community&apos;s event history across Pakistan, organized by year and city.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <ScrollAnimation>
        <section className="py-8 md:py-12 bg-black/[0.03] dark:bg-white/[0.03] transition-colors sticky top-[100px] z-40 backdrop-blur-sm">
          <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
            {/* Search */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg focus:outline-none focus:border-terracotta transition-colors text-custom-black dark:text-beige placeholder:text-custom-black/40 dark:placeholder:text-beige/40"
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-custom-black/40 dark:text-beige/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              {/* City Filter */}
              <div>
                <label className="block text-sm font-semibold text-custom-black dark:text-beige mb-2">
                  City
                </label>
                <div className="flex flex-wrap gap-2">
                  {cities.slice(0, 8).map((city) => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedCity === city
                          ? "bg-terracotta text-white"
                          : "bg-white dark:bg-white/5 text-custom-black dark:text-beige border border-black/10 dark:border-white/10 hover:border-terracotta"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year Filter */}
              <div>
                <label className="block text-sm font-semibold text-custom-black dark:text-beige mb-2">
                  Year
                </label>
                <div className="flex flex-wrap gap-2">
                  {years.slice(0, 8).map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedYear === year
                          ? "bg-terracotta text-white"
                          : "bg-white dark:bg-white/5 text-custom-black dark:text-beige border border-black/10 dark:border-white/10 hover:border-terracotta"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Timeline Section */}
      <section className="py-12 md:py-20">
          <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
            {/* Results Counter */}
            <div className="mb-8">
              <p className="text-lg text-custom-black/70 dark:text-beige/70">
                Showing <span className="font-semibold text-custom-black dark:text-beige">{visibleEvents.length}</span> of{" "}
                <span className="font-semibold text-custom-black dark:text-beige">{filteredEvents.length}</span> events
              </p>
            </div>

            {/* Timeline */}
            {visibleEvents.length > 0 ? (
              <div className="space-y-12">
                {displayGroups.length > 0 ? (
                  displayGroups.map((group, groupIndex) => {
                    const isNewYear =
                      groupIndex === 0 ||
                      displayGroups[groupIndex - 1].year !== group.year;
                    return (
                      <div key={`${group.year}-${group.month}`}>
                        {/* Year Header */}
                        {isNewYear && group.year !== "Unknown" && (
                          <h2 className="text-3xl md:text-4xl font-space-grotesk font-bold text-custom-black dark:text-beige mb-6 mt-8">
                            {group.year}
                          </h2>
                        )}

                        {/* Month Header */}
                        {group.month !== "Unknown" && (
                          <h3 className="text-xl md:text-2xl font-space-grotesk font-semibold text-terracotta mb-4">
                            {group.month}
                          </h3>
                        )}

                        {/* Events */}
                        <div className="space-y-4">
                          {group.events.map((event, index) => (
                            <ScrollAnimation key={event._id?.$oid || index} delay={index * 50}>
                              <EventCard event={event} communities={communities} />
                            </ScrollAnimation>
                          ))}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  // Fallback: show events without grouping
                  <div className="space-y-4">
                    {visibleEvents.map((event, index) => (
                      <ScrollAnimation key={event._id?.$oid || index} delay={index * 50}>
                        <EventCard event={event} communities={communities} />
                      </ScrollAnimation>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-custom-black/60 dark:text-beige/60">
                  No events found matching your filters.
                </p>
              </div>
            )}

            {/* Infinite Scroll Trigger */}
            {visibleEvents.length < filteredEvents.length && (
              <div
                ref={loadMoreRef}
                className="h-20 flex items-center justify-center mt-12"
              >
                <div className="text-custom-black/40 dark:text-beige/40">
                  Loading more...
                </div>
              </div>
            )}
          </div>
        </section>
    </>
  );
}

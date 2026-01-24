"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import CommunityCard from "../components/CommunityCard";
import ScrollAnimation from "../components/ScrollAnimation";
import { extractCity } from "../lib/cities";
import { event } from "../lib/mixpanel";
import { EVENT_ACTIONS, EVENT_CATEGORIES } from "../lib/analytics";

// Filter and process communities
function processCommunities(data) {
  return data
    .filter((community) => community.isActive && !community.isDeleted)
    .map((community) => ({
      ...community,
      city: extractCity(community.title) || "All Pakistan",
    }));
}

const ITEMS_PER_PAGE = 18;

export default function CommunitiesPageClient({ communities }) {
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loadMoreRef = useRef(null);

  // Process communities once
  const processedCommunities = useMemo(
    () => processCommunities(communities),
    [communities]
  );

  // Extract unique cities and categories
  const cities = useMemo(() => {
    const citySet = new Set(
      processedCommunities.map((c) => c.city).filter((c) => c !== "All Pakistan")
    );
    return ["All Cities", ...Array.from(citySet).sort()];
  }, [processedCommunities]);

  const categories = useMemo(() => {
    const categorySet = new Set();
    processedCommunities.forEach((c) => {
      if (c.categories && Array.isArray(c.categories)) {
        c.categories.forEach((cat) => categorySet.add(cat));
      }
    });
    return ["All", ...Array.from(categorySet).sort()];
  }, [processedCommunities]);

  // Filter communities
  const filteredCommunities = useMemo(() => {
    return processedCommunities.filter((community) => {
      // City filter
      if (selectedCity !== "All Cities") {
        if (selectedCity === "Other Cities") {
          const majorCities = ["Karachi", "Lahore", "Islamabad", "Peshawar"];
          if (majorCities.includes(community.city) || community.city === "All Pakistan") {
            return false;
          }
        } else if (community.city !== selectedCity) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== "All") {
        if (
          !community.categories ||
          !community.categories.includes(selectedCategory)
        ) {
          return false;
        }
      }

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        if (!community.title.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      return true;
    });
  }, [processedCommunities, selectedCity, selectedCategory, searchTerm]);

  // Visible communities
  const visibleCommunities = useMemo(
    () => filteredCommunities.slice(0, visibleCount),
    [filteredCommunities, visibleCount]
  );

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [selectedCity, selectedCategory, searchTerm]);

  // Track filter changes
  const handleCityChange = (city) => {
    setSelectedCity(city);
    event({
      action: EVENT_ACTIONS.CLICK,
      category: EVENT_CATEGORIES.ENGAGEMENT,
      label: `City Filter: ${city}`,
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    event({
      action: EVENT_ACTIONS.CLICK,
      category: EVENT_CATEGORIES.ENGAGEMENT,
      label: `Category Filter: ${category}`,
    });
  };

  // Debounced search tracking
  useEffect(() => {
    if (!searchTerm) return;
    
    const timeoutId = setTimeout(() => {
      event({
        action: "search",
        category: EVENT_CATEGORIES.ENGAGEMENT,
        label: `Search Communities: ${searchTerm}`,
      });
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Infinite scroll observer
  useEffect(() => {
    if (visibleCount >= filteredCommunities.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredCommunities.length));
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
  }, [visibleCount, filteredCommunities.length]);

  // Get city label for display
  const getCityLabel = () => {
    if (selectedCity === "All Cities") return "all cities";
    if (selectedCity === "Other Cities") return "other cities";
    return selectedCity.toLowerCase();
  };

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[40vh] md:min-h-[50vh] flex items-center pt-[100px] md:pt-[140px] pb-[40px] md:pb-[60px]">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
          <div className="max-w-[800px] animate-fade-in">
            <span className="inline-block text-[0.75rem] md:text-[0.85rem] tracking-widest uppercase text-terracotta font-semibold mb-4">
              Developer Ecosystem
            </span>
            <h1 className="text-4xl md:text-6xl mb-6 font-space-grotesk font-semibold leading-tight dark:text-beige">
              Communities Across Pakistan
            </h1>
            <p className="text-lg md:text-xl max-w-[600px] mb-8 text-custom-black/70 dark:text-beige/70 leading-relaxed transition-colors">
              Discover tech communities across Pakistan, city by city. Connect with developers, learn, and grow together.
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
                  placeholder="Search communities..."
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

            {/* City Filters */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-custom-black dark:text-beige mb-3">
                City
              </label>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCityChange(city)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCity === city
                        ? "bg-terracotta text-white"
                        : "bg-white dark:bg-white/5 text-custom-black dark:text-beige border border-black/10 dark:border-white/10 hover:border-terracotta"
                    }`}
                  >
                    {city}
                  </button>
                ))}
                {cities.filter(
                  (c) =>
                    !["All Cities", "Karachi", "Lahore", "Islamabad", "Peshawar"].includes(c)
                ).length > 0 && (
                  <button
                    onClick={() => handleCityChange("Other Cities")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCity === "Other Cities"
                        ? "bg-terracotta text-white"
                        : "bg-white dark:bg-white/5 text-custom-black dark:text-beige border border-black/10 dark:border-white/10 hover:border-terracotta"
                    }`}
                  >
                    Other Cities
                  </button>
                )}
              </div>
            </div>

            {/* Category Filters */}
            <div>
              <label className="block text-sm font-semibold text-custom-black dark:text-beige mb-3">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? "bg-terracotta text-white"
                        : "bg-white dark:bg-white/5 text-custom-black dark:text-beige border border-black/10 dark:border-white/10 hover:border-terracotta"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Results Section */}
      <ScrollAnimation delay={100}>
        <section className="py-12 md:py-20">
          <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
            {/* Results Counter */}
            <div className="mb-8">
              <p className="text-lg text-custom-black/70 dark:text-beige/70">
                Showing <span className="font-semibold text-custom-black dark:text-beige">{visibleCommunities.length}</span> of{" "}
                <span className="font-semibold text-custom-black dark:text-beige">{filteredCommunities.length}</span> communities
                {selectedCity !== "All Cities" && ` in ${getCityLabel()}`}
              </p>
            </div>

            {/* Communities Grid */}
            {visibleCommunities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {visibleCommunities.map((community, index) => (
                  <CommunityCard
                    key={community._id?.$oid || index}
                    title={community.title}
                    logo={community.logo}
                    city={community.city}
                    categories={community.categories}
                    fb_link={community.fb_link}
                    website_link={community.website_link}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-custom-black/60 dark:text-beige/60">
                  No communities found matching your filters.
                </p>
              </div>
            )}

            {/* Infinite Scroll Trigger */}
            {visibleCount < filteredCommunities.length && (
              <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
                <div className="text-custom-black/40 dark:text-beige/40">
                  Loading more...
                </div>
              </div>
            )}
          </div>
        </section>
      </ScrollAnimation>
    </>
  );
}

import Link from "next/link";
import TrackedLink from "./components/TrackedLink";
import { SITE_URL } from "./lib/config";
import { TEAM_MEMBERS } from "./data/team";
import { TESTIMONIALS } from "./data/testimonials";
import TeamMember from "./components/TeamMember";
import TestimonialCard from "./components/TestimonialCard";
import StatsCounter from "./components/StatsCounter";
import ScrollAnimation from "./components/ScrollAnimation";
import communitiesData from "./data/communities.json";

// City extraction utility (same as in communities page)
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

  return "All Pakistan";
}

// Count communities by city
function getCommunityStats() {
  const activeCommunities = communitiesData.filter(
    (c) => c.isActive && !c.isDeleted
  );
  
  const cityCounts = {};
  activeCommunities.forEach((community) => {
    const city = extractCity(community.title);
    if (city !== "All Pakistan") {
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    }
  });

  return {
    total: activeCommunities.length,
    karachi: cityCounts.Karachi || 0,
    lahore: cityCounts.Lahore || 0,
    islamabad: cityCounts.Islamabad || 0,
    peshawar: cityCounts.Peshawar || 0,
  };
}

const communityStats = getCommunityStats();

export const metadata = {
  title: "Connecting Developers, City by City",
  description:
    "Discover events, connect with peers, and grow through real-world learning and collaboration. A strong developer community in every city.",
  openGraph: {
    title: "DevnCode | Connecting Developers, City by City",
    description:
      "Discover events, connect with peers, and grow through real-world learning. No noise. No gatekeeping. Just community.",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "DevnCode - Connecting Developers, City by City",
      },
    ],
  },
  twitter: {
    title: "DevnCode | Connecting Developers, City by City",
    description:
      "Discover events, connect with peers, and grow through real-world learning. No noise. No gatekeeping. Just community.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function Home() {
  return (
    <>
      <section className="min-h-[70vh] md:min-h-[80vh] flex items-center pt-[100px] md:pt-[140px]">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-center">
            {/* Hero Content */}
            <div className="max-w-[800px] animate-fade-in">
              <span className="inline-block text-[0.75rem] md:text-[0.85rem] tracking-widest uppercase text-terracotta font-semibold mb-4">
                A strong developer community in every city
              </span>
              <h1 className="text-4xl md:text-6xl mb-6 font-space-grotesk font-semibold leading-tight dark:text-beige">
                Connecting Developers, <br className="hidden md:block" />
                <em className="text-terracotta italic">
                  City by City
                </em>.
              </h1>
              <p className="text-lg md:text-xl max-w-[600px] mb-8 text-custom-black/70 dark:text-beige/70 leading-relaxed transition-colors">
                Discover events, connect with peers, and grow through real-world
                learning and collaboration.
              </p>
            </div>

            {/* Event Announcement Card - Side Panel */}
            <div className="order-1 lg:order-2 animate-fade-in">
              <TrackedLink
                href="/meetup"
                category="navigation"
                label="Event Card - Hitting The AI"
                className="group block bg-gradient-to-r from-terracotta to-terracotta/90 dark:from-terracotta dark:to-terracotta/80 p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white uppercase tracking-wider">
                      Upcoming Event
                    </span>
                    <span className="text-white/90 text-sm font-medium">
                      Jan 17, 2026
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-space-grotesk font-bold text-white mb-2 group-hover:underline">
                    Hitting The AI
                  </h2>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed">
                    Real-world AI use cases. Practical challenges. No hype.
                  </p>
                  <div className="flex items-center justify-end mt-2">
                    <svg
                      className="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      <ScrollAnimation>
        <section className="py-12 md:py-20">
          <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 gap-6 md:gap-10 md:grid-cols-[1fr_2fr]">
              <div>
                <h2 className="text-2xl md:text-3xl text-terracotta font-space-grotesk font-semibold leading-tight mb-4">
                  Our Mission
                </h2>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-medium text-custom-black dark:text-beige mb-6 leading-relaxed transition-colors">
                  To help developers discover events, connect with peers, and grow
                  through real-world learning and collaboration.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Manifesto Section */}
      <ScrollAnimation delay={100}>
        <section className="py-12 md:py-20 bg-black/[0.03] dark:bg-white/[0.03] transition-colors">
          <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 gap-6 md:gap-10 md:grid-cols-[1fr_2fr]">
              <div>
                <h2 className="text-2xl md:text-3xl text-terracotta font-space-grotesk font-semibold leading-tight mb-4">
                  Our Manifesto
                </h2>
              </div>
              <div>
                <span className="inline-block text-[0.75rem] md:text-[0.85rem] tracking-widest uppercase font-semibold mb-6 text-custom-black dark:text-beige border border-current py-1 px-3 rounded-[20px] transition-colors">
                  Community First
                </span>
                <p className="text-xl md:text-2xl font-medium text-custom-black dark:text-beige mb-6 leading-relaxed transition-colors">
                  Developers don&apos;t grow alone.
                </p>
                <p className="mb-6 text-custom-black/70 dark:text-beige/70 leading-relaxed transition-colors">
                  We grow by learning together, sharing real experiences, and
                  showing up for each other.
                </p>
                <p className="mb-6 text-custom-black/70 dark:text-beige/70 leading-relaxed transition-colors">
                  DevnCode exists to strengthen developer communities — city by
                  city — by helping developers discover events, connect with
                  peers, and level up through real-world learning and
                  collaboration.
                </p>
                <p className="text-lg font-semibold text-custom-black dark:text-beige transition-colors">
                  No noise. No gatekeeping. Just community.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Vision Section */}
      <ScrollAnimation delay={200}>
        <section className="py-12 md:py-20">
          <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 gap-6 md:gap-10 md:grid-cols-[1fr_2fr]">
              <div>
                <h2 className="text-2xl md:text-3xl text-terracotta font-space-grotesk font-semibold leading-tight mb-4">
                  Our Vision
                </h2>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-medium text-custom-black dark:text-beige mb-6 leading-relaxed transition-colors">
                  A strong developer community in every city.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Impact Statistics Section */}
      <ScrollAnimation delay={100}>
        <section className="py-12 md:py-20 bg-black/[0.03] dark:bg-white/[0.03] transition-colors">
          <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-space-grotesk font-semibold leading-tight mb-4 text-custom-black dark:text-beige">
                Our Impact
              </h2>
              <p className="text-lg text-custom-black/70 dark:text-beige/70 max-w-[600px] mx-auto">
                Building developer communities, one event at a time
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <StatsCounter value={1500} suffix="+" label="Community Members" />
              <StatsCounter value={28} suffix="+" label="Events Hosted" />
              <StatsCounter value={5} label="Cities Reached" />
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Testimonials Section */}
      <ScrollAnimation delay={150}>
        <section className="py-12 md:py-20">
          <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-space-grotesk font-semibold leading-tight mb-4 text-custom-black dark:text-beige">
                What People Say
              </h2>
              <p className="text-lg text-custom-black/70 dark:text-beige/70 max-w-[600px] mx-auto">
                Real feedback from our community members
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {TESTIMONIALS.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  quote={testimonial.quote}
                  author={testimonial.author}
                />
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Developer Ecosystem Section */}
      <ScrollAnimation delay={150}>
        <section className="py-12 md:py-20">
          <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-space-grotesk font-semibold leading-tight mb-4 text-custom-black dark:text-beige">
                Developer Ecosystem
              </h2>
              <p className="text-lg text-custom-black/70 dark:text-beige/70 max-w-[600px] mx-auto mb-8">
                Discover tech communities across Pakistan, city by city
              </p>
              
              {/* City Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-terracotta mb-2">
                    {communityStats.karachi}+
                  </div>
                  <div className="text-sm md:text-base text-custom-black/70 dark:text-beige/70">
                    in Karachi
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-terracotta mb-2">
                    {communityStats.lahore}+
                  </div>
                  <div className="text-sm md:text-base text-custom-black/70 dark:text-beige/70">
                    in Lahore
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-terracotta mb-2">
                    {communityStats.islamabad}+
                  </div>
                  <div className="text-sm md:text-base text-custom-black/70 dark:text-beige/70">
                    in Islamabad
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-terracotta mb-2">
                    {communityStats.peshawar}+
                  </div>
                  <div className="text-sm md:text-base text-custom-black/70 dark:text-beige/70">
                    in Peshawar
                  </div>
                </div>
              </div>

              <div className="text-center">
                <TrackedLink
                  href="/communities"
                  category="navigation"
                  label="Explore Ecosystem (Home)"
                  className="inline-block bg-custom-black text-white dark:bg-beige dark:text-custom-black px-10 py-4 rounded-full font-medium transition-all duration-200 hover:bg-terracotta dark:hover:bg-terracotta hover:-translate-y-0.5 text-lg"
                >
                  Explore Ecosystem
                </TrackedLink>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Team Members Section */}
      <ScrollAnimation delay={200}>
        <section className="py-12 md:py-20 bg-black/[0.03] dark:bg-white/[0.03] transition-colors">
          <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-space-grotesk font-semibold leading-tight mb-4 text-custom-black dark:text-beige">
                Meet The Team
              </h2>
              <p className="text-lg text-custom-black/70 dark:text-beige/70 max-w-[600px] mx-auto">
                The people building developer communities, city by city
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {TEAM_MEMBERS.map((member, index) => (
                <TeamMember
                  key={index}
                  name={member.name}
                  role={member.role}
                  description={member.description}
                  image={member.image}
                />
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>
    </>
  );
}

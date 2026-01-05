import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="min-h-[70vh] md:min-h-[80vh] flex items-center pt-[100px] md:pt-[140px]">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
          <div className="max-w-[800px] animate-fade-in">
            <span className="inline-block text-[0.75rem] md:text-[0.85rem] tracking-widest uppercase text-terracotta font-semibold mb-4">
              Welcome to DevnCode
            </span>
            <h1 className="text-4xl md:text-6xl mb-6 font-space-grotesk font-semibold leading-tight dark:text-beige">
              Building the future of <br className="hidden md:block" />
              <em className="text-terracotta italic">
                Software Engineering
              </em>{" "}
              in Pakistan.
            </h1>
            <p className="text-lg md:text-xl max-w-[600px] mb-8 text-custom-black/70 dark:text-beige/70 leading-relaxed transition-colors">
              Cultivating talent, fostering collaboration, and opening doors for
              the next generation.
            </p>

            {/* Event Announcement Card */}
            <Link
              href="/meetup"
              className="group block bg-gradient-to-r from-terracotta to-terracotta/90 dark:from-terracotta dark:to-terracotta/80 p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 max-w-[600px]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white uppercase tracking-wider">
                      Upcoming Event
                    </span>
                    <span className="text-white/90 text-sm font-medium">
                      Jan 18, 2026
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-space-grotesk font-bold text-white mb-2 group-hover:underline">
                    Hitting The AI
                  </h3>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed">
                    Real-world AI use cases. Practical challenges. No hype.
                  </p>
                </div>
                <div className="flex-shrink-0">
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
            </Link>
          </div>
        </div>
      </section>

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
                To empower emerging talent and strengthen tech communities
                across Pakistan.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-black/[0.03] dark:bg-white/[0.03] transition-colors">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 gap-6 md:gap-10 md:grid-cols-[1fr_2fr]">
            <div>
              <h2 className="text-2xl md:text-3xl text-terracotta font-space-grotesk font-semibold leading-tight mb-4">
                Who We Are
              </h2>
            </div>
            <div>
              <span className="inline-block text-[0.75rem] md:text-[0.85rem] tracking-widest uppercase font-semibold mb-6 text-custom-black dark:text-beige border border-current py-1 px-3 rounded-[20px] transition-colors">
                Empowerment
              </span>
              <p className="mb-6 text-custom-black/70 dark:text-beige/70 leading-relaxed transition-colors">
                DevnCode was built with one clear purpose:{" "}
                <strong>Empowerment</strong>. We focus on supporting both
                individuals and communities who are eager to grow in the IT
                domain—especially in Software Engineering.
              </p>
              <p className="mb-6 text-custom-black/70 dark:text-beige/70 leading-relaxed transition-colors">
                Over time, DevnCode has helped multiple tech communities launch
                their chapters across Pakistan and organized several signature
                events. Through mentorship, collaboration, and knowledge
                sharing, we aim to create real impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-space-grotesk font-semibold leading-tight mb-4 text-custom-black dark:text-beige">
              Meet The Team
            </h2>
            <p className="text-lg text-custom-black/70 dark:text-beige/70 max-w-[600px] mx-auto">
              The people driving DevnCode&apos;s mission forward
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Founder */}
            <div className="bg-white dark:bg-white/5 p-6 md:p-8 rounded-lg border border-black/10 dark:border-white/10 transition-all duration-200 hover:border-terracotta dark:hover:border-terracotta hover:shadow-lg text-center">
              <div>
                <h3 className="text-xl font-space-grotesk font-bold text-custom-black dark:text-beige mb-2">
                  Kamran Qadri
                </h3>
                <p className="text-terracotta font-semibold text-sm mb-3">
                  Founder & CEO
                </p>
                <p className="text-xs text-custom-black/60 dark:text-beige/60 italic">
                  The visionary turning ideas into impact
                </p>
              </div>
            </div>

            {/* VP */}
            <div className="bg-white dark:bg-white/5 p-6 md:p-8 rounded-lg border border-black/10 dark:border-white/10 transition-all duration-200 hover:border-terracotta dark:hover:border-terracotta hover:shadow-lg text-center">
              <div>
                <h3 className="text-xl font-space-grotesk font-bold text-custom-black dark:text-beige mb-2">
                  Tehseen
                </h3>
                <p className="text-terracotta font-semibold text-sm mb-3">
                  Vice President
                </p>
                <p className="text-xs text-custom-black/60 dark:text-beige/60 italic">
                  Keeping the ship steady and the vision clear
                </p>
              </div>
            </div>

            {/* Community Manager */}
            <div className="bg-white dark:bg-white/5 p-6 md:p-8 rounded-lg border border-black/10 dark:border-white/10 transition-all duration-200 hover:border-terracotta dark:hover:border-terracotta hover:shadow-lg text-center">
              <div>
                <h3 className="text-xl font-space-grotesk font-bold text-custom-black dark:text-beige mb-2">
                  Taimoor
                </h3>
                <p className="text-terracotta font-semibold text-sm mb-3">
                  Community Manager
                </p>
                <p className="text-xs text-custom-black/60 dark:text-beige/60 italic">
                  The glue that holds our community together
                </p>
              </div>
            </div>

            {/* Operations Manager */}
            <div className="bg-white dark:bg-white/5 p-6 md:p-8 rounded-lg border border-black/10 dark:border-white/10 transition-all duration-200 hover:border-terracotta dark:hover:border-terracotta hover:shadow-lg text-center">
              <div>
                <h3 className="text-xl font-space-grotesk font-bold text-custom-black dark:text-beige mb-2">
                  Mustafa Fazal
                </h3>
                <p className="text-terracotta font-semibold text-sm mb-3">
                  Operations Manager
                </p>
                <p className="text-xs text-custom-black/60 dark:text-beige/60 italic">
                  Making sure everything runs like clockwork
                </p>
              </div>
            </div>

            {/* Community Lead 1 */}
            <div className="bg-white dark:bg-white/5 p-6 md:p-8 rounded-lg border border-black/10 dark:border-white/10 transition-all duration-200 hover:border-terracotta dark:hover:border-terracotta hover:shadow-lg text-center">
              <div>
                <h3 className="text-xl font-space-grotesk font-bold text-custom-black dark:text-beige mb-2">
                  Rehan Sattar
                </h3>
                <p className="text-terracotta font-semibold text-sm mb-3">
                  Community Lead
                </p>
                <p className="text-xs text-custom-black/60 dark:text-beige/60 italic">
                  Building connections, one developer at a time
                </p>
              </div>
            </div>

            {/* Community Lead 2 */}
            <div className="bg-white dark:bg-white/5 p-6 md:p-8 rounded-lg border border-black/10 dark:border-white/10 transition-all duration-200 hover:border-terracotta dark:hover:border-terracotta hover:shadow-lg text-center">
              <div>
                <h3 className="text-xl font-space-grotesk font-bold text-custom-black dark:text-beige mb-2">
                  Aisha
                </h3>
                <p className="text-terracotta font-semibold text-sm mb-3">
                  Community Lead
                </p>
                <p className="text-xs text-custom-black/60 dark:text-beige/60 italic">
                  Empowering voices and fostering growth
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

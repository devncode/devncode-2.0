import Link from "next/link";

export const metadata = {
  title: "Hitting The AI",
  description: "DevnCode's signature event on real-world AI engineering. Discover, connect, and grow with the developer community.",
};

export default function MeetupPage() {
  return (
    <>
      <section className="min-h-[30vh] md:min-h-[40vh] pt-[100px] md:pt-[140px] pb-[40px] md:pb-[60px]">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
          <div className="max-w-[800px] animate-fade-in">
            <span className="inline-block text-[0.75rem] md:text-[0.85rem] tracking-widest uppercase text-terracotta font-semibold mb-4">
              Signature Event
            </span>
            <h1 className="text-4xl md:text-6xl mb-6 font-space-grotesk font-semibold leading-tight dark:text-beige transition-colors">
              Hitting The
              <em className="text-terracotta italic">&nbsp;AI</em>
            </h1>
            <p className="text-lg md:text-[1.4rem] mb-6 text-custom-black/70 dark:text-beige/70 leading-relaxed transition-colors">
              Real-world AI use cases. Practical challenges. No hype.
            </p>

            {/* Event Details Card */}
            <div className="flex flex-col gap-8 mt-10">
              <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start pt-6 border-t border-black/10 dark:border-white/10 transition-colors">
                {/* Date Box */}
                <div>
                  <span className="inline-block text-xs mb-2 text-custom-black/60 dark:text-beige/60 uppercase tracking-wider font-semibold">
                    Date & Time
                  </span>
                  <p className="m-0 font-semibold text-[1.1rem] text-custom-black dark:text-beige transition-colors">
                    17th Of January, 2026
                  </p>
                  <p className="m-0 text-sm text-custom-black/70 dark:text-beige/70 transition-colors">
                    2:00 PM - 5:45 PM
                    <span className="block text-xs opacity-80 mt-1">
                      (Asr Prayer Break Included)
                    </span>
                  </p>
                </div>

                {/* Location Box */}
                <div>
                  <span className="inline-block text-xs mb-2 text-custom-black/60 dark:text-beige/60 uppercase tracking-wider font-semibold">
                    Location
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className="m-0 font-semibold text-[1.1rem] text-custom-black dark:text-beige transition-colors">
                      COLABS Shahrah-e-Faisal
                    </p>
                    <p className="m-0 text-[0.95rem] text-custom-black/70 dark:text-beige/70 max-w-[300px] leading-normal transition-colors">
                      37-B, Main Shahra-e-Faisal, P.E.C.H.S Block 6 PECHS,
                      Karachi
                    </p>
                    <a
                      href="https://maps.app.goo.gl/6eUx8pU9peFkCRCy6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 font-medium underline text-terracotta"
                    >
                      📍 View on Map
                    </a>
                  </div>
                </div>
              </div>

              {/* Register Button */}
              <div>
                <Link
                  href="#"
                  className="inline-block bg-custom-black text-white dark:bg-beige dark:text-custom-black px-10 py-4 rounded-full font-medium transition-all duration-200 hover:bg-terracotta dark:hover:bg-terracotta hover:-translate-y-0.5 text-lg"
                >
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 gap-6 md:gap-10 md:grid-cols-[1fr_2fr]">
            <div>
              <h2 className="text-2xl md:text-3xl text-terracotta font-space-grotesk font-semibold leading-tight mb-4">
                What This Event Is About
              </h2>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-medium text-custom-black dark:text-beige mb-6 leading-relaxed transition-colors">
                Bridge the gap between theory and execution.
              </p>
              <p className="mb-6 text-custom-black/70 dark:text-beige/70 leading-relaxed transition-colors">
                Hitting The AI focuses on practical AI—its applications,
                integrations, and real-world usage across the industry. The goal
                is to show how teams are using AI today to solve real problems
                at scale. This is not another surface-level AI talk.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-[#F9F8F6] dark:bg-white/[0.02] transition-colors">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 gap-6 md:gap-10 md:grid-cols-[1fr_2fr]">
            <div>
              <h2 className="text-2xl md:text-3xl text-terracotta font-space-grotesk font-semibold leading-tight mb-4">
                Our Agenda
              </h2>
            </div>
            <div>
              <ul className="border-l-2 border-black/10 dark:border-white/10 pl-8 mt-4 transition-colors">
                {[
                  {
                    time: "2:00 - 2:30pm",
                    title: "Registrations and Settlement",
                  },
                  { time: "2:30 - 2:45pm", title: "Tilawat" },
                  {
                    time: "2:45 - 3:00pm",
                    title: "Keynote",
                    speaker: "Kamran Qadri",
                  },
                  {
                    time: "3:00 - 3:30pm",
                    title: "Tech Talk",
                    speaker: "Mesum",
                  },
                  {
                    time: "3:30 - 4:00pm",
                    title: "Tech Talk",
                    speaker: "Yasir",
                  },
                  {
                    time: "4:00 - 4:30pm",
                    title: "Tech Talk",
                    speaker: "Wajahat",
                  },
                  { time: "4:30 - 5:00pm", title: "Break & Networking" },
                  {
                    time: "5:00 - 5:15pm",
                    title: "Activity / Battle",
                    speaker: "Aisha & Rehan",
                  },
                  {
                    time: "5:15 - 5:45pm",
                    title: "Closing Remarks",
                    speaker: "Host",
                  },
                ].map((item, index) => (
                  <li key={index} className="mb-8 relative list-none">
                    <span className="absolute -left-[39px] top-1.5 w-3 h-3 bg-terracotta rounded-full border-2 border-[#F9F8F6] dark:border-[#2a2a2c]"></span>
                    <span className="block text-[0.85rem] text-custom-black/60 dark:text-beige/60 mb-1 font-space-grotesk transition-colors">
                      {item.time}
                    </span>
                    <h4 className="text-xl m-0 mb-1 text-custom-black dark:text-beige font-space-grotesk font-semibold leading-tight transition-colors">
                      {item.title}
                    </h4>
                    {item.speaker && (
                      <span className="text-base text-terracotta italic">
                        with {item.speaker}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-black/[0.03] dark:bg-white/[0.03] transition-colors">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-3xl mb-6 font-space-grotesk font-semibold leading-tight">
                Who Should Attend
              </h3>
              <ul className="mb-3 pl-5 relative list-none">
                <li className="mb-3 pl-5 relative list-none before:content-['•'] before:text-terracotta before:absolute before:left-0 before:font-bold">
                  Industry professionals working in software, data, and
                  AI-related roles
                </li>
                <li className="mb-3 pl-5 relative list-none before:content-['•'] before:text-terracotta before:absolute before:left-0 before:font-bold">
                  Experienced engineers looking to apply AI in real systems
                </li>
                <li className="mb-3 pl-5 relative list-none before:content-['•'] before:text-terracotta before:absolute before:left-0 before:font-bold">
                  Serious students who are eager to learn, ask questions, and
                  grow
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-3xl mb-6 font-space-grotesk font-semibold leading-tight">
                Why It Matters
              </h3>
              <div className="bg-white dark:bg-white/5 p-8 rounded border border-black/10 dark:border-white/10 shadow-sm transition-colors">
                <ul className="mt-0 mb-3 pl-5 relative list-none">
                  <li className="mb-3 pl-5 relative list-none before:content-['•'] before:text-terracotta before:absolute before:left-0 before:font-bold">
                    Learn practical AI, not just concepts
                  </li>
                  <li className="mb-3 pl-5 relative list-none before:content-['•'] before:text-terracotta before:absolute before:left-0 before:font-bold">
                    Understand how AI is being integrated into real products and
                    systems
                  </li>
                  <li className="mb-3 pl-5 relative list-none before:content-['•'] before:text-terracotta before:absolute before:left-0 before:font-bold">
                    Interact with top minds in the field
                  </li>
                  <li className="mb-3 pl-5 relative list-none before:content-['•'] before:text-terracotta before:absolute before:left-0 before:font-bold">
                    Build a quality, professional network
                  </li>
                  <li className="mb-3 pl-5 relative list-none before:content-['•'] before:text-terracotta before:absolute before:left-0 before:font-bold">
                    Gain insights you can actually apply in your work or studies
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 gap-6 md:gap-10 md:grid-cols-[1fr_2fr]">
            <div>
              <h2 className="text-2xl md:text-3xl text-terracotta font-space-grotesk font-semibold leading-tight mb-4">
                Speakers You Can Learn From
              </h2>
            </div>
            <div>
              <p className="mb-6 text-custom-black/70 dark:text-beige/70 leading-relaxed transition-colors">
                We have curated a lineup of experienced industry professionals
                who are actively working with AI. These speakers are not here to
                repeat generic slides or trends—they are here to share:
              </p>
              <ul className="mb-3 pl-5 relative list-none">
                <li className="mb-3 pl-5 relative list-none before:content-['•'] before:text-terracotta before:absolute before:left-0 before:font-bold">
                  Real-world AI use cases
                </li>
                <li className="mb-3 pl-5 relative list-none before:content-['•'] before:text-terracotta before:absolute before:left-0 before:font-bold">
                  Practical challenges and solutions
                </li>
                <li className="mb-3 pl-5 relative list-none before:content-['•'] before:text-terracotta before:absolute before:left-0 before:font-bold">
                  Lessons learned from production environments
                </li>
                <li className="mb-3 pl-5 relative list-none before:content-['•'] before:text-terracotta before:absolute before:left-0 before:font-bold">
                  What actually works (and what doesn&apos;t)
                </li>
              </ul>
              <blockquote className="border-l-4 border-terracotta pl-6 my-10 text-2xl italic font-space-grotesk">
                &quot;Every talk is grounded in experience, not hype.&quot;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 pb-[80px] md:pb-[120px] text-center">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
          <span className="inline-block text-[0.85rem] tracking-widest uppercase text-terracotta font-semibold mb-4">
            The DevnCode Promise
          </span>
          <h2 className="text-3xl md:text-[2.5rem] mt-4 mb-6 font-space-grotesk font-semibold leading-tight dark:text-beige transition-colors">
            Driven by Intent and Impact.
          </h2>
          <p className="max-w-[600px] mx-auto mb-8 text-custom-black/70 dark:text-beige/70 leading-relaxed transition-colors">
            Hitting The AI continues that legacy, bringing together
            professionals and serious learners under one platform to learn,
            share, and grow together.
          </p>
          <Link
            href="#"
            className="inline-block bg-custom-black text-white dark:bg-beige dark:text-custom-black px-10 py-4 rounded-full font-medium transition-all duration-200 hover:bg-terracotta dark:hover:bg-terracotta hover:-translate-y-0.5"
          >
            Register Now
          </Link>
        </div>
      </section>
    </>
  );
}

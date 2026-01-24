import EventDetails from "../components/EventDetails";
import TallyForm from "../components/TallyForm";
import PageViewTracker from "../components/PageViewTracker";
import { CURRENT_EVENT } from "../data/events";
import { EVENT_LABELS } from "../lib/analytics";
import { SITE_URL } from "../lib/config";

export function generateMetadata() {
  const eventDate = new Date(CURRENT_EVENT.dateISO).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  
  return {
    title: "Register - Hitting The AI",
    description: `Register for DevnCode's signature event on real-world AI engineering. Join us on ${eventDate}.`,
    openGraph: {
      title: "Register - Hitting The AI | DevnCode",
      description: `Register for DevnCode's signature event on real-world AI engineering. Join us on ${eventDate}.`,
      url: `${SITE_URL}/register`,
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "DevnCode - Register for Hitting The AI",
        },
      ],
    },
    twitter: {
      title: "Register - Hitting The AI | DevnCode",
      description: "Register for DevnCode's signature event on real-world AI engineering.",
    },
    alternates: {
      canonical: `${SITE_URL}/register`,
    },
  };
}

export default function RegisterPage() {
  return (
    <>
      <PageViewTracker label={EVENT_LABELS.REGISTRATION_PAGE_VIEW} />
      <section className="min-h-[30vh] md:min-h-[40vh] pt-[100px] md:pt-[140px] pb-[40px] md:pb-[60px]">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
          <div className="max-w-[800px] animate-fade-in">
            <span className="inline-block text-[0.75rem] md:text-[0.85rem] tracking-widest uppercase text-terracotta font-semibold mb-4">
              Registration
            </span>
            <h1 className="text-4xl md:text-6xl mb-6 font-space-grotesk font-semibold leading-tight dark:text-beige transition-colors">
              Register for{" "}
              <em className="text-terracotta italic">Hitting The AI</em>
            </h1>
            <p className="text-lg md:text-[1.4rem] mb-6 text-custom-black/70 dark:text-beige/70 leading-relaxed transition-colors">
              Join us on {new Date(CURRENT_EVENT.dateISO).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} for real-world AI use cases and
              practical challenges.
            </p>

            {/* Event Details Card */}
            <div className="mb-10">
              <EventDetails event={CURRENT_EVENT} />
            </div>
          </div>
        </div>
      </section>

      <TallyForm />
    </>
  );
}

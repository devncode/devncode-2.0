import EventsPageClient from "./EventsPageClient";
import PageViewTracker from "../components/PageViewTracker";
import { SITE_URL } from "../lib/config";
import { EVENT_LABELS } from "../lib/analytics";
import { getCommunities, getEvents } from "../lib/db";

export async function generateMetadata() {
  const events = await getEvents();
  const activeEvents = events.filter((e) => e.status === true && !e.isDeleted);
  const eventCount = activeEvents.length;
  
  return {
    title: "Event History | DevnCode",
    description:
      `Discover ${eventCount}+ tech events hosted across Pakistan. Explore the developer community's event history, organized by year and city.`,
    openGraph: {
      title: "Event History | DevnCode",
      description: `${eventCount}+ events hosted across Pakistan`,
      url: `${SITE_URL}/events`,
    },
  };
}

export default async function EventsPage() {
  const events = await getEvents();
  const communities = await getCommunities();
  const activeEvents = events.filter((e) => e.status === true && !e.isDeleted);
  const eventCount = activeEvents.length;
  
  return (
    <>
      <PageViewTracker label={EVENT_LABELS.EVENTS_PAGE_VIEW} />
      <EventsPageClient events={events} communities={communities} />
    </>
  );
}

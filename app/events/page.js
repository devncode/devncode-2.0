import EventsPageClient from "./EventsPageClient";
import { SITE_URL } from "../lib/config";
import { getCommunities, getEvents } from "../lib/db";

export const metadata = {
  title: "Event History | DevnCode",
  description:
    "Discover 525+ tech events hosted across Pakistan. Explore the developer community's event history, organized by year and city.",
  openGraph: {
    title: "Event History | DevnCode",
    description: "525+ events hosted across Pakistan",
    url: `${SITE_URL}/events`,
  },
};

export default async function EventsPage() {
  const events = await getEvents();
  const communities = await getCommunities();
  return <EventsPageClient events={events} communities={communities} />;
}

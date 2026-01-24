import CommunitiesPageClient from "./CommunitiesPageClient";
import PageViewTracker from "../components/PageViewTracker";
import { SITE_URL } from "../lib/config";
import { EVENT_LABELS } from "../lib/analytics";
import { getCommunities } from "../lib/db";

export const metadata = {
  title: "Developer Ecosystem | DevnCode",
  description:
    "Discover tech communities across Pakistan, city by city. Explore developer communities in Karachi, Lahore, Islamabad, and more.",
  openGraph: {
    title: "Developer Ecosystem | DevnCode",
    description:
      "Discover tech communities across Pakistan, city by city.",
    url: `${SITE_URL}/communities`,
  },
};

export default async function CommunitiesPage() {
  const communities = await getCommunities();
  return (
    <>
      <PageViewTracker label={EVENT_LABELS.COMMUNITIES_PAGE_VIEW} />
      <CommunitiesPageClient communities={communities} />
    </>
  );
}

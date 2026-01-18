import CommunitiesPageClient from "./CommunitiesPageClient";
import { SITE_URL } from "../lib/config";

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

export default function CommunitiesPage() {
  return <CommunitiesPageClient />;
}

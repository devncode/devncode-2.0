import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ThemeProvider from "./components/ThemeProvider";
import Mixpanel from "./components/Mixpanel";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://devncode.tech";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DevnCode | Connecting Developers, City by City",
    template: "%s | DevnCode",
  },
  description:
    "Discover events, connect with peers, and grow through real-world learning and collaboration. A strong developer community in every city.",
  keywords: [
    "DevnCode",
    "developer community",
    "tech events",
    "Pakistan",
    "developers",
    "programming",
    "meetups",
    "networking",
    "software development",
    "learning",
    "collaboration",
  ],
  authors: [{ name: "DevnCode Team" }],
  creator: "DevnCode",
  publisher: "DevnCode",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "DevnCode",
    title: "DevnCode | Connecting Developers, City by City",
    description:
      "Discover events, connect with peers, and grow through real-world learning and collaboration. A strong developer community in every city.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "DevnCode - Connecting Developers, City by City",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevnCode | Connecting Developers, City by City",
    description:
      "Discover events, connect with peers, and grow through real-world learning. No noise. No gatekeeping. Just community.",
    images: [`${siteUrl}/og-image.jpg`],
    creator: "@devncode",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: siteUrl,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DevnCode",
  description:
    "Helping developers discover events, connect with peers, and grow through real-world learning and collaboration. A strong developer community in every city.",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  sameAs: [
    "https://www.facebook.com/devncode17",
    "https://www.instagram.com/devncode",
    "https://www.linkedin.com/company/devncode/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "General Inquiries",
    email: "contact@devncode.tech",
  },
  foundingDate: "2020",
  founder: {
    "@type": "Person",
    name: "Kamran Qadri",
  },
  areaServed: {
    "@type": "Country",
    name: "Pakistan",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={`antialiased ${spaceGrotesk.className}`}>
        <Mixpanel />
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-terracotta focus:text-white focus:rounded focus:shadow-lg"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

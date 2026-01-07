// ⚠️ PUBLIC: These values are exposed in client bundle

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://devncode.tech";

export const COMMUNITY_JOIN_URL = process.env.NEXT_PUBLIC_COMMUNITY_JOIN_URL || "#";

export const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

// Environment: defaults to development if not explicitly set to production
export const IS_DEVELOPMENT = process.env.NODE_ENV !== "production";



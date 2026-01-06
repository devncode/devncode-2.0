export const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

// Initialize Mixpanel with autocapture enabled
export const initMixpanel = () => {
  if (typeof window !== "undefined" && window.mixpanel && MIXPANEL_TOKEN) {
    window.mixpanel.init(MIXPANEL_TOKEN, {
      debug: process.env.NODE_ENV === "development",
      autocapture: true, // Automatically captures pageviews, clicks, form submissions, etc.
      persistence: "localStorage",
    });
    return true;
  }
  return false;
};

// Check if Mixpanel is ready
const isMixpanelReady = () => {
  return (
    typeof window !== "undefined" &&
    window.mixpanel &&
    typeof window.mixpanel.track === "function"
  );
};

// Log custom events with specific properties (optional - autocapture handles most events)
export const event = ({ action, category, label, value }) => {
  if (isMixpanelReady()) {
    try {
      window.mixpanel.track(action, {
        category: category,
        label: label,
        value: value,
      });
    } catch (error) {
      console.warn("Mixpanel event tracking failed:", error);
    }
  }
};


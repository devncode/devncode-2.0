import { MIXPANEL_TOKEN } from "./config";

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


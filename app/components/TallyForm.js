"use client";

import { useEffect } from "react";
import Script from "next/script";
import { event } from "../lib/mixpanel";
import { EVENT_CATEGORIES, EVENT_ACTIONS, EVENT_LABELS } from "../lib/analytics";

// Tally form origin for security validation
const TALLY_ORIGIN = "https://tally.so";

export default function TallyForm() {
  useEffect(() => {
    // Listen for Tally form events via postMessage
    const handleMessage = (e) => {
      // Validate origin for security
      if (e.origin !== TALLY_ORIGIN) {
        return;
      }

      // Defensive type checking
      if (!e.data || typeof e.data !== "object") {
        return;
      }

      if (!e.data.type || typeof e.data.type !== "string") {
        return;
      }

      // Handle Tally form events
      if (e.data.type === "tally.formLoaded") {
        event({
          action: EVENT_ACTIONS.CLICK,
          category: EVENT_CATEGORIES.ENGAGEMENT,
          label: EVENT_LABELS.REGISTRATION_FORM_LOADED,
        });
      } else if (e.data.type === "tally.formSubmitted") {
        event({
          action: EVENT_ACTIONS.CLICK,
          category: EVENT_CATEGORIES.ENGAGEMENT,
          label: EVENT_LABELS.REGISTRATION_FORM_SUBMITTED,
        });
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          // Track script load
          event({
            action: EVENT_ACTIONS.CLICK,
            category: EVENT_CATEGORIES.ENGAGEMENT,
            label: EVENT_LABELS.TALLY_SCRIPT_LOADED,
          });
        }}
      />
      <section className="py-12 md:py-20">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
          <div className="max-w-[800px] mx-auto">
            <div className="bg-white dark:bg-white/5 rounded-lg border border-black/10 dark:border-white/10 shadow-sm overflow-hidden">
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  minHeight: "600px",
                  height: "800px",
                }}
              >
                <iframe
                  data-tally-src="https://tally.so/r/yPNZLW?transparentBackground=1&formEventsForwarding=1"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                  title="HITTING THE AI: Registration Form"
                  referrerPolicy="strict-origin-when-cross-origin"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                  loading="lazy"
                  style={{
                    border: "none",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


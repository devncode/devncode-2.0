"use client";

import { useState, useEffect } from "react";

export default function Countdown({ targetDateISO }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDateISO);
      const now = new Date();
      const difference = target - now;

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          expired: true,
        };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return {
        days,
        hours,
        minutes,
        seconds,
        expired: false,
      };
    };

    // Calculate immediately
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateISO]);

  if (timeLeft.expired) {
    return (
      <div className="bg-white dark:bg-white/5 p-6 md:p-8 rounded-lg border border-black/10 dark:border-white/10">
        <p className="text-lg font-semibold text-custom-black dark:text-beige text-center">
          Event has started!
        </p>
      </div>
    );
  }

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="bg-white dark:bg-white/5 p-6 md:p-8 rounded-lg border border-black/10 dark:border-white/10">
      <div className="text-center mb-4">
        <span className="text-xs md:text-sm text-custom-black/60 dark:text-beige/60 uppercase tracking-wider font-semibold">
          Event Starts In
        </span>
      </div>
      <div className="grid grid-cols-4 gap-4 md:gap-6">
        {timeUnits.map((unit) => (
          <div key={unit.label} className="text-center">
            <div className="text-2xl md:text-4xl font-space-grotesk font-bold text-terracotta mb-1">
              {String(unit.value).padStart(2, "0")}
            </div>
            <div className="text-xs md:text-sm text-custom-black/60 dark:text-beige/60 uppercase tracking-wider">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


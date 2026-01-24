"use client";

import { useRouter } from "next/navigation";

export default function BackNavigation() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <section className="pt-[100px] md:pt-[140px] pb-6">
      <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-custom-black/70 dark:text-beige/70 hover:text-terracotta transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>
    </section>
  );
}

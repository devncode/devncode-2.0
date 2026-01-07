export default function TestimonialCard({ quote, author }) {
  return (
    <div className="bg-white dark:bg-white/5 p-4 md:p-6 rounded-lg border border-black/10 dark:border-white/10 transition-all duration-300 hover:border-terracotta dark:hover:border-terracotta hover:shadow-xl hover:-translate-y-1">
      <div className="mb-3">
        <svg
          className="w-6 h-6 text-terracotta opacity-60"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h3.983v10h-9.984z" />
        </svg>
      </div>
      <p className="text-xs md:text-sm text-custom-black dark:text-beige mb-3 leading-relaxed italic">
        &quot;{quote}&quot;
      </p>
      <p className="text-[10px] md:text-xs text-custom-black/60 dark:text-beige/60 font-semibold">
        — {author}
      </p>
    </div>
  );
}


import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl md:text-8xl font-space-grotesk font-bold text-terracotta mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-space-grotesk font-semibold text-custom-black dark:text-beige mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-custom-black/70 dark:text-beige/70 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-custom-black text-white dark:bg-beige dark:text-custom-black px-8 py-3 rounded-full font-medium transition-all duration-200 hover:bg-terracotta dark:hover:bg-terracotta hover:-translate-y-0.5"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}


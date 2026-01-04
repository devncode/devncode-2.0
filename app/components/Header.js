"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <header className="py-8 absolute top-0 left-0 w-full z-50">
      <div className="max-w-[1200px] w-full mx-auto px-10 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold font-space-grotesk">
          devncode.
        </Link>
        <nav className="flex gap-8 items-center">
          <Link
            href="/"
            className={`text-base font-medium opacity-80 transition-opacity duration-200 hover:opacity-100 hover:text-custom-black hover:underline hover:underline-offset-4 ${
              isActive("/")
                ? "opacity-100 text-custom-black underline underline-offset-4"
                : ""
            }`}
          >
            Overview
          </Link>
          <Link
            href="/meetup"
            className={`text-base font-medium opacity-80 transition-opacity duration-200 hover:opacity-100 hover:text-custom-black hover:underline hover:underline-offset-4 ${
              isActive("/meetup")
                ? "opacity-100 text-custom-black underline underline-offset-4"
                : ""
            }`}
          >
            Hitting the AI
          </Link>
          <Link
            href="#"
            className="inline-block bg-custom-black text-white px-6 py-2.5 rounded-full font-medium transition-all duration-200 hover:bg-terracotta hover:-translate-y-0.5 text-sm"
          >
            Join Community
          </Link>
        </nav>
      </div>
    </header>
  );
}

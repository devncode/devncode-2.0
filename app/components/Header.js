"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { useState, useEffect } from "react";
import { event } from "../lib/mixpanel";
import {
  trackJoinCommunity,
  trackThemeToggle,
  trackMenuToggle,
  trackNavigation,
  EVENT_LABELS,
} from "../lib/analytics";
import { COMMUNITY_JOIN_URL } from "../lib/config";

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (path) => pathname === path;

  return (
    <header className="py-6 md:py-8 absolute top-0 left-0 w-full z-50">
      <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10 flex justify-between items-center text-custom-black dark:text-beige transition-colors duration-300">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl md:text-2xl font-bold font-space-grotesk"
        >
          <Image
            src="/logo.png"
            alt="DevnCode"
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10"
            priority
          />
          <span>DevnCode.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          <Link
            href="/"
            className={`text-base font-medium opacity-80 transition-opacity duration-200 hover:opacity-100 hover:text-custom-black dark:hover:text-beige hover:underline hover:underline-offset-4 ${
              isActive("/")
                ? "opacity-100 text-custom-black dark:text-beige underline underline-offset-4 font-semibold"
                : ""
            }`}
          >
            Overview
          </Link>
          <Link
            href="/meetup"
            className={`text-base font-medium opacity-80 transition-opacity duration-200 hover:opacity-100 hover:text-custom-black dark:hover:text-beige hover:underline hover:underline-offset-4 ${
              isActive("/meetup")
                ? "opacity-100 text-custom-black dark:text-beige underline underline-offset-4 font-semibold"
                : ""
            }`}
          >
            Hitting the AI
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m0 13.5V21m8.967-8.967h-2.25M5.25 12h-2.25m15.364-6.364l-1.591 1.591M6.756 17.244l-1.591 1.591m12.727 0l-1.591-1.591M6.756 6.756l-1.591-1.591m12.727 7.5A4.5 4.5 0 117.5 12a4.5 4.5 0 0111.25 0z"
                />
              </svg>
            )}
          </button>
          <Link
            href={COMMUNITY_JOIN_URL}
            onClick={() => event(trackJoinCommunity("Header"))}
            className="inline-block bg-custom-black text-white dark:bg-beige dark:text-custom-black px-6 py-2.5 rounded-full font-medium transition-all duration-200 hover:bg-terracotta dark:hover:bg-terracotta hover:-translate-y-0.5 text-sm"
          >
            Join Community
          </Link>
        </nav>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={() => {
              toggleTheme();
              event(trackThemeToggle(theme));
            }}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m0 13.5V21m8.967-8.967h-2.25M5.25 12h-2.25m15.364-6.364l-1.591 1.591M6.756 17.244l-1.591 1.591m12.727 0l-1.591-1.591M6.756 6.756l-1.591-1.591m12.727 7.5A4.5 4.5 0 117.5 12a4.5 4.5 0 0111.25 0z"
                />
              </svg>
            )}
          </button>
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              event(trackMenuToggle(isMenuOpen));
            }}
            className="p-2 -mr-2"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M3.75 9h16.5m-16.5 6.75h16.5"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-beige dark:bg-custom-black shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="DevnCode"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold font-space-grotesk dark:text-beige">
                DevnCode.
              </span>
            </div>
            <button 
              onClick={() => setIsMenuOpen(false)} 
              className="p-2"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 dark:text-beige"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-6 text-2xl font-space-grotesk">
            <Link
              href="/"
              className={`hover:text-custom-black dark:hover:text-beige transition-colors ${
                isActive("/") ? "text-custom-black dark:text-beige font-semibold" : "dark:text-white"
              }`}
              onClick={() => event(trackNavigation(EVENT_LABELS.OVERVIEW_LINK_MOBILE))}
            >
              Overview
            </Link>
            <Link
              href="/meetup"
              className={`hover:text-custom-black dark:hover:text-beige transition-colors ${
                isActive("/meetup") ? "text-custom-black dark:text-beige font-semibold" : "dark:text-white"
              }`}
              onClick={() => event(trackNavigation(EVENT_LABELS.HITTING_AI_LINK_MOBILE))}
            >
              Hitting the AI
            </Link>
          </nav>
          <div className="mt-auto pt-8 border-t border-black/10 dark:border-white/10">
            <Link
              href={COMMUNITY_JOIN_URL}
              onClick={() => event(trackJoinCommunity("Mobile Menu"))}
              className="block w-full text-center bg-custom-black text-white dark:bg-white dark:text-custom-black py-4 rounded-full font-medium text-lg"
            >
              Join Community
            </Link>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
}

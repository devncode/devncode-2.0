"use client";

import Image from "next/image";
import { event } from "../lib/mixpanel";
import { trackSocialClick } from "../lib/analytics";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "./icons";

export default function Footer() {
  const socials = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/devncode17",
      icon: <FacebookIcon />,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/devncode",
      icon: <InstagramIcon />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/devncode/",
      icon: <LinkedInIcon />,
    },
  ];

  return (
    <>
      {/* Slogan Section */}
      <section className="py-16 md:py-20 bg-black/[0.02] dark:bg-white/[0.02] border-t border-black/5 dark:border-white/5 transition-colors">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10 text-center">
          <h2 className="text-2xl md:text-4xl font-space-grotesk font-semibold text-custom-black dark:text-beige leading-tight">
            Connecting Developers,{" "}
            <span className="text-terracotta italic">City by City</span>.
          </h2>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 dark:border-white/10 py-10 md:py-12 transition-colors">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            {/* Brand and Copyright */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src="/logo.png"
                  alt="DevnCode"
                  width={32}
                  height={32}
                  className="w-8 h-8 flex-shrink-0 align-middle"
                />
                <h3 className="font-space-grotesk font-semibold text-lg leading-none m-0 text-custom-black dark:text-beige">
                  DevnCode
                </h3>
              </div>
              <p className="text-sm text-custom-black/60 dark:text-beige/60 leading-relaxed transition-colors">
                © 2026 DevnCode. All rights reserved.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  onClick={() => {
                    event(trackSocialClick(social.name));
                  }}
                  className="p-2.5 rounded-full bg-black/5 dark:bg-white/5 text-custom-black dark:text-beige hover:bg-terracotta hover:text-white dark:hover:bg-terracotta dark:hover:text-white transition-all duration-200 hover:-translate-y-0.5"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

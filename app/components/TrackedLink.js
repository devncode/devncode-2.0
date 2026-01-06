"use client";

import Link from "next/link";
import { event } from "../lib/mixpanel";

export default function TrackedLink({
  href,
  children,
  category,
  label,
  className,
  ...props
}) {
  return (
    <Link
      href={href}
      onClick={() => {
        if (category && label) {
          event({
            action: "click",
            category,
            label,
          });
        }
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}


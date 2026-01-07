"use client";

import Link from "next/link";
import PropTypes from "prop-types";
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

TrackedLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  category: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
};


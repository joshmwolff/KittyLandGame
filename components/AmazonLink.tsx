"use client";

import Link from "next/link";

const AMAZON_URL = "https://a.co/d/0fP5dFzw";

type AmazonLinkProps = {
  className?: string;
  children: React.ReactNode;
  eventName?: string;
  ariaLabel?: string;
};

export default function AmazonLink({
  className,
  children,
  eventName = "amazon_cta_click",
  ariaLabel,
}: AmazonLinkProps) {
  const handleClick = () => {
    console.log(eventName, {
      destination: AMAZON_URL,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <Link
      href={AMAZON_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}

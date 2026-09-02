"use client";

import type { ReactNode } from "react";
import { usePlatformAnalytics } from "customer-platform-site-sdk/react";

/**
 * CTA odkaz/button — po kliknutí posílá cta_click event do Customer Platform
 * (analytics). Vizualně identický s původním webem.
 */
export default function CtaLink({
  href,
  className,
  children,
  label,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  label: string;
}) {
  const { trackCta } = usePlatformAnalytics();
  return (
    <a
      href={href}
      className={className}
      onClick={() => trackCta(label)}
    >
      {children}
    </a>
  );
}

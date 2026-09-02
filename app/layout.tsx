import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createClient } from "customer-platform-site-sdk";
import { PlatformProvider } from "customer-platform-site-sdk/react";
import { platformConfig } from "@/lib/platform";
import { DEFAULT_CONTENT } from "@/lib/content";
import "./globals.css";

// Bounded revalidation — zákazník publikuje změnu v Portalu → web ji zobrazí
// do revalidačního okna BEZ rebuildu (ISR). 0 = force-dynamic.
export const revalidate = Number(process.env.REVALIDATE_SECONDS ?? 30) || 30;

export async function generateMetadata(): Promise<Metadata> {
  let title = DEFAULT_CONTENT.seo.title;
  let description = DEFAULT_CONTENT.seo.description;
  try {
    const client = createClient(platformConfig);
    const [site, page] = await Promise.all([client.getSite(), client.getPage("/")]);
    const siteSeo = (site.seo ?? {}) as Record<string, string>;
    const pageSeo = (page.seo ?? {}) as Record<string, string>;
    title = pageSeo["title"] ?? siteSeo["title"] ?? title;
    description = pageSeo["description"] ?? siteSeo["description"] ?? description;
  } catch {
    // Site API nedostupné → výchozí SEO (fallback, viz SDK pravidlo 6)
  }
  return {
    title,
    description,
    metadataBase: new URL("https://dousa-elektro.cz"),
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: "Pavel Douša — Elektrikář Chabařovice",
      locale: "cs_CZ",
      title,
      description,
      url: "https://dousa-elektro.cz/",
      images: [{ url: "https://dousa-elektro.cz/og-image.png", width: 1200, height: 630, alt: "Pavel Douša — Elektrikář Chabařovice" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://dousa-elektro.cz/og-image.png"],
    },
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs">
      <head>
        <meta name="robots" content="index, follow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700;900&family=JetBrains+Mono:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Client: forms/analytics/media — server: SSR obsah */}
        <PlatformProvider config={platformConfig}>{children}</PlatformProvider>
      </body>
    </html>
  );
}

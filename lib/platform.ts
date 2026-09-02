/**
 * Platform config — JEDINÉ místo, kde se web dozví, jak mluvit s Customer Platform.
 *
 * Env kontrakt (public, žádné secrets):
 *   NEXT_PUBLIC_PLATFORM_SITE_API_URL  — base URL Site API
 *   NEXT_PUBLIC_PLATFORM_WEBSITE_ID    — veřejný website identifikátor (w_...)
 */
import { createPlatformConfig } from "customer-platform-site-sdk";

export const platformConfig = createPlatformConfig({
  siteApiUrl: process.env.NEXT_PUBLIC_PLATFORM_SITE_API_URL ?? "",
  websiteId: process.env.NEXT_PUBLIC_PLATFORM_WEBSITE_ID,
});

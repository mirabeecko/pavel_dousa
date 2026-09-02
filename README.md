# dousa-elektro.cz — kopie webu (Customer Platform Site SDK)

Kopie webu **dousa-elektro.cz** (Pavel Douša — elektrikář, Chabařovice)
přepsaná podle **Customer Platform Site SDK**. Vizualně identická s živým
webem, jen jiný kód: business obsah se čte z Customer Platform, formulář
jde přes platformu (FormSubmission → Lead), analytika do platformy.

## Rychlý start

```bash
pnpm install
cp .env.example .env.local   # vyplň URL Site API + website ID
pnpm dev                     # vývoj
pnpm build && pnpm start     # produkce
pnpm platform:validate       # kontrola kompatibility s platformou
```

Výstup validátoru:
```
WEBSITE COMPATIBLE WITH CUSTOMER PLATFORM
```

## Env kontrakt (public, žádné secrets)

| Env | Povinné | Význam |
|---|---|---|
| `NEXT_PUBLIC_PLATFORM_SITE_API_URL` | ano | base URL Site API (např. `http://127.0.0.1:8000`) |
| `NEXT_PUBLIC_PLATFORM_WEBSITE_ID` | ano | veřejný website identifikátor (`w_...`) |
| `NEXT_PUBLIC_PLATFORM_FORM_KEY` | ne | formKey formuláře (fallback, pokud ho page config nenese) |
| `PLATFORM_PREVIEW_TOKEN` | ne | POUZE preview buildy |

## Jak je web postavený

- **Next.js 14 (App Router)** + `customer-platform-site-sdk` (instalováno
  z přiloženého tgz, zero-registry).
- **SSR/SEO**: `generateMetadata` a obsah sekcí se fetchují server-side
  přes `createClient(...).getSite()/getPage()/getContent()`; revalidace
  `REVALIDATE_SECONDS` (výchozí 30 s) — zákazník publikuje v Portalu →
  web změnu zobrazí bez rebuildu.
- **Business obsah**: čte se z Content Hubu platformy (content itemy
  `company`, `service:*`). Výchozí obsah v `lib/content.ts` je přesný
  přenos původního webu — používá se jako fallback, když platforma
  odpovídá neúplně nebo Site API neodpovídá (SDK pravidlo 6).
- **Formulář**: `usePlatformForm` (žádný vlastní backend) — odesílá na
  Site API → FormSubmission → Lead v CRM platformy. Atribuce (page,
  referrer, UTM, session/visitor) se sbírá automaticky.
- **Analytika**: `usePlatformAnalytics` — `page_view`, `cta_click`,
  `form_view`, `form_start`, `form_submit` jdou do platformy.
- **Design**: CSS, SVG vizuály (hero blesk, rozvaděč), ikony, animace
  (cursor glow, particles, reveal, count-up, ticker) jsou 1:1 přenos
  z původního webu — čistá prezentace, žádná business data.

## Struktura

```
dousa-elektro.cz/
├── app/
│   ├── layout.tsx        # metadata (SSR), fonts, PlatformProvider
│   ├── page.tsx          # server komponenta — sekce webu
│   └── globals.css       # přesný přenos CSS z původního webu
├── components/
│   ├── SiteEffects.tsx   # cursor glow, particles, reveal, count-up (client)
│   ├── ContactForm.tsx   # formulář přes usePlatformForm (client)
│   ├── CtaLink.tsx       # CTA s cta_click eventem (client)
│   ├── HeroVisual.tsx    # SVG blesk
│   ├── RozvadecVisual.tsx# SVG schéma rozvaděče
│   └── icons.tsx         # inline SVG ikony
├── lib/
│   ├── platform.ts       # createPlatformConfig (env kontrakt)
│   └── content.ts        # výchozí obsah + merge z platformy
├── public/og-image.png
├── customer-platform-site-sdk-1.0.0.tgz
└── .env.example
```

## Ověření vizuální shody

Screenshoty (desktop + mobile, full-page) porovnané proti živému
`https://dousa-elektro.cz/` — shoda ~100 %; jediné rozdíly jsou časově
proměnné prvky (particle canvas, SMIL pulzující tečky v SVG rozvaděče),
které jsou v obou verzích identicky nakódované.

## Poznámka k datům

Pro lokální test je v Customer Platform (workspace dousa-elektro.cz)
vytvořený formulář `frm_dousa_poptavka` (pole name/place/job/date/message)
a publikované content itemy firmy a 6 služeb — odpovídají obsahu živého
webu. V produkci stačí nasměrovat env na produkční Site API a website ID.

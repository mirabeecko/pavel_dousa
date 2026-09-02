/**
 * Výchozí obsah webu dousa-elektro.cz — přesný přenos původního obsahu
 * (živý web). Business obsah se vrství z Customer Platform přes Site SDK:
 *   - platformní content item (company.main, service:*, faq:*, review:*)
 *     má přednost,
 *   - pokud platforma obsah nemá (nebo Site API neodpovídá), použije se
 *     tento výchozí obsah → web vždy vypadá identicky (fallback per SDK).
 *
 * Prezentace (layout, animace, SVG) je hardcoded v komponentách/CSS —
 * tady jsou JEN data.
 */
import type { PublicContentItem } from "customer-platform-site-sdk";

export interface ServiceItem {
  key: string;
  num: string;
  variant: "s1" | "s2" | "s3";
  icon: "rozvadece" | "instalace" | "rekonstrukce" | "svetla" | "provozovny" | "revize";
  name: string;
  description: string;
}

export interface StatItem {
  count: number;
  suffix: string;
  label: string;
  color: "y" | "b" | "r" | "g";
}

export interface TimelineStep {
  num: string;
  title: string;
  description: string;
  color: "y" | "b" | "g";
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ReviewItem {
  author: string;
  rating: number;
  text: string;
}

export interface SiteContent {
  company: {
    name: string;
    tagline: string;
    city: string;
    area: string;
    phone: string;
    email: string;
    valueProposition: string;
  };
  hero: {
    kicker: string;
    h1: [string, string, string]; // neon, strike, accent
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    meta: StatItem[];
  };
  ticker: string[];
  rozvadece: {
    kicker: string;
    titleA: string;
    titleB: string;
    paragraphs: string[];
    bullets: string[];
    tags: [string, string, string];
  };
  servicesHead: { kicker: string; titleA: string; titleB: string; paragraph: string };
  services: ServiceItem[];
  stats: StatItem[];
  timelineHead: { kicker: string; titleA: string; titleB: string; paragraph: string };
  timeline: TimelineStep[];
  cta: {
    kicker: string;
    titleA: string;
    titleB: string;
    paragraph: string;
    bullets: string[];
  };
  form: {
    title: string;
    subtitle: string;
    fields: { name: string; label: string; placeholder?: string; options?: string[]; textarea?: boolean; wide?: boolean; required?: boolean }[];
    submit: string;
    note: string;
    success: string;
    error: string;
  };
  footer: {
    name: string;
    tagline: string;
    servicesLeft: string;
    servicesAccent: string;
    servicesRight: string;
  };
  seo: {
    title: string;
    description: string;
  };
}

export const DEFAULT_CONTENT: SiteContent = {
  company: {
    name: "Pavel Douša",
    tagline: "Elektrikář / Chabařovice",
    city: "Chabařovice",
    area: "Chabařovice + 30 km",
    phone: "",
    email: "",
    valueProposition: "Rozvaděče, kompletní elektroinstalace, rekonstrukce, LED a chytré prvky. Klid v pojistkách.",
  },
  hero: {
    kicker: "Online · Beru zakázky · Chabařovice + 30 km",
    h1: ["Elektřina", "bez kompromisů.", "Klid v pojistkách."],
    sub: "Jsem <strong>Pavel Douša</strong> — elektrikář z Chabařovic. Dělám rozvaděče, kompletní instalace, rekonstrukce bytů a domů, LED a chytré prvky. Bez bordelu. Bez výmluv. <strong>S přehledem.</strong>",
    ctaPrimary: "Pošlete poptávku",
    ctaSecondary: "Co umím",
    meta: [
      { count: 15, suffix: "+", label: "let v oboru", color: "y" },
      { count: 540, suffix: "+", label: "zakázek hotovo", color: "b" },
      { count: 24, suffix: "h", label: "odezva na poptávku", color: "r" },
    ],
  },
  ticker: [
    "ROZVADĚČE",
    "ELEKTROINSTALACE",
    "REKONSTRUKCE",
    "LED & CHYTRÉ DOMY",
    "PŘÍPRAVA NA REVIZI",
    "PROVOZOVNY · DÍLNY",
  ],
  rozvadece: {
    kicker: "Specializace",
    titleA: "Rozvaděče, které",
    titleB: "vidíte rád i s otevřenými dvířky.",
    paragraphs: [
      "Rozvaděč je srdce každé instalace. Když je dělaný správně, lidi v něm vidí pořádek, řemeslo a klid. Když je dělaný špatně, prozradí se to při první kontrole — nebo při první závadě.",
      "Stavím rozvaděče na klíč: bytové, rodinné, pro provozovny i dílny. Vždy s přehledným popisem, dokumentací a logikou, kterou pochopí i ten, kdo přijde po mně.",
    ],
    bullets: [
      "Přepěťové ochrany & chrániče tam, kde mají být",
      "Čisté kabelové vedení a popisy okruhů",
      "Předaný stav připravený na revizního technika",
      "Rezerva pro budoucí rozšíření — nemusíte to dělat dvakrát",
    ],
    tags: ["// MAIN BUS · 400V", "// FI 30mA", "// READY"],
  },
  servicesHead: {
    kicker: "Co dělám",
    titleA: "Služby",
    titleB: "od kabelu po klid",
    paragraph:
      "Od malé úpravy zásuvky po kompletní rekonstrukci. Vždy s důrazem na čistou práci, jasné předání a životnost, která nezklame.",
  },
  services: [
    {
      key: "service-rozvadece",
      num: "01",
      variant: "s1",
      icon: "rozvadece",
      name: "Montáž & výměna rozvaděčů",
      description:
        "Bytové i provozní rozvaděče na klíč. Přepěťové ochrany, chrániče, popisky. Vše připravené pro revizního technika.",
    },
    {
      key: "service-elektroinstalace",
      num: "02",
      variant: "s2",
      icon: "instalace",
      name: "Kompletní elektroinstalace",
      description:
        "Novostavby, rekonstrukce, drobné úpravy. Trasy promyšlené tak, aby to fungovalo i za 20 let — bez sekání do zdi naslepo.",
    },
    {
      key: "service-rekonstrukce",
      num: "03",
      variant: "s3",
      icon: "rekonstrukce",
      name: "Rekonstrukce bytů a domů",
      description:
        "Sjednotím to, co tam je, a připravím to, co bude. Domluva s ostatními řemesly, aby do vás nezačal kopat zedník v půli práce.",
    },
    {
      key: "service-svetla",
      num: "04",
      variant: "s1",
      icon: "svetla",
      name: "Světla, LED & chytré prvky",
      description:
        "Scény, stmívače, LED pásky, chytré spínače a senzory. Aby se světlo chovalo, jak to potřebujete vy — ne tlačítko ze 70. let.",
    },
    {
      key: "service-provozovny",
      num: "05",
      variant: "s2",
      icon: "provozovny",
      name: "Provozovny & dílny",
      description:
        "Třífázové zásuvky, robustní okruhy, samostatné jištění strojů. Postavené na to, že tam bude každý den někdo pracovat.",
    },
    {
      key: "service-revize",
      num: "06",
      variant: "s3",
      icon: "revize",
      name: "Příprava na revizi",
      description:
        "Dokumentace, popisy, čistý stav. Když přijde revizní technik, neztrácíte čas dohledáváním. A neplatíte za druhou návštěvu.",
    },
  ],
  stats: [
    { count: 15, suffix: "+", label: "Let praxe", color: "y" },
    { count: 540, suffix: "+", label: "Hotových zakázek", color: "b" },
    { count: 100, suffix: "%", label: "Bez bordelu", color: "g" },
    { count: 24, suffix: "h", label: "Odezva", color: "b" },
  ],
  timelineHead: {
    kicker: "Jak to běží",
    titleA: "Postup zakázky",
    titleB: "bez tajností",
    paragraph:
      "Čtyři kroky. Žádné překvapení. Žádné nečekané faktury na konci. Jen práce, kterou si můžete zpětně rozkliknout.",
  },
  timeline: [
    {
      num: "01",
      title: "Poptávka",
      description: "Napište mi, co potřebujete. Stačí pár vět — kde, co a jestli to spěchá.",
      color: "y",
    },
    {
      num: "02",
      title: "Prohlídka na místě",
      description: "Přijedu, podívám se, navrhnu rozumné řešení a řeknu, co má prioritu.",
      color: "b",
    },
    {
      num: "03",
      title: "Montáž",
      description: "Čistá práce, přehledné vedení, logické zapojení. A pořádek, když odcházím.",
      color: "y",
    },
    {
      num: "04",
      title: "Předání",
      description: "Víte, co se udělalo, kde co je a co bude potřeba dál. Bez hádanek.",
      color: "g",
    },
  ],
  cta: {
    kicker: "Poptávka — zdarma a nezávazně",
    titleA: "Máte rozvaděč, rekonstrukci nebo",
    titleB: "kabelový rébus?",
    paragraph:
      "Napište, co se děje. Čím přesněji to popíšete, tím rychleji můžu odhadnout rozsah práce a domluvit termín. Žádné ankety, žádné call centrum — píšete přímo mně.",
    bullets: [
      "Odpovídám do 24 hodin",
      "Cenovou nabídku dostanete písemně",
      "Chabařovice, Ústí nad Labem, Teplice a okolí",
    ],
  },
  form: {
    title: "Rychlá poptávka",
    subtitle: "Vyplňte, co víte. Zbytek si doladíme po telefonu.",
    fields: [
      { name: "name", label: "Jméno", placeholder: "Vaše jméno", required: true },
      { name: "place", label: "Lokalita", placeholder: "Chabařovice / okolí", required: true },
      {
        name: "job",
        label: "Typ práce",
        options: [
          "Montáž nebo výměna rozvaděče",
          "Kompletní elektroinstalace",
          "Rekonstrukce bytu / domu",
          "Světla, LED, chytré prvky",
          "Provozovna, dílna, garáž",
          "Příprava na revizi",
        ],
      },
      { name: "date", label: "Termín", placeholder: "Kdy to potřebujete" },
      {
        name: "message",
        label: "Co se děje",
        placeholder: "Například: rekonstrukce bytu 3+1, nový rozvaděč, kuchyň, garáž, dílna...",
        textarea: true,
        wide: true,
      },
    ],
    submit: "Odeslat poptávku",
    note: "",
    success: "Děkujeme. Vaše zpráva byla odeslána.",
    error: "Nepodařilo se odeslat. Zkuste to prosím znovu.",
  },
  footer: {
    name: "Pavel Douša",
    tagline: "elektrikář · Chabařovice",
    servicesLeft: "Rozvaděče",
    servicesAccent: "elektroinstalace",
    servicesRight: "rekonstrukce · LED",
  },
  seo: {
    title: "Pavel Douša | Elektrikář Chabařovice — Rozvaděče · Instalace · Revize",
    description:
      "Pavel Douša — profesionální elektrikář z Chabařovic. Rozvaděče, kompletní elektroinstalace, rekonstrukce, LED a chytré prvky. Klid v pojistkách. Kvalita bez kompromisů.",
  },
};

/** Platformní content itemy → vrstva přes výchozí obsah (stabilní klíče). */
export function mergePlatformContent(
  defaults: SiteContent,
  items: PublicContentItem[],
): SiteContent {
  const content = structuredClone(defaults);

  const company = items.find((i) => i.key === "company.main" || i.item_type === "company");
  if (company?.data) {
    const d = company.data as Record<string, unknown>;
    if (typeof d["name"] === "string" && String(d["name"]).trim()) content.company.name = d["name"] as string;
    if (typeof d["city"] === "string" && String(d["city"]).trim()) content.company.city = d["city"] as string;
    if (typeof d["phone"] === "string" && String(d["phone"]).trim()) content.company.phone = d["phone"] as string;
    if (typeof d["email"] === "string" && String(d["email"]).trim()) content.company.email = d["email"] as string;
    if (typeof d["value_proposition"] === "string" && String(d["value_proposition"]).trim()) {
      content.company.valueProposition = d["value_proposition"] as string;
    }
    if (typeof d["area"] === "string" && String(d["area"]).trim()) content.company.area = d["area"] as string;
    if (typeof d["tagline"] === "string" && String(d["tagline"]).trim()) content.company.tagline = d["tagline"] as string;
  }

  // services — platformní service:* itemy nahradí výchozí seznam (stejné klíče)
  const platformServices = items
    .filter((i) => i.item_type === "service" && i.data && typeof i.data === "object")
    .map((i) => {
      const d = i.data as Record<string, unknown>;
      const existing = content.services.find((s) => s.key === i.key);
      return {
        key: i.key,
        num: existing?.num ?? String(content.services.length + 1).padStart(2, "0"),
        variant: existing?.variant ?? "s1",
        icon: existing?.icon ?? "rozvadece",
        name: (d["name"] as string) ?? i.name ?? "",
        description: (d["description"] as string) ?? "",
      };
    })
    .filter((s) => s.name);
  if (platformServices.length >= 3) {
    // zachovej pořadí a design výchozího seznamu, doplň platformní texty
    for (const ps of platformServices) {
      const target = content.services.find((s) => s.key === ps.key);
      if (target) {
        target.name = ps.name;
        target.description = ps.description;
      }
    }
  }

  return content;
}

export type { PublicContentItem };

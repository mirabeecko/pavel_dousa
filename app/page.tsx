import {
  createClient,
  type PublicContentItem,
} from "customer-platform-site-sdk";
import { platformConfig } from "@/lib/platform";
import { DEFAULT_CONTENT, mergePlatformContent, type SiteContent } from "@/lib/content";
import { BoltIcon, CheckIcon, ArrowIcon, ServiceIcon } from "@/components/icons";
import HeroVisual from "@/components/HeroVisual";
import RozvadecVisual from "@/components/RozvadecVisual";
import ContactForm from "@/components/ContactForm";
import SiteEffects from "@/components/SiteEffects";
import CtaLink from "@/components/CtaLink";

export const revalidate = Number(process.env.REVALIDATE_SECONDS ?? 30) || 30;

/** Výchozí formKey — přichází z page configu (canonical binding) nebo env. */
function resolveFormKey(pageSections: { section_type: string; configuration?: Record<string, unknown>; content?: Record<string, unknown> }[], pageContent: PublicContentItem[]): string {
  const formSection = pageSections.find((s) => s.section_type === "form");
  const fromConfig =
    (formSection?.configuration?.["form_key"] as string) ??
    (formSection?.content?.["form"] as string) ??
    "";
  const fromEnv = process.env.NEXT_PUBLIC_PLATFORM_FORM_KEY ?? "";
  if (fromConfig) return fromConfig;
  if (fromEnv) return fromEnv;
  // fallback: první formulář workspace (lokalizovatelný přes content item)
  const formItem = pageContent.find((i) => i.item_type === "form");
  return (formItem?.key as string) ?? "";
}

export default async function HomePage() {
  const client = createClient(platformConfig);

  // SSR: SEO-critical obsah se fetchuje na serveru (ne client-side).
  let items: PublicContentItem[] = [];
  let pageSections: { section_type: string; configuration?: Record<string, unknown>; content?: Record<string, unknown> }[] = [];
  try {
    const [, page, contentItems] = await Promise.all([
      client.getSite(),
      client.getPage("/"),
      client.getContent(),
    ]);
    items = contentItems;
    pageSections = page.sections ?? [];
  } catch {
    // Site API nedostupné → výchozí obsah (fallback, web funguje vždy)
  }

  const merged = mergePlatformContent(DEFAULT_CONTENT, items);
  const formKey = resolveFormKey(pageSections, items);

  return (
    <main>
      <SiteEffects />
      <CursorGlow />
      <Nav content={merged} />
      <Hero content={merged} />
      <Ticker items={merged.ticker} />
      <Rozvadece content={merged} />
      <Services content={merged} />
      <Stats content={merged} />
      <Timeline content={merged} />
      <Cta content={merged} formKey={formKey} />
      <Footer content={merged} />
      <Webdo24Bar />
    </main>
  );
}

/* ────────────────────────── pomocné server komponenty ────────────────────── */

function CursorGlow() {
  return <div className="cursor-glow" id="cursorGlow" />;
}

function Nav({ content }: { content: SiteContent }) {
  const c = content;
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a className="brand" href="#">
          <div className="brand-mark">
            <BoltIcon size={26} />
          </div>
          <div>
            <div className="brand-name">{c.company.name}</div>
            <small>// {c.company.tagline}</small>
          </div>
        </a>
        <nav className="nav-links">
          <a href="#sluzby">Služby</a>
          <a href="#rozvadece">Rozvaděče</a>
          <a href="#postup">Postup</a>
          <CtaLink href="#kontakt" className="btn btn-primary" label="Poptávka (nav)">
            Poptávka
          </CtaLink>
        </nav>
      </div>
    </header>
  );
}

function Hero({ content }: { content: SiteContent }) {
  const c = content;
  return (
    <section className="hero">
      <canvas id="particles" />
      <div className="hero-grid" />
      <div className="wrap hero-inner">
        <div className="hero-content reveal">
          <div className="kicker">
            <span className="dot"></span>
            {c.hero.kicker}
          </div>
          <h1>
            <span className="neon">{c.hero.h1[0]}</span>
            <span className="strike">{c.hero.h1[1]}</span>
            <span className="accent">{c.hero.h1[2]}</span>
          </h1>
          <p className="hero-sub" dangerouslySetInnerHTML={{ __html: c.hero.sub }} />
          <div className="hero-ctas">
            <CtaLink href="#kontakt" className="btn btn-primary" label={c.hero.ctaPrimary}>
              {c.hero.ctaPrimary}
              <ArrowIcon size={16} />
            </CtaLink>
            <CtaLink href="#sluzby" className="btn btn-ghost" label={c.hero.ctaSecondary}>
              {c.hero.ctaSecondary}
            </CtaLink>
          </div>
          <div className="hero-meta">
            {c.hero.meta.map((m) => (
              <div className="hero-meta-item" key={m.label}>
                <div className={`hero-meta-num ${m.color === "b" ? "b" : m.color === "r" ? "r" : ""}`} data-count={m.count} data-suffix={m.suffix}>
                  0
                </div>
                <div className="hero-meta-lbl">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
        <HeroVisual />
      </div>
      <div className="scroll-cue">scroll</div>
    </section>
  );
}

function Ticker({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="ticker">
      <div className="ticker-track">
        {doubled.map((t, i) => (
          <span key={`${t}-${i}`}>
            {t} <BoltIcon size={22} />
          </span>
        ))}
      </div>
    </div>
  );
}

function Rozvadece({ content }: { content: SiteContent }) {
  const c = content;
  return (
    <section id="rozvadece">
      <div className="wrap">
        <div className="rozvadec-grid">
          <div className="rozvadec-text reveal">
            <div className="kicker">
              <span className="dot"></span>
              {c.rozvadece.kicker}
            </div>
            <h3>
              {c.rozvadece.titleA} <b>{c.rozvadece.titleB}</b>
            </h3>
            {c.rozvadece.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <ul>
              {c.rozvadece.bullets.map((b, i) => (
                <li key={i}>
                  <CheckIcon size={20} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <RozvadecVisual tags={c.rozvadece.tags} />
        </div>
      </div>
    </section>
  );
}

function Services({ content }: { content: SiteContent }) {
  const c = content;
  return (
    <section id="sluzby">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="kicker">
            <span className="dot"></span>
            {c.servicesHead.kicker}
          </div>
          <h2>
            {c.servicesHead.titleA} <em>{c.servicesHead.titleB}</em>
          </h2>
          <p>{c.servicesHead.paragraph}</p>
        </div>
        <div className="services-grid">
          {c.services.map((s, i) => (
            <article className={`service ${s.variant} reveal${i % 3 === 1 ? " delay-1" : i % 3 === 2 ? " delay-2" : ""}`} key={s.key}>
              <div className="service-num">{s.num}</div>
              <div className="service-icon">
                <ServiceIcon icon={s.icon} />
              </div>
              <h3>{s.name}</h3>
              <p>{s.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats({ content }: { content: SiteContent }) {
  const c = content;
  return (
    <section className="stats compact">
      <div className="wrap">
        <div className="stats-grid reveal">
          {c.stats.map((s, i) => (
            <div className="stat" key={i}>
              <div className="stat-num">
                <span data-count={s.count}>0</span>
                <span className="stat-suffix">{s.suffix}</span>
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline({ content }: { content: SiteContent }) {
  const c = content;
  return (
    <section id="postup">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="kicker">
            <span className="dot"></span>
            {c.timelineHead.kicker}
          </div>
          <h2>
            {c.timelineHead.titleA} <em>{c.timelineHead.titleB}</em>
          </h2>
          <p>{c.timelineHead.paragraph}</p>
        </div>
        <div className="timeline">
          {c.timeline.map((t, i) => (
            <div className={`tl-step reveal${i > 0 ? ` delay-${i}` : ""}`} key={t.num}>
              <div className="tl-node">{t.num}</div>
              <h4>{t.title}</h4>
              <p>{t.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta({ content, formKey }: { content: SiteContent; formKey: string }) {
  const c = content;
  return (
    <section className="cta" id="kontakt">
      <div className="wrap cta-grid">
        <div className="cta-text reveal">
          <div className="kicker">
            <span className="dot"></span>
            {c.cta.kicker}
          </div>
          <h2>
            {c.cta.titleA} <b>{c.cta.titleB}</b>
          </h2>
          <p>{c.cta.paragraph}</p>
          <ul className="cta-bullets">
            {c.cta.bullets.map((b, i) => (
              <li key={i}>
                <CheckIcon size={22} />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <ContactForm content={c.form} formKey={formKey} page="/" />
      </div>
    </section>
  );
}

function Footer({ content }: { content: SiteContent }) {
  const c = content;
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span>
          <span className="y">{c.footer.name}</span> · {c.footer.tagline}
        </span>
        <span>
          {c.footer.servicesLeft} · <span className="b">{c.footer.servicesAccent}</span> · {c.footer.servicesRight}
        </span>
      </div>
    </footer>
  );
}

function Webdo24Bar() {
  return (
    <div id="wd24-bar">
      Web&nbsp;vytvořil&nbsp;
      <a href="https://webdo24.cz" target="_blank" rel="noopener">
        webdo<span>24</span>.cz
      </a>
      &nbsp;·&nbsp;Profesionální web do 24&nbsp;hodin
    </div>
  );
}

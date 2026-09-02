"use client";

import { useEffect } from "react";
import { usePageView } from "customer-platform-site-sdk/react";

/**
 * Client-side efekty přenesené 1:1 z původního webu:
 *  - cursor glow (lerp)
 *  - particle canvas v hero
 *  - service karty: --mx/--my spotlight
 *  - reveal na scroll (IntersectionObserver)
 *  - count-up animace statistik
 *  - page_view event do Customer Platform (analytics)
 */
export default function SiteEffects() {
  usePageView();

  useEffect(() => {
    // ── CURSOR GLOW ──
    const glow = document.getElementById("cursorGlow");
    if (glow) {
      let tx = 0, ty = 0, cx = 0, cy = 0;
      const onMove = (e: MouseEvent) => {
        tx = e.clientX; ty = e.clientY;
      };
      document.addEventListener("mousemove", onMove);
      let raf = 0;
      const loop = () => {
        cx += (tx - cx) * 0.12;
        cy += (ty - cy) * 0.12;
        glow.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
        raf = requestAnimationFrame(loop);
      };
      loop();
      const onLeave = () => (glow.style.opacity = "0");
      const onEnter = () => (glow.style.opacity = "1");
      document.addEventListener("mouseleave", onLeave);
      document.addEventListener("mouseenter", onEnter);
      return () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseleave", onLeave);
        document.removeEventListener("mouseenter", onEnter);
        cancelAnimationFrame(raf);
      };
    }
  }, []);

  useEffect(() => {
    // ── SERVICE CARDS SPOTLIGHT ──
    const cards = document.querySelectorAll<HTMLElement>(".service");
    const onCardMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    cards.forEach((c) => c.addEventListener("mousemove", onCardMove));
    return () => cards.forEach((c) => c.removeEventListener("mousemove", onCardMove));
  }, []);

  useEffect(() => {
    // ── PARTICLES (hero canvas) ──
    const canvas = document.getElementById("particles") as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = 0, H = 0;
    let raf = 0;
    let particles: { x: number; y: number; vx: number; vy: number; r: number; c: string; a: number }[] = [];

    const resize = () => {
      const hero = canvas.parentElement;
      if (!hero) return;
      W = canvas.width = hero.offsetWidth * window.devicePixelRatio;
      H = canvas.height = hero.offsetHeight * window.devicePixelRatio;
      canvas.style.width = `${hero.offsetWidth}px`;
      canvas.style.height = `${hero.offsetHeight}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 70;
    particles = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4 * window.devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.4 * window.devicePixelRatio,
        r: Math.random() * 1.6 * window.devicePixelRatio + 0.4,
        c: Math.random() > 0.6 ? "#FFD600" : "#00D4FF",
        a: Math.random() * 0.6 + 0.2,
      });
    }

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.globalAlpha = p.a;
        ctx.fillStyle = p.c;
        ctx.shadowColor = p.c;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = "#00D4FF";
      const max = 130 * window.devicePixelRatio;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < max) {
            ctx.globalAlpha = (1 - d / max) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    // ── REVEAL ──
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    // ── COUNT-UP ──
    const animateCount = (el: HTMLElement) => {
      const target = parseInt(el.dataset.count || el.textContent || "0", 10);
      const suffix = el.dataset.suffix || "";
      const duration = 1600;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = Math.floor(target * eased);
        el.textContent = `${val}${suffix}`;
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = `${target}${suffix}`;
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const target = e.target as HTMLElement;
            if (target.dataset.count) {
              animateCount(target);
            } else {
              target.querySelectorAll<HTMLElement>("[data-count]").forEach(animateCount);
            }
            io.unobserve(target);
          }
        });
      },
      { threshold: 0.4 },
    );
    document.querySelectorAll("[data-count]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}

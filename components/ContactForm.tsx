"use client";

import { useState } from "react";
import { usePlatformForm } from "customer-platform-site-sdk/react";
import type { SiteContent } from "@/lib/content";

/**
 * Kontaktní formulář — design 1:1 podle původního webu.
 * Odesílání jde PŘES Customer Platform (usePlatformForm → Site API →
 * FormSubmission → Lead). Žádný vlastní backend. Atribuce (page/referrer/
 * UTM/session/visitor) se sbírá automaticky.
 */
export default function ContactForm({
  content,
  formKey,
  page,
}: {
  content: SiteContent["form"];
  formKey: string;
  page: string;
}) {
  const { submit, submitting, done } = usePlatformForm(formKey, { page });
  const [note, setNote] = useState<{ text: string; ok: boolean } | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const answers: Record<string, unknown> = {};
    data.forEach((v, k) => {
      answers[k] = v;
    });
    const res = await submit(answers);
    if (res) {
      setNote({ text: content.success, ok: true });
      e.currentTarget.reset();
    } else {
      setNote({ text: content.error, ok: false });
    }
  };

  return (
    <form className="contact-card reveal delay-2" id="contactForm" onSubmit={(e) => void onSubmit(e)}>
      <h3>{content.title}</h3>
      <p>{content.subtitle}</p>
      <div className="form-grid">
        {content.fields.map((f) =>
          f.textarea ? (
            <label className="wide" key={f.name}>
              {f.label}
              <textarea name={f.name} placeholder={f.placeholder} />
            </label>
          ) : f.options ? (
            <label key={f.name}>
              {f.label}
              <select name={f.name}>
                {f.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
          ) : (
            <label key={f.name}>
              {f.label}
              <input type="text" name={f.name} placeholder={f.placeholder} required={f.required} />
            </label>
          ),
        )}
      </div>
      <button className="btn-submit" type="submit" disabled={submitting}>
        {submitting ? "Odesílám…" : content.submit}
      </button>
      <div className={`form-note${done && note && note.ok ? " ok" : ""}`}>
        {note ? note.text : ""}
      </div>
    </form>
  );
}

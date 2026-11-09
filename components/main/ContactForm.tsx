"use client";

import { useState, type FormEvent } from "react";

const contactEmail = "2431871.prince@gmail.com";

export default function ContactForm() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Your message could not be sent.");
      form.reset();
      setStatus("Thanks! Your message has been sent.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Your message could not be sent. Please email me directly.");
    } finally {
      setSending(false);
    }
  };

  return <section id="contact" className="contact-section section-shell">
    <div className="contact-intro">
      <p className="section-kicker">LET’S BUILD SOMETHING</p>
      <h2>Get in <em>touch.</em></h2>
      <p>Have a project or an opportunity in mind? Send me a message and I’ll get back to you.</p>
      <a className="contact-email" href={`mailto:${contactEmail}`}>{contactEmail} <span aria-hidden="true">↗</span></a>
    </div>
    <form className="contact-form" onSubmit={submit}>
      <label>Name<input name="name" autoComplete="name" maxLength={100} required placeholder="Your name" /></label>
      <label>Email<input name="email" type="email" autoComplete="email" maxLength={254} required placeholder="you@example.com" /></label>
      <label>Message<textarea name="message" maxLength={4000} required rows={5} placeholder="Tell me a little about what you have in mind" /></label>
      <div className="contact-submit-row"><button type="submit" disabled={sending}>{sending ? "Sending…" : "Send message"}<span aria-hidden="true">↗</span></button><p role="status" aria-live="polite">{status}</p></div>
      <label className="contact-honeypot" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
    </form>
  </section>;
}

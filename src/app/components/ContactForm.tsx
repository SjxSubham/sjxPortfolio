"use client";

import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message should be at least 10 characters"),
  company: z.string().optional() // honeypot
});

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setStatus("sending");
    setError(null);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
      company: String(formData.get("company") || "")
    };

    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      setStatus("error");
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data)
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Failed to send");
      }
      setStatus("sent");
    } catch (e: any) {
      setStatus("error");
      setError(e.message ?? "Something went wrong");
    }
  }

  return (
    <section id="contact" className="scroll-mt-20">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold">Let’s Connect</h2>
        <p className="text-neutral-400 mt-1">Have an opportunity or question? I’d love to hear from you.</p>
      </div>

      <form
        action={onSubmit}
        className="shine-border grid gap-4 rounded-2xl border border-border bg-card p-6"
      >
        {/* Honeypot field (hidden) */}
        <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm text-neutral-300">Your name</label>
            <input
              id="name"
              name="name"
              placeholder="Jane Doe"
              className="rounded-lg border border-border bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm text-neutral-300">Your email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="jane@example.com"
              className="rounded-lg border border-border bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>
        </div>
        <div className="grid gap-2">
          <label htmlFor="message" className="text-sm text-neutral-300">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell me about your idea…"
            rows={6}
            className="rounded-lg border border-border bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={status === "sending"}
            className="relative inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-medium shadow-glow disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : status === "sent" ? "Sent!" : "Send Message"}
            <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
              <span className="absolute inset-y-0 -left-2 w-1/3 -skew-x-12 bg-white/30 blur-md animate-shine" />
            </span>
          </button>
          {status === "error" && <p className="text-sm text-red-400">{error}</p>}
          {status === "sent" && <p className="text-sm text-emerald-400">Thanks! I’ll get back to you soon.</p>}
        </div>
      </form>
    </section>
  );
}
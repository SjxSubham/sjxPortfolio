"use client";

type Social = { label: string; href: string };

const SOCIALS: Social[] = [
  { label: "Instagram", href: "https://instagram.com/subham_jack_xons" },
  { label: "HackerRank", href: "https://www.hackerrank.com/profile/arijitiansjx" },
  { label: "LeetCode", href: "https://www.leetcode.com/sjx_subham" },
  { label: "GeeksforGeeks", href: "https://www.geeksforgeeks.org/user/sjxsuincr/" },
  { label: "Discord", href: "https://discord.gg/sjx7046" }
];

export function SocialLinks() {
  return (
    <section id="socials" className="scroll-mt-20">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold">Connect with me</h2>
        <p className="text-neutral-400 mt-1">Find me on these platforms.</p>
      </div>
      <div className="shine-border rounded-2xl border border-border bg-card p-4">
        <div className="flex flex-wrap gap-2">
          {SOCIALS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border/70 bg-black/30 px-3 py-1 text-sm hover:bg-white/5"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
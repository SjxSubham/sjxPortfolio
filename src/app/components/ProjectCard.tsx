"use client";

import { ExternalLink, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type Project = {
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
};

export function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [loadPreview, setLoadPreview] = useState(false);

  // Lazy-load iframe on intersection
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setLoadPreview(true);
        });
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current!;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      className="group shine-border relative overflow-hidden rounded-2xl border border-border bg-card"
      style={{
        transformStyle: "preserve-3d"
      }}
    >
      {/* Soft light following cursor */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(300px 200px at var(--mx) var(--my), rgba(124,58,237,0.12), transparent 40%)"
        }}
      />

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="mt-1 text-sm text-neutral-400">{project.description}</p>
          </div>
          <div className="flex gap-2">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-primary/90 px-3 py-1.5 text-xs font-medium hover:bg-primary"
            >
              Live <ExternalLink size={14} />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-white/5"
            >
              Code <Github size={14} />
            </a>
          </div>
        </div>

        {/* Tech pills */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="rounded-full border border-border/60 bg-black/20 px-2 py-0.5 text-[11px] text-neutral-300">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Live preview */}
      <div className="relative mx-3 mb-3 overflow-hidden rounded-xl border border-border/70 bg-black/40">
        <div className="absolute right-2 top-2 z-10 rounded-full bg-black/50 px-2 py-0.5 text-[10px] text-white/80 backdrop-blur">
          Preview
        </div>
        <div className="relative aspect-[16/10]">
          {loadPreview ? (
            <iframe
              className="preview-frame pointer-events-none absolute inset-0 h-full w-full scale-[0.85] origin-top rounded-md"
              src={project.liveUrl}
              title={project.title + " preview"}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-neutral-500 text-sm">Loading preview…</div>
          )}
          {/* vignette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
        </div>
      </div>
    </div>
  );
}
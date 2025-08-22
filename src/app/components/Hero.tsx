"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/70 bg-card p-8 sm:p-12 shine-border">
      {/* Aurora blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-aurora" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-secondary/20 blur-3xl animate-aurora" />

      <div className="relative z-10 grid gap-8 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Building experiences that feel
            <span className="relative ml-3 inline-block">
              <span className="relative z-10 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                alive
              </span>
              <span className="absolute inset-x-0 -bottom-1 h-2 bg-gradient-to-r from-primary/40 to-secondary/40 blur" />
            </span>
          </h1>
          <p className="text-neutral-300/90 text-base sm:text-lg">
            I’m Arijit, a developer who loves crafting performant frontends, delightful micro-interactions,
            and robust systems with TypeScript and Next.js.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#projects" className="relative inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-medium shadow-glow">
              See Projects <ArrowRight size={16} />
              <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                <span className="absolute inset-y-0 -left-1 w-1/3 -skew-x-12 bg-white/30 blur-md animate-shine" />
              </span>
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border border-border/80 px-4 py-2">
              Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="group shine-border overflow-hidden">
            <div className="aspect-[4/3]">
              {/* Animated floating dots grid */}
              <GridOrb />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function GridOrb() {
  return (
    <div className="relative h-full w-full bg-gradient-to-b from-neutral-900 to-neutral-950">
      <svg className="absolute inset-0 h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-gradient-to-br from-primary/70 to-secondary/70 blur-2xl animate-float-y" />
      </div>
    </div>
  );
}
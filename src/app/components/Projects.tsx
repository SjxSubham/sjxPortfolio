"use client";

import { PROJECTS } from "@/src/app/data/projects";
import { ProjectCard } from "@/src/app/components/ProjectCard";
import { motion } from "framer-motion";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-20">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold">Featured Projects</h2>
        <p className="text-neutral-400 mt-1">Explore interactive previews. Click through for live and source.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
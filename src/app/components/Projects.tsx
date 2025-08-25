"use client";

import { ProjectCard } from "./ProjectCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchGitHubProjects, FALLBACK_PROJECTS, type ProjectData } from "../lib/github";

export function Projects() {
  const [projects, setProjects] = useState<ProjectData[]>(FALLBACK_PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const githubProjects = await fetchGitHubProjects();
        setProjects(githubProjects);
      } catch (error) {
        console.error("Failed to load GitHub projects:", error);
        // Keep fallback projects
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <section id="projects" className="scroll-mt-20">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold">Featured Projects</h2>
        <p className="text-neutral-400 mt-1">Explore interactive previews. Click through for live and source.</p>
        {loading && (
          <p className="text-neutral-500 text-sm mt-2">Loading projects from GitHub...</p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p, i) => (
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
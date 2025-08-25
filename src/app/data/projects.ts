<<<<<<< HEAD
import type { Project } from "@/src/app/components/ProjectCard";
=======
import type { Project } from "../components/ProjectCard";
>>>>>>> c52a266caab5a71e6324acfee9908117fd3cdf51

export const PROJECTS: Project[] = [
  {
    title: "Job Seek",
    description: "A uniquely animated portfolio with Aceternity-inspired UI, built on Next.js and TypeScript.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    liveUrl: "https://job-seek-umber.vercel.app/",
    githubUrl: "https://github.com/SjxSubham/JOB-SEEK"
  },
  {
    title: "SaaS Dashboard",
    description: "Admin dashboard featuring charts, auth, and data grids.",
    tech: ["Next.js", "Prisma", "Postgres", "Tailwind"],
    liveUrl: "https://zita-code.vercel.app/",
    githubUrl: "https://github.com/SjxSubham/saas-feedx"
  }
];
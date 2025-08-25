import type { Project } from "../components/ProjectCard";

export const PROJECTS: Project[] = [
  {
    title: "Portfolio (This Site)",
    description: "A uniquely animated portfolio with Aceternity-inspired UI, built on Next.js and TypeScript.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourname/your-portfolio"
  },
  {
    title: "SaaS Dashboard",
    description: "Admin dashboard featuring charts, auth, and data grids.",
    tech: ["Next.js", "Prisma", "Postgres", "Tailwind"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourname/saas-dashboard"
  }
];
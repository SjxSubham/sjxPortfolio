export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
}

export interface ProjectData {
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  stars?: number;
  forks?: number;
  language?: string;
}

const GITHUB_USERNAME = "SjxSubham";
const TARGET_REPOS = ["saas-feedX", "mygithub", "job-seek"];

export async function fetchGitHubProjects(): Promise<ProjectData[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repos: GitHubRepo[] = await response.json();
    
    // Filter for target repositories
    const targetRepos = repos.filter(repo => 
      TARGET_REPOS.includes(repo.name)
    );
    
    // Transform GitHub repos to project format
    const projects: ProjectData[] = targetRepos.map(repo => ({
      title: repo.name,
      description: repo.description || "No description available",
      tech: repo.topics.length > 0 ? repo.topics : [repo.language || "JavaScript"],
      liveUrl: repo.homepage || `https://${GITHUB_USERNAME}.github.io/${repo.name}`,
      githubUrl: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language || undefined
    }));
    
    // If we don't have all target repos, add fallback data
    const foundRepoNames = projects.map(p => p.title);
    const missingRepos = TARGET_REPOS.filter(name => !foundRepoNames.includes(name));
    
    missingRepos.forEach(repoName => {
      projects.push({
        title: repoName,
        description: `${repoName} project - Repository not found but included as requested`,
        tech: ["JavaScript", "React"],
        liveUrl: `https://${GITHUB_USERNAME}.github.io/${repoName}`,
        githubUrl: `https://github.com/${GITHUB_USERNAME}/${repoName}`,
        stars: 0,
        forks: 0
      });
    });
    
    return projects;
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    
    // Return fallback data for the requested projects
    return TARGET_REPOS.map(repoName => ({
      title: repoName,
      description: `${repoName} project - Error fetching from GitHub API`,
      tech: ["JavaScript", "React"],
      liveUrl: `https://${GITHUB_USERNAME}.github.io/${repoName}`,
      githubUrl: `https://github.com/${GITHUB_USERNAME}/${repoName}`,
      stars: 0,
      forks: 0
    }));
  }
}

// Static fallback projects for SSG
export const FALLBACK_PROJECTS: ProjectData[] = [
  {
    title: "saas-feedX",
    description: "A modern SaaS feedback management platform with real-time analytics and user engagement tools",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    liveUrl: `https://${GITHUB_USERNAME}.github.io/saas-feedX`,
    githubUrl: `https://github.com/${GITHUB_USERNAME}/saas-feedX`,
    stars: 0,
    forks: 0
  },
  {
    title: "mygithub",
    description: "A personalized GitHub portfolio showcase with advanced repository analytics and contribution insights",
    tech: ["React", "GitHub API", "Chart.js", "Tailwind CSS"],
    liveUrl: `https://${GITHUB_USERNAME}.github.io/mygithub`,
    githubUrl: `https://github.com/${GITHUB_USERNAME}/mygithub`,
    stars: 0,
    forks: 0
  },
  {
    title: "job-seek",
    description: "A comprehensive job search platform with advanced filtering, application tracking, and career insights",
    tech: ["React", "Node.js", "Express", "MongoDB", "Material-UI"],
    liveUrl: `https://${GITHUB_USERNAME}.github.io/job-seek`,
    githubUrl: `https://github.com/${GITHUB_USERNAME}/job-seek`,
    stars: 0,
    forks: 0
  }
];
import { ExternalLink, Github, Star, ArrowUpRight, Globe, Code2, Layers } from 'lucide-react';

const projectsData = [
  {
    id: 1,
    title: 'FeedX',
    description: 'A SaaS feedback collection platform built with modern web technologies. Collect, manage, and analyze user feedback seamlessly.',
    liveUrl: 'https://feedx.vercel.app/',
    githubUrl: 'https://github.com/SjxSubham/saas-feedx',
    technologies: ['React', 'Next.js', 'SaaS', 'Vercel', 'Supabase'],
    image: 'https://wzmpiaqjnegnitfnahue.supabase.co/storage/v1/object/public/resumes/feedximg.png',
    featured: true,
    color: 'purple',
    emoji: '📊',
  },
  {
    id: 2,
    title: 'ZitaCode',
    description: 'An AI-powered coding platform with interactive features for developers. Write, run, and share code with AI assistance.',
    liveUrl: 'https://zita-code.vercel.app/',
    githubUrl: 'https://github.com/SjxSubham/ZitaCode',
    technologies: ['Next.js', 'TypeScript', 'Convex', 'AI', 'Code Editor'],
    image: 'https://wzmpiaqjnegnitfnahue.supabase.co/storage/v1/object/public/resumes/zitacodeimg.png',
    featured: true,
    color: 'blue',
    emoji: '💻',
  },
  {
    id: 3,
    title: 'MyGithub',
    description: 'A GitHub profile viewer and repository management application. Explore profiles, repos, and contribution stats beautifully.',
    liveUrl: 'https://mygithubapp.onrender.com/',
    githubUrl: 'https://github.com/SjxSubham/MyGithub',
    technologies: ['React', 'GitHub API', 'Node.js', 'Render'],
    image: null,
    featured: false,
    color: 'green',
    emoji: '🐙',
  },
  {
    id: 4,
    title: 'JOBSEEK',
    description: 'A job searching platform to help users find their dream job. Filter, search, and apply with a modern intuitive UI.',
    liveUrl: 'https://job-seek-umber.vercel.app/',
    githubUrl: 'https://github.com/SjxSubham/JOB-SEEK',
    technologies: ['React', 'Supabase', 'UI/UX', 'Vercel', 'Job Portal'],
    image: null,
    featured: false,
    color: 'amber',
    emoji: '💼',
  },
  {
    id: 5,
    title: 'Sjx_Chat',
    description: 'A real-time chat application for instant communication with active user status, typing indicators, and media sharing.',
    liveUrl: 'https://sjx-chatapp.onrender.com/',
    githubUrl: 'https://github.com/SjxSubham/Sjx_Chat',
    technologies: ['React', 'Socket.IO', 'Node.js', 'Express', 'MongoDB', 'Zustand'],
    image: null,
    featured: false,
    color: 'cyan',
    emoji: '💬',
  },
];

const colorVariants = {
  purple: {
    bg: 'bg-purple-500/8',
    border: 'border-purple-500/15',
    hoverBorder: 'hover:border-purple-500/30',
    text: 'text-purple-400',
    tag: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    glow: 'hover:shadow-purple-500/5',
    gradient: 'from-purple-500/20 to-purple-600/5',
    liveBg: 'bg-purple-500/15 hover:bg-purple-500/25 border-purple-500/25 text-purple-300',
  },
  blue: {
    bg: 'bg-blue-500/8',
    border: 'border-blue-500/15',
    hoverBorder: 'hover:border-blue-500/30',
    text: 'text-blue-400',
    tag: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    glow: 'hover:shadow-blue-500/5',
    gradient: 'from-blue-500/20 to-blue-600/5',
    liveBg: 'bg-blue-500/15 hover:bg-blue-500/25 border-blue-500/25 text-blue-300',
  },
  green: {
    bg: 'bg-green-500/8',
    border: 'border-green-500/15',
    hoverBorder: 'hover:border-green-500/30',
    text: 'text-green-400',
    tag: 'bg-green-500/10 text-green-300 border-green-500/20',
    glow: 'hover:shadow-green-500/5',
    gradient: 'from-green-500/20 to-green-600/5',
    liveBg: 'bg-green-500/15 hover:bg-green-500/25 border-green-500/25 text-green-300',
  },
  amber: {
    bg: 'bg-amber-500/8',
    border: 'border-amber-500/15',
    hoverBorder: 'hover:border-amber-500/30',
    text: 'text-amber-400',
    tag: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    glow: 'hover:shadow-amber-500/5',
    gradient: 'from-amber-500/20 to-amber-600/5',
    liveBg: 'bg-amber-500/15 hover:bg-amber-500/25 border-amber-500/25 text-amber-300',
  },
  cyan: {
    bg: 'bg-cyan-500/8',
    border: 'border-cyan-500/15',
    hoverBorder: 'hover:border-cyan-500/30',
    text: 'text-cyan-400',
    tag: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    glow: 'hover:shadow-cyan-500/5',
    gradient: 'from-cyan-500/20 to-cyan-600/5',
    liveBg: 'bg-cyan-500/15 hover:bg-cyan-500/25 border-cyan-500/25 text-cyan-300',
  },
};

const ProjectCard = ({ project, index }) => {
  const cv = colorVariants[project.color] || colorVariants.purple;

  return (
    <div
      className={`group bg-white/[0.02] border border-white/5 ${cv.hoverBorder} ${cv.glow} rounded-2xl overflow-hidden transition-all duration-500 hover:bg-white/[0.03] hover:shadow-xl hover:-translate-y-1 flex flex-col`}
      style={{
        animationDelay: `${index * 80}ms`,
        animation: 'projectCardIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        opacity: 0,
      }}
    >
      {/* Image / Preview Area */}
      <div className="relative h-40 overflow-hidden border-b border-white/5">
        {project.image ? (
          <>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div
              className={`hidden w-full h-full bg-gradient-to-br ${cv.gradient} to-transparent items-center justify-center`}
            >
              <span className="text-5xl opacity-60 group-hover:scale-125 transition-transform duration-500">
                {project.emoji}
              </span>
            </div>
          </>
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${cv.gradient} to-[#0d1117] flex items-center justify-center relative`}>
            {/* Abstract pattern background */}
            <div className="absolute inset-0 opacity-[0.03]">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }} />
            </div>
            <span className="text-5xl opacity-50 group-hover:scale-125 group-hover:opacity-70 transition-all duration-500 z-10">
              {project.emoji}
            </span>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e14] via-transparent to-transparent opacity-60" />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 bg-amber-500/15 border border-amber-500/25 rounded-full backdrop-blur-md">
            <Star size={10} className="text-amber-400" fill="currentColor" />
            <span className="text-[9px] font-semibold text-amber-300 uppercase tracking-wider">Featured</span>
          </div>
        )}

        {/* Quick action buttons on hover */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-all duration-200"
            title="Live Demo"
          >
            <Globe size={12} />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-all duration-200"
            title="Source Code"
          >
            <Github size={12} />
          </a>
        </div>

        {/* Project number */}
        <div className="absolute bottom-3 right-3 text-[10px] font-mono text-white/10 group-hover:text-white/20 transition-colors duration-300">
          #{String(project.id).padStart(2, '0')}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4">
        {/* Title */}
        <div className="flex items-start justify-between mb-2">
          <h3 className={`text-sm font-bold text-white/90 group-hover:${cv.text} transition-colors duration-300 flex items-center gap-2`}>
            <Layers size={13} className={`${cv.text} opacity-50`} />
            {project.title}
          </h3>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-white/30 hover:text-white/60 shrink-0 ml-2"
          >
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Description */}
        <p className="text-white/40 text-xs leading-relaxed mb-4 flex-grow line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${cv.tag} transition-all duration-200 hover:scale-105 cursor-default`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-2 pt-3 border-t border-white/5">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border text-[11px] font-medium transition-all duration-300 ${cv.liveBg}`}
          >
            <ExternalLink size={11} />
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/8 hover:border-white/15 text-white/50 hover:text-white/80 text-[11px] font-medium transition-all duration-300"
          >
            <Github size={11} />
            Source Code
          </a>
        </div>
      </div>
    </div>
  );
};

const ProjectsApp = () => {
  const featuredProjects = projectsData.filter((p) => p.featured);
  const otherProjects = projectsData.filter((p) => !p.featured);

  return (
    <div className="h-full overflow-y-auto bg-[#0a0e14] custom-scrollbar">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Code2 size={18} className="text-orange-400" />
              My Projects
            </h2>
            <p className="text-white/30 text-xs mt-1">
              A collection of things I've built — from SaaS to real-time apps
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-lg font-bold text-white">{projectsData.length}</p>
              <p className="text-[10px] text-white/25 uppercase tracking-wider">Projects</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-right">
              <p className="text-lg font-bold text-amber-400">{featuredProjects.length}</p>
              <p className="text-[10px] text-white/25 uppercase tracking-wider">Featured</p>
            </div>
          </div>
        </div>

        {/* Featured Section */}
        {featuredProjects.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Star size={12} className="text-amber-400" fill="currentColor" />
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                Featured Projects
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-amber-500/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Layers size={12} className="text-cyan-400" />
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                Other Projects
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherProjects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i + featuredProjects.length}
                />
              ))}
            </div>
          </div>
        )}

        {/* Footer note */}
        <div className="mt-8 pb-2">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 text-center">
            <p className="text-white/25 text-xs leading-relaxed mb-3">
              These are some of my highlighted projects. I'm always working on something new!
            </p>
            <a
              href="https://github.com/SjxSubham?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-500 hover:to-blue-500 rounded-xl text-white text-xs font-medium transition-all duration-300 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/25 hover:-translate-y-0.5"
            >
              <Github size={14} />
              View All Projects on GitHub
              <ArrowUpRight size={12} className="opacity-60" />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes projectCardIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.06);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.12);
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ProjectsApp;

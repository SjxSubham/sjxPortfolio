import { ExternalLink as ExternalLinkIcon, Github as GithubIcon } from 'lucide-react';

const Projects = () => {
    const projectsData = [
        {
            id: 1,
            title: 'FeedX',
            description: 'A SaaS feedback collection platform built with modern web technologies',
            liveUrl: 'http://feedx.vercel.app/',
            githubUrl: 'https://github.com/SjxSubham/saas-feedx',
            technologies: ['React', 'Next.js', 'SaaS', 'Vercel', 'Supabase'],
            useStaticImage: true,
            staticImage: 'https://wzmpiaqjnegnitfnahue.supabase.co/storage/v1/object/public/resumes/feedximg.png',
        },
        {
            id: 2,
            title: 'MyGithub',
            description: 'A GitHub profile viewer and repository management application',
            liveUrl: 'https://mygithubapp.onrender.com/',
            githubUrl: 'https://github.com/SjxSubham/MyGithub',
            technologies: ['React', 'GitHub API', 'Node.js', 'Render'],
        },
        {
            id: 3,
            title: 'ZitaCode',
            description: 'A coding platform with interactive features for developers',
            liveUrl: 'https://zita-code.vercel.app/',
            githubUrl: 'https://github.com/SjxSubham/ZitaCode',
            technologies: ['Next.JS', 'Code Editor', 'TypeScript', 'Vercel', 'Convex', 'AI'],
            useStaticImage: true,
            staticImage: 'https://wzmpiaqjnegnitfnahue.supabase.co/storage/v1/object/public/resumes/zitacodeimg.png',
        },
        {
            id: 4,
            title: 'JOBSEEK',
            description: 'A job searching platform to help users find their dream job',
            liveUrl: 'https://job-seek-umber.vercel.app/',
            githubUrl: 'https://github.com/SjxSubham/JOB-SEEK',
            technologies: ['React', 'Job Portal', 'UI/UX', 'Vercel', 'Supabase'],
        },
        {
            id: 5,
            title: 'Sjx_Chat',
            description: 'A chat application for real-time communication, with active user status',
            liveUrl: 'https://sjx-chatapp.onrender.com/',
            githubUrl: 'https://github.com/SjxSubham/Sjx_Chat',
            technologies: ['React', 'Socket.IO', 'Node.js', 'Express', 'MongoDB', 'Zustand'],
        },
    ];

    return (
        <section id="projects" className="py-24 bg-gray-100 dark:bg-dark-light relative transition-colors duration-300">
            <div className="container">
                <h2 className="section-title text-slate-800 dark:text-white">My Projects</h2>
                <p className="section-description text-slate-600 dark:text-gray-400">
                    Check out some of my recent work
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {projectsData.map((project) => (
                        <div
                            className="bg-white dark:bg-dark-lighter rounded-lg overflow-hidden shadow-project transition-all duration-300 h-full flex flex-col hover:transform hover:-translate-y-2.5 hover:shadow-project-hover"
                            key={project.id}
                        >
                            <div className="relative overflow-hidden h-[200px] group">
                                {project.useStaticImage ? (
                                    <img
                                        src={project.staticImage}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                                        onError={(e) => {
                                            e.target.src = '/profile.png'; // Fallback if static image fails
                                        }}
                                    />
                                ) : (
                                    <iframe
                                        src={project.liveUrl}
                                        title={project.title}
                                        className="w-full h-full border-0 pointer-events-none transition-all duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                )}
                                <div className="absolute inset-0 bg-black/70 flex justify-center items-center gap-4 opacity-0 hover:opacity-100 transition-all duration-300">
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-light transition-colors"
                                    >
                                        <ExternalLinkIcon className="w-5 h-5" />
                                    </a>
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-light transition-colors"
                                    >
                                        <GithubIcon className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{project.title}</h3>
                                <p className="text-slate-600 dark:text-gray-400 mb-4 flex-grow">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.technologies.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-primary-dark text-xs text-white rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;

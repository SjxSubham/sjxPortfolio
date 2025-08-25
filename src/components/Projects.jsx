import { ExternalLink as ExternalLinkIcon, Github as GithubIcon } from 'lucide-react';

const Projects = () => {
  const projectsData = [
    {
      id: 1,
      title: 'E-commerce Website',
      description: 'A full-featured e-commerce platform built with React, Node.js, and MongoDB',
      image: 'https://via.placeholder.com/600x400',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A task management application with drag-and-drop functionality',
      image: 'https://via.placeholder.com/600x400',
      technologies: ['React', 'Redux', 'Firebase'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A weather app that displays current and forecasted weather data',
      image: 'https://via.placeholder.com/600x400',
      technologies: ['JavaScript', 'API', 'CSS3'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
    },
    {
      id: 4,
      title: 'Social Media Platform',
      description: 'A social networking platform with real-time messaging',
      image: 'https://via.placeholder.com/600x400',
      technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
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
              <div className="relative overflow-hidden h-[200px]">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
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

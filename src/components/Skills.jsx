import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase, FaPython, FaGitAlt, FaJava, FaCuttlefish, 
         FaCode, FaLaptopCode, FaServer, FaLinux, FaDesktop, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiExpress, SiCplusplus, SiNextdotjs, SiTailwindcss, SiDjango, SiPostgresql,
         SiGithub, SiUbuntu, SiPostman } from 'react-icons/si';
import { VscVscode } from "react-icons/vsc";

const Skills = () => {
  const skillsData = [
     {
      id: "programming",
      name: "Programming Languages",
      icon: <FaCode className="text-4xl mb-3 text-blue-500" />,
      skills: [
        { name: 'C', icon: <FaCuttlefish />, level: 90 },
        { name: 'C++', icon: <SiCplusplus />, level: 85 },
        { name: 'Python', icon: <FaPython />, level: 85 },
        { name: 'JavaScript', icon: <FaJs />, level: 90 },
        { name: 'TypeScript', icon: <SiTypescript />, level: 80 },
        { name: 'Java', icon: <FaJava />, level: 75 },
      ]
    },
    {
      id: "frontend",
      name: "Frontend Development",
      icon: <FaLaptopCode className="text-4xl mb-3 text-indigo-500" />,
      skills: [
        { name: 'HTML5', icon: <FaHtml5 />, level: 90 },
        { name: 'CSS3', icon: <FaCss3Alt />, level: 85 },
        { name: 'React', icon: <FaReact />, level: 85 },
        { name: 'Next.js', icon: <SiNextdotjs />, level: 75 },
        { name: 'TailwindCSS', icon: <SiTailwindcss />, level: 85 },
      ]
    },
    {
      id: "backend",
      name: "Backend Development",
      icon: <FaServer className="text-4xl mb-3 text-green-500" />,
      skills: [
        { name: 'Node.js', icon: <FaNodeJs />, level: 80 },
        { name: 'Express', icon: <SiExpress />, level: 75 },
        { name: 'Django', icon: <SiDjango />, level: 70 },
      ]
    },
    {
      id: "database",
      name: "Database",
      icon: <FaDatabase className="text-4xl mb-3 text-yellow-500" />,
      skills: [
        { name: 'MongoDB', icon: <SiMongodb />, level: 75 },
        { name: 'PostgreSQL', icon: <SiPostgresql />, level: 70 },
        { name: 'SQL', icon: <FaDatabase />, level: 75 },
      ]
    },
    {
      id: "version-control",
      name: "Version Control",
      icon: <FaGitAlt className="text-4xl mb-3 text-orange-500" />,
      skills: [
        { name: 'Git', icon: <FaGitAlt />, level: 85 },
        { name: 'GitHub', icon: <SiGithub />, level: 80 },
      ]
    },
    {
      id: "linux",
      name: "Linux & DevOps",
      icon: <FaLinux className="text-4xl mb-3 text-purple-500" />,
      skills: [
        { name: 'Linux', icon: <FaLinux />, level: 50 },
        // { name: 'Ubuntu', icon: <SiUbuntu />, level: 80 },
        { name: 'Docker', icon: <FaDocker />, level: 25 },
      ]
    },
    {
      id: "tools",
      name: "Tools",
      icon: <FaDesktop className="text-4xl mb-3 text-red-500" />,
      skills: [
        { name: 'VS Code', icon: <VscVscode />, level: 90 },
        { name: 'Postman', icon: <SiPostman />, level: 85 },
      ]
    },
  ];

  return (
    <section id="skills" className="py-24 bg-slate-900 dark:bg-black relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium backdrop-blur-sm">
            Technical Expertise
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Skills & 
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"> Technologies</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            From frontend frameworks to backend systems, here's my technical toolkit that brings ideas to life
          </p>
        </div>

        {/* Skills Categories */}
        <div className="space-y-16">
          {skillsData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="group">
              {/* Category Title */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center justify-between w-14 h-14 rounded-xl shadow-lg shadow-blue-500/25">
                  <div className="text-white text-2xl">
                    {category.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{category.name}</h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex} 
                    className="group/skill relative"
                    style={{ animationDelay: `${skillIndex * 0.1}s` }}
                  >
                    {/* Skill Card */}
                    <div className="relative p-6 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20">
                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Content */}
                      <div className="relative z-10 text-center">
                        {/* Icon */}
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-slate-700/50 mb-4 group-hover/skill:scale-110 transition-transform duration-300">
                          <div className="text-3xl text-blue-400 group-hover/skill:text-white transition-colors duration-300">
                            {skill.icon}
                          </div>
                        </div>
                        
                        {/* Skill Name */}
                        <h4 className="text-white font-semibold mb-4 group-hover/skill:text-blue-300 transition-colors duration-300">
                          {skill.name}
                        </h4>
                        
                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400 text-sm">Proficiency</span>
                            <span className="text-blue-400 font-bold text-sm">{skill.level}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out transform origin-left"
                              style={{ 
                                width: `${skill.level}%`,
                                animation: `slideIn 1s ease-out ${skillIndex * 0.1}s both`
                              }}
                            >
                              <div className="h-full bg-white/20 animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover Border Glow */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animation Styles */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            width: 0%;
          }
          to {
            width: ${100}%;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;

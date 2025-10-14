import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase, FaPython, FaGitAlt, FaJava, FaCuttlefish, 
         FaCode, FaLaptopCode, FaServer, FaLinux, FaDesktop, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiExpress, SiCplusplus, SiNextdotjs, SiTailwindcss, SiDjango, SiPostgresql,
         SiGithub, SiUbuntu, SiPostman } from 'react-icons/si';
import { VscVscode } from "react-icons/vsc";
import { useEffect, useState, useRef } from "react";

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    // Function to check if section is in viewport
    const checkVisibility = () => {
      const section = sectionRef.current;
      if (!section) return;
      
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const isInViewport = rect.top <= viewportHeight * 0.5;
      
      if (isInViewport) {
        setIsVisible(true);
        // Remove scroll listener once animation has started
        window.removeEventListener('scroll', checkVisibility);
      }
    };
    
    // Add scroll listener
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Check on initial render
    
    // Cleanup
    return () => window.removeEventListener('scroll', checkVisibility);
  }, []);
  
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
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-24 bg-slate-900 dark:bg-black bg-gradient-to-b from-gray-50 to-gray-100 dark:from-slate-900 dark:to-black relative overflow-hidden"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#fff_70%,transparent_110%)] dark:[mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]"></div>
      
      {/* Animated stars background */}
      <div className="stars-container absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div 
            key={`star-${i}`} 
            className="absolute w-[2px] h-[2px] bg-blue-500/70 dark:bg-white rounded-full"
            style={{ 
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: isVisible ? 1 : 0,
              transition: `opacity 0.5s ease-in-out ${Math.random() * 2}s`,
              animation: isVisible ? `twinkle ${3 + Math.random() * 7}s ease-in-out ${Math.random() * 5}s infinite` : 'none'
            }}
          />
        ))}
      </div>
      
      {/* Floating orbs */}
      <div className={`absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl ${isVisible ? 'animate-pulse opacity-100' : 'opacity-0'} transition-opacity duration-1000`}></div>
      <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl ${isVisible ? 'animate-pulse opacity-100' : 'opacity-0'} transition-opacity duration-1000 delay-500`}></div>
      <div className={`absolute top-1/2 left-1/2 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl ${isVisible ? 'animate-pulse opacity-100' : 'opacity-0'} transition-opacity duration-1000 delay-300`}></div>
      
      {/* Animated particles */}
      <div className="particles-container absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={`particle-${i}`} 
            className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
            style={{ 
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: isVisible ? 1 : 0,
              transition: `opacity 0.5s ease-in-out ${Math.random() * 2}s`,
              animation: isVisible ? `float ${15 + Math.random() * 20}s linear ${Math.random() * 10}s infinite` : 'none'
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className={`inline-block mb-4 transform ${isVisible ? 'animate-fadeIn opacity-100' : 'opacity-0 translate-y-4'}`} style={{transitionDelay: '0.2s', transition: 'all 0.6s ease-out'}}>
            <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-blue-500 dark:text-blue-300 text-sm font-medium backdrop-blur-sm inline-flex items-center">
              <span className="animate-bounce mr-2">💻</span> Technical Expertise
            </span>
          </div>
          <h2 className={`text-5xl md:text-6xl font-black text-slate-800 dark:text-white mb-6 tracking-tight transform ${isVisible ? 'animate-fadeIn opacity-100' : 'opacity-0 translate-y-4'}`} style={{transitionDelay: '0.4s', transition: 'all 0.8s ease-out'}}>
            <span className="inline-block hover:animate-pulse hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-300">Skills</span> & 
            <span className="relative bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"> Technologies</span>
          </h2>
          <p className={`text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed transform ${isVisible ? 'animate-fadeIn opacity-100' : 'opacity-0 translate-y-4'}`} style={{transitionDelay: '0.6s', transition: 'all 1s ease-out'}}>
            From frontend frameworks to backend systems, here's my technical toolkit that brings ideas to life
          </p>
        </div>

        {/* Skills Categories */}
        <div className="space-y-16">
          {skillsData.map((category, categoryIndex) => (
            <div 
              key={categoryIndex} 
              className={`group transform ${isVisible ? 'animate-fadeIn opacity-100' : 'opacity-0 translate-y-4'}`} 
              style={{transitionDelay: `${0.3 + categoryIndex * 0.1}s`, transition: 'all 1s ease-out'}}
            >
              {/* Category Title */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/25">
                  <div className="text-white text-2xl group-hover:animate-pulse">
                    {category.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{category.name}</h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-32 transition-all duration-300"></div>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex} 
                    className={`group/skill relative transform ${isVisible ? 'animate-fadeIn opacity-100' : 'opacity-0 translate-y-4'}`}
                    style={{
                      transitionDelay: `${0.5 + categoryIndex * 0.1 + skillIndex * 0.05}s`,
                      transition: 'all 0.5s ease-out'
                    }}
                  >
                    {/* Skill Card */}
                    <div className="relative p-6 rounded-2xl bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200 dark:border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20">
                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Content */}
                      <div className="relative z-10 text-center">
                        {/* Icon */}
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-50 dark:bg-slate-700/50 mb-4 group-hover/skill:scale-110 transition-transform duration-300">
                          <div className="text-3xl text-blue-500 dark:text-blue-400 group-hover/skill:text-blue-600 dark:group-hover/skill:text-white transition-colors duration-300">
                            {skill.icon}
                          </div>
                        </div>
                        
                        {/* Skill Name */}
                        <h4 className="text-slate-800 dark:text-white font-semibold mb-4 group-hover/skill:text-blue-600 dark:group-hover/skill:text-blue-300 transition-colors duration-300">
                          {skill.name}
                        </h4>
                        
                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 dark:text-slate-400 text-sm">Proficiency</span>
                            <span className="text-blue-600 dark:text-blue-400 font-bold text-sm group-hover/skill:animate-pulse">{skill.level}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover/skill:animate-pulse"
                              style={{ 
                                width: isVisible ? `${skill.level}%` : '0%',
                                transition: `width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.7 + categoryIndex * 0.1 + skillIndex * 0.05}s`
                              }}
                            >
                              <div className="h-full bg-white/20 animate-shine"></div>
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

      {/* CSS Animation Keyframes */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes float {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(50px, -40px);
          }
          50% {
            transform: translate(100px, 0);
          }
          75% {
            transform: translate(50px, 40px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
        
        @keyframes shine {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 20s linear infinite;
        }
        
        .animate-shine {
          animation: shine 2s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Skills;

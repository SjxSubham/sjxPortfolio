import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase, FaPython, FaGitAlt, FaJava, FaCuttlefish, 
         FaCode, FaLaptopCode, FaServer, FaLinux, FaDesktop, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiExpress, SiCplusplus, SiNextdotjs, SiTailwindcss, SiDjango, SiPostgresql,
         SiGithub, SiUbuntu, SiVisualstudiocode, SiPostman } from 'react-icons/si';

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
        { name: 'Linux', icon: <FaLinux />, level: 75 },
        { name: 'Ubuntu', icon: <SiUbuntu />, level: 80 },
        { name: 'Docker', icon: <FaDocker />, level: 70 },
      ]
    },
    {
      id: "tools",
      name: "Tools",
      icon: <FaDesktop className="text-4xl mb-3 text-red-500" />,
      skills: [
        { name: 'VS Code', icon: <SiVisualstudiocode />, level: 90 },
        { name: 'Postman', icon: <SiPostman />, level: 85 },
      ]
    },
  ];

  return (
    <section id="skills" className="py-24 bg-white dark:bg-dark relative overflow-hidden before:content-[''] before:absolute before:top-0 before:right-0 before:w-[300px] before:h-[300px] before:bg-radial-gradient before:z-0 transition-colors duration-300">
      <div className="container">
        <h2 className="section-title text-slate-800 dark:text-white">My Skills</h2>
        <p className="section-description text-slate-600 dark:text-gray-400">
          Technologies and tools I've worked with, from programming languages to frameworks and development tools
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {skillsData.map((category, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-dark-lighter rounded-xl p-8 transition-all duration-300 relative overflow-hidden border border-slate-200 dark:border-white/5 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[3px] before:bg-gradient-primary hover:shadow-skill"
            >
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">
                  {category.icon}
                </div>
                <h3 className="text-slate-800 dark:text-white text-2xl font-bold">{category.name}</h3>
              </div>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-xl text-primary mr-2">{skill.icon}</span>
                        <span className="text-slate-800 dark:text-white">{skill.name}</span>
                      </div>
                      <span className="text-sm text-slate-600 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-full relative overflow-hidden">
                      <div 
                        className="h-full bg-gradient-primary rounded-full" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

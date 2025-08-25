import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase, FaPython, FaGitAlt, FaJava, FaCuttlefish, 
  FaCode, FaLaptopCode, FaServer, FaLinux, FaDesktop, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiExpress, SiCplusplus, SiNextdotjs, SiTailwindcss, SiDjango, SiPostgresql,
  SiGithub, SiPostman } from 'react-icons/si';
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
 { name: 'Node.js', icon: <FaNodeJs />, level: 85 },
 { name: 'Express.js', icon: <SiExpress />, level: 80 },
 { name: 'MongoDB', icon: <SiMongodb />, level: 75 },
 { name: 'PostgreSQL', icon: <SiPostgresql />, level: 70 },
 { name: 'Django', icon: <SiDjango />, level: 65 },
]
},
{
  id: "tools",
  name: "Tools & Platforms",
  icon: <FaLaptopCode className="text-4xl mb-3 text-yellow-500" />,
  skills: [
   { name: 'Git', icon: <FaGitAlt />, level: 90 },
   { name: 'GitHub', icon: <SiGithub />, level: 85 },
   { name: 'Docker', icon: <FaDocker />, level: 70 },
   { name: 'Postman', icon: <SiPostman />, level: 75 },
   { name: 'VS Code', icon: <VscVscode  />, level: 80 },
   { name: 'Linux', icon: <FaLinux />, level: 80 },
  ]
}
];

return (
<div className="skills-container">
{skillsData.map((category) => (
 <div key={category.id} className="skill-category">
   <div className="category-header">
     {category.icon}
     <h3 className="category-name">{category.name}</h3>
   </div>
   <ul className="skills-list">
     {category.skills.map((skill, index) => (
       <li key={index} className="skill-item">
         <div className="skill-icon">{skill.icon}</div>
         <span className="skill-name">{skill.name}</span>
         <span className="skill-level">{skill.level}%</span>
       </li>
     ))}
   </ul>
 </div>
))}
</div>
);
};

export default Skills;
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase, FaPython, FaGitAlt, FaJava, FaCuttlefish,
  FaCode, FaLaptopCode, FaServer, FaLinux, FaDesktop, FaDocker
} from 'react-icons/fa';
import {
  SiTypescript, SiMongodb, SiExpress, SiCplusplus, SiNextdotjs, SiTailwindcss, SiDjango, SiPostgresql,
  SiGithub, SiPostman
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { useState } from 'react';

const skillsData = [
  {
    id: 'programming',
    name: 'Programming Languages',
    icon: <FaCode />,
    color: 'blue',
    skills: [
      { name: 'C', icon: <FaCuttlefish />, level: 90 },
      { name: 'C++', icon: <SiCplusplus />, level: 85 },
      { name: 'Python', icon: <FaPython />, level: 85 },
      { name: 'JavaScript', icon: <FaJs />, level: 90 },
      { name: 'TypeScript', icon: <SiTypescript />, level: 80 },
      { name: 'Java', icon: <FaJava />, level: 75 },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend Development',
    icon: <FaLaptopCode />,
    color: 'purple',
    skills: [
      { name: 'HTML5', icon: <FaHtml5 />, level: 90 },
      { name: 'CSS3', icon: <FaCss3Alt />, level: 85 },
      { name: 'React', icon: <FaReact />, level: 85 },
      { name: 'Next.js', icon: <SiNextdotjs />, level: 75 },
      { name: 'TailwindCSS', icon: <SiTailwindcss />, level: 85 },
    ],
  },
  {
    id: 'backend',
    name: 'Backend Development',
    icon: <FaServer />,
    color: 'green',
    skills: [
      { name: 'Node.js', icon: <FaNodeJs />, level: 80 },
      { name: 'Express', icon: <SiExpress />, level: 75 },
      { name: 'Django', icon: <SiDjango />, level: 70 },
    ],
  },
  {
    id: 'database',
    name: 'Database',
    icon: <FaDatabase />,
    color: 'amber',
    skills: [
      { name: 'MongoDB', icon: <SiMongodb />, level: 75 },
      { name: 'PostgreSQL', icon: <SiPostgresql />, level: 70 },
      { name: 'SQL', icon: <FaDatabase />, level: 75 },
    ],
  },
  {
    id: 'version-control',
    name: 'Version Control',
    icon: <FaGitAlt />,
    color: 'orange',
    skills: [
      { name: 'Git', icon: <FaGitAlt />, level: 85 },
      { name: 'GitHub', icon: <SiGithub />, level: 80 },
    ],
  },
  {
    id: 'linux',
    name: 'Linux & DevOps',
    icon: <FaLinux />,
    color: 'cyan',
    skills: [
      { name: 'Linux', icon: <FaLinux />, level: 50 },
      { name: 'Docker', icon: <FaDocker />, level: 25 },
    ],
  },
  {
    id: 'tools',
    name: 'Tools',
    icon: <FaDesktop />,
    color: 'red',
    skills: [
      { name: 'VS Code', icon: <VscVscode />, level: 90 },
      { name: 'Postman', icon: <SiPostman />, level: 85 },
    ],
  },
];

const colorVariants = {
  blue: {
    bg: 'bg-blue-500/8',
    border: 'border-blue-500/15',
    hoverBorder: 'group-hover:border-blue-500/30',
    text: 'text-blue-400',
    barFrom: 'from-blue-500',
    barTo: 'to-blue-400',
    iconBg: 'bg-blue-500/10',
    glow: 'shadow-blue-500/10',
    dot: 'bg-blue-500',
    tag: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  purple: {
    bg: 'bg-purple-500/8',
    border: 'border-purple-500/15',
    hoverBorder: 'group-hover:border-purple-500/30',
    text: 'text-purple-400',
    barFrom: 'from-purple-500',
    barTo: 'to-purple-400',
    iconBg: 'bg-purple-500/10',
    glow: 'shadow-purple-500/10',
    dot: 'bg-purple-500',
    tag: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  green: {
    bg: 'bg-green-500/8',
    border: 'border-green-500/15',
    hoverBorder: 'group-hover:border-green-500/30',
    text: 'text-green-400',
    barFrom: 'from-green-500',
    barTo: 'to-green-400',
    iconBg: 'bg-green-500/10',
    glow: 'shadow-green-500/10',
    dot: 'bg-green-500',
    tag: 'bg-green-500/10 text-green-400 border-green-500/20',
  },
  amber: {
    bg: 'bg-amber-500/8',
    border: 'border-amber-500/15',
    hoverBorder: 'group-hover:border-amber-500/30',
    text: 'text-amber-400',
    barFrom: 'from-amber-500',
    barTo: 'to-amber-400',
    iconBg: 'bg-amber-500/10',
    glow: 'shadow-amber-500/10',
    dot: 'bg-amber-500',
    tag: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  orange: {
    bg: 'bg-orange-500/8',
    border: 'border-orange-500/15',
    hoverBorder: 'group-hover:border-orange-500/30',
    text: 'text-orange-400',
    barFrom: 'from-orange-500',
    barTo: 'to-orange-400',
    iconBg: 'bg-orange-500/10',
    glow: 'shadow-orange-500/10',
    dot: 'bg-orange-500',
    tag: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  },
  cyan: {
    bg: 'bg-cyan-500/8',
    border: 'border-cyan-500/15',
    hoverBorder: 'group-hover:border-cyan-500/30',
    text: 'text-cyan-400',
    barFrom: 'from-cyan-500',
    barTo: 'to-cyan-400',
    iconBg: 'bg-cyan-500/10',
    glow: 'shadow-cyan-500/10',
    dot: 'bg-cyan-500',
    tag: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  },
  red: {
    bg: 'bg-red-500/8',
    border: 'border-red-500/15',
    hoverBorder: 'group-hover:border-red-500/30',
    text: 'text-red-400',
    barFrom: 'from-red-500',
    barTo: 'to-red-400',
    iconBg: 'bg-red-500/10',
    glow: 'shadow-red-500/10',
    dot: 'bg-red-500',
    tag: 'bg-red-500/10 text-red-400 border-red-500/20',
  },
};

const SkillBar = ({ level, colorKey, animated }) => {
  const cv = colorVariants[colorKey];
  return (
    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
      <div
        className={`h-full bg-gradient-to-r ${cv.barFrom} ${cv.barTo} rounded-full relative transition-all duration-1000 ease-out`}
        style={{ width: animated ? `${level}%` : '0%' }}
      >
        <div className="absolute inset-0 bg-white/10 animate-shimmer" />
      </div>
    </div>
  );
};

const SkillsApp = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [animated, setAnimated] = useState(false);

  // Trigger animation after mount
  useState(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  });

  const totalSkills = skillsData.reduce((sum, cat) => sum + cat.skills.length, 0);
  const avgProficiency = Math.round(
    skillsData.reduce(
      (sum, cat) => sum + cat.skills.reduce((s, sk) => s + sk.level, 0),
      0
    ) / totalSkills
  );

  return (
    <div className="h-full overflow-y-auto bg-[#0a0e14] custom-scrollbar">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full" />
              Skills & Technologies
            </h2>
            <p className="text-white/30 text-xs mt-1">
              My technical toolkit that brings ideas to life
            </p>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 p-0.5 bg-white/[0.03] border border-white/5 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-white/8 text-white border border-white/10'
                  : 'text-white/30 hover:text-white/50 border border-transparent'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-white/8 text-white border border-white/10'
                  : 'text-white/30 hover:text-white/50 border border-transparent'
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 text-center">
            <p className="text-2xl font-bold text-white mb-0.5">{totalSkills}</p>
            <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium">Technologies</p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 text-center">
            <p className="text-2xl font-bold text-purple-400 mb-0.5">{skillsData.length}</p>
            <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium">Categories</p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 text-center">
            <p className="text-2xl font-bold text-cyan-400 mb-0.5">{avgProficiency}%</p>
            <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium">Avg. Proficiency</p>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-4">
          {skillsData.map((category) => {
            const cv = colorVariants[category.color];
            const isExpanded = expandedCategory === category.id;

            return (
              <div
                key={category.id}
                className={`bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10 group`}
              >
                {/* Category Header */}
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors duration-200 hover:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${cv.iconBg} ${cv.text} text-sm`}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-[10px] text-white/25 mt-0.5">
                        {category.skills.length} {category.skills.length === 1 ? 'skill' : 'skills'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Skill count badges (collapsed preview) */}
                    {!isExpanded && (
                      <div className="hidden sm:flex items-center gap-1 mr-2">
                        {category.skills.slice(0, 4).map((skill, i) => (
                          <span
                            key={i}
                            className={`px-2 py-0.5 rounded text-[9px] font-medium border ${cv.tag}`}
                          >
                            {skill.name}
                          </span>
                        ))}
                        {category.skills.length > 4 && (
                          <span className="text-[10px] text-white/20">
                            +{category.skills.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Expand chevron */}
                    <svg
                      className={`w-4 h-4 text-white/20 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Expanded Skills */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-4 pb-4 border-t border-white/5">
                    {viewMode === 'grid' ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
                        {category.skills.map((skill, i) => (
                          <div
                            key={i}
                            className={`${cv.bg} border ${cv.border} rounded-xl p-3.5 hover:scale-[1.02] transition-all duration-300 cursor-default group/skill`}
                          >
                            <div className="flex items-center gap-2.5 mb-3">
                              <div className={`text-xl ${cv.text} group-hover/skill:scale-110 transition-transform duration-300`}>
                                {skill.icon}
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="text-xs font-semibold text-white/80 truncate">
                                  {skill.name}
                                </h4>
                                <span className={`text-[10px] font-mono font-bold ${cv.text}`}>
                                  {skill.level}%
                                </span>
                              </div>
                            </div>
                            <SkillBar level={skill.level} colorKey={category.color} animated={animated} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="pt-4 space-y-2.5">
                        {category.skills.map((skill, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-4 px-3 py-2.5 rounded-xl hover:bg-white/[0.02] transition-colors duration-200"
                          >
                            <div className={`text-lg ${cv.text} w-6 flex justify-center shrink-0`}>
                              {skill.icon}
                            </div>
                            <span className="text-xs font-semibold text-white/70 w-24 shrink-0">
                              {skill.name}
                            </span>
                            <div className="flex-1">
                              <SkillBar level={skill.level} colorKey={category.color} animated={animated} />
                            </div>
                            <span className={`text-[11px] font-mono font-bold ${cv.text} w-10 text-right shrink-0`}>
                              {skill.level}%
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Always visible mini bar (when collapsed) */}
                {!isExpanded && (
                  <div className="px-4 pb-3">
                    <div className="flex items-center gap-1">
                      {category.skills.map((skill, i) => (
                        <div
                          key={i}
                          className="flex-1 h-1 rounded-full overflow-hidden bg-white/5"
                          title={`${skill.name}: ${skill.level}%`}
                        >
                          <div
                            className={`h-full bg-gradient-to-r ${cv.barFrom} ${cv.barTo} rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: animated ? `${skill.level}%` : '0%' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* All Skills Flat View */}
        <div className="mt-6 bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-500 rounded-full" />
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              All Technologies
            </h3>
          </div>
          <div className="p-4 flex flex-wrap gap-2">
            {skillsData.flatMap((cat) =>
              cat.skills.map((skill) => {
                const cv = colorVariants[cat.color];
                return (
                  <span
                    key={`${cat.id}-${skill.name}`}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-all duration-200 hover:scale-105 cursor-default ${cv.tag}`}
                    title={`${skill.name}: ${skill.level}%`}
                  >
                    <span className="text-xs">{skill.icon}</span>
                    {skill.name}
                  </span>
                );
              })
            )}
          </div>
        </div>
      </div>

      <style>{`
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
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer {
          animation: shimmer 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SkillsApp;

import { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  User,
  Code2,
  FolderGit2,
  Mail,
  Cpu,
  Wifi,
  Battery,
  Volume2,
  ChevronUp,
  Search,
  LayoutGrid,
} from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';
import { BiLogoGithub } from 'react-icons/bi';

const taskbarApps = [
  { id: 'terminal', label: 'Terminal', icon: <Terminal size={20} />, color: 'text-green-400' },
  { id: 'about', label: 'About Me', icon: <User size={20} />, color: 'text-blue-400' },
  { id: 'skills', label: 'Skills', icon: <Cpu size={20} />, color: 'text-cyan-400' },
  { id: 'projects', label: 'Projects', icon: <FolderGit2 size={20} />, color: 'text-orange-400' },
  { id: 'codeeditor', label: 'Code Runner', icon: <Code2 size={20} />, color: 'text-yellow-400' },
  { id: 'leetcode', label: 'LeetCode', icon: <SiLeetcode size={18} />, color: 'text-amber-400' },
  { id: 'github', label: 'GitHub', icon: <BiLogoGithub size={20} />, color: 'text-white' },
  { id: 'contact', label: 'Contact', icon: <Mail size={20} />, color: 'text-purple-400' },
];

const Taskbar = ({ openWindows, activeWindowId, onAppClick, onWindowFocus, onWindowRestore }) => {
  const [time, setTime] = useState(new Date());
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [hoveredApp, setHoveredApp] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0 });
  const startMenuRef = useRef(null);
  const startBtnRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showStartMenu &&
        startMenuRef.current &&
        !startMenuRef.current.contains(e.target) &&
        startBtnRef.current &&
        !startBtnRef.current.contains(e.target)
      ) {
        setShowStartMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showStartMenu]);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleAppHover = (appId, e) => {
    setHoveredApp(appId);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({ x: rect.left + rect.width / 2 });
  };

  const isWindowOpen = (appId) => openWindows.some((w) => w.id === appId);
  const isWindowActive = (appId) => activeWindowId === appId;
  const isWindowMinimized = (appId) => {
    const win = openWindows.find((w) => w.id === appId);
    return win?.isMinimized;
  };

  const handleTaskbarAppClick = (appId) => {
    setShowStartMenu(false);
    if (!isWindowOpen(appId)) {
      onAppClick?.(appId);
    } else if (isWindowMinimized(appId)) {
      onWindowRestore?.(appId);
      onWindowFocus?.(appId);
    } else if (isWindowActive(appId)) {
      // Clicking active window in taskbar minimizes it — but we keep simple: just focus
      onWindowFocus?.(appId);
    } else {
      onWindowFocus?.(appId);
    }
  };

  return (
    <>
      {/* Start Menu */}
      {showStartMenu && (
        <div
          ref={startMenuRef}
          className="fixed bottom-12 left-2 w-80 max-h-[70vh] bg-[#0d1117]/98 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/60 z-[9998] overflow-hidden animate-startMenuIn"
        >
          {/* Search bar */}
          <div className="p-3 border-b border-white/5">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
              <Search size={14} className="text-white/30" />
              <input
                type="text"
                placeholder="Type to search..."
                className="bg-transparent text-sm text-white/80 placeholder:text-white/25 outline-none flex-1"
                autoFocus
              />
            </div>
          </div>

          {/* User banner */}
          <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/20">
              SM
            </div>
            <div>
              <p className="text-white/90 text-sm font-medium">Subham Mondal</p>
              <p className="text-white/30 text-xs">Full Stack Developer</p>
            </div>
          </div>

          {/* Pinned apps */}
          <div className="p-3">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-white/50 text-xs font-medium uppercase tracking-wider">Pinned Apps</span>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {taskbarApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleTaskbarAppClick(app.id)}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-lg hover:bg-white/5 transition-all duration-200 group"
                >
                  <div className={`${app.color} group-hover:scale-110 transition-transform duration-200`}>
                    {app.icon}
                  </div>
                  <span className="text-white/60 text-[10px] group-hover:text-white/90 transition-colors text-center leading-tight">
                    {app.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="border-t border-white/5 p-2 flex items-center justify-between">
            <a
              href="https://github.com/SjxSubham"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-white/40 hover:text-white/80 text-xs"
            >
              <BiLogoGithub size={14} /> GitHub
            </a>
            <a
              href="https://leetcode.com/u/Sjx_Subham/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-white/40 hover:text-white/80 text-xs"
            >
              <SiLeetcode size={12} /> LeetCode
            </a>
          </div>
        </div>
      )}

      {/* Tooltip */}
      {hoveredApp && !showStartMenu && (
        <div
          className="fixed bottom-14 px-2.5 py-1 bg-[#1a1a2e] border border-white/10 rounded-md text-white/80 text-[11px] font-medium z-[9999] pointer-events-none whitespace-nowrap animate-tooltipIn"
          style={{
            left: tooltipPos.x,
            transform: 'translateX(-50%)',
          }}
        >
          {taskbarApps.find((a) => a.id === hoveredApp)?.label}
        </div>
      )}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-[#0d1117]/90 backdrop-blur-xl border-t border-white/5 z-[9997] flex items-center px-1 select-none">
        {/* Start button */}
        <button
          ref={startBtnRef}
          onClick={() => setShowStartMenu((prev) => !prev)}
          className={`h-10 w-10 flex items-center justify-center rounded-lg mx-1 transition-all duration-200 group
            ${showStartMenu ? 'bg-white/10' : 'hover:bg-white/5'}`}
          title="Start"
        >
          <LayoutGrid
            size={18}
            className={`transition-all duration-200 ${
              showStartMenu ? 'text-purple-400 rotate-45 scale-90' : 'text-white/60 group-hover:text-white/90'
            }`}
          />
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* App icons */}
        <div className="flex items-center gap-0.5 flex-1 overflow-x-auto px-1" style={{ scrollbarWidth: 'none' }}>
          {taskbarApps.map((app) => {
            const open = isWindowOpen(app.id);
            const active = isWindowActive(app.id);

            return (
              <button
                key={app.id}
                onClick={() => handleTaskbarAppClick(app.id)}
                onMouseEnter={(e) => handleAppHover(app.id, e)}
                onMouseLeave={() => setHoveredApp(null)}
                className={`relative h-10 flex items-center justify-center rounded-lg transition-all duration-200 group
                  ${open ? 'w-11 mx-px' : 'w-10 mx-px'}
                  ${active ? 'bg-white/10' : open ? 'bg-white/5' : 'hover:bg-white/5'}
                `}
              >
                <div
                  className={`transition-all duration-200 ${
                    active ? app.color : open ? 'text-white/50' : 'text-white/30 group-hover:text-white/60'
                  } ${active ? 'scale-100' : 'group-hover:scale-110'}`}
                >
                  {app.icon}
                </div>

                {/* Active/Open indicator dot */}
                {open && (
                  <div
                    className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 rounded-full transition-all duration-200
                      ${active ? 'w-4 h-[2px] bg-purple-400' : 'w-1.5 h-[2px] bg-white/30'}
                    `}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* System tray */}
        <div className="flex items-center gap-0.5 mr-1">
          {/* Tray expand */}
          <button className="h-8 w-6 flex items-center justify-center rounded hover:bg-white/5 transition-colors">
            <ChevronUp size={12} className="text-white/30" />
          </button>

          {/* Network */}
          <div className="h-8 w-8 flex items-center justify-center rounded hover:bg-white/5 transition-colors cursor-default">
            <Wifi size={13} className="text-white/40" />
          </div>

          {/* Volume */}
          <div className="h-8 w-8 flex items-center justify-center rounded hover:bg-white/5 transition-colors cursor-default">
            <Volume2 size={13} className="text-white/40" />
          </div>

          {/* Battery */}
          <div className="h-8 w-8 flex items-center justify-center rounded hover:bg-white/5 transition-colors cursor-default">
            <Battery size={13} className="text-white/40" />
          </div>

          {/* Separator */}
          <div className="w-px h-5 bg-white/10 mx-1" />

          {/* Clock */}
          <div className="flex flex-col items-end justify-center px-2 py-1 rounded-lg hover:bg-white/5 transition-colors cursor-default min-w-[80px]">
            <span className="text-white/70 text-[11px] font-medium leading-tight">{formatTime(time)}</span>
            <span className="text-white/30 text-[10px] leading-tight">{formatDate(time)}</span>
          </div>

          {/* Show desktop */}
          <div className="w-1.5 h-10 hover:bg-white/10 transition-colors cursor-pointer rounded-r" title="Show Desktop" />
        </div>
      </div>

      <style>{`
        @keyframes startMenuIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-startMenuIn {
          animation: startMenuIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes tooltipIn {
          from { opacity: 0; transform: translateX(-50%) translateY(4px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .animate-tooltipIn {
          animation: tooltipIn 0.15s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export { taskbarApps };
export default Taskbar;

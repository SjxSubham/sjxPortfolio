import { useState, useCallback, useRef, useEffect } from 'react';
import {
  Terminal,
  User,
  Code2,
  FolderGit2,
  Mail,
  Cpu,
  Info,
  RefreshCw,
  Monitor,
  Palette,
} from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';
import { BiLogoGithub } from 'react-icons/bi';

import Window from './Window';
import Taskbar from './Taskbar';
import TerminalApp from './apps/TerminalApp';
import AboutApp from './apps/AboutApp';
import SkillsApp from './apps/SkillsApp';
import ProjectsApp from './apps/ProjectsApp';
import CodeEditorApp from './apps/CodeEditorApp';
import ContactApp from './apps/ContactApp';
import LeetCodeApp from './apps/LeetCodeApp';
import GithubApp from './apps/GithubApp';

const APP_CONFIGS = {
  terminal: {
    title: 'Terminal — subham@portfolio',
    icon: <Terminal size={14} className="text-green-400" />,
    defaultSize: { width: 780, height: 520 },
    minSize: { width: 500, height: 350 },
    component: TerminalApp,
    passOpenApp: true,
  },
  about: {
    title: 'About — Subham Mondal',
    icon: <User size={14} className="text-blue-400" />,
    defaultSize: { width: 640, height: 560 },
    minSize: { width: 400, height: 400 },
    component: AboutApp,
  },
  skills: {
    title: 'Skills & Technologies',
    icon: <Cpu size={14} className="text-cyan-400" />,
    defaultSize: { width: 720, height: 580 },
    minSize: { width: 450, height: 400 },
    component: SkillsApp,
  },
  projects: {
    title: 'My Projects',
    icon: <FolderGit2 size={14} className="text-orange-400" />,
    defaultSize: { width: 800, height: 600 },
    minSize: { width: 500, height: 400 },
    component: ProjectsApp,
  },
  codeeditor: {
    title: 'Code Runner — Piston API',
    icon: <Code2 size={14} className="text-yellow-400" />,
    defaultSize: { width: 820, height: 600 },
    minSize: { width: 550, height: 450 },
    component: CodeEditorApp,
  },
  contact: {
    title: 'Contact — Get In Touch',
    icon: <Mail size={14} className="text-purple-400" />,
    defaultSize: { width: 780, height: 580 },
    minSize: { width: 480, height: 400 },
    component: ContactApp,
  },
  leetcode: {
    title: 'LeetCode — Sjx_Subham',
    icon: <SiLeetcode size={13} className="text-amber-400" />,
    defaultSize: { width: 680, height: 580 },
    minSize: { width: 400, height: 400 },
    component: LeetCodeApp,
  },
  github: {
    title: 'GitHub — SjxSubham',
    icon: <BiLogoGithub size={15} className="text-white" />,
    defaultSize: { width: 720, height: 600 },
    minSize: { width: 450, height: 400 },
    component: GithubApp,
  },
};

const DESKTOP_ICONS = [
  { id: 'terminal', label: 'Terminal', icon: <Terminal size={28} />, color: 'text-green-400' },
  { id: 'about', label: 'About Me', icon: <User size={28} />, color: 'text-blue-400' },
  { id: 'skills', label: 'Skills', icon: <Cpu size={28} />, color: 'text-cyan-400' },
  { id: 'projects', label: 'Projects', icon: <FolderGit2 size={28} />, color: 'text-orange-400' },
  { id: 'codeeditor', label: 'Code Runner', icon: <Code2 size={28} />, color: 'text-yellow-400' },
  { id: 'leetcode', label: 'LeetCode', icon: <SiLeetcode size={24} />, color: 'text-amber-400' },
  { id: 'github', label: 'GitHub', icon: <BiLogoGithub size={28} />, color: 'text-white' },
  { id: 'contact', label: 'Contact', icon: <Mail size={28} />, color: 'text-purple-400' },
];

const WALLPAPER_OPTIONS = [
  {
    id: 'default',
    name: 'Midnight Purple',
    style: {
      background: 'radial-gradient(ellipse at 20% 50%, rgba(88, 28, 135, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(30, 58, 138, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(15, 23, 42, 0.8) 0%, transparent 70%), linear-gradient(135deg, #0a0a0f 0%, #0d1117 50%, #0a0e14 100%)',
    },
  },
  {
    id: 'ocean',
    name: 'Deep Ocean',
    style: {
      background: 'radial-gradient(ellipse at 30% 70%, rgba(6, 78, 112, 0.2) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(14, 116, 144, 0.15) 0%, transparent 50%), linear-gradient(160deg, #020617 0%, #0c1929 50%, #051525 100%)',
    },
  },
  {
    id: 'emerald',
    name: 'Emerald Night',
    style: {
      background: 'radial-gradient(ellipse at 25% 60%, rgba(5, 90, 58, 0.15) 0%, transparent 55%), radial-gradient(ellipse at 75% 30%, rgba(16, 120, 82, 0.1) 0%, transparent 50%), linear-gradient(145deg, #030712 0%, #071210 50%, #0a0f0d 100%)',
    },
  },
  {
    id: 'rose',
    name: 'Rose Nebula',
    style: {
      background: 'radial-gradient(ellipse at 40% 40%, rgba(136, 19, 55, 0.12) 0%, transparent 55%), radial-gradient(ellipse at 60% 70%, rgba(88, 28, 135, 0.1) 0%, transparent 50%), linear-gradient(135deg, #0f0508 0%, #130a10 50%, #0a0a0f 100%)',
    },
  },
];

const Desktop = () => {
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [nextZIndex, setNextZIndex] = useState(10);
  const [contextMenu, setContextMenu] = useState(null);
  const [wallpaper, setWallpaper] = useState(WALLPAPER_OPTIONS[0]);
  const [showWallpaperPicker, setShowWallpaperPicker] = useState(false);
  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState(null);
  const desktopRef = useRef(null);
  const wallpaperPickerRef = useRef(null);

  // Close context menu and wallpaper picker on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (contextMenu) setContextMenu(null);
      if (showWallpaperPicker && wallpaperPickerRef.current && !wallpaperPickerRef.current.contains(e.target)) {
        setShowWallpaperPicker(false);
      }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [contextMenu, showWallpaperPicker]);

  // ESC to close context menu
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setContextMenu(null);
        setShowWallpaperPicker(false);
        setSelectedDesktopIcon(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Open terminal by default on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      openApp('terminal');
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const openApp = useCallback(
    (appId) => {
      const existing = windows.find((w) => w.id === appId);
      if (existing) {
        // If minimized, restore it
        if (existing.isMinimized) {
          setWindows((prev) =>
            prev.map((w) =>
              w.id === appId ? { ...w, isMinimized: false, zIndex: nextZIndex } : w
            )
          );
          setNextZIndex((z) => z + 1);
        }
        // Focus it
        setActiveWindowId(appId);
        setWindows((prev) =>
          prev.map((w) => (w.id === appId ? { ...w, zIndex: nextZIndex } : w))
        );
        setNextZIndex((z) => z + 1);
        return;
      }

      const config = APP_CONFIGS[appId];
      if (!config) return;

      // Calculate position with stagger
      const openCount = windows.length;
      const offset = (openCount % 8) * 30;

      const newWindow = {
        id: appId,
        title: config.title,
        icon: config.icon,
        defaultSize: config.defaultSize,
        minSize: config.minSize,
        isMinimized: false,
        isMaximized: false,
        zIndex: nextZIndex,
        defaultPosition: {
          x: 80 + offset,
          y: 30 + offset,
        },
      };

      setWindows((prev) => [...prev, newWindow]);
      setActiveWindowId(appId);
      setNextZIndex((z) => z + 1);
    },
    [windows, nextZIndex]
  );

  const closeWindow = useCallback((windowId) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId));
    setActiveWindowId((prev) => {
      if (prev === windowId) {
        // Focus the next highest z-index window
        const remaining = windows.filter((w) => w.id !== windowId && !w.isMinimized);
        if (remaining.length > 0) {
          return remaining.reduce((a, b) => (a.zIndex > b.zIndex ? a : b)).id;
        }
        return null;
      }
      return prev;
    });
  }, [windows]);

  const minimizeWindow = useCallback(
    (windowId) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === windowId ? { ...w, isMinimized: true } : w))
      );
      if (activeWindowId === windowId) {
        const remaining = windows.filter((w) => w.id !== windowId && !w.isMinimized);
        if (remaining.length > 0) {
          setActiveWindowId(remaining.reduce((a, b) => (a.zIndex > b.zIndex ? a : b)).id);
        } else {
          setActiveWindowId(null);
        }
      }
    },
    [activeWindowId, windows]
  );

  const maximizeWindow = useCallback((windowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, isMaximized: true } : w))
    );
  }, []);

  const restoreWindow = useCallback(
    (windowId) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === windowId
            ? { ...w, isMaximized: false, isMinimized: false, zIndex: nextZIndex }
            : w
        )
      );
      setActiveWindowId(windowId);
      setNextZIndex((z) => z + 1);
    },
    [nextZIndex]
  );

  const focusWindow = useCallback(
    (windowId) => {
      setActiveWindowId(windowId);
      setWindows((prev) =>
        prev.map((w) => (w.id === windowId ? { ...w, zIndex: nextZIndex } : w))
      );
      setNextZIndex((z) => z + 1);
    },
    [nextZIndex]
  );

  const handleDesktopContextMenu = (e) => {
    e.preventDefault();
    // Only show if right-clicking the desktop itself (not a window)
    if (e.target === desktopRef.current || e.target.closest('[data-desktop-area]')) {
      setContextMenu({ x: e.clientX, y: e.clientY });
    }
  };

  const handleDesktopClick = (e) => {
    // Click on desktop = deselect icon
    if (e.target === desktopRef.current || e.target.closest('[data-desktop-area]')) {
      setSelectedDesktopIcon(null);
    }
  };

  const handleDesktopIconDblClick = (appId) => {
    setSelectedDesktopIcon(null);
    openApp(appId);
  };

  const contextMenuItems = [
    {
      label: 'Open Terminal',
      icon: <Terminal size={13} />,
      action: () => openApp('terminal'),
    },
    { type: 'separator' },
    {
      label: 'View',
      icon: <Monitor size={13} />,
      disabled: true,
    },
    {
      label: 'Change Wallpaper',
      icon: <Palette size={13} />,
      action: () => setShowWallpaperPicker(true),
    },
    { type: 'separator' },
    {
      label: 'Refresh',
      icon: <RefreshCw size={13} />,
      action: () => window.location.reload(),
    },
    {
      label: 'About SubhamOS',
      icon: <Info size={13} />,
      action: () => openApp('about'),
    },
  ];

  return (
    <div
      ref={desktopRef}
      className="fixed inset-0 overflow-hidden select-none"
      style={wallpaper.style}
      onContextMenu={handleDesktopContextMenu}
      onClick={handleDesktopClick}
    >
      {/* Subtle dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      {/* Desktop icon area */}
      <div
        className="absolute top-4 left-4 bottom-14 w-[88px] flex flex-col gap-1 z-[5]"
        data-desktop-area
      >
        {DESKTOP_ICONS.map((icon) => (
          <button
            key={icon.id}
            onClick={() => setSelectedDesktopIcon(icon.id)}
            onDoubleClick={() => handleDesktopIconDblClick(icon.id)}
            className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all duration-200 group
              ${
                selectedDesktopIcon === icon.id
                  ? 'bg-white/10 ring-1 ring-white/15'
                  : 'hover:bg-white/[0.04]'
              }
            `}
          >
            <div
              className={`${icon.color} transition-transform duration-200 group-hover:scale-110 group-active:scale-95 drop-shadow-lg`}
            >
              {icon.icon}
            </div>
            <span
              className={`text-[10px] font-medium text-center leading-tight transition-colors duration-200 max-w-[76px] truncate ${
                selectedDesktopIcon === icon.id ? 'text-white/90' : 'text-white/50 group-hover:text-white/70'
              }`}
              style={{
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
              }}
            >
              {icon.label}
            </span>
          </button>
        ))}
      </div>

      {/* Welcome watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-[1]">
        {windows.length === 0 && (
          <div className="text-center animate-fadeInSlow">
            <h1 className="text-4xl md:text-5xl font-bold text-white/[0.04] mb-2 tracking-tight">
              SubhamOS
            </h1>
            <p className="text-white/[0.03] text-sm font-medium tracking-widest uppercase">
              Double-click an icon or right-click for options
            </p>
          </div>
        )}
      </div>

      {/* Windows */}
      <div className="absolute inset-0 bottom-12 overflow-hidden z-[6]">
        {windows.map((win) => {
          const config = APP_CONFIGS[win.id];
          if (!config) return null;

          const AppComponent = config.component;

          return (
            <Window
              key={win.id}
              id={win.id}
              title={win.title}
              icon={win.icon}
              isActive={activeWindowId === win.id}
              isMinimized={win.isMinimized}
              isMaximized={win.isMaximized}
              zIndex={win.zIndex}
              defaultPosition={win.defaultPosition}
              defaultSize={win.defaultSize}
              minSize={win.minSize}
              onFocus={() => focusWindow(win.id)}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onMaximize={() => maximizeWindow(win.id)}
              onRestore={() => restoreWindow(win.id)}
            >
              {config.passOpenApp ? (
                <AppComponent onOpenApp={openApp} />
              ) : (
                <AppComponent />
              )}
            </Window>
          );
        })}
      </div>

      {/* Taskbar */}
      <Taskbar
        openWindows={windows}
        activeWindowId={activeWindowId}
        onAppClick={openApp}
        onWindowFocus={focusWindow}
        onWindowRestore={restoreWindow}
      />

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed z-[9999] w-56 bg-[#0d1117]/98 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/60 overflow-hidden animate-contextMenuIn py-1"
          style={{
            top: Math.min(contextMenu.y, window.innerHeight - 300),
            left: Math.min(contextMenu.x, window.innerWidth - 240),
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {contextMenuItems.map((item, i) =>
            item.type === 'separator' ? (
              <div key={i} className="h-px bg-white/5 my-1 mx-2" />
            ) : (
              <button
                key={i}
                onClick={() => {
                  if (!item.disabled && item.action) {
                    item.action();
                    setContextMenu(null);
                  }
                }}
                disabled={item.disabled}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs transition-colors duration-150 ${
                  item.disabled
                    ? 'text-white/15 cursor-default'
                    : 'text-white/60 hover:bg-white/5 hover:text-white/90'
                }`}
              >
                <span className="w-4 flex items-center justify-center shrink-0 opacity-60">
                  {item.icon}
                </span>
                {item.label}
              </button>
            )
          )}
        </div>
      )}

      {/* Wallpaper Picker */}
      {showWallpaperPicker && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center animate-fadeInQuick">
          <div
            ref={wallpaperPickerRef}
            className="bg-[#0d1117]/98 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/60 p-6 w-80 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-semibold text-white/80 mb-1 flex items-center gap-2">
              <Palette size={14} className="text-purple-400" />
              Change Wallpaper
            </h3>
            <p className="text-[11px] text-white/30 mb-4">
              Choose a desktop background theme
            </p>

            <div className="grid grid-cols-2 gap-3">
              {WALLPAPER_OPTIONS.map((wp) => (
                <button
                  key={wp.id}
                  onClick={() => {
                    setWallpaper(wp);
                    setShowWallpaperPicker(false);
                  }}
                  className={`relative h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 group ${
                    wallpaper.id === wp.id
                      ? 'border-purple-500 shadow-lg shadow-purple-500/20 scale-[1.02]'
                      : 'border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="absolute inset-0" style={wp.style} />
                  <div className="absolute inset-0 flex items-end justify-center pb-2">
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full backdrop-blur-md transition-all ${
                        wallpaper.id === wp.id
                          ? 'bg-purple-500/30 text-white/90'
                          : 'bg-black/30 text-white/50 group-hover:text-white/70'
                      }`}
                    >
                      {wp.name}
                    </span>
                  </div>
                  {wallpaper.id === wp.id && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowWallpaperPicker(false)}
              className="w-full mt-4 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white/80 text-xs transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Inline styles for animations */}
      <style>{`
        @keyframes contextMenuIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-4px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-contextMenuIn {
          animation: contextMenuIn 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInSlow {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeInSlow {
          animation: fadeInSlow 1s ease-out forwards;
        }
        @keyframes fadeInQuick {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeInQuick {
          animation: fadeInQuick 0.2s ease-out forwards;
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Desktop;

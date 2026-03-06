import { useState, useCallback, useRef, useEffect, useMemo } from "react";
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
} from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { BiLogoGithub } from "react-icons/bi";

import Window from "./Window";
import Taskbar from "./Taskbar";
import TerminalApp from "./apps/TerminalApp";
import AboutApp from "./apps/AboutApp";
import SkillsApp from "./apps/SkillsApp";
import ProjectsApp from "./apps/ProjectsApp";
import CodeEditorApp from "./apps/CodeEditorApp";
import ContactApp from "./apps/ContactApp";
import LeetCodeApp from "./apps/LeetCodeApp";
import GithubApp from "./apps/GithubApp";

const APP_CONFIGS = {
  terminal: {
    title: "Terminal — sjxsubham@portfolio",
    icon: <Terminal size={14} className="text-green-400" />,
    defaultSize: { width: 780, height: 520 },
    minSize: { width: 500, height: 350 },
    component: TerminalApp,
    passOpenApp: true,
  },
  about: {
    title: "About — Subham Mondal",
    icon: <User size={14} className="text-blue-400" />,
    defaultSize: { width: 640, height: 560 },
    minSize: { width: 400, height: 400 },
    component: AboutApp,
  },
  skills: {
    title: "Skills & Technologies",
    icon: <Cpu size={14} className="text-cyan-400" />,
    defaultSize: { width: 720, height: 580 },
    minSize: { width: 450, height: 400 },
    component: SkillsApp,
  },
  projects: {
    title: "My Projects",
    icon: <FolderGit2 size={14} className="text-orange-400" />,
    defaultSize: { width: 800, height: 600 },
    minSize: { width: 500, height: 400 },
    component: ProjectsApp,
  },
  codeeditor: {
    title: "Code Runner — Piston API",
    icon: <Code2 size={14} className="text-yellow-400" />,
    defaultSize: { width: 820, height: 600 },
    minSize: { width: 550, height: 450 },
    component: CodeEditorApp,
  },
  contact: {
    title: "Contact — Get In Touch",
    icon: <Mail size={14} className="text-purple-400" />,
    defaultSize: { width: 780, height: 580 },
    minSize: { width: 480, height: 400 },
    component: ContactApp,
  },
  leetcode: {
    title: "LeetCode — Sjx_Subham",
    icon: <SiLeetcode size={13} className="text-amber-400" />,
    defaultSize: { width: 680, height: 580 },
    minSize: { width: 400, height: 400 },
    component: LeetCodeApp,
  },
  github: {
    title: "GitHub — SjxSubham",
    icon: <BiLogoGithub size={15} className="text-white" />,
    defaultSize: { width: 720, height: 600 },
    minSize: { width: 450, height: 400 },
    component: GithubApp,
  },
};

const DESKTOP_ICONS = [
  {
    id: "terminal",
    label: "Terminal",
    icon: <Terminal size={28} />,
    color: "text-green-400",
  },
  {
    id: "about",
    label: "About Me",
    icon: <User size={28} />,
    color: "text-blue-400",
  },
  {
    id: "skills",
    label: "Skills",
    icon: <Cpu size={28} />,
    color: "text-cyan-400",
  },
  {
    id: "projects",
    label: "Projects",
    icon: <FolderGit2 size={28} />,
    color: "text-orange-400",
  },
  {
    id: "codeeditor",
    label: "Code Runner",
    icon: <Code2 size={28} />,
    color: "text-yellow-400",
  },
  {
    id: "leetcode",
    label: "LeetCode",
    icon: <SiLeetcode size={24} />,
    color: "text-amber-400",
  },
  {
    id: "github",
    label: "GitHub",
    icon: <BiLogoGithub size={28} />,
    color: "text-white",
  },
  {
    id: "contact",
    label: "Contact",
    icon: <Mail size={28} />,
    color: "text-purple-400",
  },
];

const WALLPAPER_OPTIONS = [
  {
    id: "default",
    name: "Midnight Purple",
    style: {
      background:
        "radial-gradient(ellipse at 20% 50%, rgba(88, 28, 135, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(30, 58, 138, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(15, 23, 42, 0.8) 0%, transparent 70%), linear-gradient(135deg, #0a0a0f 0%, #0d1117 50%, #0a0e14 100%)",
    },
    orbColors: [
      "rgba(139, 92, 246, 0.08)",
      "rgba(59, 130, 246, 0.06)",
      "rgba(168, 85, 247, 0.07)",
    ],
    auroraColors: [
      "rgba(139, 92, 246, 0.04)",
      "rgba(59, 130, 246, 0.03)",
      "rgba(168, 85, 247, 0.05)",
    ],
    starColor: "rgba(168, 85, 247, 0.6)",
    gridColor: "rgba(139, 92, 246, 0.03)",
  },
  {
    id: "ocean",
    name: "Deep Ocean",
    style: {
      background:
        "radial-gradient(ellipse at 30% 70%, rgba(6, 78, 112, 0.2) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(14, 116, 144, 0.15) 0%, transparent 50%), linear-gradient(160deg, #020617 0%, #0c1929 50%, #051525 100%)",
    },
    orbColors: [
      "rgba(6, 182, 212, 0.07)",
      "rgba(14, 116, 144, 0.06)",
      "rgba(34, 211, 238, 0.05)",
    ],
    auroraColors: [
      "rgba(6, 182, 212, 0.04)",
      "rgba(14, 116, 144, 0.03)",
      "rgba(8, 145, 178, 0.04)",
    ],
    starColor: "rgba(34, 211, 238, 0.6)",
    gridColor: "rgba(6, 182, 212, 0.03)",
  },
  {
    id: "emerald",
    name: "Emerald Night",
    style: {
      background:
        "radial-gradient(ellipse at 25% 60%, rgba(5, 90, 58, 0.15) 0%, transparent 55%), radial-gradient(ellipse at 75% 30%, rgba(16, 120, 82, 0.1) 0%, transparent 50%), linear-gradient(145deg, #030712 0%, #071210 50%, #0a0f0d 100%)",
    },
    orbColors: [
      "rgba(16, 185, 129, 0.07)",
      "rgba(52, 211, 153, 0.05)",
      "rgba(5, 150, 105, 0.06)",
    ],
    auroraColors: [
      "rgba(16, 185, 129, 0.04)",
      "rgba(52, 211, 153, 0.03)",
      "rgba(5, 150, 105, 0.04)",
    ],
    starColor: "rgba(52, 211, 153, 0.6)",
    gridColor: "rgba(16, 185, 129, 0.03)",
  },
  {
    id: "rose",
    name: "Rose Nebula",
    style: {
      background:
        "radial-gradient(ellipse at 40% 40%, rgba(136, 19, 55, 0.12) 0%, transparent 55%), radial-gradient(ellipse at 60% 70%, rgba(88, 28, 135, 0.1) 0%, transparent 50%), linear-gradient(135deg, #0f0508 0%, #130a10 50%, #0a0a0f 100%)",
    },
    orbColors: [
      "rgba(244, 63, 94, 0.06)",
      "rgba(236, 72, 153, 0.05)",
      "rgba(168, 85, 247, 0.06)",
    ],
    auroraColors: [
      "rgba(244, 63, 94, 0.04)",
      "rgba(236, 72, 153, 0.03)",
      "rgba(190, 18, 60, 0.04)",
    ],
    starColor: "rgba(244, 63, 94, 0.6)",
    gridColor: "rgba(244, 63, 94, 0.03)",
  },
];

/* ── Floating Orbs ── */
const FloatingOrbs = ({ colors }) => {
  const orbs = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      size: 200 + Math.random() * 350,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 18 + Math.random() * 22,
      delay: Math.random() * -20,
      color: colors[i % colors.length],
    }));
  }, [colors]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full animate-floatOrb"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(60px)",
            animationDuration: `${orb.duration}s`,
            animationDelay: `${orb.delay}s`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
};

/* ── Shooting Stars ── */
const ShootingStars = ({ color }) => {
  const [stars, setStars] = useState([]);
  const nextId = useRef(0);

  useEffect(() => {
    const spawnStar = () => {
      const id = nextId.current++;
      const star = {
        id,
        x: Math.random() * 80 + 10,
        y: Math.random() * 40,
        angle: 25 + Math.random() * 30,
        duration: 0.6 + Math.random() * 0.8,
        length: 80 + Math.random() * 120,
      };
      setStars((prev) => [...prev.slice(-4), star]);
      setTimeout(
        () => {
          setStars((prev) => prev.filter((s) => s.id !== id));
        },
        star.duration * 1000 + 200,
      );
    };

    // Spawn stars at random intervals
    const scheduleNext = () => {
      const delay = 3000 + Math.random() * 7000;
      return setTimeout(() => {
        spawnStar();
        timerId = scheduleNext();
      }, delay);
    };

    let timerId = scheduleNext();
    // Spawn one immediately after a short delay
    const initTimer = setTimeout(spawnStar, 1500);

    return () => {
      clearTimeout(timerId);
      clearTimeout(initTimer);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-shootingStar"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.length,
            height: "1.5px",
            background: `linear-gradient(90deg, ${color}, transparent)`,
            borderRadius: "999px",
            transform: `rotate(${star.angle}deg)`,
            animationDuration: `${star.duration}s`,
            boxShadow: `0 0 6px 1px ${color}`,
          }}
        />
      ))}
    </div>
  );
};

/* ── Aurora Effect ── */
const AuroraEffect = ({ colors }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {colors.map((color, i) => (
        <div
          key={i}
          className="absolute animate-aurora"
          style={{
            width: "140%",
            height: "40%",
            left: "-20%",
            top: `${10 + i * 12}%`,
            background: `linear-gradient(180deg, transparent 0%, ${color} 40%, transparent 100%)`,
            filter: "blur(80px)",
            animationDuration: `${14 + i * 5}s`,
            animationDelay: `${i * -4}s`,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
};

/* ── Animated Grid ── */
const AnimatedGrid = ({ color }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Base grid with perspective */}
      <div
        className="absolute inset-0 animate-gridPulse"
        style={{
          backgroundImage: `
            linear-gradient(${color} 1px, transparent 1px),
            linear-gradient(90deg, ${color} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 50%, black 20%, transparent 70%)",
        }}
      />
      {/* Scanning line effect */}
      <div
        className="absolute left-0 right-0 h-[200px] animate-scanLine"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${color.replace("0.03", "0.08")} 50%, transparent 100%)`,
          filter: "blur(2px)",
        }}
      />
    </div>
  );
};

/* ── Particle Field ── */
const ParticleField = ({ color }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * -5,
      opacity: 0.2 + Math.random() * 0.5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[2]">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: color.replace("0.6", `${p.opacity}`),
            boxShadow: `0 0 ${p.size * 3}px ${color.replace("0.6", "0.3")}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const Desktop = () => {
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [nextZIndex, setNextZIndex] = useState(10);
  const [contextMenu, setContextMenu] = useState(null);
  const [wallpaper, setWallpaper] = useState(WALLPAPER_OPTIONS[0]);
  const [showWallpaperPicker, setShowWallpaperPicker] = useState(false);
  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState(null);
  const [iconClickedId, setIconClickedId] = useState(null);
  const desktopRef = useRef(null);
  const wallpaperPickerRef = useRef(null);

  // Close context menu and wallpaper picker on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (contextMenu) setContextMenu(null);
      if (
        showWallpaperPicker &&
        wallpaperPickerRef.current &&
        !wallpaperPickerRef.current.contains(e.target)
      ) {
        setShowWallpaperPicker(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [contextMenu, showWallpaperPicker]);

  // ESC to close context menu
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setContextMenu(null);
        setShowWallpaperPicker(false);
        setSelectedDesktopIcon(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Open terminal by default on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      openApp("terminal");
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const openApp = useCallback(
    (appId) => {
      const existing = windows.find((w) => w.id === appId);
      if (existing) {
        if (existing.isMinimized) {
          setWindows((prev) =>
            prev.map((w) =>
              w.id === appId
                ? { ...w, isMinimized: false, zIndex: nextZIndex }
                : w,
            ),
          );
          setNextZIndex((z) => z + 1);
        }
        setActiveWindowId(appId);
        setWindows((prev) =>
          prev.map((w) => (w.id === appId ? { ...w, zIndex: nextZIndex } : w)),
        );
        setNextZIndex((z) => z + 1);
        return;
      }

      const config = APP_CONFIGS[appId];
      if (!config) return;

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
    [windows, nextZIndex],
  );

  const closeWindow = useCallback(
    (windowId) => {
      setWindows((prev) => prev.filter((w) => w.id !== windowId));
      setActiveWindowId((prev) => {
        if (prev === windowId) {
          const remaining = windows.filter(
            (w) => w.id !== windowId && !w.isMinimized,
          );
          if (remaining.length > 0) {
            return remaining.reduce((a, b) => (a.zIndex > b.zIndex ? a : b)).id;
          }
          return null;
        }
        return prev;
      });
    },
    [windows],
  );

  const minimizeWindow = useCallback(
    (windowId) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === windowId ? { ...w, isMinimized: true } : w)),
      );
      if (activeWindowId === windowId) {
        const remaining = windows.filter(
          (w) => w.id !== windowId && !w.isMinimized,
        );
        if (remaining.length > 0) {
          setActiveWindowId(
            remaining.reduce((a, b) => (a.zIndex > b.zIndex ? a : b)).id,
          );
        } else {
          setActiveWindowId(null);
        }
      }
    },
    [activeWindowId, windows],
  );

  const maximizeWindow = useCallback((windowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, isMaximized: true } : w)),
    );
  }, []);

  const restoreWindow = useCallback(
    (windowId) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === windowId
            ? {
                ...w,
                isMaximized: false,
                isMinimized: false,
                zIndex: nextZIndex,
              }
            : w,
        ),
      );
      setActiveWindowId(windowId);
      setNextZIndex((z) => z + 1);
    },
    [nextZIndex],
  );

  const focusWindow = useCallback(
    (windowId) => {
      setActiveWindowId(windowId);
      setWindows((prev) =>
        prev.map((w) => (w.id === windowId ? { ...w, zIndex: nextZIndex } : w)),
      );
      setNextZIndex((z) => z + 1);
    },
    [nextZIndex],
  );

  const handleDesktopContextMenu = (e) => {
    e.preventDefault();
    if (
      e.target === desktopRef.current ||
      e.target.closest("[data-desktop-area]")
    ) {
      setContextMenu({ x: e.clientX, y: e.clientY });
    }
  };

  const handleDesktopClick = (e) => {
    if (
      e.target === desktopRef.current ||
      e.target.closest("[data-desktop-area]")
    ) {
      setSelectedDesktopIcon(null);
    }
  };

  // Single-click opens the app (like taskbar)
  const handleDesktopIconClick = (appId) => {
    setIconClickedId(appId);
    setSelectedDesktopIcon(appId);
    // Small delay for bounce animation, then open
    setTimeout(() => {
      openApp(appId);
      setIconClickedId(null);
    }, 200);
  };

  const contextMenuItems = [
    {
      label: "Open Terminal",
      icon: <Terminal size={13} />,
      action: () => openApp("terminal"),
    },
    { type: "separator" },
    {
      label: "View",
      icon: <Monitor size={13} />,
      disabled: true,
    },
    {
      label: "Change Wallpaper",
      icon: <Palette size={13} />,
      action: () => setShowWallpaperPicker(true),
    },
    { type: "separator" },
    {
      label: "Refresh",
      icon: <RefreshCw size={13} />,
      action: () => window.location.reload(),
    },
    {
      label: "About SjxSubhamOS",
      icon: <Info size={13} />,
      action: () => openApp("about"),
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
      {/* ── Animated Background Layers ── */}
      <FloatingOrbs colors={wallpaper.orbColors} />
      <AuroraEffect colors={wallpaper.auroraColors} />
      <ShootingStars color={wallpaper.starColor} />
      <AnimatedGrid color={wallpaper.gridColor} />
      <ParticleField color={wallpaper.starColor} />

      {/* Subtle dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015] z-[2]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay z-[2]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
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
            onClick={() => handleDesktopIconClick(icon.id)}
            className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all duration-200 group cursor-pointer
              ${
                selectedDesktopIcon === icon.id
                  ? "bg-white/10 ring-1 ring-white/15"
                  : "hover:bg-white/[0.06]"
              }
              ${iconClickedId === icon.id ? "animate-iconBounce" : ""}
            `}
          >
            <div
              className={`${icon.color} transition-all duration-200 group-hover:scale-110 group-active:scale-90 drop-shadow-lg group-hover:drop-shadow-[0_0_8px_currentColor]`}
            >
              {icon.icon}
            </div>
            <span
              className={`text-[10px] font-medium text-center leading-tight transition-colors duration-200 max-w-[76px] truncate ${
                selectedDesktopIcon === icon.id
                  ? "text-white/90"
                  : "text-white/50 group-hover:text-white/70"
              }`}
              style={{
                textShadow: "0 1px 3px rgba(0,0,0,0.8)",
              }}
            >
              {icon.label}
            </span>
          </button>
        ))}
      </div>

      {/* Welcome watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-[3]">
        {windows.length === 0 && (
          <div className="text-center animate-fadeInSlow">
            <h1 className="text-4xl md:text-5xl font-bold text-white/[0.04] mb-2 tracking-tight animate-breathe">
              SjxSubhamOS
            </h1>
            <p className="text-white/[0.03] text-sm font-medium tracking-widest uppercase">
              Click an icon or right-click for options
            </p>
          </div>
        )}
      </div>

      {/* Windows */}
      <div className="absolute inset-0 bottom-12 overflow-hidden z-[6] pointer-events-none">
        {windows.map((win) => {
          const config = APP_CONFIGS[win.id];
          if (!config) return null;

          const AppComponent = config.component;

          return (
            <div key={win.id} className="pointer-events-auto">
              <Window
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
            </div>
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
            item.type === "separator" ? (
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
                    ? "text-white/15 cursor-default"
                    : "text-white/60 hover:bg-white/5 hover:text-white/90"
                }`}
              >
                <span className="w-4 flex items-center justify-center shrink-0 opacity-60">
                  {item.icon}
                </span>
                {item.label}
              </button>
            ),
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
                      ? "border-purple-500 shadow-lg shadow-purple-500/20 scale-[1.02]"
                      : "border-white/5 hover:border-white/15 hover:scale-[1.03]"
                  }`}
                >
                  <div className="absolute inset-0" style={wp.style} />
                  {/* Mini animated orb inside preview */}
                  <div
                    className="absolute w-16 h-16 rounded-full animate-floatOrb opacity-40"
                    style={{
                      background: `radial-gradient(circle, ${wp.orbColors[0]} 0%, transparent 70%)`,
                      filter: "blur(8px)",
                      top: "20%",
                      left: "30%",
                      animationDuration: "6s",
                    }}
                  />
                  <div className="absolute inset-0 flex items-end justify-center pb-2">
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full backdrop-blur-md transition-all ${
                        wallpaper.id === wp.id
                          ? "bg-purple-500/30 text-white/90"
                          : "bg-black/30 text-white/50 group-hover:text-white/70"
                      }`}
                    >
                      {wp.name}
                    </span>
                  </div>
                  {wallpaper.id === wp.id && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center animate-scaleIn">
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
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

        /* ── Floating Orb animation ── */
        @keyframes floatOrb {
          0%, 100% {
            transform: translate(-50%, -50%) translate(0px, 0px) scale(1);
          }
          25% {
            transform: translate(-50%, -50%) translate(60px, -40px) scale(1.1);
          }
          50% {
            transform: translate(-50%, -50%) translate(-30px, 50px) scale(0.9);
          }
          75% {
            transform: translate(-50%, -50%) translate(-50px, -20px) scale(1.05);
          }
        }
        .animate-floatOrb {
          animation: floatOrb 20s ease-in-out infinite;
        }

        /* ── Shooting Star animation ── */
        @keyframes shootingStar {
          0% {
            opacity: 0;
            transform: rotate(var(--angle, 30deg)) translateX(-40px) scaleX(0.3);
          }
          10% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: rotate(var(--angle, 30deg)) translateX(300px) scaleX(1);
          }
        }
        .animate-shootingStar {
          animation: shootingStar 0.8s ease-out forwards;
        }

        /* ── Aurora animation ── */
        @keyframes aurora {
          0%, 100% {
            transform: translateX(-10%) skewX(-5deg) scaleY(1);
          }
          25% {
            transform: translateX(5%) skewX(3deg) scaleY(1.2);
          }
          50% {
            transform: translateX(-5%) skewX(-2deg) scaleY(0.8);
          }
          75% {
            transform: translateX(8%) skewX(4deg) scaleY(1.1);
          }
        }
        .animate-aurora {
          animation: aurora 14s ease-in-out infinite;
        }

        /* ── Grid Pulse animation ── */
        @keyframes gridPulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
        }
        .animate-gridPulse {
          animation: gridPulse 8s ease-in-out infinite;
        }

        /* ── Scan Line animation ── */
        @keyframes scanLine {
          0% {
            top: -200px;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 110%;
            opacity: 0;
          }
        }
        .animate-scanLine {
          animation: scanLine 12s linear infinite;
        }

        /* ── Twinkle animation ── */
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.1;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }

        /* ── Icon Bounce on click ── */
        @keyframes iconBounce {
          0% { transform: scale(1); }
          30% { transform: scale(0.85); }
          60% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-iconBounce {
          animation: iconBounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* ── Breathe animation for watermark ── */
        @keyframes breathe {
          0%, 100% {
            opacity: 0.04;
            transform: scale(1);
          }
          50% {
            opacity: 0.06;
            transform: scale(1.02);
          }
        }
        .animate-breathe {
          animation: breathe 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Desktop;

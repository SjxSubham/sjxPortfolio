import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { Info, RefreshCw, Monitor, Palette } from "lucide-react";
import {
  StudioTerminalIcon,
  StudioProfileIcon,
  StudioSkillsIcon,
  StudioProjectsIcon,
  StudioCodeIcon,
  StudioLeetCodeIcon,
  StudioGithubIcon,
  StudioMailIcon,
} from "./StudioIcons";

import Window from "./Window";
import Taskbar from "./Taskbar";
import WallpaperBot from "./WallpaperBot";
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
    icon: <StudioTerminalIcon size={14} className="text-emerald-300" />,
    defaultSize: { width: 780, height: 520 },
    minSize: { width: 500, height: 350 },
    component: TerminalApp,
    passOpenApp: true,
  },
  about: {
    title: "About — Subham Mondal",
    icon: <StudioProfileIcon size={14} className="text-sky-300" />,
    defaultSize: { width: 640, height: 560 },
    minSize: { width: 400, height: 400 },
    component: AboutApp,
  },
  skills: {
    title: "Skills & Technologies",
    icon: <StudioSkillsIcon size={14} className="text-cyan-300" />,
    defaultSize: { width: 720, height: 580 },
    minSize: { width: 450, height: 400 },
    component: SkillsApp,
  },
  projects: {
    title: "My Projects",
    icon: <StudioProjectsIcon size={14} className="text-orange-300" />,
    defaultSize: { width: 800, height: 600 },
    minSize: { width: 500, height: 400 },
    component: ProjectsApp,
  },
  codeeditor: {
    title: "Code Runner — Piston API",
    icon: <StudioCodeIcon size={14} className="text-amber-300" />,
    defaultSize: { width: 820, height: 600 },
    minSize: { width: 550, height: 450 },
    component: CodeEditorApp,
  },
  contact: {
    title: "Contact — Get In Touch",
    icon: <StudioMailIcon size={14} className="text-violet-300" />,
    defaultSize: { width: 780, height: 580 },
    minSize: { width: 480, height: 400 },
    component: ContactApp,
  },
  leetcode: {
    title: "LeetCode — Sjx_Subham",
    icon: <StudioLeetCodeIcon size={13} className="text-yellow-300" />,
    defaultSize: { width: 680, height: 580 },
    minSize: { width: 400, height: 400 },
    component: LeetCodeApp,
  },
  github: {
    title: "GitHub — SjxSubham",
    icon: <StudioGithubIcon size={15} className="text-white" />,
    defaultSize: { width: 720, height: 600 },
    minSize: { width: 450, height: 400 },
    component: GithubApp,
  },
};

const DESKTOP_ICONS = [
  {
    id: "terminal",
    label: "Terminal",
    icon: <StudioTerminalIcon size={24} />,
    color: "text-emerald-300",
    tilt: -3,
    offset: { x: 2, y: 0 },
    noteTint: "rgba(16, 185, 129, 0.12)",
    tapeTint: "rgba(251, 191, 36, 0.32)",
  },
  {
    id: "about",
    label: "About Me",
    icon: <StudioProfileIcon size={24} />,
    color: "text-sky-300",
    tilt: 2,
    offset: { x: -2, y: 6 },
    noteTint: "rgba(56, 189, 248, 0.12)",
    tapeTint: "rgba(148, 163, 184, 0.3)",
  },
  {
    id: "skills",
    label: "Skills",
    icon: <StudioSkillsIcon size={24} />,
    color: "text-cyan-300",
    tilt: -2,
    offset: { x: 3, y: 2 },
    noteTint: "rgba(14, 165, 233, 0.12)",
    tapeTint: "rgba(56, 189, 248, 0.28)",
  },
  {
    id: "projects",
    label: "Projects",
    icon: <StudioProjectsIcon size={24} />,
    color: "text-orange-300",
    tilt: 3,
    offset: { x: -1, y: 8 },
    noteTint: "rgba(251, 146, 60, 0.12)",
    tapeTint: "rgba(251, 146, 60, 0.3)",
  },
  {
    id: "codeeditor",
    label: "Code Runner",
    icon: <StudioCodeIcon size={24} />,
    color: "text-amber-300",
    tilt: -1,
    offset: { x: 2, y: 4 },
    noteTint: "rgba(250, 204, 21, 0.12)",
    tapeTint: "rgba(250, 204, 21, 0.3)",
  },
  {
    id: "leetcode",
    label: "LeetCode",
    icon: <StudioLeetCodeIcon size={22} />,
    color: "text-yellow-300",
    tilt: 2,
    offset: { x: -3, y: 10 },
    noteTint: "rgba(251, 191, 36, 0.12)",
    tapeTint: "rgba(253, 224, 71, 0.3)",
  },
  {
    id: "github",
    label: "GitHub",
    icon: <StudioGithubIcon size={24} />,
    color: "text-white",
    tilt: -2,
    offset: { x: 1, y: 6 },
    noteTint: "rgba(255, 255, 255, 0.08)",
    tapeTint: "rgba(148, 163, 184, 0.28)",
  },
  {
    id: "contact",
    label: "Contact",
    icon: <StudioMailIcon size={24} />,
    color: "text-violet-300",
    tilt: 3,
    offset: { x: -2, y: 12 },
    noteTint: "rgba(168, 85, 247, 0.12)",
    tapeTint: "rgba(168, 85, 247, 0.3)",
  },
];

const WALLPAPER_OPTIONS = [
  {
    id: "atelier",
    name: "Ink & Paper",
    style: {
      background:
        "radial-gradient(ellipse at 70% 15%, rgba(245, 158, 11, 0.12) 0%, transparent 45%), radial-gradient(ellipse at 15% 80%, rgba(56, 189, 248, 0.1) 0%, transparent 55%), linear-gradient(160deg, #0b0a0d 0%, #131019 55%, #0c0d12 100%)",
    },
    orbColors: [
      "rgba(245, 158, 11, 0.08)",
      "rgba(56, 189, 248, 0.07)",
      "rgba(168, 85, 247, 0.06)",
    ],
    auroraColors: [
      "rgba(251, 191, 36, 0.04)",
      "rgba(56, 189, 248, 0.03)",
      "rgba(244, 114, 182, 0.03)",
    ],
    starColor: "rgba(253, 224, 71, 0.55)",
    gridColor: "rgba(253, 224, 71, 0.04)",
  },
  {
    id: "copper",
    name: "Copper Dusk",
    style: {
      background:
        "radial-gradient(ellipse at 75% 30%, rgba(251, 146, 60, 0.14) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(34, 211, 238, 0.08) 0%, transparent 55%), linear-gradient(155deg, #0d0a0b 0%, #141018 50%, #0f0c12 100%)",
    },
    orbColors: [
      "rgba(251, 146, 60, 0.09)",
      "rgba(248, 113, 113, 0.07)",
      "rgba(34, 211, 238, 0.05)",
    ],
    auroraColors: [
      "rgba(251, 146, 60, 0.04)",
      "rgba(248, 113, 113, 0.03)",
      "rgba(94, 234, 212, 0.03)",
    ],
    starColor: "rgba(251, 191, 36, 0.55)",
    gridColor: "rgba(251, 146, 60, 0.04)",
  },
  {
    id: "moss",
    name: "Moss Journal",
    style: {
      background:
        "radial-gradient(ellipse at 65% 25%, rgba(34, 197, 94, 0.12) 0%, transparent 45%), radial-gradient(ellipse at 15% 70%, rgba(20, 83, 45, 0.16) 0%, transparent 55%), linear-gradient(150deg, #090b0a 0%, #0f1311 60%, #0b0f0e 100%)",
    },
    orbColors: [
      "rgba(34, 197, 94, 0.09)",
      "rgba(16, 185, 129, 0.07)",
      "rgba(20, 83, 45, 0.08)",
    ],
    auroraColors: [
      "rgba(34, 197, 94, 0.04)",
      "rgba(16, 185, 129, 0.03)",
      "rgba(132, 204, 22, 0.03)",
    ],
    starColor: "rgba(134, 239, 172, 0.55)",
    gridColor: "rgba(134, 239, 172, 0.04)",
  },
  {
    id: "indigo",
    name: "Indigo Sketch",
    style: {
      background:
        "radial-gradient(ellipse at 65% 20%, rgba(129, 140, 248, 0.14) 0%, transparent 45%), radial-gradient(ellipse at 25% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 55%), linear-gradient(160deg, #0a0b10 0%, #101222 55%, #0b0e18 100%)",
    },
    orbColors: [
      "rgba(129, 140, 248, 0.09)",
      "rgba(99, 102, 241, 0.07)",
      "rgba(59, 130, 246, 0.06)",
    ],
    auroraColors: [
      "rgba(129, 140, 248, 0.04)",
      "rgba(59, 130, 246, 0.03)",
      "rgba(148, 163, 184, 0.03)",
    ],
    starColor: "rgba(165, 180, 252, 0.6)",
    gridColor: "rgba(165, 180, 252, 0.04)",
  },
];

/* ── Floating Orbs ── */
const FloatingOrbs = ({ colors }) => {
  const blobShapes = [
    "42% 58% 63% 37% / 45% 40% 60% 55%",
    "58% 42% 33% 67% / 52% 45% 55% 48%",
    "47% 53% 58% 42% / 60% 38% 62% 40%",
    "60% 40% 45% 55% / 52% 62% 38% 48%",
  ];

  const orbs = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      size: 200 + Math.random() * 350,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 18 + Math.random() * 22,
      delay: Math.random() * -20,
      color: colors[i % colors.length],
      shape: blobShapes[i % blobShapes.length],
    }));
  }, [colors]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute animate-floatOrb"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            borderRadius: orb.shape,
            filter: "blur(70px)",
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

  const withAlpha = (alpha) =>
    color.replace(
      /rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/,
      `rgba($1, $2, $3, ${alpha})`,
    );

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
            backgroundColor: withAlpha(p.opacity),
            boxShadow: `0 0 ${p.size * 3}px ${withAlpha(0.3)}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const TapeCorners = () => {
  const tapes = [
    { id: "tl", top: 18, left: 22, rotate: -6, width: 74 },
    { id: "tr", top: 16, right: 26, rotate: 7, width: 66 },
    { id: "bl", bottom: 34, left: 30, rotate: 5, width: 72 },
    { id: "br", bottom: 30, right: 24, rotate: -5, width: 64 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-[3]">
      {tapes.map((tape) => {
        const style = {
          width: tape.width,
          height: 18,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.22), rgba(255,255,255,0.05))",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 6px 14px rgba(0,0,0,0.35)",
          transform: `rotate(${tape.rotate}deg)`,
          opacity: 0.55,
        };

        if (tape.top !== undefined) style.top = tape.top;
        if (tape.left !== undefined) style.left = tape.left;
        if (tape.right !== undefined) style.right = tape.right;
        if (tape.bottom !== undefined) style.bottom = tape.bottom;

        return (
          <div key={tape.id} className="absolute rounded-sm" style={style} />
        );
      })}
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
      icon: <StudioTerminalIcon size={13} className="text-emerald-300" />,
      action: () => openApp("terminal"),
    },
    { type: "separator" },
    {
      label: "View",
      icon: <Monitor size={13} />,
      disabled: true,
    },
    {
      label: "Desk Backdrop",
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
      label: "About the Studio",
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
      <ParticleField color={wallpaper.starColor} />
      <TapeCorners />

      {/* Sketch line pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08] z-[2]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 11px), repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 16px)",
          mixBlendMode: "soft-light",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-soft-light z-[2]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
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
        className="absolute top-6 left-6 bottom-16 w-[112px] flex flex-col gap-3 z-[5]"
        data-desktop-area
      >
        {DESKTOP_ICONS.map((icon) => {
          const isSelected = selectedDesktopIcon === icon.id;

          return (
            <div
              key={icon.id}
              className="relative"
              style={{
                transform: `translate(${icon.offset.x}px, ${icon.offset.y}px) rotate(${icon.tilt}deg)`,
              }}
            >
              <button
                onClick={() => handleDesktopIconClick(icon.id)}
                className={`relative w-[98px] flex flex-col items-center gap-2 py-3 px-2 rounded-2xl border transition-all duration-200 group cursor-pointer hover:brightness-110
                  ${
                    isSelected
                      ? "border-amber-400/40 ring-1 ring-amber-400/20"
                      : "border-white/10 hover:border-white/20"
                  }
                  ${iconClickedId === icon.id ? "animate-iconBounce" : ""}
                `}
                style={{
                  background: `linear-gradient(180deg, ${icon.noteTint} 0%, rgba(255,255,255,0.02) 100%)`,
                  boxShadow:
                    "0 12px 24px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.06) inset",
                }}
              >
                <span
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 rounded-sm"
                  style={{
                    background: `linear-gradient(90deg, ${icon.tapeTint}, rgba(255,255,255,0.05))`,
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
                    opacity: 0.7,
                  }}
                />
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 bg-white/[0.04] ${icon.color} transition-all duration-200 group-hover:scale-110 group-active:scale-95`}
                >
                  {icon.icon}
                </div>
                <span
                  className={`text-[10px] font-display uppercase tracking-[0.16em] text-center leading-tight transition-colors duration-200 max-w-[86px] truncate ${
                    isSelected
                      ? "text-white/80"
                      : "text-white/50 group-hover:text-white/70"
                  }`}
                  style={{
                    textShadow: "0 1px 2px rgba(0,0,0,0.6)",
                  }}
                >
                  {icon.label}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      <WallpaperBot />

      {/* Welcome watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-[3]">
        {windows.length === 0 && (
          <div className="text-center animate-fadeInSlow">
            <h1 className="text-4xl md:text-6xl font-display text-white/[0.06] mb-2 tracking-tight animate-breathe">
              Studio Desk
            </h1>
            <p className="text-white/[0.05] text-[11px] font-medium tracking-[0.3em] uppercase">
              Pin a window • explore the notes
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
          className="fixed z-[9999] w-56 bg-[#121018]/95 backdrop-blur-xl border border-amber-400/20 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden animate-contextMenuIn py-1"
          style={{
            top: Math.min(contextMenu.y, window.innerHeight - 300),
            left: Math.min(contextMenu.x, window.innerWidth - 240),
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {contextMenuItems.map((item, i) =>
            item.type === "separator" ? (
              <div key={i} className="h-px bg-white/10 my-1 mx-2" />
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
                    ? "text-white/25 cursor-default"
                    : "text-white/70 hover:bg-amber-500/10 hover:text-white"
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
        <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[9999] flex items-center justify-center animate-fadeInQuick">
          <div
            ref={wallpaperPickerRef}
            className="bg-[#121018]/95 backdrop-blur-xl border border-amber-400/20 rounded-3xl shadow-2xl shadow-black/60 p-6 w-80 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-display text-white/80 mb-1 flex items-center gap-2">
              <Palette size={14} className="text-amber-300" />
              Desk Backdrops
            </h3>
            <p className="text-[11px] text-white/40 mb-4">
              Pick a studio mood for the desk
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
                      ? "border-amber-400 shadow-lg shadow-amber-400/20 scale-[1.02]"
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
                          ? "bg-amber-400/20 text-white/90"
                          : "bg-black/30 text-white/50 group-hover:text-white/70"
                      }`}
                    >
                      {wp.name}
                    </span>
                  </div>
                  {wallpaper.id === wp.id && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center animate-scaleIn">
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
              className="w-full mt-4 px-4 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 text-white/60 hover:text-white text-xs transition-all duration-200"
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

"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 backdrop-blur bg-black/30">
      <div className="container-max flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          <span className="text-primary">S</span>ubham
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <a href="#projects" className="opacity-80 hover:opacity-100 transition">Projects</a>
          <a href="#contact" className="opacity-80 hover:opacity-100 transition">Contact</a>
          <button
            aria-label="Toggle theme"
            className="shine-border px-3 py-1.5 text-xs"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted && theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>
      </div>
    </header>
  );
}
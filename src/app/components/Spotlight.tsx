"use client";

import { useEffect } from "react";

export function Spotlight() {
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      document.body.style.setProperty("--x", e.clientX + "px");
      document.body.style.setProperty("--y", e.clientY + "px");
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);
  return <div className="spotlight" aria-hidden="true" />;
}
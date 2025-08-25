"use client";
import { useEffect } from "react";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/src/app/components/Navbar";



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="relative z-10">
            <Navbar />
            {children}
          </div>
          <Spotlight />
        </ThemeProvider>
      </body>
    </html>
  );
}


function Spotlight() {
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
<<<<<<< HEAD
"use client";
import { useEffect } from "react";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/src/app/components/Navbar";


=======
import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Portfolio | Subham",
  description: "Subham's portfolio showcasing modern web applications including saas-feedX, mygithub, and job-seek projects. Built with Next.js, TypeScript, and React.",
  metadataBase: new URL("https://sjxsubham.github.io")
};
>>>>>>> c52a266caab5a71e6324acfee9908117fd3cdf51

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Portfolio | Subham",
  description: "Subham's portfolio showcasing modern web applications including saas-feedX, mygithub, and job-seek projects. Built with Next.js, TypeScript, and React.",
  metadataBase: new URL("https://sjxsubham.github.io")
};

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
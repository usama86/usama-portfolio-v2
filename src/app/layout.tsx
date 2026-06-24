import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muhammad Usama — Senior Software Engineer",
  description:
    "6+ years building multi-tenant SaaS, AI voice agents, and high-performance web platforms (Next.js, TypeScript, FastAPI, PostgreSQL).",
  openGraph: {
    title: "Muhammad Usama — Senior Software Engineer",
    description:
      "Multi-tenant SaaS • AI Voice Agents • High-performance web platforms",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <div className="min-h-screen bg-grid">
            <Navbar />
            <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

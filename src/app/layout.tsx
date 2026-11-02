import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { MotionLevelAttribute } from "@/components/motion/motion-level-attribute";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muhammad Usama — Senior Software Engineer",
  description:
    "Senior Software Engineer with 7+ years building enterprise platforms, full-stack SaaS, AI-powered products, and immersive web experiences with React, Next.js, TypeScript, FastAPI, and Three.js.",
  openGraph: {
    title: "Muhammad Usama — Senior Software Engineer",
    description:
      "Senior Software Engineer with 7+ years building enterprise platforms, full-stack SaaS, AI-powered products, and immersive web experiences.",
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
          <MotionLevelAttribute />
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

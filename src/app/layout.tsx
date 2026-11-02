import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { MotionLevelAttribute } from "@/components/motion/motion-level-attribute";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muhammad Usama — Senior Software Engineer",
  description:
    "Senior Software Engineer with 7+ years of experience. React, Next.js, TypeScript, and full-stack product engineering, from architecture to production.",
  openGraph: {
    title: "Muhammad Usama — Senior Software Engineer",
    description:
      "Senior Software Engineer with 7+ years of experience. React, Next.js, TypeScript, and full-stack product engineering, from architecture to production.",
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <MotionLevelAttribute />
          <div className="min-h-screen bg-grid">
            <Navbar />
            <main
              id="main-content"
              tabIndex={-1}
              className="mx-auto w-full max-w-[1248px] px-5 sm:px-8 lg:px-12 pb-8"
            >
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

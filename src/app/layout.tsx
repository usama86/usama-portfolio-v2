import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/shared/navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <div className="min-h-screen bg-grid">
            <Navbar />
            <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

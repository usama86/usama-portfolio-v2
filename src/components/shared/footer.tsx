import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="mt-16 pb-10">
      <Separator className="opacity-60" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Muhammad Usama — Built with Next.js +
          Tailwind + shadcn/ui
        </div>

        <div className="flex items-center gap-4 text-sm">
          <a
            className="text-muted-foreground hover:text-foreground transition-colors"
            href="#projects"
          >
            Projects
          </a>
          <a
            className="text-muted-foreground hover:text-foreground transition-colors"
            href="#contact"
          >
            Contact
          </a>
          <a
            className="text-muted-foreground hover:text-foreground transition-colors"
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}

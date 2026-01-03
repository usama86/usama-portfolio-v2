import { Separator } from "@/components/ui/separator";
import { SocialChips } from "@/components/shared/social-chips";

export function Footer() {
  return (
    <footer className="mt-16 pb-10">
      <Separator className="opacity-60" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8 space-y-4">
        {/* Row 1: text + nav */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-muted-foreground max-w-2xl">
            © {new Date().getFullYear()} Muhammad Usama — Built with Next.js +
            Tailwind + shadcn/ui
          </div>

          <nav className="flex items-center gap-4 text-sm">
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
          </nav>
        </div>

        {/* Row 2: socials (right aligned) */}
        <div className="flex md:justify-end">
          <SocialChips
            compact
            variant="all"
            showTooltipValue
            className="opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>
    </footer>
  );
}

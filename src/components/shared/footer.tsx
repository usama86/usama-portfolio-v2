import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SocialChips } from "@/components/shared/social-chips";
import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={`mt-[var(--section-gap)] pb-10 ${styles.footer}`}>
      <Separator className="opacity-60" />

      <div className="mx-auto max-w-[1248px] px-5 sm:px-8 lg:px-12 pt-8 space-y-4">
        {/* Row 1: text + nav */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-muted-foreground max-w-2xl">
            © {new Date().getFullYear()} Muhammad Usama — Built with Next.js +
            Tailwind + shadcn/ui
          </div>

          <nav className="flex items-center gap-4 text-sm">
            <Link
              className={`text-muted-foreground hover:text-foreground transition-colors ${styles.footerLink}`}
              href="/#projects"
            >
              Projects
            </Link>
            <Link
              className={`text-muted-foreground hover:text-foreground transition-colors ${styles.footerLink}`}
              href="/#contact"
            >
              Contact
            </Link>
            <a
              className={`text-muted-foreground hover:text-foreground transition-colors ${styles.footerLink}`}
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
            className={`opacity-90 hover:opacity-100 transition-opacity ${styles.socials}`}
          />
        </div>
      </div>
    </footer>
  );
}

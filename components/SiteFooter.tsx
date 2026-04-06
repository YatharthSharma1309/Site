import { site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-border-subtle border-t py-12">
      <div className="text-text-muted mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-5 text-xs sm:flex-row sm:px-8">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} {site.name}. Built with Next.js.
        </p>
        <div className="flex flex-col items-center gap-3 sm:items-end">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent font-medium transition-colors"
            >
              GitHub
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent font-medium transition-colors"
            >
              LinkedIn
            </a>
          </div>
          <p className="text-text-muted/75 text-center font-mono tracking-wide sm:text-right">
            Enterprise clarity · Edgy execution
          </p>
        </div>
      </div>
    </footer>
  );
}

import { Reveal } from "@/components/Reveal";
import { SectionIntro } from "@/components/SectionIntro";
import { site } from "@/lib/content";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="border-border-subtle relative overflow-hidden border-t py-28 sm:py-36"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 50% 100%, rgba(62,232,200,0.12), transparent 62%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionIntro
          eyebrow="Contact"
          title="Let's build something deliberate"
          description="Open to front-end and UI engineering roles, collaborations where craft matters, and teams that appreciate a UI engineer who can speak the same language as backend and data folks."
        />
        <Reveal delay={0.08}>
          <div className="mt-12 flex flex-col flex-wrap gap-4 sm:flex-row sm:items-center">
            <a
              href={`mailto:${site.email}`}
              className="bg-accent text-bg-deep focus-visible:ring-accent/50 w-fit rounded-xl px-8 py-4 text-center text-sm font-bold tracking-wide shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset] transition-[box-shadow,transform] hover:shadow-[0_0_32px_var(--glow)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-deep)] active:scale-[0.98]"
            >
              {site.email}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border-highlight text-text-primary hover:border-accent/45 hover:text-accent w-fit rounded-xl border bg-[var(--bg-card)] px-8 py-4 text-center text-sm font-semibold backdrop-blur-sm transition-colors"
            >
              Connect on LinkedIn
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border-highlight text-text-primary hover:border-accent/45 hover:text-accent w-fit rounded-xl border bg-[var(--bg-card)] px-8 py-4 text-center text-sm font-semibold backdrop-blur-sm transition-colors"
            >
              GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

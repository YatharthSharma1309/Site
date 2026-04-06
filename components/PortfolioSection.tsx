"use client";

import { Reveal } from "@/components/Reveal";
import { SectionIntro } from "@/components/SectionIntro";
import { portfolioLinks } from "@/lib/content";

export function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="border-border-subtle border-t py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionIntro
          eyebrow="Portfolio"
          title="Work samples — staging next"
          description="Curated case studies and builds will land here. Links below are wired for future updates; add your real repos and case study URLs when ready."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {portfolioLinks.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={
                  item.href === "#" || item.status === "Coming soon"
                    ? (e) => e.preventDefault()
                    : undefined
                }
                className="surface-card border-border-subtle from-bg-elevated/40 hover:border-accent/30 group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-gradient-to-b to-transparent p-7 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(62,232,200,0.12),0_20px_40px_-20px_rgba(0,0,0,0.5)]"
              >
                <span className="text-accent-warm/95 mb-5 inline-flex w-fit rounded-md bg-[rgba(232,164,58,0.1)] px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] uppercase">
                  {item.status}
                </span>
                <h3 className="font-display text-text-primary text-lg font-bold tracking-tight">
                  {item.title}
                </h3>
                <p className="text-text-muted mt-3 flex-1 text-sm leading-relaxed">
                  {item.description}
                </p>
                <span className="text-accent mt-5 text-sm font-semibold opacity-85 transition-opacity group-hover:opacity-100">
                  {item.status === "Coming soon"
                    ? "Reserved →"
                    : item.status === "Add URL"
                      ? "Configure link →"
                      : item.status === "Profile"
                        ? "View profile →"
                        : "Open →"}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

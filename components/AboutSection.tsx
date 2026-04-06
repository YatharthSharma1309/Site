import { Reveal } from "@/components/Reveal";
import { SectionIntro } from "@/components/SectionIntro";
import { aboutParagraphs, skillGroups } from "@/lib/content";

export function AboutSection() {
  return (
    <section
      id="about"
      className="border-border-subtle border-t py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionIntro
          eyebrow="About"
          title="Precision engineering, human-centered design"
        />
        <div className="mt-14 grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
          <div className="space-y-7">
            {aboutParagraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="text-text-muted text-[1.05rem] leading-[1.75]">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.12}>
            <div className="surface-card border-border-highlight relative overflow-hidden rounded-2xl border p-8 sm:p-9">
              <div
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{
                  background:
                    "radial-gradient(ellipse 90% 70% at 100% 0%, rgba(62,232,200,0.14), transparent 55%)",
                }}
                aria-hidden
              />
              <div className="relative space-y-6">
                <div>
                  <p className="text-text-primary mb-3 text-xs font-semibold tracking-[0.18em] uppercase">
                    Core stack
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {skillGroups.core.map((s) => (
                      <li
                        key={s}
                        className="border-border-subtle bg-bg-deep/55 text-text-muted rounded-lg border px-3 py-2 text-xs font-medium"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-border-subtle border-t pt-6">
                  <p className="text-accent-warm/95 mb-1 text-xs font-semibold tracking-[0.18em] uppercase">
                    Stretching into
                  </p>
                  <p className="text-text-muted mb-3 text-[11px] leading-relaxed">
                    In progress — listed so expectations stay honest, not to
                    imply senior backend scope.
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {skillGroups.deepening.map((s) => (
                      <li
                        key={s}
                        className="border-accent/20 text-text-primary/90 bg-accent/[0.06] rounded-lg border px-3 py-2 text-xs font-medium"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-text-muted border-border-subtle border-t pt-6 text-xs leading-relaxed">
                  Fluent in interface craft and UX principles; the list above
                  is how I keep the narrative aligned with what I actually ship
                  today.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

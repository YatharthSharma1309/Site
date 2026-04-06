import { Reveal } from "@/components/Reveal";
import { SectionIntro } from "@/components/SectionIntro";
import { education, journey } from "@/lib/content";

export function JourneySection() {
  return (
    <section
      id="journey"
      className="border-border-subtle relative border-t py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionIntro
          eyebrow="Career journey"
          title="From analytics to engineering"
          description="A path shaped by data literacy, internship grit, and a move into full-time software engineering — always with the user in frame."
        />

        <div className="relative mt-20 max-w-3xl">
          <div
            className="from-accent/45 via-border-highlight absolute top-3 bottom-3 left-[9px] w-px bg-gradient-to-b to-transparent"
            aria-hidden
          />
          <ol className="space-y-6">
            {journey.map((item, i) => (
              <li key={`${item.org}-${item.period}`} className="relative pl-12">
                <div
                  className={`absolute top-2 left-0 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-[var(--border-highlight)] bg-[var(--bg-deep)] ${item.current ? "shadow-[0_0_14px_var(--glow)]" : ""}`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${item.current ? "bg-accent" : "bg-text-muted/80"}`}
                  />
                </div>
                <Reveal delay={Math.min(i * 0.06, 0.24)}>
                  <div className="surface-card border-border-subtle group rounded-xl border p-6 transition-[border-color,box-shadow] duration-300 hover:border-border-highlight sm:p-7">
                    <p className="text-accent text-[11px] font-semibold tracking-[0.14em] uppercase">
                      {item.period}
                    </p>
                    <h3 className="font-display text-text-primary mt-2.5 text-xl font-bold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-text-primary/95 mt-1 font-medium">
                      {item.org}
                    </p>
                    <p className="text-text-muted mt-0.5 text-sm">{item.location}</p>
                    {item.description ? (
                      <ul className="text-text-muted mt-4 space-y-2.5 text-sm leading-relaxed">
                        {item.description.map((line) => (
                          <li key={line} className="flex gap-3">
                            <span className="from-accent mt-2 h-px w-5 shrink-0 bg-gradient-to-r to-transparent" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal>
          <div className="surface-card border-border-subtle mt-24 rounded-2xl border p-9 sm:p-11">
            <div className="mb-8 flex items-center gap-3">
              <span
                className="from-accent h-px w-10 shrink-0 bg-gradient-to-r to-transparent"
                aria-hidden
              />
              <p className="text-accent text-[11px] font-semibold tracking-[0.22em] uppercase">
                Education
              </p>
            </div>
            <ul className="space-y-8">
              {education.map((e) => (
                <li
                  key={e.school + e.period}
                  className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <div>
                    <p className="text-text-primary font-semibold leading-snug">
                      {e.degree}
                    </p>
                    <p className="text-text-muted mt-1 text-sm">{e.school}</p>
                  </div>
                  <p className="text-text-muted font-mono text-xs tracking-wide sm:text-right">
                    {e.period}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { Reveal } from "@/components/Reveal";
import { SectionIntro } from "@/components/SectionIntro";
import { certifications } from "@/lib/content";

export function CertificationsSection() {
  return (
    <section className="border-border-subtle border-t py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionIntro
          eyebrow="Certifications"
          title="Continuous learning"
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <Reveal key={c} delay={i * 0.04}>
              <li className="surface-card border-border-subtle hover:border-border-highlight group flex items-start gap-3.5 rounded-xl border p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5">
                <span className="bg-accent/15 text-accent mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold">
                  ✓
                </span>
                <span className="text-text-muted group-hover:text-text-primary text-sm leading-snug transition-colors">
                  {c}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { Reveal } from "@/components/Reveal";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionIntro({
  eyebrow,
  title,
  description,
  className = "",
}: Props) {
  return (
    <Reveal className={className}>
      <div className="max-w-3xl">
        <div className="mb-4 flex items-center gap-3">
          <span
            className="from-accent h-px w-10 shrink-0 bg-gradient-to-r to-transparent"
            aria-hidden
          />
          <p className="text-accent text-[11px] font-semibold tracking-[0.22em] uppercase">
            {eyebrow}
          </p>
        </div>
        <h2 className="font-display text-text-primary text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="text-text-muted mt-5 max-w-2xl text-base leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
};

export function SectionHeader({ eyebrow, title, subtitle, right }: Props) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="space-y-3">
        {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
        <h2 className="text-3xl font-medium tracking-[-0.04em] md:text-[2.75rem] md:leading-tight">
          {title}
        </h2>
        {subtitle ? (
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

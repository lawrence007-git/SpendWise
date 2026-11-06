interface Props {
  align?: "left" | "center" | "right";
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: Props) {
  return (
    <div className={className || "mx-auto max-w-2xl text-center"}>
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

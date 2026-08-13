const SIZE_CLASS = {
  sm: "h-8 min-w-8 px-2 text-xs",
  lg: "h-20 min-w-20 px-4 text-2xl",
} as const;

const HOLE_CLASS = {
  sm: "h-2 w-2",
  lg: "h-3.5 w-3.5",
} as const;

export default function KeyTag({
  label,
  size = "sm",
}: {
  label: string;
  size?: keyof typeof SIZE_CLASS;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center gap-1.5 rounded-md border-2 border-marigold bg-background font-mono font-medium text-teratai shadow-[2px_2px_0_var(--color-marigold)] ${SIZE_CLASS[size]}`}
    >
      <span className={`rounded-full border-2 border-marigold ${HOLE_CLASS[size]}`} />
      {label}
    </span>
  );
}

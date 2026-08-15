import T from "./i18n";

/* Colour alone never carries the meaning (the label does), and the text is
   `foreground` rather than the accent — marigold-on-paper measured 2.3:1
   and clay-on-paper 4.1:1, both below AA. The accent stays as border+tint. */
const CLASS = {
  available: "border-teratai bg-teratai/10",
  maintenance: "border-marigold bg-marigold/15",
  occupied: "border-clay bg-clay/15",
} as const;

export type Availability = keyof typeof CLASS;

export default function StatusBadge({ status }: { status: Availability }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap ${CLASS[status]}`}
    >
      <T k={`status.${status}`} />
    </span>
  );
}

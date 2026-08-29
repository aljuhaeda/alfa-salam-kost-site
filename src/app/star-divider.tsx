import Star from "./star";

// Section separator for the long-scroll home and between property groups
// on /rooms — a centred brand mark instead of a plain hairline, the one
// place the public site is a touch warmer than the dashboard.
export default function StarDivider() {
  return (
    <div className="flex items-center gap-4 py-2" aria-hidden="true">
      <span className="h-px flex-1 bg-line" />
      <Star className="h-3.5 w-3.5 text-sage/60" />
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

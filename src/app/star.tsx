// The rub el hizb (8-point star) from the Alfa Salam Kost logo, as an inline
// mark. Decorative — inherits `currentColor`. Two overlapped rounded squares.
// Ported from alfa-salam-kost-dashboard to share one brand identity.
export default function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className} fill="currentColor">
      <rect x="22" y="22" width="56" height="56" rx="5" />
      <rect x="22" y="22" width="56" height="56" rx="5" transform="rotate(45 50 50)" />
    </svg>
  );
}

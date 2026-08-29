import Image from "next/image";
import Star from "./star";

/* The mihrab arch from the Alfa Salam Kost logo, used as a picture frame.
   Every photo on the site sits inside this silhouette; when there is no
   photo yet the same frame shows a branded placeholder. Motif and
   photography are the same object.

   The clip is done with `mask-image` (a data-URI SVG scaled to the box),
   NOT an SVG `clipPath` — a `url(#id)` clip defaults to userSpaceOnUse
   and does not scale, so it would only be correct at one size. A mask
   image scales with `mask-size: 100% 100%`, and needs no unique id, so
   this stays a plain server component. */

const ARCH_D = "M6 158 V64 C6 30 30 4 60 4 C90 4 114 30 114 64 V158 Z";

const ARCH_MASK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 158'%3E%3Cpath d='" +
  ARCH_D +
  "' fill='%23000'/%3E%3C/svg%3E\")";

const maskStyle = {
  maskImage: ARCH_MASK,
  WebkitMaskImage: ARCH_MASK,
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
} as const;

export default function ArchFrame({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  src: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative aspect-[120/158] ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={maskStyle}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            ...maskStyle,
            background: "linear-gradient(150deg, var(--sage), var(--deep))",
          }}
          aria-hidden="true"
        >
          {/* fixed cream — the gradient is always dark enough for it in
              both themes */}
          <Star className="absolute top-1/2 left-1/2 w-1/4 -translate-x-1/2 -translate-y-1/2 text-[#F7F4EF] opacity-80" />
        </div>
      )}
      {/* Outline sits on top; a viewBox SVG scales correctly. */}
      <svg
        viewBox="0 0 120 158"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <path
          d={ARCH_D}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

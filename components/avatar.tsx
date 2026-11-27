"use client";

import { useMediaSrc } from "@/components/use-media-src";

export function Avatar({
  name,
  hueA,
  hueB,
  size = 44,
  src = "",
  className = "",
}: {
  name: string;
  hueA: number;
  hueB: number;
  size?: number;
  src?: string;
  className?: string;
}) {
  const url = useMediaSrc(src);

  if (url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt=""
        className={`shrink-0 rounded-full object-cover ring-1 ring-inset ring-white/25 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`inline-grid shrink-0 place-items-center rounded-full font-display font-semibold text-[#08121f] ring-1 ring-inset ring-white/25 ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.42),
        backgroundImage: `linear-gradient(140deg, oklch(0.9 0.12 ${hueA}), oklch(0.78 0.17 ${hueB}))`,
      }}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

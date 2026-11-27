export function Avatar({
  name,
  hueA,
  hueB,
  size = 44,
  className = "",
}: {
  name: string;
  hueA: number;
  hueB: number;
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-grid shrink-0 place-items-center rounded-full font-display font-semibold text-[#06121c] ring-1 ring-inset ring-white/25 ${className}`}
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

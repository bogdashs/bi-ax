export function ProfileAura({
  hueA,
  hueB,
}: {
  hueA: number;
  hueB: number;
}) {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#070b14]" />
      <div
        className="absolute -inset-[30%] opacity-90"
        style={{
          background: `radial-gradient(38% 34% at 32% 26%, oklch(0.72 0.19 ${hueA} / 0.85), transparent 68%)`,
          animation: "drift 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -inset-[30%] opacity-80"
        style={{
          background: `radial-gradient(34% 30% at 72% 66%, oklch(0.66 0.19 ${hueB} / 0.7), transparent 66%)`,
          animation: "drift-alt 24s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,11,20,0) 28%, rgba(7,11,20,0.5) 70%, rgba(7,11,20,0.92) 100%)",
        }}
      />
    </div>
  );
}

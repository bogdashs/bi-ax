export function ProfileAura({
  hueA,
  hueB,
}: {
  hueA: number;
  hueB: number;
}) {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#0b1220]" />
      <div
        className="absolute -inset-[30%] opacity-90"
        style={{
          background: `radial-gradient(40% 36% at 30% 24%, oklch(0.42 0.1 ${hueA} / 0.85), transparent 70%)`,
          animation: "drift 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -inset-[30%] opacity-80"
        style={{
          background: `radial-gradient(36% 32% at 74% 68%, oklch(0.38 0.09 ${hueB} / 0.8), transparent 68%)`,
          animation: "drift-alt 26s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,18,32,0.15) 0%, rgba(11,18,32,0.35) 60%, rgba(11,18,32,0.85) 100%)",
        }}
      />
    </div>
  );
}

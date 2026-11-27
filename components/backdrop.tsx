export function Backdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(-45deg, #0f172a 0%, #1e293b 42%, #2e415e 78%, #24496b 100%)",
        }}
      />
      <div
        className="absolute -inset-[30%] opacity-80"
        style={{
          background:
            "radial-gradient(38% 34% at 30% 26%, rgba(58, 120, 178, 0.55), transparent 70%)",
          animation: "drift 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -inset-[30%] opacity-70"
        style={{
          background:
            "radial-gradient(34% 30% at 74% 66%, rgba(46, 106, 148, 0.55), transparent 68%)",
          animation: "drift-alt 28s ease-in-out infinite",
        }}
      />
      <div className="stars absolute inset-0" />
    </div>
  );
}

import Link from "next/link";

export function FreeHandle({ handle }: { handle: string }) {
  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden px-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, oklch(0.32 0.09 250 / 0.5), transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-[440px] rounded-[32px] border border-line bg-white/5 p-8 text-center backdrop-blur-2xl">
        <p className="font-mono text-[11px] text-faint">bi.ax/{handle}</p>
        <h1 className="mt-4 font-display text-[38px] font-semibold leading-[0.95] tracking-[-0.03em]">
          still free
        </h1>
        <p className="mt-3 text-[14px] leading-relaxed text-muted">
          nobody has taken this name yet.
        </p>

        <Link
          href={`/register?u=${encodeURIComponent(handle)}`}
          className="shine grad-brand mt-6 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-[14px] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
        >
          claim it
        </Link>

        <Link
          href="/"
          className="mt-3 inline-block text-[12.5px] text-faint transition-colors hover:text-ink"
        >
          back home
        </Link>
      </div>
    </main>
  );
}

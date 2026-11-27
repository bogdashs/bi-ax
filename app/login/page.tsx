import Link from "next/link";

export const metadata = { title: "log in" };

export default function LoginPage() {
  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden px-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 35%, oklch(0.34 0.1 255 / 0.55), transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-[400px] rounded-[32px] border border-white/12 bg-[#080d16]/75 p-7 backdrop-blur-2xl">
        <Link
          href="/"
          className="font-display text-[18px] font-semibold tracking-[-0.02em] text-white/90"
        >
          bi.ax
        </Link>

        <h1 className="mt-8 font-display text-[36px] font-semibold leading-[0.92] tracking-[-0.03em]">
          log in
        </h1>
        <p className="mt-3 text-[14px] leading-relaxed text-white/55">
          real accounts are next. for now there is a demo one, already filled in.
        </p>

        <a
          href="/api/demo-login"
          className="shine grad-brand mt-7 flex items-center justify-center rounded-full px-5 py-3.5 text-[14px] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
        >
          enter demo account
        </a>

        <Link
          href="/"
          className="mt-4 block text-center text-[12.5px] text-white/35 transition-colors hover:text-white/70"
        >
          back home
        </Link>
      </div>
    </main>
  );
}

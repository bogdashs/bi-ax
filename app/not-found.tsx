import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[520px] flex-col justify-center px-6 py-16">
      <p className="font-display text-[18px] font-semibold tracking-[-0.02em] text-white/90">
        bi.ax
      </p>
      <h1 className="mt-10 font-display text-[clamp(2.4rem,7vw,3.4rem)] font-semibold leading-[0.9] tracking-[-0.03em]">
        nobody here
      </h1>
      <p className="mt-4 text-[15px] text-white/60">
        this name is free — maybe take it.
      </p>

      <Link
        href="/"
        className="mt-8 w-fit rounded-full bg-white/10 px-5 py-2.5 text-[13px] font-semibold text-white/85 transition-colors hover:bg-white/15"
      >
        back home
      </Link>
    </main>
  );
}

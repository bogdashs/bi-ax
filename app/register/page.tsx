import Link from "next/link";

export const metadata = { title: "claim your name" };

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ u?: string }>;
}) {
  const { u } = await searchParams;

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[520px] flex-col justify-center px-6 py-16">
      <Link
        href="/"
        className="font-display text-[18px] font-semibold tracking-[-0.02em] text-white/90"
      >
        bi.ax
      </Link>

      <h1 className="mt-10 font-display text-[clamp(2.4rem,7vw,3.4rem)] font-semibold leading-[0.9] tracking-[-0.03em]">
        you&apos;re almost in
      </h1>

      {u ? (
        <p className="mt-4 text-[15px] text-white/60">
          <span className="font-mono text-white">bi.ax/{u}</span> is held for you.
        </p>
      ) : (
        <p className="mt-4 text-[15px] text-white/60">
          pick a name on the home page first.
        </p>
      )}

      <div className="glass mt-8 rounded-[24px] p-6">
        <p className="text-[15px] text-white/75">
          accounts open next — email, password, then your page.
        </p>
      </div>

      <Link
        href="/"
        className="mt-8 w-fit rounded-full bg-white/10 px-5 py-2.5 text-[13px] font-semibold text-white/85 transition-colors hover:bg-white/15"
      >
        back home
      </Link>
    </main>
  );
}

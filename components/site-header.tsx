import Link from "next/link";

const NAV = [
  { href: "/#profiles", label: "profiles" },
  { href: "/#features", label: "features" },
  { href: "/#faq", label: "faq" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-4 z-50 mx-auto w-[min(1180px,calc(100%-2rem))]">
      <div className="glass flex items-center gap-4 rounded-full py-1.5 pl-5 pr-1.5">
        <Link
          href="/"
          className="font-display text-[19px] font-semibold leading-none tracking-[-0.02em]"
        >
          bi.ax
        </Link>

        <nav className="ml-3 hidden items-center gap-0.5 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-[13px] text-muted transition-colors duration-200 hover:bg-ink/4 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Link
            href="/login"
            className="rounded-full px-3.5 py-2 text-[13px] text-muted transition-colors duration-200 hover:text-white"
          >
            log in
          </Link>
          <Link
            href="/login"
            className="shine grad-brand rounded-full px-4 py-2 text-[13px] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
          >
            claim yours
          </Link>
        </div>
      </div>
    </header>
  );
}

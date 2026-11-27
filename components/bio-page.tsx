import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CopyLink } from "@/components/copy-link";
import { LinkIcon } from "@/components/link-icon";
import { ProfileAura } from "@/components/profile-aura";
import type { DemoProfile } from "@/lib/demos";

export function BioPage({ demo }: { demo: DemoProfile }) {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      <ProfileAura hueA={demo.hueA} hueB={demo.hueB} />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-[680px] flex-col px-6 py-5 sm:px-8 sm:py-7">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-[18px] font-semibold tracking-[-0.02em] text-white/90"
          >
            bi.ax
          </Link>
          <CopyLink handle={demo.slug} />
        </header>

        <div className="mt-auto pb-10 pt-32">
          <p className="text-[15px] text-white/60">{demo.role}</p>
          <h1 className="mt-1 font-display text-[clamp(3.6rem,16vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.035em]">
            {demo.name}
          </h1>
          <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-white/75">
            {demo.bio}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {demo.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 text-[13.5px] font-medium text-white/85 transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-white/12"
              >
                <LinkIcon name={link.icon} className="size-4" />
                {link.label}
                <ArrowUpRight
                  className="size-3.5 text-white/40 transition-colors group-hover:text-white/80"
                  strokeWidth={2}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

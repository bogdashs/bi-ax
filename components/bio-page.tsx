import Link from "next/link";
import { ArrowUpRight, Eye, Link2 } from "lucide-react";
import { Avatar } from "@/components/avatar";
import { CopyLink } from "@/components/copy-link";
import { CountUp } from "@/components/count-up";
import { LinkIcon } from "@/components/link-icon";
import { ProfileAura } from "@/components/profile-aura";
import type { DemoProfile } from "@/lib/demos";

export function BioPage({ demo }: { demo: DemoProfile }) {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      <ProfileAura hueA={demo.hueA} hueB={demo.hueB} />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-[1100px] flex-col px-6 py-5 sm:px-8 sm:py-7">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-[18px] font-semibold tracking-[-0.02em] text-white/90"
          >
            bi.ax
          </Link>
          <CopyLink handle={demo.slug} />
        </header>

        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Avatar
              name={demo.name}
              hueA={demo.hueA}
              hueB={demo.hueB}
              size={92}
            />

            <p className="mt-6 text-[15px] text-white/55">{demo.role}</p>
            <h1 className="mt-1 font-display text-[clamp(3.4rem,10.5vw,6.8rem)] font-semibold leading-[0.84] tracking-[-0.035em]">
              {demo.name}
            </h1>
            <p className="mt-2 font-mono text-[12px] text-white/40">
              @{demo.slug}
            </p>

            <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-white/75">
              {demo.bio}
            </p>

            <div className="mt-7 flex items-center gap-5 text-[13px] text-white/55">
              <span className="inline-flex items-center gap-1.5">
                <Eye className="size-4" strokeWidth={1.8} />
                <CountUp to={demo.views} /> views
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Link2 className="size-4" strokeWidth={1.8} />
                {demo.links.length} links
              </span>
            </div>
          </div>

          <ul className="space-y-2.5">
            {demo.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass group flex items-center gap-3.5 rounded-[18px] px-4 py-3.5 transition-[transform,background-color,border-color] duration-300 hover:-translate-y-0.5 hover:bg-white/12"
                >
                  <span className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/8 text-white/85">
                    <LinkIcon name={link.icon} className="size-4" />
                  </span>
                  <span className="text-[15px] font-medium text-white/85">
                    {link.label}
                  </span>
                  <ArrowUpRight
                    className="ml-auto size-4 text-white/35 transition-colors group-hover:text-white/80"
                    strokeWidth={2}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Avatar } from "@/components/avatar";
import { LinkIcon } from "@/components/link-icon";
import { ProfileAura } from "@/components/profile-aura";
import type { DemoProfile } from "@/lib/demos";

export function DemoCard({ demo }: { demo: DemoProfile }) {
  return (
    <Link
      href={`/demo/${demo.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-[28px] border border-white/10 transition-[transform,border-color] duration-500 ease-out hover:-translate-y-2 hover:border-white/25 sm:aspect-[9/14]"
    >
      <ProfileAura hueA={demo.hueA} hueB={demo.hueB} />

      <div className="relative flex h-full flex-col p-5">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-white/12 px-3 py-1 font-mono text-[11px] text-white/75 backdrop-blur-md">
            @{demo.slug}
          </span>
          <span className="grid size-8 place-items-center rounded-full bg-white/10 text-white/80 backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <ArrowUpRight className="size-4" strokeWidth={2} />
          </span>
        </div>

        <div className="mt-auto">
          <Avatar
            name={demo.name}
            hueA={demo.hueA}
            hueB={demo.hueB}
            size={38}
          />
          <p className="mt-3 text-[12px] text-white/60">{demo.role}</p>
          <p className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-[0.95] tracking-[-0.02em]">
            {demo.name}
          </p>

          <div className="mt-4 flex gap-1.5">
            {demo.links.map((link) => (
              <span
                key={link.label}
                className="grid size-8 place-items-center rounded-full border border-white/12 bg-white/8 text-white/80 backdrop-blur-md"
              >
                <LinkIcon name={link.icon} className="size-3.5" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

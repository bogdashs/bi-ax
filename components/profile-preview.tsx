import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { LinkIcon } from "@/components/link-icon";
import { ProfileAura } from "@/components/profile-aura";
import type { DemoProfile } from "@/lib/demos";

export function ProfilePreview({ demo }: { demo: DemoProfile }) {
  return (
    <div className="relative aspect-[9/16] w-[clamp(240px,26vw,310px)] overflow-hidden rounded-[34px] border border-white/15 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9)]">
      <ProfileAura hueA={demo.hueA} hueB={demo.hueB} />

      <div className="relative flex h-full flex-col p-5">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-white/12 px-3 py-1 font-mono text-[11px] text-white/80 backdrop-blur-md">
            bi.ax/{demo.slug}
          </span>
          <span className="size-2 rounded-full bg-lime shadow-[0_0_12px_2px_rgba(198,255,77,0.6)]" />
        </div>

        <div className="mt-auto">
          <Avatar
            name={demo.name}
            hueA={demo.hueA}
            hueB={demo.hueB}
            size={52}
            className="mb-4"
          />
          <p className="text-[13px] text-white/60">{demo.role}</p>
          <h3 className="font-display text-[clamp(2rem,3.4vw,2.6rem)] font-semibold leading-[0.9] tracking-[-0.02em]">
            {demo.name}
          </h3>
          <p className="mt-2 text-[12.5px] leading-snug text-white/70">
            {demo.bio}
          </p>

          <div className="mt-5 flex gap-2">
            {demo.links.map((link) => (
              <span
                key={link.label}
                className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white/90 backdrop-blur-md"
              >
                <LinkIcon name={link.icon} className="size-4" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfileMiniCard({ demo }: { demo: DemoProfile }) {
  return (
    <Link
      href={`/demo/${demo.slug}`}
      className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4 transition-transform duration-300 hover:-translate-y-0.5"
    >
      <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-accent to-cyan font-display text-[11px] font-semibold text-[#071018]">
        {demo.name.charAt(0)}
      </span>
      <span className="font-mono text-[11px] text-white/75">@{demo.slug}</span>
    </Link>
  );
}

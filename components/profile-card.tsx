"use client";

import { useRef } from "react";
import { Eye, Link2 } from "lucide-react";
import { Avatar } from "@/components/avatar";
import { LinkIcon } from "@/components/link-icon";
import { Player } from "@/components/player";
import { formatViews, type BiaProfile } from "@/lib/profile";

export function ProfileCard({
  profile,
  className = "",
}: {
  profile: BiaProfile;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(event: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    el.style.transform = `perspective(1000px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) scale3d(1.01,1.01,1.01)`;
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`relative w-full overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.65)] backdrop-blur-2xl transition-transform duration-300 ease-out sm:p-7 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 size-80 rounded-full opacity-70"
        style={{
          background: `radial-gradient(circle, oklch(0.55 0.12 ${profile.hueA} / 0.55), transparent 70%)`,
        }}
      />

      <div className="relative">
        <div className="flex items-start gap-4">
          <Avatar
            name={profile.name}
            hueA={profile.hueA}
            hueB={profile.hueB}
            size={62}
          />

          <div className="min-w-0 flex-1">
            <h1 className="truncate font-display text-[26px] font-semibold leading-none tracking-[-0.02em]">
              {profile.name}
            </h1>
            <p className="mt-1.5 truncate text-[13px] text-muted">
              {profile.role}
            </p>
          </div>

          <span className="hidden shrink-0 rounded-full border border-line bg-ink/5 px-3 py-1 font-mono text-[10.5px] text-faint sm:inline">
            @{profile.handle}
          </span>
        </div>

        <p className="mt-4 text-[14px] leading-relaxed text-ink/80">
          {profile.bio}
        </p>

        <div className="mt-5">
          <Player
            title={profile.trackTitle}
            src={profile.trackUrl}
            hueA={profile.hueA}
            hueB={profile.hueB}
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {profile.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-ink/5 px-3.5 py-2 text-[12.5px] font-medium text-ink transition-[transform,background-color,border-color] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:bg-ink/10"
            >
              <LinkIcon name={link.icon} className="size-3.5" />
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4 text-[11px] text-faint">
          <span className="inline-flex items-center gap-1.5">
            <Eye className="size-3.5" strokeWidth={1.8} />
            {formatViews(profile.views)} views
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Link2 className="size-3.5" strokeWidth={1.8} />
            {profile.links.length} links
          </span>
          <span className="font-mono">bi.ax/{profile.handle}</span>
        </div>
      </div>
    </div>
  );
}

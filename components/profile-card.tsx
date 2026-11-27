"use client";

import { useRef } from "react";
import { ArrowUpRight, Eye, Link2 } from "lucide-react";
import { Avatar } from "@/components/avatar";
import { LinkIcon } from "@/components/link-icon";
import { Player } from "@/components/player";
import { formatViews, type BiaProfile } from "@/lib/profile";

function Stats({ profile, className = "" }: { profile: BiaProfile; className?: string }) {
  return (
    <div
      className={`flex items-center justify-between gap-3 text-[11px] text-faint ${className}`}
    >
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
  );
}

function Header({
  profile,
  size = 62,
}: {
  profile: BiaProfile;
  size?: number;
}) {
  return (
    <div className="flex items-start gap-4">
      <Avatar
        name={profile.name}
        hueA={profile.hueA}
        hueB={profile.hueB}
        size={size}
        src={profile.avatar}
      />
      <div className="min-w-0 flex-1">
        <h1 className="truncate font-display text-[26px] font-semibold leading-none tracking-[-0.02em]">
          {profile.name}
        </h1>
        <p className="mt-1.5 truncate text-[13px] text-muted">{profile.role}</p>
      </div>
      <span className="hidden shrink-0 rounded-full border border-line bg-ink/5 px-3 py-1 font-mono text-[10.5px] text-faint sm:inline">
        @{profile.handle}
      </span>
    </div>
  );
}

function Pills({ profile }: { profile: BiaProfile }) {
  return (
    <div className="flex flex-wrap gap-2">
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
  );
}

function Rows({ profile }: { profile: BiaProfile }) {
  return (
    <div className="space-y-2">
      {profile.links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-[16px] border border-line bg-ink/5 px-4 py-3 transition-[background-color,border-color] duration-300 hover:border-line-strong hover:bg-ink/10"
        >
          <span className="grid size-9 place-items-center rounded-full border border-line text-ink/80">
            <LinkIcon name={link.icon} className="size-4" />
          </span>
          <span className="text-[13.5px] font-medium text-ink">
            {link.label}
          </span>
          <ArrowUpRight
            className="ml-auto size-4 text-faint transition-colors group-hover:text-ink"
            strokeWidth={2}
          />
        </a>
      ))}
    </div>
  );
}

export function ProfileCard({
  profile,
  className = "",
}: {
  profile: BiaProfile;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const strength = profile.tilt
    ? Math.min(14, Math.max(0, profile.tiltStrength))
    : 0;

  function onMove(event: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || !strength || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    el.style.transform = `perspective(1000px) rotateX(${(-y * strength).toFixed(2)}deg) rotateY(${(x * strength).toFixed(2)}deg) scale3d(1.015,1.015,1.015)`;
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`relative w-full overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.65)] backdrop-blur-2xl transition-transform duration-300 ease-out ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 size-80 rounded-full opacity-70"
        style={{
          background: `radial-gradient(circle, oklch(0.55 0.12 ${profile.hueA} / 0.55), transparent 70%)`,
        }}
      />

      <div className="relative">
        {profile.layout === "classic" && (
          <div className="p-5 sm:p-7">
            <Header profile={profile} />

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

            <div className="mt-5">
              <Pills profile={profile} />
            </div>

            <Stats className="mt-5 border-t border-line pt-4" profile={profile} />
          </div>
        )}

        {profile.layout === "compact" && (
          <div className="p-4 sm:p-5">
            <Header profile={profile} size={44} />

            <p className="mt-3 text-[13px] leading-relaxed text-ink/70">
              {profile.bio}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {profile.links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="grid size-10 place-items-center rounded-full border border-line bg-ink/5 text-ink/80 transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-ink/10"
                >
                  <LinkIcon name={link.icon} className="size-4" />
                </a>
              ))}
            </div>

            <Stats className="mt-4 border-t border-line pt-3" profile={profile} />
          </div>
        )}

        {profile.layout === "showcase" && (
          <div className="p-5 text-center sm:p-7">
            <div className="flex flex-col items-center">
              <Avatar
                name={profile.name}
                hueA={profile.hueA}
                hueB={profile.hueB}
                size={92}
                src={profile.avatar}
              />
              <h1 className="mt-4 font-display text-[30px] font-semibold leading-none tracking-[-0.02em]">
                {profile.name}
              </h1>
              <p className="mt-2 text-[13px] text-muted">{profile.role}</p>
              <p className="mt-3 max-w-[38ch] text-[13.5px] leading-relaxed text-ink/75">
                {profile.bio}
              </p>
            </div>

            <div className="mt-5 text-left">
              <Player
                title={profile.trackTitle}
                src={profile.trackUrl}
                hueA={profile.hueA}
                hueB={profile.hueB}
              />
            </div>

            <div className="mt-5 text-left">
              <Rows profile={profile} />
            </div>

            <Stats className="mt-5 border-t border-line pt-4" profile={profile} />
          </div>
        )}

        {profile.layout === "projects" && (
          <div className="p-5 sm:p-7">
            <Header profile={profile} size={54} />

            <p className="mt-4 text-[14px] leading-relaxed text-ink/80">
              {profile.bio}
            </p>

            <div className="mt-5 space-y-2.5">
              {profile.links.map((link, index) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-[18px] border border-line bg-ink/5 p-4 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:bg-ink/10"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-[14px] border border-line bg-white/5 text-ink/85">
                    <LinkIcon name={link.icon} className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-semibold text-ink">
                      {link.label}
                    </span>
                    <span className="block truncate font-mono text-[11px] text-faint">
                      {link.url.replace(/^https?:\/\//, "")}
                    </span>
                  </span>
                  <span className="font-mono text-[11px] text-faint">
                    0{index + 1}
                  </span>
                  <ArrowUpRight
                    className="size-4 text-faint transition-colors group-hover:text-ink"
                    strokeWidth={2}
                  />
                </a>
              ))}
            </div>

            <Stats className="mt-5 border-t border-line pt-4" profile={profile} />
          </div>
        )}
      </div>
    </div>
  );
}

import Link from "next/link";
import { CopyLink } from "@/components/copy-link";
import { CursorGlow } from "@/components/cursor-glow";
import { ProfileAura } from "@/components/profile-aura";
import { ProfileCard } from "@/components/profile-card";
import { DEMOS } from "@/lib/demos";
import type { BiaProfile } from "@/lib/profile";

export function ProfileStage({ profile }: { profile: BiaProfile }) {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      {profile.video ? (
        <div className="absolute inset-0 overflow-hidden">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={profile.video}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-[#070b14]/25" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(7,11,20,0.15) 0%, rgba(7,11,20,0.35) 55%, rgba(7,11,20,0.7) 100%)",
            }}
          />
        </div>
      ) : (
        <ProfileAura hueA={profile.hueA} hueB={profile.hueB} />
      )}

      <CursorGlow />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-[1100px] flex-col px-5 py-5 sm:px-8 sm:py-7">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-[18px] font-semibold tracking-[-0.02em] text-white/90"
          >
            bi.ax
          </Link>
          <CopyLink handle={profile.handle} />
        </header>

        <div className="flex flex-1 flex-col items-center justify-center gap-5 py-10">
          <ProfileCard profile={profile} className="max-w-[600px]" />

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[12px] text-white/30">more pages</span>
            {DEMOS.filter((demo) => demo.slug !== profile.handle)
              .slice(0, 4)
              .map((demo) => (
                <Link
                  key={demo.slug}
                  href={`/${demo.slug}`}
                  className="glass rounded-full px-3 py-1.5 font-mono text-[11px] text-white/55 transition-colors duration-200 hover:text-white"
                >
                  @{demo.slug}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}

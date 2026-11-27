import Link from "next/link";
import { CopyLink } from "@/components/copy-link";
import { CursorFx } from "@/components/cursor-fx";
import { ProfileBackground } from "@/components/profile-background";
import { ProfileCard } from "@/components/profile-card";
import { DEMOS } from "@/lib/demos";
import type { BiaProfile } from "@/lib/profile";

export function ProfileStage({ profile }: { profile: BiaProfile }) {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      <ProfileBackground profile={profile} />

      <CursorFx mode={profile.cursor} />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-[1100px] flex-col px-5 py-5 sm:px-8 sm:py-7">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-[18px] font-semibold tracking-[-0.02em] text-ink/90"
          >
            bi.ax
          </Link>
          <CopyLink handle={profile.handle} />
        </header>

        <div className="flex flex-1 flex-col items-center justify-center gap-5 py-10">
          <ProfileCard profile={profile} className="max-w-[600px]" />

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[12px] text-faint">more pages</span>
            {DEMOS.filter((demo) => demo.slug !== profile.handle)
              .slice(0, 4)
              .map((demo) => (
                <Link
                  key={demo.slug}
                  href={`/${demo.slug}`}
                  className="glass rounded-full px-3 py-1.5 font-mono text-[11px] text-ink/70 transition-colors duration-200 hover:text-ink"
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

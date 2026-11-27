"use client";

import { useEffect, useState } from "react";
import { FreeHandle } from "@/components/free-handle";
import { ProfileStage } from "@/components/profile-stage";
import { getDemo } from "@/lib/demos";
import { STORAGE_KEY, toBiaProfile, type BiaProfile } from "@/lib/profile";

export function PublicProfile({ handle }: { handle: string }) {
  const [saved, setSaved] = useState<BiaProfile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSaved(JSON.parse(raw) as BiaProfile);
    } catch {
      setSaved(null);
    }
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <main className="grid min-h-dvh place-items-center">
        <span className="size-8 animate-spin rounded-full border-2 border-white/15 border-t-white/70" />
      </main>
    );
  }

  if (saved && saved.handle === handle) {
    return <ProfileStage profile={saved} />;
  }

  const demo = getDemo(handle);
  if (demo) {
    return <ProfileStage profile={toBiaProfile(demo)} />;
  }

  return <FreeHandle handle={handle} />;
}

"use client";

import { ProfileAura } from "@/components/profile-aura";
import { useMediaSrc } from "@/components/use-media-src";
import type { BiaProfile } from "@/lib/profile";

export function ProfileBackground({ profile }: { profile: BiaProfile }) {
  const src = useMediaSrc(profile.background);

  if (!src) {
    return <ProfileAura hueA={profile.hueA} hueB={profile.hueB} />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {profile.mediaType === "video" ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          alt=""
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,14,26,0.3) 0%, rgba(8,14,26,0.45) 55%, rgba(8,14,26,0.92) 100%)",
        }}
      />
    </div>
  );
}

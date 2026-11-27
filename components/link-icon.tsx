import {
  siBehance,
  siBoosty,
  siDiscord,
  siGithub,
  siNpm,
  siPatreon,
  siSoundcloud,
  siSpotify,
  siTelegram,
  siTiktok,
  siTwitch,
  siVk,
  siX,
  siYoutube,
  type SimpleIcon,
} from "simple-icons";
import { Camera, Code2, Globe, Mail, Palette, type LucideIcon } from "lucide-react";
import type { IconName } from "@/lib/demos";

const BRANDS: Partial<Record<IconName, SimpleIcon>> = {
  tiktok: siTiktok,
  youtube: siYoutube,
  twitch: siTwitch,
  x: siX,
  discord: siDiscord,
  spotify: siSpotify,
  soundcloud: siSoundcloud,
  telegram: siTelegram,
  github: siGithub,
  npm: siNpm,
  behance: siBehance,
  vk: siVk,
  boosty: siBoosty,
  patreon: siPatreon,
};

const LINE: Partial<Record<IconName, LucideIcon>> = {
  camera: Camera,
  palette: Palette,
  code: Code2,
  globe: Globe,
  mail: Mail,
};

export function LinkIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const brand = BRANDS[name];
  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={className}
      >
        <path d={brand.path} />
      </svg>
    );
  }

  const Icon = LINE[name] ?? Globe;
  return <Icon className={className} aria-hidden="true" strokeWidth={1.8} />;
}

import type { DemoProfile, IconName } from "@/lib/demos";

export type ProfileLink = {
  id: string;
  label: string;
  url: string;
  icon: IconName;
};

export type BiaProfile = {
  handle: string;
  name: string;
  role: string;
  bio: string;
  hueA: number;
  hueB: number;
  video: string;
  trackTitle: string;
  trackUrl: string;
  views: number;
  links: ProfileLink[];
};

export const STORAGE_KEY = "biax:profile:v1";
export const VIDEO_PRESET = "/media/bg-night.mp4";
export const TRACK_PRESET = "/media/demo-track.mp3";

export const PALETTES = [
  { name: "ice", hueA: 195, hueB: 255 },
  { name: "lime", hueA: 120, hueB: 170 },
  { name: "sunset", hueA: 25, hueB: 60 },
  { name: "ocean", hueA: 205, hueB: 265 },
  { name: "mint", hueA: 85, hueB: 160 },
  { name: "rose", hueA: 350, hueB: 20 },
];

export const ICON_OPTIONS: IconName[] = [
  "tiktok",
  "youtube",
  "twitch",
  "x",
  "discord",
  "spotify",
  "soundcloud",
  "telegram",
  "github",
  "npm",
  "behance",
  "vk",
  "boosty",
  "patreon",
  "globe",
  "mail",
];

export const DEFAULT_PROFILE: BiaProfile = {
  handle: "mila",
  name: "MILA",
  role: "photographer",
  bio: "shooting film, moody light and strangers",
  hueA: 195,
  hueB: 255,
  video: VIDEO_PRESET,
  trackTitle: "night drive — demo loop",
  trackUrl: TRACK_PRESET,
  views: 12400,
  links: [
    { id: "l1", label: "tiktok", url: "https://tiktok.com", icon: "tiktok" },
    { id: "l2", label: "youtube", url: "https://youtube.com", icon: "youtube" },
    { id: "l3", label: "telegram", url: "https://t.me", icon: "telegram" },
    { id: "l4", label: "behance", url: "https://behance.net", icon: "behance" },
  ],
};

export function toBiaProfile(demo: DemoProfile): BiaProfile {
  return {
    handle: demo.slug,
    name: demo.name,
    role: demo.role,
    bio: demo.bio,
    hueA: demo.hueA,
    hueB: demo.hueB,
    video: demo.slug === "mila" ? VIDEO_PRESET : "",
    trackTitle: demo.slug === "mila" ? "night drive — demo loop" : "",
    trackUrl: demo.slug === "mila" ? TRACK_PRESET : "",
    views: demo.views,
    links: demo.links.map((link, index) => ({
      id: `${demo.slug}-${index}`,
      label: link.label,
      url: link.href,
      icon: link.icon,
    })),
  };
}

export function formatViews(views: number): string {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`;
  return String(views);
}

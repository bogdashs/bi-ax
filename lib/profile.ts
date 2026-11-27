import type { DemoProfile, IconName } from "@/lib/demos";

export type ProfileLink = {
  id: string;
  label: string;
  url: string;
  icon: IconName;
};

export type CursorMode = "glow" | "ring" | "spotlight" | "none";
export type CardLayout = "classic" | "compact" | "showcase" | "projects";

export type BiaProfile = {
  handle: string;
  name: string;
  role: string;
  bio: string;
  hueA: number;
  hueB: number;
  /** "", http url or idb:<key> */
  background: string;
  mediaType: "video" | "image" | "";
  /** "", http url or idb:<key> */
  avatar: string;
  trackTitle: string;
  trackUrl: string;
  views: number;
  links: ProfileLink[];
  layout: CardLayout;
  cursor: CursorMode;
  tilt: boolean;
  tiltStrength: number;
};

export const STORAGE_KEY = "biax:profile:v1";
export const VIDEO_PRESET = "/media/bg-night.mp4";
export const TRACK_PRESET = "/media/demo-track.mp3";
export const MAX_UPLOAD_MB = 15;

export const PALETTES = [
  { name: "ice", hueA: 195, hueB: 255 },
  { name: "sky", hueA: 210, hueB: 190 },
  { name: "ocean", hueA: 205, hueB: 265 },
  { name: "night", hueA: 230, hueB: 260 },
  { name: "aqua", hueA: 175, hueB: 200 },
  { name: "mint", hueA: 85, hueB: 160 },
  { name: "lime", hueA: 120, hueB: 170 },
  { name: "forest", hueA: 140, hueB: 175 },
  { name: "gold", hueA: 45, hueB: 75 },
  { name: "sunset", hueA: 25, hueB: 60 },
  { name: "wine", hueA: 345, hueB: 10 },
  { name: "rose", hueA: 350, hueB: 20 },
];

export const LAYOUTS: { id: CardLayout; name: string; hint: string }[] = [
  { id: "classic", name: "classic", hint: "avatar, bio, player, links" },
  { id: "compact", name: "compact", hint: "just the essentials" },
  { id: "showcase", name: "showcase", hint: "big avatar, row links" },
  { id: "projects", name: "projects", hint: "blocks instead of pills" },
];

export const CURSORS: { id: CursorMode; name: string; hint: string }[] = [
  { id: "glow", name: "glow", hint: "soft light follows you" },
  { id: "ring", name: "ring", hint: "two rings with lag" },
  { id: "spotlight", name: "spotlight", hint: "big bright halo" },
  { id: "none", name: "none", hint: "no cursor effect" },
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
  handle: "you",
  name: "YOUR NAME",
  role: "creator",
  bio: "one link for everything you do",
  hueA: 195,
  hueB: 255,
  background: VIDEO_PRESET,
  mediaType: "video",
  avatar: "",
  trackTitle: "night drive — demo loop",
  trackUrl: TRACK_PRESET,
  views: 12400,
  links: [
    { id: "l1", label: "tiktok", url: "https://tiktok.com", icon: "tiktok" },
    { id: "l2", label: "youtube", url: "https://youtube.com", icon: "youtube" },
    { id: "l3", label: "telegram", url: "https://t.me", icon: "telegram" },
    { id: "l4", label: "behance", url: "https://behance.net", icon: "behance" },
  ],
  layout: "classic",
  cursor: "glow",
  tilt: true,
  tiltStrength: 9,
};

export function toBiaProfile(demo: DemoProfile): BiaProfile {
  return {
    ...DEFAULT_PROFILE,
    handle: demo.slug,
    name: demo.name,
    role: demo.role,
    bio: demo.bio,
    hueA: demo.hueA,
    hueB: demo.hueB,
    background: demo.slug === "mila" ? VIDEO_PRESET : "",
    mediaType: demo.slug === "mila" ? "video" : "",
    trackTitle: demo.slug === "mila" ? DEFAULT_PROFILE.trackTitle : "",
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

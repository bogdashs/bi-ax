export type IconName =
  | "tiktok"
  | "youtube"
  | "twitch"
  | "x"
  | "discord"
  | "spotify"
  | "soundcloud"
  | "telegram"
  | "github"
  | "npm"
  | "behance"
  | "vk"
  | "boosty"
  | "patreon"
  | "camera"
  | "palette"
  | "code"
  | "globe"
  | "mail";

export type DemoLink = {
  label: string;
  href: string;
  icon: IconName;
};

export type DemoProfile = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  /** oklch hues for the animated backdrop */
  hueA: number;
  hueB: number;
  views: number;
  links: DemoLink[];
};

export const DEMOS: DemoProfile[] = [
  {
    slug: "mila",
    name: "MILA",
    role: "photographer",
    bio: "shooting film, moody light and strangers",
    hueA: 195,
    hueB: 255,
    views: 12400,
    links: [
      { label: "tiktok", href: "https://tiktok.com", icon: "tiktok" },
      { label: "youtube", href: "https://youtube.com", icon: "youtube" },
      { label: "telegram", href: "https://t.me", icon: "telegram" },
      { label: "behance", href: "https://behance.net", icon: "behance" },
    ],
  },
  {
    slug: "kai",
    name: "KAI",
    role: "producer",
    bio: "making beats at 3am, sleeping at 5",
    hueA: 120,
    hueB: 170,
    views: 8300,
    links: [
      { label: "spotify", href: "https://spotify.com", icon: "spotify" },
      { label: "soundcloud", href: "https://soundcloud.com", icon: "soundcloud" },
      { label: "tiktok", href: "https://tiktok.com", icon: "tiktok" },
      { label: "telegram", href: "https://t.me", icon: "telegram" },
    ],
  },
  {
    slug: "nova",
    name: "NOVA",
    role: "streamer",
    bio: "variety streams, bad aim, good vibes",
    hueA: 25,
    hueB: 60,
    views: 21700,
    links: [
      { label: "twitch", href: "https://twitch.tv", icon: "twitch" },
      { label: "youtube", href: "https://youtube.com", icon: "youtube" },
      { label: "discord", href: "https://discord.com", icon: "discord" },
      { label: "tiktok", href: "https://tiktok.com", icon: "tiktok" },
    ],
  },
  {
    slug: "rio",
    name: "RIO",
    role: "frontend dev",
    bio: "shipping interfaces and sometimes writing about it",
    hueA: 205,
    hueB: 265,
    views: 4100,
    links: [
      { label: "github", href: "https://github.com", icon: "github" },
      { label: "x", href: "https://x.com", icon: "x" },
      { label: "telegram", href: "https://t.me", icon: "telegram" },
      { label: "npm", href: "https://npmjs.com", icon: "npm" },
    ],
  },
  {
    slug: "juno",
    name: "JUNO",
    role: "illustrator",
    bio: "drawing soft things and weird little creatures",
    hueA: 85,
    hueB: 160,
    views: 9600,
    links: [
      { label: "tiktok", href: "https://tiktok.com", icon: "tiktok" },
      { label: "youtube", href: "https://youtube.com", icon: "youtube" },
      { label: "discord", href: "https://discord.com", icon: "discord" },
      { label: "patreon", href: "https://patreon.com", icon: "patreon" },
    ],
  },
];

export function getDemo(slug: string): DemoProfile | undefined {
  return DEMOS.find((demo) => demo.slug === slug);
}

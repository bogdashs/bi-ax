"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  CircleDashed,
  ExternalLink,
  Plus,
  Sparkles,
  Sun,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { Avatar } from "@/components/avatar";
import { CursorFx } from "@/components/cursor-fx";
import { ProfileBackground } from "@/components/profile-background";
import { ProfileCard } from "@/components/profile-card";
import type { IconName } from "@/lib/demos";
import {
  checkFileSize,
  deleteMedia,
  guessMediaType,
  isUploaded,
  putMedia,
} from "@/lib/media";
import {
  CURSORS,
  DEFAULT_PROFILE,
  ICON_OPTIONS,
  LAYOUTS,
  MAX_UPLOAD_MB,
  PALETTES,
  STORAGE_KEY,
  TRACK_PRESET,
  VIDEO_PRESET,
  type BiaProfile,
  type CardLayout,
  type CursorMode,
  type ProfileLink,
} from "@/lib/profile";

const TABS = [
  { id: "basics", label: "basics" },
  { id: "colors", label: "colors" },
  { id: "background", label: "background" },
  { id: "player", label: "player" },
  { id: "links", label: "links" },
  { id: "card", label: "card" },
] as const;

type Tab = (typeof TABS)[number]["id"];

const inputClass =
  "w-full rounded-[12px] border border-line bg-white/5 px-3.5 py-2.5 text-[14px] text-ink outline-none transition-colors duration-200 placeholder:text-faint focus:border-accent/50 focus:bg-white/10";

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[12px] text-muted">{label}</span>
      {children}
    </label>
  );
}

function LayoutPreview({ id }: { id: CardLayout }) {
  return (
    <div className="flex h-16 w-full items-center gap-1.5 rounded-[10px] border border-line bg-[#0b1220]/60 p-2">
      {id === "classic" && (
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <span className="size-4 rounded-full bg-accent/50" />
            <span className="h-1 w-10 rounded-full bg-ink/30" />
          </div>
          <span className="h-1 w-full rounded-full bg-ink/15" />
          <span className="h-1 w-3/4 rounded-full bg-ink/15" />
          <div className="flex gap-1">
            <span className="h-2 w-6 rounded-full bg-ink/20" />
            <span className="h-2 w-6 rounded-full bg-ink/20" />
          </div>
        </div>
      )}
      {id === "compact" && (
        <div className="flex w-full flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-accent/50" />
            <span className="h-1 w-8 rounded-full bg-ink/30" />
          </div>
          <div className="flex gap-1">
            <span className="size-3 rounded-full bg-ink/20" />
            <span className="size-3 rounded-full bg-ink/20" />
            <span className="size-3 rounded-full bg-ink/20" />
            <span className="size-3 rounded-full bg-ink/20" />
          </div>
        </div>
      )}
      {id === "showcase" && (
        <div className="flex w-full flex-col items-center gap-1">
          <span className="size-6 rounded-full bg-accent/50" />
          <span className="h-1 w-10 rounded-full bg-ink/30" />
          <span className="h-1 w-14 rounded-full bg-ink/15" />
          <span className="h-2 w-full rounded-full bg-ink/10" />
        </div>
      )}
      {id === "projects" && (
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-accent/50" />
            <span className="h-1 w-8 rounded-full bg-ink/30" />
          </div>
          <span className="h-3 w-full rounded-[3px] bg-ink/15" />
          <span className="h-3 w-full rounded-[3px] bg-ink/15" />
        </div>
      )}
    </div>
  );
}

const CURSOR_ICONS: Record<CursorMode, typeof Sparkles> = {
  glow: Sparkles,
  ring: CircleDashed,
  spotlight: Sun,
  none: X,
};

export function Editor() {
  const [profile, setProfile] = useState<BiaProfile>(DEFAULT_PROFILE);
  const [tab, setTab] = useState<Tab>("basics");
  const [saved, setSaved] = useState(false);
  const [mediaError, setMediaError] = useState("");
  const backgroundInput = useRef<HTMLInputElement>(null);
  const avatarInput = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setProfile({ ...DEFAULT_PROFILE, ...JSON.parse(raw) });
    } catch {
      /* keep defaults */
    }
  }, []);

  function patch<K extends keyof BiaProfile>(key: K, value: BiaProfile[K]) {
    setProfile((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function patchLink(id: string, changes: Partial<ProfileLink>) {
    setProfile((current) => ({
      ...current,
      links: current.links.map((link) =>
        link.id === id ? { ...link, ...changes } : link,
      ),
    }));
    setSaved(false);
  }

  function addLink() {
    setProfile((current) => ({
      ...current,
      links: [
        ...current.links,
        {
          id: `l${Date.now()}`,
          label: "link",
          url: "https://",
          icon: "globe" as IconName,
        },
      ],
    }));
    setSaved(false);
  }

  function removeLink(id: string) {
    setProfile((current) => ({
      ...current,
      links: current.links.filter((link) => link.id !== id),
    }));
    setSaved(false);
  }

  async function uploadBackground(file: File) {
    setMediaError("");

    if (!file.type.startsWith("video/") && !file.type.startsWith("image/")) {
      setMediaError("video, gif or image only");
      return;
    }

    const sizeError = checkFileSize(file, MAX_UPLOAD_MB);
    if (sizeError) {
      setMediaError(sizeError);
      return;
    }

    const previous = profile.background;
    const ref = await putMedia(file);
    patch("background", ref);
    patch("mediaType", guessMediaType(file));
    if (isUploaded(previous)) void deleteMedia(previous);
  }

  async function uploadAvatar(file: File) {
    setMediaError("");

    if (!file.type.startsWith("image/")) {
      setMediaError("image only for the avatar");
      return;
    }

    const sizeError = checkFileSize(file, 5);
    if (sizeError) {
      setMediaError(sizeError);
      return;
    }

    const previous = profile.avatar;
    const ref = await putMedia(file);
    patch("avatar", ref);
    if (isUploaded(previous)) void deleteMedia(previous);
  }

  function clearBackground() {
    if (isUploaded(profile.background)) void deleteMedia(profile.background);
    patch("background", "");
    patch("mediaType", "");
  }

  function clearAvatar() {
    if (isUploaded(profile.avatar)) void deleteMedia(profile.avatar);
    patch("avatar", "");
  }

  function save() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setSaved(true);
  }

  return (
    <div className="mx-auto w-full max-w-[1280px] px-5 py-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <Link
            href="/"
            className="font-display text-[18px] font-semibold tracking-[-0.02em]"
          >
            bi.ax
          </Link>
          <span className="text-[12.5px] text-faint">editor</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/${profile.handle}`}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] text-ink/75 transition-colors hover:text-ink"
          >
            open page
            <ExternalLink className="size-3.5" strokeWidth={2} />
          </Link>
          <a
            href="/api/logout"
            className="rounded-full px-3.5 py-2 text-[12.5px] text-muted transition-colors hover:text-ink"
          >
            log out
          </a>
        </div>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div>
          <div className="glass rounded-[28px] p-4 sm:p-5">
            <div
              role="tablist"
              aria-label="Editor sections"
              className="flex gap-1 overflow-x-auto rounded-full bg-ink/5 p-1"
            >
              {TABS.map((item) => {
                const active = tab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(item.id)}
                    className={`shrink-0 rounded-full px-3.5 py-2 text-[12.5px] font-medium transition-colors duration-200 ${
                      active
                        ? "bg-accent text-[#08121f] shadow-sm"
                        : "text-muted hover:bg-white/10 hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-5">
              {tab === "basics" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-4 rounded-[16px] border border-line bg-white/5 p-3">
                    <Avatar
                      name={profile.name}
                      hueA={profile.hueA}
                      hueB={profile.hueB}
                      size={56}
                      src={profile.avatar}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[12.5px] text-muted">avatar</p>
                      <div className="mt-1.5 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => avatarInput.current?.click()}
                          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/5 px-3 py-1.5 text-[12px] text-ink/75 transition-colors hover:bg-white/10"
                        >
                          <Upload className="size-3.5" strokeWidth={2} />
                          upload
                        </button>
                        {profile.avatar && (
                          <button
                            type="button"
                            onClick={clearAvatar}
                            className="rounded-full px-2.5 py-1.5 text-[12px] text-muted transition-colors hover:text-ink"
                          >
                            reset
                          </button>
                        )}
                      </div>
                    </div>
                    <input
                      ref={avatarInput}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) void uploadAvatar(file);
                        event.target.value = "";
                      }}
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="display name">
                      <input
                        className={inputClass}
                        value={profile.name}
                        onChange={(event) => patch("name", event.target.value)}
                      />
                    </Field>

                    <Field label="name in the address">
                      <div className="flex items-center gap-1 rounded-[12px] border border-line bg-white/5 px-3.5 py-2.5">
                        <span className="font-mono text-[12px] text-faint">
                          bi.ax/
                        </span>
                        <input
                          className="min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none"
                          value={profile.handle}
                          onChange={(event) =>
                            patch(
                              "handle",
                              event.target.value
                                .toLowerCase()
                                .replace(/[^a-z0-9-]/g, "")
                                .slice(0, 20),
                            )
                          }
                        />
                      </div>
                    </Field>

                    <Field label="role" className="sm:col-span-2">
                      <input
                        className={inputClass}
                        value={profile.role}
                        onChange={(event) => patch("role", event.target.value)}
                      />
                    </Field>

                    <Field label="bio" className="sm:col-span-2">
                      <textarea
                        className={`${inputClass} min-h-[96px] resize-none`}
                        value={profile.bio}
                        onChange={(event) => patch("bio", event.target.value)}
                      />
                    </Field>
                  </div>
                </div>
              )}

              {tab === "colors" && (
                <div>
                  <p className="text-[13px] text-muted">
                    tint the gradient, the card glow and any uploaded background
                  </p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {PALETTES.map((palette) => {
                      const active =
                        palette.hueA === profile.hueA &&
                        palette.hueB === profile.hueB;
                      return (
                        <button
                          key={palette.name}
                          type="button"
                          onClick={() => {
                            patch("hueA", palette.hueA);
                            patch("hueB", palette.hueB);
                          }}
                          className={`flex items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-4 transition-colors ${
                            active
                              ? "border-accent/60 bg-accent/10"
                              : "border-line hover:bg-white/10"
                          }`}
                        >
                          <span
                            className="size-8 rounded-full ring-1 ring-inset ring-white/30"
                            style={{
                              backgroundImage: `linear-gradient(135deg, oklch(0.86 0.12 ${palette.hueA}), oklch(0.62 0.14 ${palette.hueB}))`,
                            }}
                          />
                          <span className="text-[12.5px] text-ink/80">
                            {palette.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {tab === "background" && (
                <div className="space-y-3">
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => {
                        clearBackground();
                      }}
                      className={`rounded-[16px] border p-4 text-left transition-colors ${
                        profile.background
                          ? "border-line bg-white/5 hover:bg-white/10"
                          : "border-accent/60 bg-accent/10"
                      }`}
                    >
                      <span className="block text-[13.5px] font-semibold">
                        gradient
                      </span>
                      <span className="mt-1 block text-[12px] text-muted">
                        moves on its own, uses your colors
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        patch("background", VIDEO_PRESET);
                        patch("mediaType", "video");
                      }}
                      className={`rounded-[16px] border p-4 text-left transition-colors ${
                        profile.background === VIDEO_PRESET
                          ? "border-accent/60 bg-accent/10"
                          : "border-line bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <span className="block text-[13.5px] font-semibold">
                        demo loop
                      </span>
                      <span className="mt-1 block text-[12px] text-muted">
                        silent blue video, plays full screen
                      </span>
                    </button>
                  </div>

                  <div className="rounded-[16px] border border-dashed border-line-strong p-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => backgroundInput.current?.click()}
                        className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-2 text-[12.5px] text-ink/80 transition-colors hover:bg-white/10"
                      >
                        <Upload className="size-3.5" strokeWidth={2} />
                        upload your own
                      </button>
                      <span className="text-[11.5px] text-faint">
                        video, gif or image · up to {MAX_UPLOAD_MB} MB
                      </span>
                      {profile.background && (
                        <button
                          type="button"
                          onClick={clearBackground}
                          className="ml-auto text-[12px] text-muted transition-colors hover:text-ink"
                        >
                          remove
                        </button>
                      )}
                    </div>

                    <p className="mt-2 font-mono text-[11px] text-faint">
                      {profile.background
                        ? profile.background.startsWith("idb:")
                          ? `uploaded ${profile.mediaType}`
                          : profile.background
                        : "nothing uploaded"}
                    </p>

                    <input
                      ref={backgroundInput}
                      type="file"
                      accept="video/*,image/*"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) void uploadBackground(file);
                        event.target.value = "";
                      }}
                    />
                  </div>
                </div>
              )}

              {tab === "player" && (
                <div className="grid gap-3">
                  <Field label="track title">
                    <input
                      className={inputClass}
                      value={profile.trackTitle}
                      onChange={(event) =>
                        patch("trackTitle", event.target.value)
                      }
                    />
                  </Field>

                  <Field label="audio url">
                    <input
                      className={`${inputClass} font-mono text-[12.5px]`}
                      value={profile.trackUrl}
                      onChange={(event) => patch("trackUrl", event.target.value)}
                    />
                  </Field>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => patch("trackUrl", TRACK_PRESET)}
                      className="rounded-full border border-line bg-white/5 px-3.5 py-2 text-[12px] text-ink/75 transition-colors hover:bg-white/10"
                    >
                      use demo track
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        patch("trackUrl", "");
                        patch("trackTitle", "");
                      }}
                      className="rounded-full px-3.5 py-2 text-[12px] text-muted transition-colors hover:text-ink"
                    >
                      remove
                    </button>
                  </div>
                </div>
              )}

              {tab === "links" && (
                <div>
                  <div className="space-y-2.5">
                    {profile.links.map((link) => (
                      <div
                        key={link.id}
                        className="grid gap-2 rounded-[16px] border border-line bg-white/5 p-3 sm:grid-cols-[110px_1fr_1fr_auto]"
                      >
                        <select
                          value={link.icon}
                          onChange={(event) =>
                            patchLink(link.id, {
                              icon: event.target.value as IconName,
                            })
                          }
                          className="rounded-[10px] border border-line bg-[#101b2e] px-2 py-2.5 text-[12.5px] text-ink/80 outline-none"
                        >
                          {ICON_OPTIONS.map((icon) => (
                            <option key={icon} value={icon}>
                              {icon}
                            </option>
                          ))}
                        </select>
                        <input
                          className={inputClass}
                          value={link.label}
                          onChange={(event) =>
                            patchLink(link.id, { label: event.target.value })
                          }
                        />
                        <input
                          className={`${inputClass} font-mono text-[12.5px]`}
                          value={link.url}
                          onChange={(event) =>
                            patchLink(link.id, { url: event.target.value })
                          }
                        />
                        <button
                          type="button"
                          onClick={() => removeLink(link.id)}
                          aria-label="Remove link"
                          className="grid place-items-center rounded-[10px] border border-line px-3 text-faint transition-colors hover:border-red-400/60 hover:text-red-400"
                        >
                          <Trash2 className="size-4" strokeWidth={1.8} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addLink}
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-dashed border-line-strong px-4 py-2 text-[12.5px] text-muted transition-colors hover:border-accent/60 hover:text-ink"
                  >
                    <Plus className="size-3.5" strokeWidth={2.2} />
                    add link
                  </button>
                </div>
              )}

              {tab === "card" && (
                <div className="space-y-6">
                  <div>
                    <p className="text-[13px] text-muted">card preset</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {LAYOUTS.map((layout) => {
                        const active = profile.layout === layout.id;
                        return (
                          <button
                            key={layout.id}
                            type="button"
                            onClick={() => patch("layout", layout.id)}
                            className={`rounded-[16px] border p-2.5 text-left transition-colors ${
                              active
                                ? "border-accent/60 bg-accent/10"
                                : "border-line hover:bg-white/10"
                            }`}
                          >
                            <LayoutPreview id={layout.id} />
                            <span className="mt-2 flex items-baseline justify-between gap-2">
                              <span className="text-[13px] font-semibold">
                                {layout.name}
                              </span>
                              <span className="text-[10.5px] text-faint">
                                {layout.hint}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="text-[13px] text-muted">
                      cursor effect — hover the preview to feel it
                    </p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {CURSORS.map((cursor) => {
                        const Icon = CURSOR_ICONS[cursor.id];
                        const active = profile.cursor === cursor.id;
                        return (
                          <button
                            key={cursor.id}
                            type="button"
                            onClick={() => patch("cursor", cursor.id)}
                            className={`flex items-center gap-3 rounded-[14px] border px-3.5 py-3 text-left transition-colors ${
                              active
                                ? "border-accent/60 bg-accent/10"
                                : "border-line hover:bg-white/10"
                            }`}
                          >
                            <Icon
                              className={`size-4 ${active ? "text-accent" : "text-muted"}`}
                              strokeWidth={1.8}
                            />
                            <span className="min-w-0">
                              <span className="block text-[13px] font-medium">
                                {cursor.name}
                              </span>
                              <span className="block truncate text-[11px] text-faint">
                                {cursor.hint}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-[16px] border border-line bg-white/5 p-4">
                    <label className="flex items-center justify-between gap-4">
                      <span>
                        <span className="block text-[13px] font-medium">
                          3d tilt
                        </span>
                        <span className="block text-[11.5px] text-faint">
                          the card leans toward the cursor
                        </span>
                      </span>
                      <input
                        type="checkbox"
                        checked={profile.tilt}
                        onChange={(event) => patch("tilt", event.target.checked)}
                        className="size-5 accent-[#87fbea]"
                      />
                    </label>

                    <div
                      className={`mt-4 transition-opacity ${profile.tilt ? "" : "pointer-events-none opacity-40"}`}
                    >
                      <div className="flex items-center justify-between text-[11.5px] text-muted">
                        <span>strength</span>
                        <span className="font-mono">
                          {profile.tiltStrength}°
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={14}
                        step={1}
                        value={profile.tiltStrength}
                        onChange={(event) =>
                          patch("tiltStrength", Number(event.target.value))
                        }
                        className="mt-2 w-full accent-[#87fbea]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {mediaError && (
            <p className="mt-3 text-[12px] text-err">{mediaError}</p>
          )}

          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={save}
              className="shine grad-brand rounded-full px-6 py-3 text-[13.5px] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              {saved ? "saved" : "save page"}
            </button>
            <button
              type="button"
              onClick={() => {
                setProfile(DEFAULT_PROFILE);
                setSaved(false);
              }}
              className="rounded-full px-4 py-3 text-[13px] text-muted transition-colors hover:text-ink"
            >
              reset
            </button>
            {saved && (
              <span className="inline-flex items-center gap-1.5 text-[12px] text-ok">
                <Check className="size-4" strokeWidth={2.4} />
                live
              </span>
            )}
            <Link
              href={`/${profile.handle}`}
              className="ml-auto inline-flex items-center gap-1.5 text-[12px] text-muted transition-colors hover:text-ink"
            >
              view page
              <ArrowUpRight className="size-3.5" strokeWidth={2} />
            </Link>
          </div>
        </div>

        <aside className="h-fit lg:sticky lg:top-6">
          <div
            ref={previewRef}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-line"
          >
            <ProfileBackground profile={profile} />
            <CursorFx mode={profile.cursor} containerRef={previewRef} />
            <div className="relative flex h-full items-center justify-center p-4">
              <ProfileCard profile={profile} />
            </div>
          </div>
          <p className="mt-3 text-center text-[11.5px] text-faint">
            live preview
          </p>
        </aside>
      </div>
    </div>
  );
}

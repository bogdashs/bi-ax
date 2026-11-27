"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, ExternalLink, Plus, Trash2 } from "lucide-react";
import { ProfileCard } from "@/components/profile-card";
import type { IconName } from "@/lib/demos";
import {
  DEFAULT_PROFILE,
  ICON_OPTIONS,
  PALETTES,
  STORAGE_KEY,
  TRACK_PRESET,
  VIDEO_PRESET,
  type BiaProfile,
  type ProfileLink,
} from "@/lib/profile";

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-[14px] font-semibold text-white/85">{title}</h2>
        {hint && <span className="text-[11.5px] text-white/35">{hint}</span>}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

const inputClass =
  "w-full rounded-[12px] border border-white/10 bg-white/5 px-3.5 py-2.5 text-[14px] text-white outline-none transition-colors duration-200 placeholder:text-white/25 focus:border-white/30";

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
      <span className="mb-1.5 block text-[12px] text-white/45">{label}</span>
      {children}
    </label>
  );
}

export function Editor() {
  const [profile, setProfile] = useState<BiaProfile>(DEFAULT_PROFILE);
  const [saved, setSaved] = useState(false);

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
          <span className="text-[12.5px] text-white/35">editor</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/${profile.handle}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[12.5px] text-white/75 transition-colors hover:bg-white/10 hover:text-white"
          >
            open page
            <ExternalLink className="size-3.5" strokeWidth={2} />
          </Link>
          <a
            href="/api/logout"
            className="rounded-full px-3.5 py-2 text-[12.5px] text-white/45 transition-colors hover:text-white/85"
          >
            log out
          </a>
        </div>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div className="space-y-4">
          <Section title="basics">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="display name">
                <input
                  className={inputClass}
                  value={profile.name}
                  onChange={(event) => patch("name", event.target.value)}
                />
              </Field>
              <Field label="name in the address">
                <div className="flex items-center gap-1 rounded-[12px] border border-white/10 bg-white/5 px-3.5 py-2.5">
                  <span className="font-mono text-[12px] text-white/35">
                    bi.ax/
                  </span>
                  <input
                    className="min-w-0 flex-1 bg-transparent text-[14px] text-white outline-none"
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
                  className={`${inputClass} min-h-[84px] resize-none`}
                  value={profile.bio}
                  onChange={(event) => patch("bio", event.target.value)}
                />
              </Field>
            </div>
          </Section>

          <Section title="colors" hint="background gradient and player">
            <div className="flex flex-wrap gap-2.5">
              {PALETTES.map((palette) => {
                const active =
                  palette.hueA === profile.hueA && palette.hueB === profile.hueB;
                return (
                  <button
                    key={palette.name}
                    type="button"
                    onClick={() => {
                      patch("hueA", palette.hueA);
                      patch("hueB", palette.hueB);
                    }}
                    aria-label={palette.name}
                    className={`size-11 rounded-full ring-2 ring-offset-2 ring-offset-[#0b1018] transition-transform duration-200 hover:scale-105 ${
                      active ? "ring-white/80" : "ring-transparent"
                    }`}
                    style={{
                      backgroundImage: `linear-gradient(135deg, oklch(0.9 0.13 ${palette.hueA}), oklch(0.75 0.18 ${palette.hueB}))`,
                    }}
                  />
                );
              })}
            </div>
          </Section>

          <Section title="background">
            <div className="grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => patch("video", "")}
                className={`rounded-[14px] border p-3 text-left transition-colors ${
                  profile.video
                    ? "border-white/10 bg-white/[0.03] hover:border-white/20"
                    : "border-white/35 bg-white/10"
                }`}
              >
                <span className="block text-[13px] font-medium">gradient</span>
                <span className="mt-1 block text-[11.5px] text-white/40">
                  moves on its own
                </span>
              </button>
              <button
                type="button"
                onClick={() => patch("video", VIDEO_PRESET)}
                className={`rounded-[14px] border p-3 text-left transition-colors ${
                  profile.video
                    ? "border-white/35 bg-white/10"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20"
                }`}
              >
                <span className="block text-[13px] font-medium">video loop</span>
                <span className="mt-1 block text-[11.5px] text-white/40">
                  silent, autoplay, full screen
                </span>
              </button>
            </div>
          </Section>

          <Section title="track" hint="plays in the card">
            <div className="grid gap-3">
              <Field label="title">
                <input
                  className={inputClass}
                  value={profile.trackTitle}
                  onChange={(event) => patch("trackTitle", event.target.value)}
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
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-[12px] text-white/70 transition-colors hover:bg-white/10"
                >
                  use demo track
                </button>
                <button
                  type="button"
                  onClick={() => {
                    patch("trackUrl", "");
                    patch("trackTitle", "");
                  }}
                  className="rounded-full px-3.5 py-2 text-[12px] text-white/40 transition-colors hover:text-white/80"
                >
                  remove
                </button>
              </div>
            </div>
          </Section>

          <Section title="links">
            <div className="space-y-2.5">
              {profile.links.map((link) => (
                <div
                  key={link.id}
                  className="grid gap-2 rounded-[16px] border border-white/8 bg-white/[0.025] p-3 sm:grid-cols-[110px_1fr_1fr_auto]"
                >
                  <select
                    value={link.icon}
                    onChange={(event) =>
                      patchLink(link.id, { icon: event.target.value as IconName })
                    }
                    className="rounded-[10px] border border-white/10 bg-[#0b1119] px-2 py-2.5 text-[12.5px] text-white/80 outline-none"
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
                    className="grid place-items-center rounded-[10px] border border-white/10 px-3 text-white/40 transition-colors hover:border-red-400/40 hover:text-red-300"
                  >
                    <Trash2 className="size-4" strokeWidth={1.8} />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addLink}
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-dashed border-white/20 px-4 py-2 text-[12.5px] text-white/60 transition-colors hover:border-white/40 hover:text-white"
            >
              <Plus className="size-3.5" strokeWidth={2.2} />
              add link
            </button>
          </Section>

          <div className="sticky bottom-4 flex gap-2 rounded-full border border-white/10 bg-[#0b1018]/90 p-1.5 backdrop-blur-xl">
            <button
              type="button"
              onClick={save}
              className="shine grad-brand flex-1 rounded-full px-5 py-3 text-[13.5px] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              {saved ? "saved" : "save page"}
            </button>
            <button
              type="button"
              onClick={() => {
                setProfile(DEFAULT_PROFILE);
                setSaved(false);
              }}
              className="rounded-full px-4 py-3 text-[13px] text-white/45 transition-colors hover:text-white/85"
            >
              reset
            </button>
            {saved && (
              <span className="mr-3 inline-flex items-center gap-1.5 text-[12px] text-ok">
                <Check className="size-4" strokeWidth={2.4} />
                live
              </span>
            )}
          </div>
        </div>

        <aside className="h-fit lg:sticky lg:top-6">
          <ProfileCard profile={profile} />
          <p className="mt-3 text-center text-[11.5px] text-white/35">
            live preview
          </p>
        </aside>
      </div>
    </div>
  );
}

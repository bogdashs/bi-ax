"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

const BARS = Array.from({ length: 44 }, (_, index) => {
  const base = Math.abs(Math.sin(index * 0.62)) * 0.62 + 0.22;
  const accent = index % 7 === 0 ? 0.28 : 0;
  return Math.min(1, base + accent);
});

function clock(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function Player({
  title,
  src,
  hueA,
  hueB,
}: {
  title: string;
  src: string;
  hueA: number;
  hueB: number;
}) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!src) return;

    const element = new Audio(src);
    element.preload = "metadata";
    element.loop = true;

    const onMeta = () => setDuration(element.duration);
    const onTime = () => setCurrent(element.currentTime);
    const onPause = () => setPlaying(false);

    element.addEventListener("loadedmetadata", onMeta);
    element.addEventListener("timeupdate", onTime);
    element.addEventListener("pause", onPause);
    audio.current = element;

    return () => {
      element.pause();
      element.removeEventListener("loadedmetadata", onMeta);
      element.removeEventListener("timeupdate", onTime);
      element.removeEventListener("pause", onPause);
      audio.current = null;
    };
  }, [src]);

  async function toggle() {
    const element = audio.current;
    if (!element) return;

    if (playing) {
      element.pause();
      setPlaying(false);
      return;
    }

    try {
      await element.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }

  function seek(event: React.MouseEvent<HTMLDivElement>) {
    const element = audio.current;
    if (!element || !duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    element.currentTime = ratio * duration;
    setCurrent(ratio * duration);
  }

  const progress = duration ? current / duration : 0;
  const disabled = !src;

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        aria-label={playing ? "Pause track" : "Play track"}
        className="grid size-11 shrink-0 place-items-center rounded-full text-[#06121c] transition-transform duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
        style={{
          backgroundImage: `linear-gradient(135deg, oklch(0.92 0.13 ${hueA}), oklch(0.8 0.17 ${hueB}))`,
        }}
      >
        {playing ? (
          <Pause className="size-4" fill="currentColor" strokeWidth={0} />
        ) : (
          <Play className="size-4 translate-x-px" fill="currentColor" strokeWidth={0} />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="truncate text-[12.5px] text-white/75">
            {title || "no track yet"}
          </p>
          <span className="shrink-0 font-mono text-[10px] text-white/35">
            {clock(current)} / {clock(duration)}
          </span>
        </div>

        <div
          onClick={seek}
          aria-hidden="true"
          className="mt-2 flex h-6 cursor-pointer items-end gap-[3px]"
        >
          {BARS.map((height, index) => (
            <span
              key={index}
              className={`flex-1 rounded-full transition-colors duration-200 ${
                index / BARS.length <= progress ? "bg-white/85" : "bg-white/15"
              }`}
              style={{ height: `${Math.round(height * 100)}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

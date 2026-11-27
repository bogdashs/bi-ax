"use client";

import { useEffect, useRef } from "react";
import type { CursorMode } from "@/lib/profile";

type Layer = {
  size: number;
  lerp: number;
  className: string;
  background?: string;
};

const LAYERS: Record<Exclude<CursorMode, "none">, Layer[]> = {
  glow: [
    {
      size: 520,
      lerp: 0.12,
      className: "rounded-full",
      background:
        "radial-gradient(circle, oklch(0.78 0.14 215 / 0.3), transparent 62%)",
    },
  ],
  ring: [
    {
      size: 26,
      lerp: 0.34,
      className: "rounded-full border border-accent/70 bg-accent/10",
    },
    {
      size: 84,
      lerp: 0.1,
      className: "rounded-full border border-ink/20",
    },
  ],
  spotlight: [
    {
      size: 780,
      lerp: 0.09,
      className: "rounded-full",
      background:
        "radial-gradient(circle, oklch(0.82 0.13 205 / 0.2), transparent 60%)",
    },
  ],
};

export function CursorFx({ mode = "glow" }: { mode?: CursorMode }) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (mode === "none") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layers = LAYERS[mode];
    const nodes = refs.current.slice(0, layers.length);
    if (nodes.some((node) => !node)) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let started = false;
    const positions = layers.map(() => ({ x: 0, y: 0 }));

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!started) {
        started = true;
        positions.forEach((position) => {
          position.x = targetX;
          position.y = targetY;
        });
        nodes.forEach((node) => node && (node.style.opacity = "1"));
      }
    };

    const tick = () => {
      positions.forEach((position, index) => {
        const lerp = layers[index].lerp;
        position.x += (targetX - position.x) * lerp;
        position.y += (targetY - position.y) * lerp;
        const node = nodes[index];
        if (node) {
          node.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`;
        }
      });
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [mode]);

  if (mode === "none") return null;

  return (
    <>
      {LAYERS[mode].map((layer, index) => (
        <div
          key={`${mode}-${index}`}
          ref={(node) => {
            refs.current[index] = node;
          }}
          aria-hidden="true"
          className={`pointer-events-none fixed left-0 top-0 z-0 hidden opacity-0 transition-opacity duration-500 md:block ${layer.className}`}
          style={{
            width: layer.size,
            height: layer.size,
            background: layer.background,
          }}
        />
      ))}
    </>
  );
}

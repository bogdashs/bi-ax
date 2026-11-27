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

export function CursorFx({
  mode = "glow",
  containerRef,
}: {
  mode?: CursorMode;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const bound = Boolean(containerRef);

  useEffect(() => {
    if (mode === "none") return;
    // Page-wide effect is pointless on touch; inside the editor preview it
    // should still render so the switches do something visible.
    if (!bound && window.matchMedia("(pointer: coarse)").matches) return;
    if (!bound && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    const layers = LAYERS[mode];
    const nodes = refs.current.slice(0, layers.length);
    if (nodes.some((node) => !node)) return;

    const host: EventTarget = containerRef?.current ?? window;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let started = false;
    let scale = 1;
    let targetScale = 1;
    const positions = layers.map(() => ({ x: 0, y: 0 }));

    const origin = () => {
      if (!containerRef?.current) return { left: 0, top: 0 };
      const rect = containerRef.current.getBoundingClientRect();
      return { left: rect.left, top: rect.top };
    };

    const isInteractive = (target: EventTarget | null) =>
      target instanceof Element &&
      Boolean(
        target.closest(
          "a, button, [role='button'], input, textarea, select, summary, label",
        ),
      );

    const onMove = (event: Event) => {
      const pointer = event as PointerEvent;
      const { left, top } = origin();
      targetX = pointer.clientX - left;
      targetY = pointer.clientY - top;

      if (!started) {
        started = true;
        positions.forEach((position) => {
          position.x = targetX;
          position.y = targetY;
        });
        nodes.forEach((node) => node && (node.style.opacity = "1"));
      }
    };

    const onOver = (event: Event) => {
      targetScale = isInteractive((event as PointerEvent).target) ? 0.55 : 1;
    };

    const onDown = () => {
      targetScale = 0.32;
    };

    const onUp = (event: Event) => {
      targetScale = isInteractive((event as PointerEvent).target) ? 0.55 : 1;
    };

    const tick = () => {
      scale += (targetScale - scale) * 0.18;

      positions.forEach((position, index) => {
        const lerp = layers[index].lerp;
        position.x += (targetX - position.x) * lerp;
        position.y += (targetY - position.y) * lerp;
        const node = nodes[index];
        if (node) {
          node.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        }
      });

      raf = requestAnimationFrame(tick);
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerover", onOver, { passive: true });
    host.addEventListener("pointerdown", onDown, { passive: true });
    host.addEventListener("pointerup", onUp, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerover", onOver);
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointerup", onUp);
      cancelAnimationFrame(raf);
    };
  }, [mode, bound, containerRef]);

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
          className={`pointer-events-none opacity-0 transition-opacity duration-500 ${
            bound
              ? "absolute left-0 top-0 z-0"
              : "fixed left-0 top-0 z-0 hidden md:block"
          } ${layer.className}`}
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

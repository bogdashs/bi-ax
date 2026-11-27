"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let started = false;

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!started) {
        started = true;
        x = targetX;
        y = targetY;
        el.style.opacity = "1";
      }
    };

    const tick = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-cursor-glow=""
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 hidden size-[520px] opacity-0 transition-opacity duration-700 md:block"
      style={{
        background:
          "radial-gradient(circle, oklch(0.72 0.12 255 / 0.28), transparent 62%)",
      }}
    />
  );
}

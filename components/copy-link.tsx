"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

export function CopyLink({ handle }: { handle: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(`https://bi.axven.xyz/${handle}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy page link"
      className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2 font-mono text-[11px] text-ink/80 transition-colors duration-200 hover:bg-ink/6 hover:text-white"
    >
      {copied ? "copied" : `bi.ax/${handle}`}
      {copied ? (
        <Check className="size-3.5 text-ok" strokeWidth={2.4} />
      ) : (
        <Share2 className="size-3.5" strokeWidth={2} />
      )}
    </button>
  );
}

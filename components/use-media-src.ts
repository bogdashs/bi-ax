"use client";

import { useEffect, useState } from "react";
import { getMediaBlob, isUploaded } from "@/lib/media";

export function useMediaSrc(ref: string | undefined): string | null {
  const [src, setSrc] = useState<string | null>(
    ref && !isUploaded(ref) ? ref : null,
  );

  useEffect(() => {
    if (!ref) {
      setSrc(null);
      return;
    }

    if (!isUploaded(ref)) {
      setSrc(ref);
      return;
    }

    let cancelled = false;
    let objectUrl: string | null = null;

    getMediaBlob(ref)
      .then((blob) => {
        if (cancelled || !blob) return;
        objectUrl = URL.createObjectURL(blob);
        setSrc(objectUrl);
      })
      .catch(() => setSrc(null));

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [ref]);

  return src;
}

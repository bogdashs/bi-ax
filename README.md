# bi.ax

One link for everything: music, videos and socials on a single page, at `bi.ax/<name>`.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Unbounded / Nunito / JetBrains Mono via `next/font`
- Simple Icons for brand glyphs, Lucide for UI icons

## Run

```bash
pnpm install
pnpm dev
```

Production:

```bash
pnpm build
pnpm start
```

## Layout

```
app/            routes (landing, /demo/[slug], auth stubs)
components/     UI building blocks
lib/            demo profiles, username rules
.tmp/           local scratch: screenshots, logs (gitignored)
```

## Routes

| Route | What |
| --- | --- |
| `/` | landing with live name check |
| `/<name>` | public profile page (`mila`, `kai`, `nova`, `rio`, `juno` are seeded) |
| `/demo/<name>` | same as above, kept for links |
| `/login` | demo sign-in, no password |
| `/dashboard` | page editor with live preview |

## Demo flow

`/login` → `enter demo account` → `/dashboard`. Edits are stored in
`localStorage` under `biax:profile:v1`, so the page at `/<handle>` shows your
version. No database yet; `isUsernameTaken` is still a stub.

## Media

`public/media/bg-mila.mp4` (16s seamless gradient loop) and
`public/media/demo-track.mp3` (24s ambient loop) were generated locally with
ffmpeg, so the demo has real video and audio without external assets.

## Username rules

Lowercase `a-z`, `0-9` and dashes, 3–20 characters, no leading/trailing dash.
Reserved words live in `lib/username.ts` — pages sit at the root of the domain,
so any word that collides with an app route must stay blocked.

## Notes

- Name availability is a stub in `lib/username.ts`; swap `isUsernameTaken` for a DB lookup.
- Profile backgrounds are animated gradients for now. A real video/photo can be
  dropped into `components/profile-aura.tsx` once uploads exist.

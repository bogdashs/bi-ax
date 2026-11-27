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
| `/demo/<name>` | example profile pages (`mila`, `kai`, `nova`, `rio`, `juno`) |
| `/register`, `/login` | stubs, accounts come next |

## Username rules

Lowercase `a-z`, `0-9` and dashes, 3–20 characters, no leading/trailing dash.
Reserved words live in `lib/username.ts` — pages sit at the root of the domain,
so any word that collides with an app route must stay blocked.

## Notes

- Name availability is a stub in `lib/username.ts`; swap `isUsernameTaken` for a DB lookup.
- Profile backgrounds are animated gradients for now. A real video/photo can be
  dropped into `components/profile-aura.tsx` once uploads exist.

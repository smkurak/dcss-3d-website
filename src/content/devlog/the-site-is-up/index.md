---
title: 'The site is up'
date: 2026-08-15
summary: 'A landing page, a devlog and an RSS feed — and the reasoning behind the one number that mattered.'
---

There is a page now. It explains what this project is, shows a clip and a few
screenshots, and links to the devlog you are reading. That is the whole scope.
There are no builds to download yet, and the client's source is not public yet
either — both facts are stated on the front page rather than left to be guessed.

## The clip was the entire problem

The recording of the client running started life as a GIF. A GIF stores every
frame in full: it has no interframe compression, so a 17-second capture of a
mostly static dungeon costs the same as 17 seconds of anything else. A video
codec encodes only what changed between frames, which for an interface that
sits still most of the time is almost nothing.

| file | size |
| --- | --- |
| `screen_gameplay_01.gif` | 73.9 MB |
| `hero.webm` (VP9) | 522 KB |
| `hero.mp4` (H.264) | 870 KB |
| `hero-poster.webp` | 36 KB |

## Everything is served from one domain

No analytics, no counters, no embedded widgets, no fonts pulled from a CDN.
Both typefaces are the same files the client itself uses, subset to Latin and
served locally. The page makes zero
requests outside its own domain, which is easy to claim and easy to check.

## Next

Screenshots need retaking. After that, a downloads page, for whenever there is something to download.

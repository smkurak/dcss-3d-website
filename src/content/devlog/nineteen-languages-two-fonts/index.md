---
title: 'Nineteen languages, two fonts'
date: 2026-08-16
summary: 'The site speaks four languages now. Checking what it would take to speak the rest turned up a better answer than expected — and one mistake of my own.'
---

The site now exists in English, Russian, German and Spanish. That was the easy
part. The interesting question was the next one: what would it cost to cover
every language the game itself is translated into?

## What upstream actually ships

The DCSS repository carries description files for nineteen languages:

```
cs da de el es fi fr hu it ja ko lt lv nl pl pt ru sv tr
```

Grouped by writing system rather than by language, that is a much shorter list:
fifteen use the Latin alphabet, one Greek, one Cyrillic, and two — Japanese and
Korean — do not use an alphabet at all.

## The fonts were already ready

This project uses two typefaces, both taken straight from the client: Iosevka
Charon Mono for anything the machine says, Manrope for anything we say. I
checked their character tables directly rather than guessing, and both cover
Latin, Latin Extended, Greek and Cyrillic in full.

So seventeen of the nineteen need no new font at all. Adding one of them is a
matter of writing the text, not of finding a typeface — which is the opposite of
what I expected when I started looking.

## Splitting by alphabet

Shipping every alphabet in one file would mean an English reader downloading
Cyrillic and Greek they will never see. Each typeface is therefore cut into
separate files per alphabet, declared with `unicode-range`, and the browser
fetches only the ones whose characters actually appear:

| page | fonts downloaded |
| --- | --- |
| English | 42.6 KB |
| Russian | 61.3 KB |
| everything built | 126 KB across 8 files |

## The part I got wrong

When the site was English-only I subset both fonts down to Latin. That was
correct at the time and quietly wrong the moment Russian appeared: the Cyrillic
glyphs had been cut out, so the Russian pages fell back to whatever monospace
the visitor's system happened to have. The layout still looked fine, which is
exactly why it could have shipped unnoticed.

What caught it was reading the built font files rather than the source ones. The
source had every Russian letter; the file being served had none.

There is a second trap in the same area. Build tools inline small assets into
the stylesheet as base64, and one of the Cyrillic subsets is small enough to
qualify. Inlined, it would have travelled to every page — including the English
ones — defeating the entire point of splitting by alphabet, and costing a third
extra for the base64 encoding. Inlining is now switched off for fonts.

## Japanese and Korean stay open

Those two are not another font download. There are thousands of characters
rather than dozens, subsetting works on completely different principles, and
there is no monospace equivalent in the usual sense — which matters here,
because the split between monospace for game text and proportional for
interface text is a rule this project follows deliberately. It is also a
decision for the client first and the site second. Left open on purpose.

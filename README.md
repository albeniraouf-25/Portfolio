# Portfolio — Raouf Zeid Albeni

A React + Vite portfolio, driven entirely by the data in
[`src/data/profile.ts`](src/data/profile.ts).

## Design: "Majlis"

A *majlis* is the Levantine sitting room where guests are welcomed. The site opens
like one — أهلاً وسهلاً — and is built around a **hand-drawn eight-point-star (khatam)
girih tessellation** that comes from As-Suwayda's own visual heritage, not from a
portfolio template. The pattern threads through the page as a watermark, section
dividers, bullets, and an eight-point-star photo frame.

- **Stones of the Hauran** — warm **limestone** paper + **basalt** ink, with deep
  **indigo** panels and a single **saffron/ochre** accent.
- **Type** — *Marcellus* (inscriptional, carved-stone display) · *Hanken Grotesk*
  (warm humanist body) · *Reem Kufi* (geometric Arabic, echoing the girih).
- **Eastern-Arabic numerals** (١ ٢ ٣) mark the sections instead of `01 / 02 / 03`.
- **Motion** — a gentle page-load rise and scroll reveals; all respect
  `prefers-reduced-motion`.

The geometry is generated in code — see [`src/components/Geo.tsx`](src/components/Geo.tsx)
(`StarField`, `Seal`, `StarBand`), a seamlessly tiling SVG pattern.

## Bilingual — English & Arabic

The site ships in **English (LTR)** and **Arabic (RTL)** with a toggle in the nav.
Arabic mode flips direction, switches to Arabic fonts (Reem Kufi + IBM Plex Sans
Arabic), uses **Eastern-Arabic numerals** (١ ٢ ٣) and Levantine month names, while
English uses Roman numerals (I, II, III). The choice persists (localStorage) and can
be linked directly with `?lang=ar` / `?lang=en`.

## One file drives everything

[`src/data/content.ts`](src/data/content.ts) is the **single source of truth** — all
profile data *and* every piece of interface copy, in both languages. Translatable text
is written as `{ en: '…', ar: '…' }`; language-neutral values (dates, tech names,
emails, links) are plain. Components never contain copy — they render whatever is in
this object, so adding a job, a skill, or fixing a translation is a data-only edit.
The `Content` type checks it at build time, so a missing translation fails the build.

`src/i18n/lang.tsx` collapses that bilingual object to the active language and exposes
it via `useLang()`.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build → dist/
npm run preview  # serve the built output
```

## Structure

```
src/
  data/          content.ts (⭐ all data + copy, EN/AR) · format.ts (dates, digits, durations)
  i18n/          lang.tsx (resolver + <LangProvider> + useLang)
  components/    Nav · Hero · About · Work · Skills · Education · Certifications · Contact · Geo · icons
  hooks/         useReveal (IntersectionObserver scroll reveal)
  styles/        global.css (tokens, primitives, RTL rules)
public/resources images, logos, certificate, favicon
```

To update anything on the site, edit `src/data/content.ts` — nothing else.

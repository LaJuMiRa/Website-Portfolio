# Laurenz Rauscher · Portfolio

Personal portfolio with projects, a playable browser version of my dungeon crawler, experience and contact.

**Live:** [laurenz-rauscher.at](https://laurenz-rauscher.at)

## Pages

| Route | Content |
|-------|---------|
| `/` | One-pager: hero, projects, about, experience, contact |
| `/projects/dungeon-crawler/` | Playable Dungeon-Crawler (demo mode or play it yourself), legend, run commands |
| `/projects/dispatcher/`, `/projects/browsing-wrapped/` | Project detail pages |
| `/experience/` | Full career history: education, work, volunteering, languages, certificates |

## Features

- **German and English**, switchable in the header, remembered in the browser
- **Light and dark mode**, following the system setting until changed
- **Name animation** in the hero: the name resolves out of dungeon map symbols
- **Scroll reveals**: section rules draw in, headings wipe in, cards and lists fade in
- **Project cards**: the hovered card steps forward, the others step back; the whole card is clickable
- **Tech stack tags** that link to the project they are used in
- **Study progress bar** that works out the current semester from the date
- **Contact form** that opens the visitor's mail client with subject and text filled in, so no backend is needed
- All motion respects `prefers-reduced-motion`

## Tech

- [Next.js 15](https://nextjs.org/) (App Router, static export) with React 19 and TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/), design tokens as CSS variables in `app/globals.css`
- [Framer Motion](https://www.framer.com/motion/) for the project illustrations, plain CSS for everything else
- [Lucide](https://lucide.dev/) icons
- [Vitest](https://vitest.dev/) for the game engine and the study progress logic
- Fonts: Geist (headings and name), Schibsted Grotesk (body), Martian Mono (code and game)

## Project structure

```
app/
  layout.tsx              Fonts, metadata, theme and language providers
  page.tsx                Home page
  projects/[id]/page.tsx  Project detail pages
  experience/page.tsx     Career page
  globals.css             Tokens, utilities, motion
components/
  Header, Hero, Projects, About, Experience, Contact, Footer
  Section, Reveal, ScrambleText, CopyButton
  game/                   Canvas renderer and UI of the browser game
  project/                Detail page layouts
  experience/             Career page and study progress bar
  visuals/                Animated project illustrations
lib/
  site.ts                 Name, links, socials, tech stack
  projects.ts             Project data
  study.ts                Semester calculation
  game/                   Game engine: map generation, rules, rival AI
  translations/           German and English texts
tests/                    Vitest tests
public/                   Résumé PDF
```

## Getting started

Requires Node.js 22 or newer.

```bash
git clone https://github.com/LaJuMiRa/Website-Portfolio.git
cd Website-Portfolio
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

| Command | What it does |
|---------|--------------|
| `npm run dev` | Development server |
| `npm run build` | Static build into `out/` |
| `npm test` | Run the tests |
| `npm run typecheck` | Type check without building |

## Editing content

| What | Where |
|------|-------|
| All texts (both languages) | `lib/translations/de.ts`, `lib/translations/en.ts` |
| Name, e-mail, social links, tech stack | `lib/site.ts` |
| Projects | `lib/projects.ts` plus their texts in the translations |
| Start and length of the degree | `lib/study.ts` |
| Résumé | `public/Lebenslauf_Rauscher.pdf` |
| Colours and fonts | `app/globals.css`, `app/layout.tsx` |

## Deployment

The site is a static export (`output: 'export'` in `next.config.js`). `npm run build` writes plain HTML, CSS and JS to `out/`, which any static host can serve.

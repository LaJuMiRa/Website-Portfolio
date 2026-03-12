# Laurenz Rauscher — Personal Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0055?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Static Export](https://img.shields.io/badge/Deployment-Static_Export-14b8a6?style=flat-square)](https://laurenz-rauscher.at)

> Personal portfolio website showcasing projects, skills, and experience

🌐 **Live:** [laurenz-rauscher.at](https://laurenz-rauscher.at)

---

## ✨ Features

### Navigation
- Fixed navbar with **scroll-triggered backdrop blur** and border reveal
- Smooth anchor-link navigation to all sections
- **Resume download** button (direct PDF link)
- **Mobile hamburger menu** with animated slide-down

### Hero Section
- **TypeWriter animation** — looping "Hello, I'm" effect (type → pause → delete → repeat)
- **Name clip-reveal** — "Laurenz Rauscher." animates in with an overflow-clipping reveal
- Three **floating background blobs** (orange, teal, amber) with independent float animations
- Primary CTAs: Download Resume + Get in Touch
- Animated scroll indicator (bottom-left)

### About
- Bio text (3 paragraphs, fully editable)
- **Avatar** — gradient monogram circle (or swappable with `profile.jpg`)
- Info cards grid: Location, Education, Availability, Languages

### Tech Stack
- Visual **proficiency cards** with color-coded icons
- Three levels: Primary, Learning, Familiar
- Expandable — additional techs can be uncommented in the component

### Experience
- Chronological **timeline** with orange gradient connector line
- Each entry: role, company, location, period, employment type, bullet points, tech tags

### Projects
- Responsive grid (2–3 columns)
- **Featured badge** (⭐ amber) for highlighted projects
- GitHub + Live Demo link icons per card
- Card hover — title highlight in orange

### Contact Form
- Name, Email, Message fields
- **Mailto approach** — opens native email client with pre-filled subject + body (no backend needed)
- Success state with `CheckCircle` icon and "Send another" reset option
- Social links (GitHub, LinkedIn) + direct email link

---

## 🎨 Design System

### Color Palette

| Role | Token | Hex |
|------|-------|-----|
| Background | — | `#080808` |
| Accent / CTA | Orange | `#f97316` |
| Section numbers | Teal | `#14b8a6` |
| Featured / warm | Amber | `#fbbf24` |
| Text | Slate 100 | `#f1f5f9` |

### Typography
- **Sans:** Inter (Google Fonts)
- **Mono:** JetBrains Mono (Google Fonts) — used for section numbers and tech tags

### Animation Philosophy
Animations reveal content — they don't distract from it.

| Variant | Description |
|---------|-------------|
| `fadeUp` | Opacity + vertical rise (y: 36→0), 0.5s |
| `fadeUpSoft` | Softer fade with slight scale snap (0.97→1) |
| `clipReveal` | Text rises from below with overflow clipping |
| `stagger` | Container with 0.09s child stagger |
| `staggerFast` | Tighter stagger (0.055s) for dense grids |
| `fadeIn` | Pure opacity fade, 0.45s |
| `slideFromLeft` | Horizontal slide-in from -28px |

All section animations use `useInView({ once: true, margin: '-80px' })`.

---

## 🗂 Project Structure

```
Website-Portfolio/
├── app/
│   ├── layout.tsx        # Root layout — fonts, metadata, OG tags
│   ├── page.tsx          # Main page — composes all sections
│   └── globals.css       # Design system: utilities, animations, scrollbar
├── components/
│   ├── Navbar.tsx        # Fixed nav with mobile menu + resume download
│   ├── Hero.tsx          # TypeWriter + clip-reveal + background blobs
│   ├── About.tsx         # Bio, avatar, info cards
│   ├── TechStack.tsx     # Proficiency cards
│   ├── Experience.tsx    # Timeline with jobs
│   ├── Projects.tsx      # Grid with featured badges + links
│   └── Contact.tsx       # Mailto form + social links
├── lib/
│   └── animations.ts     # Shared Framer Motion variants
├── public/
│   ├── resume.pdf        # CV (replace with your own)
│   └── profile.jpg       # (optional) Profile photo
├── next.config.js        # Static export config
└── tailwind.config.ts    # Font variable extensions
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/laurenz-rauscher/Website-Portfolio.git
cd Website-Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

Generates a fully static site in the `/out` directory — ready for deployment to any static host.

---

## ✏️ Customization

All placeholder content is marked with `✏️` comments directly in the component files. Here's where to find what:

| What | File |
|------|------|
| Hero title & tagline | `components/Hero.tsx` |
| About paragraphs & info cards | `components/About.tsx` |
| Profile photo | `components/About.tsx` (swap `profile.jpg`) |
| Tech skills | `components/TechStack.tsx` |
| Work experience | `components/Experience.tsx` |
| Projects | `components/Projects.tsx` |
| Contact email & social links | `components/Contact.tsx` |
| Resume PDF | `public/resume.pdf` |
| Metadata & OG tags | `app/layout.tsx` |

---

## 🌍 Deployment

The site is configured for **static export** (`output: 'export'` in `next.config.js`).

After `npm run build`, the `/out` directory contains plain HTML/CSS/JS — deployable to any static host (Netlify, Vercel, GitHub Pages, or a custom server).

**Live at:** [laurenz-rauscher.at](https://laurenz-rauscher.at)

---

## 🛠 Built With

- [Next.js 14](https://nextjs.org/) — React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [Framer Motion](https://www.framer.com/motion/) — Animations
- [Lucide React](https://lucide.dev/) — Icons
- [Google Fonts](https://fonts.google.com/) — Inter & JetBrains Mono

---

<p align="center">
  <sub>© 2026 Laurenz Rauscher · Built with Next.js & Tailwind CSS</sub>
</p>

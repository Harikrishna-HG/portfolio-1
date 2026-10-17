# Harikrishna Gautam — Portfolio

A minimal, typographic, CV-style portfolio built with **Next.js (App Router)**.
The design is a monochrome, border-based layout with a fixed sidebar, dark mode,
bilingual **English / Nepali** content, scroll-reveal animations, and a side-panel
modal for project details.

## Features

- **Sidebar layout** with section navigation and active-section highlighting
- **Responsive navigation** — the sidebar collapses into a top bar with a menu
  button on mobile
- **Dark / light theme** toggle persisted in `localStorage` (no flash on load)
- **English / Nepali** language toggle — all copy is bilingual
- **CV-style sections**: Home, Projects, Skills, Education, Activities,
  Certifications, Languages, Contact
- **Project detail modal** with tags, summary, optional image, and long-form body
- **Project thumbnails** — optional image per project, with a styled fallback
- **Activity photos with lightbox** — click a photo to expand it
- **Scroll-reveal animations** via GSAP (fully disabled when the visitor prefers
  reduced motion)
- **Accessible** — semantic landmarks, skip link, keyboard-operable modal and
  menu, visible focus rings, reduced-motion support
- **Zero-CSS-framework styling** — plain CSS with design tokens (CSS variables)

## Tech stack

- [Next.js](https://nextjs.org/) 16 (App Router, Turbopack)
- [React](https://react.dev/) 19
- TypeScript
- Plain CSS (`app/globals.css`) with CSS custom properties
- [GSAP](https://gsap.com/) (ScrollTrigger, ScrollToPlugin, SplitText)
- Lato (Google Fonts)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

| Command         | Description                     |
| --------------- | ------------------------------- |
| `npm run dev`   | Start the development server    |
| `npm run build` | Create a production build       |
| `npm run start` | Run the production build        |
| `npm run lint`  | Lint the project with ESLint    |

## Project structure

```
portfolio-1/
├── app/
│   ├── globals.css     # Design tokens and all styles
│   ├── icon.svg        # Favicon
│   ├── layout.tsx      # Metadata, fonts, theme/bootstrap script
│   └── page.tsx        # Assembles the sections + sidebar
├── components/
│   ├── Activities.tsx      # Activities list + photo lightbox
│   ├── Certifications.tsx
│   ├── Contact.tsx
│   ├── Education.tsx
│   ├── Home.tsx            # Hero + bio
│   ├── Icons.tsx           # Inline SVG icon set
│   ├── LanguageProvider.tsx# English/Nepali state (localStorage)
│   ├── Languages.tsx
│   ├── ProjectModal.tsx    # Slide-in project detail panel
│   ├── Projects.tsx        # Project grid + cards
│   ├── ScrollProgress.tsx  # Top progress bar
│   ├── Section.tsx         # Shared section wrapper + heading
│   ├── Sidebar.tsx         # Navigation, theme + language toggles
│   └── Skills.tsx
├── lib/
│   ├── data.ts         # All site content lives here
│   └── gsap.ts         # GSAP setup + shared animation helpers
├── public/
│   ├── activities/     # Activity photos
│   ├── projects/       # Project thumbnails
│   ├── profile.svg     # Avatar
│   └── resume.pdf      # Downloadable CV
├── next.config.ts
├── eslint.config.mjs
├── package.json
└── tsconfig.json
```

## Editing content

**All content lives in one file: [`lib/data.ts`](lib/data.ts).** Components only
read from it, so you can add, edit, or remove entries without touching any JSX or
CSS.

### Bilingual values

Every user-facing string is a `Bi` object with an English (`en`) and Nepali
(`ne`) value. The `bi()` helper keeps this concise:

```ts
import { bi } from "@/lib/data";

bi("Projects", "परियोजनाहरू");   // { en: "Projects", ne: "परियोजनाहरू" }
bi("GitHub");                     // both languages use "GitHub"
```

If a Nepali translation is missing, the site falls back to English (`useT()`).

### Profile & contacts

Set your identity and links once in `profile`; the header, sidebar, and contact
section are generated from it:

```ts
export const profile: Profile = {
  name: "Your Name",
  initials: "YN",
  title: { en: "…", ne: "…" },
  subtitle: { en: "…", ne: "…" },
  location: { en: "Nepal", ne: "नेपाल" },
  email: "you@example.com",
  github: "https://github.com/you",
  linkedin: "https://linkedin.com/in/you",
  twitter: "https://x.com/you",
  website: "https://example.com",
  resumeUrl: "/resume.pdf",
};
```

Every field except `name`, `initials`, `title`, and `subtitle` is optional.
Remove a link (or set it to `undefined`) and it disappears from the hero and the
contact section — no broken links. To add a contact method that is not part of
`profile` (for example a phone number), add it to `extraContacts`:

```ts
export const extraContacts: ContactItem[] = [
  { label: bi("Phone"), href: "tel:+9779800000000", icon: "globe" },
];
```

Available icons: `mail`, `github`, `linkedin`, `twitter`, `globe`, `resume`.

### Bio

```ts
export const bio: BiList = {
  en: ["First paragraph.", "Second paragraph."],
  ne: ["पहिलो अनुच्छेद।", "दोस्रो अनुच्छेद।"],
};
```

### Projects

```ts
export const projects: Project[] = [
  {
    id: "my-project",              // unique, used as the React key
    name: "My Project",
    date: "2025",
    description: { en: "One-line summary.", ne: "एक-लाइन सारांश।" },
    tags: ["Next.js", "TypeScript"],
    thumb: "/projects/my-project.png", // optional — see "Adding images"
    link: "https://demo.example.com",  // optional — "Live site" button
    github: "https://github.com/you/my-project", // optional
    tldr: { en: "Short intro.", ne: "छोटो परिचय।" }, // shown in the modal
    body: [
      { type: "p", content: { en: "Overview…", ne: "परिचय…" } },
      { type: "h2", content: { en: "Highlights", ne: "मुख्य विशेषताहरू" } },
      { type: "ul", items: { en: ["Point one."], ne: ["पहिलो बुँदा।"] } },
      { type: "hr" },
    ],
  },
];
```

Body blocks can be `p`, `h2`, `ul`, `ol`, or `hr`. Paragraph (`p`) content
supports inline HTML such as `<strong>` and `<a href="…">`.

- `github` / `link` are optional — the corresponding buttons only render when set.
- `thumb` is optional — without it, the card shows a styled placeholder with the
  project name.
- Projects past the first **4** are hidden behind a "Show more" button.

### Skills

```ts
export const skills: SkillGroup[] = [
  { category: bi("Languages", "भाषाहरू"), keywords: ["TypeScript", "Python"] },
];
```

Keywords render as colored chips. Define a color in `skillColors` (see
`ChipColor`: `{ bg, text, darkBg, darkText }`); keywords without an entry fall
back to a plain bordered tag.

### Education

```ts
export const education: EducationItem[] = [
  {
    institution: bi("University Name"),
    date: bi("2022 — Present"),
    degree: bi("Bachelor's in Computer Science"),
    location: bi("Nepal"),          // optional
    score: bi("GPA 3.8"),           // optional
    coursework: ["Algorithms", "Databases"], // optional
    highlights: { en: ["…"], ne: ["…"] },    // optional
  },
];
```

### Activities

```ts
export const activities: ActivityItem[] = [
  {
    name: bi("Open Source"),
    role: bi("Contributor"),        // optional
    location: bi("Remote"),         // optional
    date: bi("2023 — Present"),
    link: { label: bi("GitHub"), href: "https://github.com/you" }, // optional
    highlights: { en: ["…"], ne: ["…"] },   // optional
    photos: [                               // optional
      { src: "/activities/workshop.jpg", caption: bi("Workshop") },
    ],
  },
];
```

Photos appear as thumbnails that open in a lightbox when clicked.

### Certifications

```ts
export const certifications: AwardItem[] = [
  { year: "2024", title: "Full Stack Web Development", awarder: "Coursera" },
];
```

### Languages

```ts
export const languages: LanguageItem[] = [
  { name: bi("English", "अंग्रेजी"), level: bi("Native", "मातृभाषी") },
];
```

### Interface labels

Button and control text (e.g. "Show more", "Download CV") lives in the `ui`
object at the bottom of `lib/data.ts`. Edit or translate these there.

### Hiding a whole section

There is nothing to configure. Sections are driven by their data:

- Remove every entry of a section (e.g. empty `certifications`) and it vanishes
  from both the page and the navigation.
- `sectionAvailability` (in `lib/data.ts`) records which sections have content,
  and `navSections` is filtered from it. If you add a new section you will extend
  both `allNavSections` and `sectionAvailability`.

## Adding images

Put files in `public/` and reference them from the site root (no import needed).

| What               | Folder / file            | Reference                                        | Recommendation                         |
| ------------------ | ------------------------ | ------------------------------------------------ | -------------------------------------- |
| Project thumbnail  | `public/projects/`       | `thumb: "/projects/name.png"`                    | 16:9 (e.g. 1600×900), compressed       |
| Activity photo     | `public/activities/`     | `photos: [{ src: "/activities/x.jpg", … }]`      | Landscape; displayed ~150px tall (crop)|
| Avatar             | `public/profile.svg`     | `Home.tsx` → `/profile.svg`                       | Square (rendered 90×90), 1:1           |
| Résumé             | `public/resume.pdf`      | `profile.resumeUrl`                               | PDF                                    |

Images use plain `<img>` tags (no build-time optimization step required).

## Theming

Colors and spacing tokens are defined in the `:root` and `.dark` blocks at the
top of `app/globals.css` (`--bg`, `--text-primary`, `--border`, `--accent`, …).
Change them there to reskin the whole site; both themes use the same variable
names.

## Animations

Animations are centralized in `lib/gsap.ts` and applied per component with a
scoped `gsap.context`. They automatically turn off for visitors who enable
"Reduce motion" in their OS. To remove animations entirely, delete the
`useIsoLayoutEffect` blocks in the components — the site works without them.

## Accessibility

- Semantic landmarks (`aside`, `main`, `nav`, `section`) and one `<h1>` with
  `<h2>` section headings
- Keyboard-operable project modal and mobile menu (Escape to close, focus
  management, focus trap in the modal)
- "Skip to content" link, visible `:focus-visible` outlines
- `prefers-reduced-motion` respected in both CSS and JS
- Bilingual `lang` attribute on `<html>` follows the selected language

## Deployment

Deploy on [Vercel](https://vercel.com/) (recommended) or any host that supports
Next.js:

```bash
npm run build
npm run start
```

## Contact

- Email: hrkshnagtm@gmail.com
- GitHub: [Harikrishna-HG](https://github.com/Harikrishna-HG)

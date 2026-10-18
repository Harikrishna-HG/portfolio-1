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
- **CV-style sections**: Home, Projects, Research, Notes, Skills, Education,
  Activities, Certifications, Languages, Contact
- **Project detail modal** with summary, optional image, long-form body, and an
  optional case study (problem, role, technologies, technical decisions,
  outcomes) — empty fields are simply not rendered
- **Research & learning projects** — regular projects can add optional research
  fields (status, question, motivation, approach, methods, datasets, evaluation,
  findings, limitations, references, responsible-practice note)
- **Research interests** — a clearly framed, editable list of topics of
  curiosity (not a claim of expertise)
- **Reading notes** — short, own-words notes on papers and topics, with the
  original source kept separate
- **Project filtering** by technology — filter chips are derived from the
  projects' own tags
- **Project thumbnails** — optional image per project, with a styled fallback
- **Activity photos with lightbox** — click a photo to expand it
- **Scroll-reveal animations** via GSAP (fully disabled when the visitor prefers
  reduced motion)
- **Accessible** — semantic landmarks, skip link, keyboard-operable modal, filter
  chips and menu, visible focus rings, reduced-motion support
- **Search & sharing** — canonical URL, generated Open Graph / Twitter card
  image, `sitemap.xml`, and `robots.txt`
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
│   ├── opengraph-image.tsx # Generated social-sharing image
│   ├── page.tsx        # Assembles the sections + sidebar
│   ├── robots.ts       # Generates /robots.txt
│   ├── sitemap.ts      # Generates /sitemap.xml
│   └── twitter-image.tsx  # Same card, used for Twitter/X
├── components/
│   ├── Activities.tsx      # Activities list + photo lightbox
│   ├── Certifications.tsx
│   ├── Contact.tsx
│   ├── Education.tsx
│   ├── Home.tsx            # Hero + bio
│   ├── Icons.tsx           # Inline SVG icon set
│   ├── LanguageProvider.tsx# English/Nepali state (localStorage)
│   ├── Languages.tsx
│   ├── Notes.tsx           # Reading notes (papers, experiments, topics)
│   ├── ProjectModal.tsx    # Slide-in project detail panel + case study
│   ├── Projects.tsx        # Project grid, cards, technology filters
│   ├── Research.tsx        # Research interests
│   ├── ScrollProgress.tsx  # Top progress bar
│   ├── Section.tsx         # Shared section wrapper + heading
│   ├── Sidebar.tsx         # Navigation, theme + language toggles
│   └── Skills.tsx
├── lib/
│   ├── data.ts         # All site content lives here
│   ├── gsap.ts         # GSAP setup + shared animation helpers
│   ├── og.tsx          # Renders the generated social card
│   └── site.ts         # Canonical URL + site name
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
    tags: ["Next.js", "TypeScript"],   // technologies — also drives the filters
    thumb: "/projects/my-project.png", // optional — see "Adding images"
    link: "https://demo.example.com",  // optional — "Live site" button
    github: "https://github.com/you/my-project", // optional — "Source" button
    tldr: { en: "Short intro.", ne: "छोटो परिचय।" }, // shown in the modal

    // Optional case-study fields — rendered only when filled in
    problem: { en: "The need this addresses.", ne: "…" },
    role: { en: "What I designed and built.", ne: "…" },
    challenges: { en: "Key technical decisions.", ne: "…" },
    outcomes: { en: "Verifiable results only.", ne: "…" },

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
- Projects past the first **4** are hidden behind a "Show more" button. The
  button is hidden while a filter is active, so all matches stay visible.

### Case study

`problem`, `role`, `challenges`, and `outcomes` are optional bilingual (`Bi`)
strings shown in the detail modal, in that order, between the summary and the
free-form `body`. The `Technologies used` block reuses `tags`. Each block is
skipped when its text is empty, so you can add them one at a time and nothing
ever shows a blank heading.

**Only put something in `outcomes` that you can actually verify** — a public
URL, a published figure you own, or a quote you have permission to use. If you
cannot back it up, leave the field out; it simply will not render. The same
applies to the other case-study fields: do not invent work, metrics, or claims.

### Filtering

The filter chips at the top of the Projects section are generated from the
`tags` of every project, ordered by how often each tag is used. Nothing is
hard-coded, so the filters always match your current data. If only one tag
exists the filter row is hidden entirely. Each chip is a real `<button>` with
`aria-pressed`, so it works with the keyboard and the row wraps on mobile.
Selecting a chip shows every project using that technology, updates the result
count, and shows "No projects match this filter." if nothing matches. Click the
active chip again (or "All") to clear the filter.

### Adding or updating a project

1. Open `lib/data.ts` and find `export const projects`.
2. Copy the example above and set `id` to a unique kebab-case string.
3. Fill in `name`, `date`, `description`, `tags`, `tldr`, and `body`.
4. Add the cover image (see below) and set `thumb: "/projects/name.png"`.
5. Add case-study fields whenever you have something concrete and verifiable.
6. Run `npm run dev` and click the project to review the modal.

To update a project, edit its object — nothing else needs to change, and new
`tags` automatically appear as filter chips. To remove one, delete its object;
if it is the last project, the whole section (and its nav link) disappears.

### Project cover image

There is **no upload UI** — this is a static site, so covers are plain files in
the repo:

1. Save the image to `public/projects/` (e.g. `public/projects/yatayat.png`).
2. Set `thumb: "/projects/yatayat.png"` on the project in `lib/data.ts`.

The cover appears on both the project card and the detail modal. Use a 16:9
image (e.g. 1600×900), compressed. If `thumb` is omitted the card shows a styled
placeholder with the project name, so covers are always optional.

### Live site & source links

- `link` adds a **"Live site"** button on the card footer and in the modal.
- `github` adds a **"Source"** button in the modal and a compact **"GH"** button
  on the card.
- `links` adds any extra labelled links in the modal (write-ups, demos,
  datasets…).

All three are optional and render only when set.

### Editing a case study

Case-study text lives on the project object, right under `tags`. Keep `problem`
and `role` to a couple of sentences and use `body` blocks (`h2` + `ul`) for
longer detail. To state an outcome, first make sure there is a public source you
can point to, then put that sentence in `outcomes`.

### Research & learning projects

Research and learning work uses the **same `projects` array** — it just fills in
optional research fields. Because they are ordinary projects, they appear in the
grid, respond to the technology filters, and open in the same modal.

```ts
export const projects: Project[] = [
  {
    id: "sec-lab-notes",
    name: "Web Security Lab Notes",
    date: "2025",
    description: bi("Notes from learning web security fundamentals.", "…"),
    tags: ["Security", "Python"],
    status: "in-progress",          // "idea" | "in-progress" | "completed"
    question: bi("What are you trying to find out or learn?"),
    motivation: bi("Why this interests you."),
    approach: bi("How you are going about it."),
    methods: { en: ["Method or tool"], ne: ["विधि वा उपकरण"] },
    datasets: bi("Datasets used or planned."),        // optional
    evaluation: bi("How results are judged."),         // optional
    findings: { en: ["A lesson learned"], ne: ["सिकाइ"] },
    limitations: { en: ["A caveat"], ne: ["सीमा"] },
    ethics: bi("e.g. Testing was performed only in environments I am authorized to use."),
    references: [
      { label: bi("Author, Title, Year"), href: "https://…" }, // href optional
    ],
    links: [{ label: bi("Write-up"), href: "https://…" }],     // optional
    tldr: bi("Short intro shown in the modal."),
    body: [{ type: "p", content: bi("Notes…") }],
  },
];
```

All research fields are optional and render only when they have real text; you
never get an empty label. `status` also shows as a small badge on the card and in
the modal header.

**Responsible practice** — do not imply authorization, safety, or completion you
cannot support:

- **Security work:** fill `ethics` only to state a fact you can stand behind,
  for example that testing was done only in systems you are authorized to use. If
  you have not done the work, leave it blank.
- **AI/ML work:** use `datasets` and `evaluation` to be explicit about data and
  how results were judged, and `limitations` for caveats.
- **Never invent** results, metrics, publications, or credentials. Missing detail
  is better left empty — the field simply will not render.

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

### Research interests

A short, clearly framed list of topics you are curious about. Edit
`researchInterests` in `lib/data.ts`:

```ts
export const researchInterests = {
  intro: bi("Topics I want to explore…", "…"),
  note: bi(
    "These are personal interests, not a claim of expertise.",
    "…",
  ),
  interests: [
    {
      title: bi("Cybersecurity", "साइबर सुरक्षा"),
      description: bi("What interests you about it."),
      topics: ["Application Security", "Network Security"], // optional chips
    },
  ],
};
```

- The `note` is shown at the top of the section. Keep it — it makes clear these
  are interests, not professional experience or completed research.
- Emptying `interests` hides the whole section and its nav link.
- Use `title`, `description`, and optional `topics`; no claims of expertise.

### Reading notes

Short, own-words notes about papers, experiments, or technical topics. Edit
`readingNotes` in `lib/data.ts`:

```ts
export const readingNotes = {
  intro: bi("Short notes on what I am reading…", "…"),
  note: bi(
    "Summaries here are in my own words, not the source's text.",
    "…",
  ),
  items: [
    {
      title: "Attention Is All You Need — first read",
      date: "2025-03",
      summary: bi("My own brief summary and takeaways."),
      source: bi("Vaswani et al., 2017"),                 // optional
      href: "https://arxiv.org/abs/1706.03762",           // optional
      topics: ["Transformers", "NLP"],                    // optional
    },
  ],
};
```

- Write `summary` **in your own words** — never paste the source's text. The
  section labels your summary as "My notes" and keeps the `source` separate.
- `source` is the citation text; `href` links to the original work. Either can be
  omitted; if only `href` is set, a "View source" link is shown.
- Emptying `items` hides the whole section and its nav link.

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
| Project cover      | `public/projects/`       | `thumb: "/projects/name.png"`                    | 16:9 (e.g. 1600×900), compressed       |
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

## SEO & sharing

- `app/layout.tsx` holds the page title, description, canonical URL, and the
  Open Graph / Twitter fields.
- The social card image is **generated at build time** from your existing
  `profile` data (`lib/og.tsx` → `app/opengraph-image.tsx` and
  `app/twitter-image.tsx`), so there is no image asset to upload or maintain.
- `app/sitemap.ts` produces `/sitemap.xml` (one entry, since this is a single
  page) and `app/robots.ts` produces `/robots.txt`.
- The canonical host lives in `lib/site.ts` and is used by `metadataBase`, the
  sitemap, robots, and the generated card image. Override it per environment
  with the `NEXT_PUBLIC_SITE_URL` environment variable if needed.
- Everything on the card comes from data you already entered (name, job title,
  domain) — nothing is invented.

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

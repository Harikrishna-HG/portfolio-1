# Harikrishna Gautam — Portfolio

A minimal, typographic, CV-style portfolio built with **Next.js (App Router)**.
The design is a monochrome, border-based layout with a fixed sidebar, dark mode,
and a side-panel modal for project details.

## Features

- **Sidebar layout** with section navigation and active-section highlighting
- **Dark / light theme** toggle persisted in `localStorage` (no flash on load)
- **CV-style sections**: Home, Projects, Skills, Education, Certifications, Languages, Contact
- **Project detail modal** with tags, summary, and body content
- **Fully responsive** — the sidebar collapses into a top bar on mobile
- **Zero-JS-dependency styling** — plain CSS with design tokens (CSS variables)

## Tech stack

- [Next.js](https://nextjs.org/) 16 (App Router, Turbopack)
- [React](https://react.dev/) 19
- TypeScript
- Plain CSS (`app/globals.css`) with CSS custom properties
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
│   ├── layout.tsx      # Metadata, fonts, theme bootstrap script
│   └── page.tsx        # Assembles the sections + sidebar
├── components/
│   ├── Certifications.tsx
│   ├── Contact.tsx
│   ├── Education.tsx
│   ├── Home.tsx
│   ├── Icons.tsx
│   ├── Languages.tsx
│   ├── ProjectModal.tsx
│   ├── Projects.tsx
│   ├── Section.tsx
│   ├── Sidebar.tsx
│   └── Skills.tsx
├── lib/
│   └── data.ts         # All site content lives here
├── public/
│   ├── profile.svg     # Avatar
│   └── resume.pdf      # Downloadable CV
├── next.config.ts
├── eslint.config.mjs
├── package.json
└── tsconfig.json
```

## Customizing

Almost all content is centralized in [`lib/data.ts`](lib/data.ts) — edit the
`profile`, `bio`, `projects`, `skills`, `education`, `certifications`,
`languages`, and `contacts` exports.

- **Colors / theme**: the `:root` and `.dark` blocks in `app/globals.css`.
- **Avatar**: replace `public/profile.svg` with your own image.
- **Resume**: replace `public/resume.pdf`.

## Deployment

Deploy on [Vercel](https://vercel.com/) (recommended), or any platform that
supports Next.js. The project also builds to a static-friendly output.

## Contact

- Email: hrkshnagtm@gmail.com
- GitHub: [Harikrishna-HG](https://github.com/Harikrishna-HG)

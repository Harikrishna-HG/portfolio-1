export type SectionNavItem = {
  id: string;
  label: string;
};

export type BioBlock = { type: "p"; content: string };

export type ProjectBodyBlock =
  | { type: "h2"; content: string }
  | { type: "p"; content: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "hr" };

export type Project = {
  id: string;
  name: string;
  date: string;
  description: string;
  tags: string[];
  github?: string;
  link?: string;
  thumb?: string;
  tldr: string;
  body: ProjectBodyBlock[];
};

export type SkillGroup = {
  category: string;
  keywords: string[];
};

export type EducationItem = {
  institution: string;
  date: string;
  degree: string;
  location?: string;
  score?: string;
  coursework?: string[];
  highlights?: string[];
};

export type AwardItem = {
  year: string;
  title: string;
  awarder: string;
};

export type LanguageItem = {
  name: string;
  level: string;
};

export type ContactItem = {
  label: string;
  href: string;
  icon: "mail" | "github" | "linkedin" | "twitter" | "globe" | "resume";
};

export const profile = {
  name: "Harikrishna Gautam",
  initials: "HG",
  title: "Full Stack Developer & Software Engineer",
  subtitle:
    "Computer Science student and full stack developer building modern, user-focused web applications.",
  location: "Nepal",
  email: "hrkshnagtm@gmail.com",
  github: "https://github.com/Harikrishna-HG",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  resumeUrl: "/resume.pdf",
};

export const navSections: SectionNavItem[] = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "languages", label: "Languages" },
  { id: "contact", label: "Contact" },
];

export const homeContact: ContactItem[] = [
  { label: "Email", href: "mailto:hrkshnagtm@gmail.com", icon: "mail" },
  { label: "GitHub", href: "https://github.com/Harikrishna-HG", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
];

export const bio: string[] = [
  "I am a passionate software developer with a strong foundation in web development and a keen interest in creating user-friendly applications. I enjoy working with modern technologies and frameworks to build scalable, efficient solutions.",
  "My journey in technology has equipped me with both theoretical knowledge and practical skills. I'm constantly learning and adapting to new technologies, always striving to improve my craft and deliver high-quality work.",
];

export const projects: Project[] = [
  {
    id: "yatayat",
    name: "Yatayat",
    date: "2025",
    description:
      "A comprehensive transportation management system with real-time tracking, route optimization, and a user-friendly interface.",
    tags: ["Next.js", "React", "Tailwind CSS"],
    link: "https://yatayat.vercel.app",
    github: "https://github.com/Harikrishna-HG",
    tldr: "A transportation management platform for planning routes, tracking vehicles in real time, and managing transit operations.",
    body: [
      {
        type: "p",
        content:
          "Yatayat is a full-featured transportation management system built with Next.js and React. It helps operators manage routes, schedules, and live vehicle tracking through a clean, responsive interface.",
      },
      { type: "h2", content: "Highlights" },
      {
        type: "ul",
        items: [
          "Real-time vehicle tracking and status updates.",
          "Route planning and optimization tools.",
          "Responsive dashboard that works across devices.",
          "Component-driven architecture with reusable UI primitives.",
        ],
      },
      { type: "h2", content: "Stack" },
      {
        type: "p",
        content:
          "Built with <strong>Next.js</strong>, <strong>React</strong>, and <strong>Tailwind CSS</strong>, deployed on Vercel.",
      },
    ],
  },
  {
    id: "ecommerce",
    name: "E-Commerce Platform",
    date: "2024",
    description:
      "Full-stack e-commerce solution with payment integration, inventory management, and an admin dashboard.",
    tags: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/Harikrishna-HG",
    tldr: "A full-stack storefront with cart, checkout, payments, inventory management, and an admin dashboard.",
    body: [
      {
        type: "p",
        content:
          "A complete e-commerce platform covering the customer storefront and an administrative back office.",
      },
      { type: "h2", content: "Highlights" },
      {
        type: "ul",
        items: [
          "Product catalog with search and filtering.",
          "Cart and checkout flow with payment integration.",
          "Inventory and order management for admins.",
          "REST API backend with authentication.",
        ],
      },
    ],
  },
  {
    id: "task-management",
    name: "Task Management App",
    date: "2024",
    description:
      "Collaborative task manager with real-time updates, team features, and productivity analytics.",
    tags: ["TypeScript", "Express", "PostgreSQL"],
    github: "https://github.com/Harikrishna-HG",
    tldr: "A collaborative project and task manager with real-time updates and productivity insights.",
    body: [
      {
        type: "p",
        content:
          "A task management application designed for teams, supporting boards, assignments, and progress tracking.",
      },
      { type: "h2", content: "Highlights" },
      {
        type: "ul",
        items: [
          "Real-time updates across clients.",
          "Team collaboration with roles and assignments.",
          "Productivity analytics and reporting.",
          "Type-safe API written in TypeScript on Express.",
        ],
      },
    ],
  },
  {
    id: "weather-dashboard",
    name: "Weather Dashboard",
    date: "2023",
    description:
      "Interactive weather dashboard showing real-time data, forecasts, and climate trends with visualizations.",
    tags: ["React", "API Integration", "Charts"],
    github: "https://github.com/Harikrishna-HG",
    tldr: "A weather dashboard presenting live conditions, multi-day forecasts, and visual trends.",
    body: [
      {
        type: "p",
        content:
          "An interactive dashboard that aggregates weather data from public APIs and renders it with charts and cards.",
      },
      { type: "h2", content: "Highlights" },
      {
        type: "ul",
        items: [
          "Live conditions and multi-day forecasts.",
          "Location search with geolocation support.",
          "Chart-based visualization of temperature and precipitation.",
        ],
      },
    ],
  },
  {
    id: "social-analytics",
    name: "Social Media Analytics",
    date: "2023",
    description:
      "Analytics platform for social metrics, engagement tracking, and audience insights with reporting.",
    tags: ["Vue.js", "Python", "Data Viz"],
    github: "https://github.com/Harikrishna-HG",
    tldr: "An analytics tool that tracks social engagement and surfaces audience insights through reports.",
    body: [
      {
        type: "p",
        content:
          "A data-driven analytics platform that collects social media metrics and turns them into actionable reports.",
      },
      { type: "h2", content: "Highlights" },
      {
        type: "ul",
        items: [
          "Engagement and growth tracking over time.",
          "Audience segmentation and insights.",
          "Exportable reports with charts.",
        ],
      },
    ],
  },
  {
    id: "blog-platform",
    name: "Blog Platform",
    date: "2023",
    description:
      "Modern blogging platform with markdown support, SEO optimization, and a content management system.",
    tags: ["Next.js", "MDX", "CMS"],
    github: "https://github.com/Harikrishna-HG",
    tldr: "A markdown-powered blogging platform with SEO and a lightweight content management workflow.",
    body: [
      {
        type: "p",
        content:
          "A blogging platform built for writers and creators, with markdown authoring and SEO-friendly output.",
      },
      { type: "h2", content: "Highlights" },
      {
        type: "ul",
        items: [
          "MDX markdown authoring with components.",
          "SEO metadata and sitemap generation.",
          "Fast, statically rendered pages.",
        ],
      },
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    keywords: ["JavaScript", "TypeScript", "Python", "Java", "C++"],
  },
  {
    category: "Frontend",
    keywords: ["React", "Next.js", "Vue.js", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    category: "Backend",
    keywords: ["Node.js", "Express", "REST APIs", "Authentication"],
  },
  {
    category: "Databases",
    keywords: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
  },
  {
    category: "Tools",
    keywords: ["Git", "GitHub", "Docker", "VS Code", "Vercel"],
  },
  {
    category: "Cloud",
    keywords: ["AWS", "Vercel", "CI/CD"],
  },
];

export const education: EducationItem[] = [
  {
    institution: "Far Western University",
    date: "2022 — Present",
    degree: "Bachelor's Degree in Computer Science",
    location: "Nepal",
    coursework: [
      "Data Structures",
      "Algorithms",
      "Databases",
      "Operating Systems",
      "Web Development",
    ],
    highlights: [
      "Pursuing advanced studies in technology and computer science.",
      "Active in project-based learning and software engineering coursework.",
    ],
  },
  {
    institution: "Secondary Education",
    date: "Completed",
    degree: "High School — Science & Mathematics",
    location: "Nepal",
    highlights: ["Built a foundation in science and mathematics."],
  },
];

export const certifications: AwardItem[] = [
  {
    year: "2024",
    title: "Full Stack Web Development",
    awarder: "Coursera",
  },
  {
    year: "2024",
    title: "React — The Complete Guide",
    awarder: "Udemy",
  },
  {
    year: "2023",
    title: "JavaScript Algorithms and Data Structures",
    awarder: "freeCodeCamp",
  },
  {
    year: "2023",
    title: "AWS Certified Cloud Practitioner",
    awarder: "Amazon Web Services",
  },
  {
    year: "2023",
    title: "TypeScript for Professionals",
    awarder: "Udemy",
  },
  {
    year: "2023",
    title: "Node.js — The Complete Guide",
    awarder: "Udemy",
  },
];

export const languages: LanguageItem[] = [
  { name: "English", level: "Professional working proficiency" },
  { name: "Nepali", level: "Native speaker" },
  { name: "Hindi", level: "Conversational" },
];

export const contacts: ContactItem[] = [
  { label: "hrkshnagtm@gmail.com", href: "mailto:hrkshnagtm@gmail.com", icon: "mail" },
  { label: "GitHub", href: "https://github.com/Harikrishna-HG", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { label: "Resume", href: "/resume.pdf", icon: "resume" },
];

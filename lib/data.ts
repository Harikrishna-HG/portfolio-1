export type Lang = "en" | "ne";

export type Bi = Record<Lang, string>;

export type BiList = Record<Lang, string[]>;

/** Shorthand for bilingual values: `bi("Projects", "परियojana")`. */
export const bi = (en: string, ne: string = en): Bi => ({ en, ne });

export type SectionId =
  | "home"
  | "projects"
  | "research"
  | "notes"
  | "skills"
  | "education"
  | "activities"
  | "certifications"
  | "languages"
  | "contact";

export type SectionNavItem = {
  id: SectionId;
  label: Bi;
};

export type Profile = {
  name: string;
  initials: string;
  title: Bi;
  subtitle: Bi;
  location?: Bi;
  email?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  resumeUrl?: string;
};

export type ProjectBodyBlock =
  | { type: "h2"; content: Bi }
  | { type: "p"; content: Bi }
  | { type: "ul"; items: BiList }
  | { type: "ol"; items: BiList }
  | { type: "hr" };

/** A general-purpose labelled link on a project. */
export type ProjectLink = { label: Bi; href: string };

/** A citation for a research project. `href` is optional. */
export type ResearchReference = { label: Bi; href?: string };

/** Stage of a research or learning project. */
export type ResearchStatus = "idea" | "in-progress" | "completed";

export type Project = {
  id: string;
  name: string;
  date: string;
  description: Bi;
  /** Technologies used. Also drives the project filters and the modal chips. */
  tags: string[];
  /** The problem or need the project addresses. Optional. */
  problem?: Bi;
  /** Your role and contributions on the project. Optional. */
  role?: Bi;
  /** Important technical decisions or challenges. Optional. */
  challenges?: Bi;
  /** Verifiable outcomes only. Leave undefined if you cannot state them factually. */
  outcomes?: Bi;

  // --- Research / learning projects (all optional; rendered only when filled) ---
  /** Current stage. Shown as a badge on the card and in the modal. */
  status?: ResearchStatus;
  /** The research question or goal. */
  question?: Bi;
  /** Why this is worth exploring. */
  motivation?: Bi;
  /** How you went (or plan to go) about it. */
  approach?: Bi;
  /** Methods and tools, as a short bilingual list. */
  methods?: BiList;
  /** Datasets used or planned. */
  datasets?: Bi;
  /** How results are (or will be) evaluated. */
  evaluation?: Bi;
  /** Findings or lessons learned. */
  findings?: BiList;
  /** Known limitations and caveats. */
  limitations?: BiList;
  /**
   * Responsible-practice note. For security work, state that any testing was
   * done only in authorized environments. For AI/ML, clarify data and ethics.
   */
  ethics?: Bi;
  /** Citations / sources. */
  references?: ResearchReference[];
  /** Extra links (write-ups, demos, datasets, repositories). */
  links?: ProjectLink[];

  github?: string;
  link?: string;
  thumb?: string;
  tldr: Bi;
  body: ProjectBodyBlock[];
};

/** A topic of personal interest — clearly framed as curiosity, not expertise. */
export type ResearchInterest = {
  title: Bi;
  description: Bi;
  topics?: string[];
};

/** A short note about a paper, experiment, or technical topic. */
export type ReadingNote = {
  title: string;
  date: string;
  /** Your own brief summary — never paste the source's text. */
  summary: Bi;
  /** The original work this note is about (author, title, venue, year). */
  source?: Bi;
  /** Optional link to the original work. */
  href?: string;
  topics?: string[];
};

export type SkillGroup = {
  category: Bi;
  keywords: string[];
};

export type EducationItem = {
  institution: Bi;
  date: Bi;
  degree: Bi;
  location?: Bi;
  score?: Bi;
  coursework?: string[];
  highlights?: BiList;
};

export type AwardItem = {
  year: string;
  title: string;
  awarder: string;
};

export type ActivityPhoto = {
  src: string;
  caption: Bi;
};

export type ActivityItem = {
  name: Bi;
  role?: Bi;
  location?: Bi;
  date: Bi;
  link?: { label: Bi; href: string };
  highlights?: BiList;
  photos?: ActivityPhoto[];
};

export type LanguageItem = {
  name: Bi;
  level: Bi;
};

export type ContactItem = {
  label: Bi;
  href: string;
  icon: "mail" | "github" | "linkedin" | "twitter" | "globe" | "resume";
};

export const profile: Profile = {
  name: "Harikrishna Gautam",
  initials: "HG",
  title: {
    en: "Full Stack Developer & Software Engineer",
    ne: "फुल स्ट्याक डेभलपर र सफ्टवेयर इन्जिनियर",
  },
  subtitle: {
    en: "Computer Science student and full stack developer building modern, user-focused web applications.",
    ne: "कम्प्युटर साइन्सका विद्यार्थी र फुल स्ट्याक डेभलपर, आधुनिक र प्रयोगकर्तामैत्री वेब एप्लिकेसन बनाउँदै।",
  },
  location: { en: "Nepal", ne: "नेपाल" },
  email: "hrkshnagtm@gmail.com",
  github: "https://github.com/Harikrishna-HG",
  linkedin: "https://www.linkedin.com/in/harikrishna-hg/",
  twitter: "https://x.com/hrkshnagtm",
  website: "https://harikrishnagautam.com.np",
  resumeUrl: "/resume.pdf",
};

const allNavSections: SectionNavItem[] = [
  { id: "home", label: { en: "Home", ne: "गृहपृष्ठ" } },
  { id: "projects", label: { en: "Projects", ne: "परियोजनाहरू" } },
  { id: "research", label: { en: "Research", ne: "अनुसन्धान" } },
  { id: "notes", label: { en: "Notes", ne: "टिप्पणीहरू" } },
  { id: "skills", label: { en: "Skills", ne: "सीपहरू" } },
  { id: "education", label: { en: "Education", ne: "शिक्षा" } },
  { id: "activities", label: { en: "Activities", ne: "गतिविधिहरू" } },
  { id: "certifications", label: { en: "Certifications", ne: "प्रमाणपत्रहरू" } },
  { id: "languages", label: { en: "Languages", ne: "भाषाहरू" } },
  { id: "contact", label: { en: "Contact", ne: "सम्पर्क" } },
];

function buildHomeContacts(p: Profile): ContactItem[] {
  const items: ContactItem[] = [];
  if (p.email) {
    items.push({ label: { en: "Email", ne: "इमेल" }, href: `mailto:${p.email}`, icon: "mail" });
  }
  if (p.github) items.push({ label: bi("GitHub"), href: p.github, icon: "github" });
  if (p.linkedin) items.push({ label: bi("LinkedIn"), href: p.linkedin, icon: "linkedin" });
  if (p.twitter) items.push({ label: bi("Twitter"), href: p.twitter, icon: "twitter" });
  if (p.website) items.push({ label: { en: "Website", ne: "वेबसाइट" }, href: p.website, icon: "globe" });
  return items;
}

function buildContacts(p: Profile): ContactItem[] {
  const items: ContactItem[] = [];
  if (p.email) {
    items.push({ label: bi(p.email), href: `mailto:${p.email}`, icon: "mail" });
  }
  if (p.github) items.push({ label: bi("GitHub"), href: p.github, icon: "github" });
  if (p.linkedin) items.push({ label: bi("LinkedIn"), href: p.linkedin, icon: "linkedin" });
  if (p.twitter) items.push({ label: bi("Twitter"), href: p.twitter, icon: "twitter" });
  if (p.website) items.push({ label: { en: "Website", ne: "वेबसाइट" }, href: p.website, icon: "globe" });
  if (p.resumeUrl) {
    items.push({ label: { en: "Resume", ne: "रिजुमे" }, href: p.resumeUrl, icon: "resume" });
  }
  return items;
}

/** Extra contact methods that are not part of `profile` (e.g. a phone number). */
export const extraContacts: ContactItem[] = [];

export const homeContact: ContactItem[] = buildHomeContacts(profile);

export const bio: BiList = {
  en: [
    "I am a passionate software developer with a strong foundation in web development and a keen interest in creating user-friendly applications. I enjoy working with modern technologies and frameworks to build scalable, efficient solutions.",
    "My journey in technology has equipped me with both theoretical knowledge and practical skills. I'm constantly learning and adapting to new technologies, always striving to improve my craft and deliver high-quality work.",
  ],
  ne: [
    "म वेब डेभलपमेन्टमा बलियो आधार भएको र प्रयोगकर्तामैत्री एप्लिकेसन बनाउन इच्छुक सफ्टवेयर डेभलपर हुँ। आधुनिक प्रविधि र फ्रेमवर्कहरू प्रयोग गरी स्केलेबल र प्रभावकारी समाधान बनाउन मन पर्छ।",
    "प्रविधिको यात्रामा मैले सैद्धान्तिक ज्ञान र व्यावहारिक सीप दुवै हासिल गरेको छु। म निरन्तर नयाँ प्रविधि सिक्दै अभ्यास गर्दै उच्च गुणस्तरको काम गर्न प्रयासरत छु।",
  ],
};

/**
 * Projects — regular and research/learning. Every field except `id`, `name`,
 * `date`, `description`, `tags`, `tldr`, and `body` is optional. Optional fields
 * are rendered only when filled in, so it is safe to add them one at a time.
 *
 *   {
 *     id: "my-project",
 *     name: "My Project",
 *     date: "2025",
 *     description: bi("One-line summary.", "एक-लाइन सारांश।"),
 *     tags: ["Next.js", "TypeScript"],        // technologies (drives filters)
 *     problem: bi("The need this addresses."), // optional
 *     role: bi("What I designed and built."),  // optional
 *     challenges: bi("Key decisions I made."), // optional
 *     outcomes: bi("Only verifiable results."),// optional
 *     link: "https://demo.example.com",        // optional live site
 *     github: "https://github.com/you/repo",   // optional source
 *     thumb: "/projects/my-project.png",       // optional image
 *     tldr: bi("Short intro shown in the modal."),
 *     body: [ { type: "p", content: bi("Overview.") } ],
 *   }
 *
 * Research / learning projects add these (all optional):
 *
 *   {
 *     status: "idea" | "in-progress" | "completed",
 *     question: bi("What are you trying to find out?"),
 *     motivation: bi("Why does this interest you?"),
 *     approach: bi("How you went about it."),
 *     methods: { en: ["Method"], ne: ["विधि"] },
 *     datasets: bi("Datasets used or planned."),
 *     evaluation: bi("How you evaluate results."),
 *     findings: { en: ["Lesson learned"], ne: ["सिकाइ"] },
 *     limitations: { en: ["Caveat"], ne: ["सीमा"] },
 *     ethics: bi("e.g. testing done only in authorized environments."),
 *     references: [ { label: bi("Author, Title, Year"), href: "https://…" } ],
 *     links: [ { label: bi("Write-up"), href: "https://…" } ],
 *   }
 */
export const projects: Project[] = [
  {
    id: "yatayat",
    name: "Yatayat",
    date: "2025",
    description: {
      en: "A comprehensive transportation management system with real-time tracking, route optimization, and a user-friendly interface.",
      ne: "रियल-टाइम ट्र्याकिङ, रुट अप्टिमाइजेसन र प्रयोगकर्तामैत्री इन्टरफेस सहितको पूर्ण यातायात व्यवस्थापन प्रणाली।",
    },
    tags: ["Next.js", "React", "Tailwind CSS"],
    link: "https://yatayat.vercel.app",
    github: "https://github.com/Harikrishna-HG",
    tldr: {
      en: "A transportation management platform for planning routes, tracking vehicles in real time, and managing transit operations.",
      ne: "रुट योजना, रियल-टाइम सवारी ट्र्याकिङ र यातायात सञ्चालन व्यवस्थापन गर्ने प्लेटफर्म।",
    },
    body: [
      {
        type: "p",
        content: {
          en: "Yatayat is a full-featured transportation management system built with Next.js and React. It helps operators manage routes, schedules, and live vehicle tracking through a clean, responsive interface.",
          ne: "यातायात Next.js र React मा बनेको पूर्ण सुविधायुक्त यातायात व्यवस्थापन प्रणाली हो। यसले सञ्चालकहरूलाई रुट, समयतालिका र प्रत्यक्ष सवारी ट्र्याकिङ सफा र रेस्पोन्सिभ इन्टरफेसमार्फत व्यवस्थापन गर्न मद्दत गर्छ।",
        },
      },
      { type: "h2", content: { en: "Highlights", ne: "मुख्य विशेषताहरू" } },
      {
        type: "ul",
        items: {
          en: [
            "Real-time vehicle tracking and status updates.",
            "Route planning and optimization tools.",
            "Responsive dashboard that works across devices.",
            "Component-driven architecture with reusable UI primitives.",
          ],
          ne: [
            "रियल-टाइम सवारी ट्र्याकिङ र स्थिति अपडेट।",
            "रुट योजना र अप्टिमाइजेसन उपकरणहरू।",
            "सबै उपकरणमा चल्ने रेस्पोन्सिभ ड्यासबोर्ड।",
            "पुनः प्रयोग गर्न मिल्ने UI कम्पोनेन्टहरूको आर्किटेक्चर।",
          ],
        },
      },
      { type: "h2", content: { en: "Stack", ne: "प्रविधि" } },
      {
        type: "p",
        content: {
          en: "Built with <strong>Next.js</strong>, <strong>React</strong>, and <strong>Tailwind CSS</strong>, deployed on Vercel.",
          ne: "<strong>Next.js</strong>, <strong>React</strong> र <strong>Tailwind CSS</strong> मा निर्मित, Vercel मा डिप्लोय गरिएको।",
        },
      },
    ],
  },
  {
    id: "ecommerce",
    name: "E-Commerce Platform",
    date: "2024",
    description: {
      en: "Full-stack e-commerce solution with payment integration, inventory management, and an admin dashboard.",
      ne: "पेमेन्ट इन्टिग्रेसन, इन्भेन्टरी व्यवस्थापन र एडमिन ड्यासबोर्ड सहितको फुल-स्ट्याक ई-कमर्स समाधान।",
    },
    tags: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/Harikrishna-HG",
    tldr: {
      en: "A full-stack storefront with cart, checkout, payments, inventory management, and an admin dashboard.",
      ne: "कार्ट, चेकआउट, पेमेन्ट, इन्भेन्टरी व्यवस्थापन र एडमिन ड्यासबोर्ड सहितको फुल-स्ट्याक स्टोरफ्रन्ट।",
    },
    body: [
      {
        type: "p",
        content: {
          en: "A complete e-commerce platform covering the customer storefront and an administrative back office.",
          ne: "ग्राहक स्टोरफ्रन्ट र प्रशासनिक ब्याक अफिस दुवै समेट्ने पूर्ण ई-कमर्स प्लेटफर्म।",
        },
      },
      { type: "h2", content: { en: "Highlights", ne: "मुख्य विशेषताहरू" } },
      {
        type: "ul",
        items: {
          en: [
            "Product catalog with search and filtering.",
            "Cart and checkout flow with payment integration.",
            "Inventory and order management for admins.",
            "REST API backend with authentication.",
          ],
          ne: [
            "खोज र फिल्टर सहितको उत्पादन क्याटलग।",
            "पेमेन्ट इन्टिग्रेसन सहितको कार्ट र चेकआउट।",
            "एडमिनका लागि इन्भेन्टरी र अर्डर व्यवस्थापन।",
            "प्रमाणीकरण सहितको REST API ब्याकएन्ड।",
          ],
        },
      },
    ],
  },
  {
    id: "task-management",
    name: "Task Management App",
    date: "2024",
    description: {
      en: "Collaborative task manager with real-time updates, team features, and productivity analytics.",
      ne: "रियल-टाइम अपडेट, टिम सुविधा र उत्पादकत्व विश्लेषण सहितको सहयोगी टास्क म्यानेजर।",
    },
    tags: ["TypeScript", "Express", "PostgreSQL"],
    github: "https://github.com/Harikrishna-HG",
    tldr: {
      en: "A collaborative project and task manager with real-time updates and productivity insights.",
      ne: "रियल-टाइम अपडेट र उत्पादकत्व जानकारी सहितको सहयोगी परियोजना तथा कार्य व्यवस्थापक।",
    },
    body: [
      {
        type: "p",
        content: {
          en: "A task management application designed for teams, supporting boards, assignments, and progress tracking.",
          ne: "टिमका लागि बनाइएको टास्क व्यवस्थापन एप्लिकेसन, जसमा बोर्ड, असाइनमेन्ट र प्रगति ट्र्याकिङ समर्थित छ।",
        },
      },
      { type: "h2", content: { en: "Highlights", ne: "मुख्य विशेषताहरू" } },
      {
        type: "ul",
        items: {
          en: [
            "Real-time updates across clients.",
            "Team collaboration with roles and assignments.",
            "Productivity analytics and reporting.",
            "Type-safe API written in TypeScript on Express.",
          ],
          ne: [
            "क्लाइन्टहरूमा रियल-टाइम अपडेट।",
            "भूमिका र असाइनमेन्ट सहितको टिम सहयोग।",
            "उत्पादकत्व विश्लेषण र रिपोर्टिङ।",
            "Express मा TypeScript मा लेखिएको टाइप-सेफ API।",
          ],
        },
      },
    ],
  },
  {
    id: "weather-dashboard",
    name: "Weather Dashboard",
    date: "2023",
    description: {
      en: "Interactive weather dashboard showing real-time data, forecasts, and climate trends with visualizations.",
      ne: "रियल-टाइम डेटा, पूर्वानुमान र जलवायु प्रवृत्ति देखाउने अन्तरक्रियात्मक मौसम ड्यासबोर्ड।",
    },
    tags: ["React", "API Integration", "Charts"],
    github: "https://github.com/Harikrishna-HG",
    tldr: {
      en: "A weather dashboard presenting live conditions, multi-day forecasts, and visual trends.",
      ne: "प्रत्यक्ष मौसम अवस्था, बहु-दिन पूर्वानुमान र दृश्य प्रवृत्ति देखाउने मौसम ड्यासबोर्ड।",
    },
    body: [
      {
        type: "p",
        content: {
          en: "An interactive dashboard that aggregates weather data from public APIs and renders it with charts and cards.",
          ne: "सार्वजनिक API बाट मौसम डेटा संकलन गरी चार्ट र कार्डमार्फत देखाउने अन्तरक्रियात्मक ड्यासबोर्ड।",
        },
      },
      { type: "h2", content: { en: "Highlights", ne: "मुख्य विशेषताहरू" } },
      {
        type: "ul",
        items: {
          en: [
            "Live conditions and multi-day forecasts.",
            "Location search with geolocation support.",
            "Chart-based visualization of temperature and precipitation.",
          ],
          ne: [
            "प्रत्यक्ष अवस्था र बहु-दिन पूर्वानुमान।",
            "जियोलोकेसन सहितको स्थान खोज।",
            "तापक्रम र वर्षाको चार्ट-आधारित दृश्यीकरण।",
          ],
        },
      },
    ],
  },
  {
    id: "social-analytics",
    name: "Social Media Analytics",
    date: "2023",
    description: {
      en: "Analytics platform for social metrics, engagement tracking, and audience insights with reporting.",
      ne: "सामाजिक मेट्रिक्स, इन्गेजमेन्ट ट्र्याकिङ र दर्शक अन्तर्दृष्टि सहितको विश्लेषण प्लेटफर्म।",
    },
    tags: ["Vue.js", "Python", "Data Viz"],
    github: "https://github.com/Harikrishna-HG",
    tldr: {
      en: "An analytics tool that tracks social engagement and surfaces audience insights through reports.",
      ne: "सामाजिक इन्गेजमेन्ट ट्र्याक गरी रिपोर्टमार्फत दर्शक अन्तर्दृष्टि देखाउने विश्लेषण उपकरण।",
    },
    body: [
      {
        type: "p",
        content: {
          en: "A data-driven analytics platform that collects social media metrics and turns them into actionable reports.",
          ne: "सामाजिक सञ्जाल मेट्रिक्स संकलन गरी कार्ययोग्य रिपोर्टमा बदल्ने डेटा-आधारित विश्लेषण प्लेटफर्म।",
        },
      },
      { type: "h2", content: { en: "Highlights", ne: "मुख्य विशेषताहरू" } },
      {
        type: "ul",
        items: {
          en: [
            "Engagement and growth tracking over time.",
            "Audience segmentation and insights.",
            "Exportable reports with charts.",
          ],
          ne: [
            "समयसँगै इन्गेजमेन्ट र वृद्धि ट्र्याकिङ।",
            "दर्शक खण्डीकरण र अन्तर्दृष्टि।",
            "चार्ट सहित निर्यात गर्न मिल्ने रिपोर्ट।",
          ],
        },
      },
    ],
  },
  {
    id: "blog-platform",
    name: "Blog Platform",
    date: "2023",
    description: {
      en: "Modern blogging platform with markdown support, SEO optimization, and a content management system.",
      ne: "मार्कडाउन समर्थन, SEO अप्टिमाइजेसन र कन्टेन्ट म्यानेजमेन्ट सिस्टम सहितको आधुनिक ब्लग प्लेटफर्म।",
    },
    tags: ["Next.js", "MDX", "CMS"],
    github: "https://github.com/Harikrishna-HG",
    tldr: {
      en: "A markdown-powered blogging platform with SEO and a lightweight content management workflow.",
      ne: "मार्कडाउन-आधारित, SEO-मैत्री र हल्का CMS सहितको ब्लगिङ प्लेटफर्म।",
    },
    body: [
      {
        type: "p",
        content: {
          en: "A blogging platform built for writers and creators, with markdown authoring and SEO-friendly output.",
          ne: "लेखक र सिर्जनाकर्ताका लागि बनाइएको ब्लगिङ प्लेटफर्म, जसमा मार्कडाउन लेखन र SEO-मैत्री आउटपुट छ।",
        },
      },
      { type: "h2", content: { en: "Highlights", ne: "मुख्य विशेषताहरू" } },
      {
        type: "ul",
        items: {
          en: [
            "MDX markdown authoring with components.",
            "SEO metadata and sitemap generation.",
            "Fast, statically rendered pages.",
          ],
          ne: [
            "कम्पोनेन्ट सहितको MDX मार्कडाउन लेखन।",
            "SEO मेटाडेटा र साइटम्याप उत्पादन।",
            "छिटो, स्ट्याटिक रूपमा रेन्डर गरिएका पृष्ठहरू।",
          ],
        },
      },
    ],
  },
];

/**
 * Research interests. These are topics of curiosity, NOT a claim of expertise,
 * certifications, or completed research — the `note` makes that explicit and is
 * shown at the top of the section. Empty `interests` hides the whole section.
 */
export const researchInterests: {
  intro: Bi;
  note: Bi;
  interests: ResearchInterest[];
} = {
  intro: {
    en: "Topics I am genuinely curious about and want to explore further through coursework, reading, and small hands-on experiments as I learn.",
    ne: "म साँच्चै जिज्ञासा राख्ने र पाठ्यक्रम, पढाइ तथा साना प्रयोगमार्फत अझ अध्ययन गर्न चाहने विषयहरू।",
  },
  note: {
    en: "These are personal interests, not a claim of professional expertise, certification, or completed research.",
    ne: "यी व्यक्तिगत रुचिहरू हुन् — व्यावसायिक विशेषज्ञता, प्रमाणपत्र वा सम्पन्न अनुसन्धानको दाबी होइन।",
  },
  interests: [
    {
      title: { en: "Cybersecurity", ne: "साइबर सुरक्षा" },
      description: {
        en: "I want to understand how systems are attacked and defended — application security, network fundamentals, and secure development practices — building a strong ethical foundation first.",
        ne: "सिस्टमहरू कसरी आक्रमणको सिकार र सुरक्षित गरिन्छन् — एप्लिकेसन सुरक्षा, नेटवर्क आधार र सुरक्षित विकास अभ्यास — बुझ्न चाहन्छु, पहिले बलियो नैतिक आधार बनाउँदै।",
      },
      topics: ["Application Security", "Network Security", "Secure Coding"],
    },
    {
      title: {
        en: "Artificial Intelligence & Machine Learning",
        ne: "कृत्रिम बुद्धिमत्ता र मेसिन लर्निङ",
      },
      description: {
        en: "I want to learn how models learn from data — the fundamentals of machine learning, deep learning, and natural language processing — and how these methods are applied and evaluated responsibly.",
        ne: "मोडेलहरूले डेटाबाट कसरी सिक्छन् — मेसिन लर्निङ, डीप लर्निङ र प्राकृतिक भाषा प्रशोधनका आधार — र यी विधि कसरी जिम्मेवार रूपमा प्रयोग र मूल्याङ्कन गरिन्छन् भन्ने सिक्न चाहन्छु।",
      },
      topics: ["Machine Learning", "Deep Learning", "NLP"],
    },
    {
      title: {
        en: "Research & Evidence-Based Learning",
        ne: "अनुसन्धान र प्रमाण-आधारित सिकाइ",
      },
      description: {
        en: "I am interested in reading and understanding research, trying small reproducible experiments, and learning to evaluate claims carefully instead of taking them at face value.",
        ne: "अनुसन्धान पढ्न र बुझ्न, साना पुनरुत्पादनयोग्य प्रयोग गर्न, र दाबीहरूलाई जस्ताको तस्तै नमानी सावधानीपूर्वक मूल्याङ्कन गर्न सिक्नमा रुचि राख्छु।",
      },
      topics: ["Paper Reading", "Reproducibility", "Critical Evaluation"],
    },
  ],
};

/** Stage labels for research / learning projects. */
export const researchStatusLabels: Record<ResearchStatus, Bi> = {
  idea: { en: "Idea", ne: "परिकल्पना" },
  "in-progress": { en: "In progress", ne: "प्रगतिमा" },
  completed: { en: "Completed", ne: "सम्पन्न" },
};

/**
 * Short reading/experiment notes. Each `summary` must be written in your own
 * words — never paste the source's text. Empty `items` hides the whole section.
 *
 *   items: [
 *     {
 *       title: "Attention Is All You Need — first read",
 *       date: "2025-03",
 *       summary: bi("What I took away, in my own words."),
 *       source: bi("Vaswani et al., 2017"),
 *       href: "https://arxiv.org/abs/1706.03762",
 *       topics: ["Transformers", "NLP"],
 *     },
 *   ]
 */
export const readingNotes: {
  intro: Bi;
  note: Bi;
  items: ReadingNote[];
} = {
  intro: {
    en: "Brief notes on papers, experiments, and technical topics I am reading about. These are my own short summaries and takeaways.",
    ne: "मैले पढिरहेका पेपर, प्रयोग र प्राविधिक विषयमा छोटा टिप्पणीहरू। यी मेरा आफ्नै संक्षिप्त सारांश र मुख्य बुँदाहरू हुन्।",
  },
  note: {
    en: "Summaries here are written in my own words and are not the source's text. Follow the link for the original work.",
    ne: "यहाँका सारांशहरू मेरा आफ्नै शब्दमा लेखिएका हुन्, स्रोतको पाठ होइन। मूल कामका लागि लिंक खोल्नुहोस्।",
  },
  items: [],
};

export const skills: SkillGroup[] = [
  {
    category: { en: "Languages", ne: "भाषाहरू" },
    keywords: ["JavaScript", "TypeScript", "Python", "Java", "C++"],
  },
  {
    category: { en: "Frontend", ne: "फ्रन्टएन्ड" },
    keywords: ["React", "Next.js", "Vue.js", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    category: { en: "Backend", ne: "ब्याकएन्ड" },
    keywords: ["Node.js", "Express", "REST APIs", "Authentication"],
  },
  {
    category: { en: "Databases", ne: "डेटाबेसहरू" },
    keywords: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
  },
  {
    category: { en: "Tools", ne: "उपकरणहरू" },
    keywords: ["Git", "GitHub", "Docker", "VS Code", "Vercel"],
  },
  {
    category: { en: "Cloud", ne: "क्लाउड" },
    keywords: ["AWS", "Vercel", "CI/CD"],
  },
];

export type ChipColor = {
  bg: string;
  text: string;
  darkBg: string;
  darkText: string;
};

export const skillColors: Record<string, ChipColor> = {
  JavaScript: {
    bg: "#fef9c3",
    text: "#854d0e",
    darkBg: "#3d2e00",
    darkText: "#fde68a",
  },
  TypeScript: {
    bg: "#dbeafe",
    text: "#1d4ed8",
    darkBg: "#1e3358",
    darkText: "#93c5fd",
  },
  Python: {
    bg: "#e8f0fe",
    text: "#2a56c6",
    darkBg: "#1e3a5f",
    darkText: "#93c5fd",
  },
  Java: {
    bg: "#fff0e0",
    text: "#c05700",
    darkBg: "#3d1f00",
    darkText: "#fdba74",
  },
  "C++": {
    bg: "#e0e7ff",
    text: "#4338ca",
    darkBg: "#1e1b4b",
    darkText: "#a5b4fc",
  },
  React: {
    bg: "#cffafe",
    text: "#0e7490",
    darkBg: "#0c2a3d",
    darkText: "#67e8f9",
  },
  "Next.js": {
    bg: "#e0e7ff",
    text: "#4338ca",
    darkBg: "#1e1b4b",
    darkText: "#a5b4fc",
  },
  "Vue.js": {
    bg: "#dcfce7",
    text: "#15803d",
    darkBg: "#052e16",
    darkText: "#86efac",
  },
  HTML5: {
    bg: "#fff7ed",
    text: "#c2410c",
    darkBg: "#3d1500",
    darkText: "#fb923c",
  },
  CSS3: {
    bg: "#dbeafe",
    text: "#1d4ed8",
    darkBg: "#1e3a5f",
    darkText: "#93c5fd",
  },
  "Tailwind CSS": {
    bg: "#cffafe",
    text: "#0369a1",
    darkBg: "#0c2a3d",
    darkText: "#7dd3fc",
  },
  "Node.js": {
    bg: "#dcfce7",
    text: "#166534",
    darkBg: "#052e16",
    darkText: "#86efac",
  },
  Express: {
    bg: "#f1f5f9",
    text: "#475569",
    darkBg: "#1e293b",
    darkText: "#94a3b8",
  },
  "REST APIs": {
    bg: "#ede9fe",
    text: "#5b21b6",
    darkBg: "#2e1065",
    darkText: "#c4b5fd",
  },
  Authentication: {
    bg: "#fef3c7",
    text: "#92400e",
    darkBg: "#3d2000",
    darkText: "#fde68a",
  },
  MongoDB: {
    bg: "#dcfce7",
    text: "#15803d",
    darkBg: "#052e16",
    darkText: "#86efac",
  },
  PostgreSQL: {
    bg: "#dbeafe",
    text: "#1e40af",
    darkBg: "#1e3a5f",
    darkText: "#93c5fd",
  },
  MySQL: {
    bg: "#f1f5f9",
    text: "#475569",
    darkBg: "#1e293b",
    darkText: "#94a3b8",
  },
  Redis: {
    bg: "#fee2e2",
    text: "#dc2626",
    darkBg: "#3f0000",
    darkText: "#fca5a5",
  },
  Git: {
    bg: "#fff0e0",
    text: "#c05700",
    darkBg: "#3d1f00",
    darkText: "#fdba74",
  },
  GitHub: {
    bg: "#f3f4f6",
    text: "#374151",
    darkBg: "#1f2937",
    darkText: "#d1d5db",
  },
  Docker: {
    bg: "#dbeafe",
    text: "#2563eb",
    darkBg: "#1e3a8a",
    darkText: "#93c5fd",
  },
  "VS Code": {
    bg: "#cffafe",
    text: "#0e7490",
    darkBg: "#0c2a3d",
    darkText: "#67e8f9",
  },
  Vercel: {
    bg: "#f3f4f6",
    text: "#374151",
    darkBg: "#1f2937",
    darkText: "#d1d5db",
  },
  AWS: {
    bg: "#fff7ed",
    text: "#c2410c",
    darkBg: "#3d1500",
    darkText: "#fb923c",
  },
  "CI/CD": {
    bg: "#ccfbf1",
    text: "#0d9488",
    darkBg: "#022c22",
    darkText: "#5eead4",
  },
};

export const education: EducationItem[] = [
  {
    institution: {
      en: "Far Western University",
      ne: "Far Western University",
    },
    date: { en: "2022 — Present", ne: "2022 — हालसम्म" },
    degree: {
      en: "Bachelor's Degree in Computer Science",
      ne: "कम्प्युटर साइन्समा स्नातक",
    },
    location: { en: "Nepal", ne: "नेपाल" },
    coursework: [
      "Data Structures",
      "Algorithms",
      "Databases",
      "Operating Systems",
      "Web Development",
    ],
    highlights: {
      en: [
        "Pursuing advanced studies in technology and computer science.",
        "Active in project-based learning and software engineering coursework.",
      ],
      ne: [
        "प्रविधि र कम्प्युटर साइन्समा उच्च अध्ययन गर्दै।",
        "परियोजना-आधारित सिकाइ र सफ्टवेयर इन्जिनियरिङ पाठ्यक्रममा सक्रिय।",
      ],
    },
  },
  {
    institution: {
      en: "Secondary Education",
      ne: "माध्यमिक शिक्षा",
    },
    date: { en: "Completed", ne: "सम्पन्न" },
    degree: {
      en: "High School — Science & Mathematics",
      ne: "उच्च माध्यमिक — विज्ञान र गणित",
    },
    location: { en: "Nepal", ne: "नेपाल" },
    highlights: {
      en: ["Built a foundation in science and mathematics."],
      ne: ["विज्ञान र गणितमा आधार स्थापित गरेको।"],
    },
  },
];

export const activities: ActivityItem[] = [
  {
    name: {
      en: "Open Source Contributions",
      ne: "खुला स्रोत योगदान",
    },
    role: { en: "Contributor", ne: "योगदानकर्ता" },
    location: { en: "Remote", ne: "रिमोट" },
    date: { en: "2023 — Present", ne: "2023 — हालसम्म" },
    link: {
      label: { en: "GitHub", ne: "GitHub" },
      href: "https://github.com/Harikrishna-HG",
    },
    highlights: {
      en: [
        "Contribute bug fixes, features, and documentation to JavaScript and TypeScript projects.",
        "Review issues and test pull requests from other contributors.",
      ],
      ne: [
        "JavaScript र TypeScript परियोजनामा बग फिक्स, सुविधा र डकुमेन्टेसन योगदान गर्ने।",
        "अन्य योगदानकर्ताका समस्या समीक्षा र पुल रिक्वेस्ट परीक्षण गर्ने।",
      ],
    },
    photos: [
      {
        src: "/activities/photo-1.svg",
        caption: { en: "Contribution graph", ne: "योगदान ग्राफ" },
      },
      {
        src: "/activities/photo-2.svg",
        caption: { en: "Pull request review", ne: "पुल रिक्वेस्ट समीक्षा" },
      },
    ],
  },
  {
    name: { en: "University Tech Club", ne: "विश्वविद्यालय टेक क्लब" },
    role: { en: "Member", ne: "सदस्य" },
    location: {
      en: "Far Western University",
      ne: "सुदूरपश्चिम विश्वविद्यालय",
    },
    date: { en: "2023 — Present", ne: "2023 — हालसम्म" },
    highlights: {
      en: [
        "Take part in workshops, study groups, and coding sessions.",
        "Help peers get started with web development and version control.",
      ],
      ne: [
        "कार्यशाला, अध्ययन समूह र कोडिङ सत्रमा सहभागी हुने।",
        "साथीहरूलाई वेब डेभलपमेन्ट र भर्सन कन्ट्रोल सुरु गर्न सहयोग गर्ने।",
      ],
    },
    photos: [
      {
        src: "/activities/photo-3.svg",
        caption: { en: "Club workshop", ne: "क्लब कार्यशाला" },
      },
    ],
  },
  {
    name: { en: "Hackathons", ne: "ह्याकाथनहरू" },
    role: { en: "Participant", ne: "सहभागी" },
    date: { en: "2024", ne: "2024" },
    highlights: {
      en: [
        "Built working prototypes under tight deadlines in small teams.",
        "Collaborated on product ideas, design, and implementation.",
      ],
      ne: [
        "छोटो समयसीमाभित्र सानो टिममा काम गर्ने प्रोटोटाइप बनाएको।",
        "उत्पादन विचार, डिजाइन र कार्यान्वयनमा सहकार्य गरेको।",
      ],
    },
  },
  {
    name: {
      en: "Freelance Web Development",
      ne: "फ्रिलान्स वेब डेभलपमेन्ट",
    },
    role: { en: "Freelance Developer", ne: "फ्रिलान्स डेभलपर" },
    date: { en: "2023 — Present", ne: "2023 — हालसम्म" },
    highlights: {
      en: [
        "Designed and delivered responsive websites for small businesses.",
        "Handled requirements, build, and deployment end to end.",
      ],
      ne: [
        "साना व्यवसायका लागि रेस्पोन्सिभ वेबसाइट डिजाइन र डेलिभरी गरेको।",
        "आवश्यकता, निर्माण र डिप्लोयमेन्ट सुरुदेखि अन्त्यसम्म सम्हालेको।",
      ],
    },
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
  {
    name: { en: "English", ne: "अंग्रेजी" },
    level: { en: "Professional working proficiency", ne: "व्यावसायिक कार्य दक्षता" },
  },
  { name: { en: "Nepali", ne: "नेपाली" }, level: { en: "Native speaker", ne: "मातृभाषी" } },
  { name: { en: "Hindi", ne: "हिन्दी" }, level: { en: "Conversational", ne: "कुराकानी स्तर" } },
];

export const contacts: ContactItem[] = [...buildContacts(profile), ...extraContacts];

/**
 * Which sections have content. Empty sections are hidden from the page and the
 * navigation automatically, so removing all entries of a section simply removes
 * it from the site without leaving empty headings or broken links.
 */
export const sectionAvailability: Record<SectionId, boolean> = {
  home: true,
  projects: projects.length > 0,
  research: researchInterests.interests.length > 0,
  notes: readingNotes.items.length > 0,
  skills: skills.length > 0,
  education: education.length > 0,
  activities: activities.length > 0,
  certifications: certifications.length > 0,
  languages: languages.length > 0,
  contact: contacts.length > 0,
};

export const navSections: SectionNavItem[] = allNavSections.filter(
  (section) => sectionAvailability[section.id],
);

export const ui = {
  sections: { en: "Sections", ne: "खण्डहरू" },
  menu: { en: "Menu", ne: "मेनु" },
  darkMode: { en: "Dark mode", ne: "डार्क मोड" },
  lightMode: { en: "Light mode", ne: "लाइट मोड" },
  toggleDark: { en: "Toggle dark mode", ne: "डार्क मोड बदल्नुहोस्" },
  details: { en: "Details", ne: "विवरण" },
  showMore: { en: "Show more", ne: "थप हेर्नुहोस्" },
  showLess: { en: "Show less", ne: "कम हेर्नुहोस्" },
  liveSite: { en: "Live site", ne: "लाइभ साइट" },
  source: { en: "Source", ne: "स्रोत" },
  problem: { en: "The problem", ne: "समस्या" },
  myRole: { en: "My role", ne: "मेरो भूमिका" },
  technologies: { en: "Technologies used", ne: "प्रयोग गरिएका प्रविधिहरू" },
  challenges: { en: "Technical decisions", ne: "प्राविधिक निर्णयहरू" },
  outcomes: { en: "Outcomes", ne: "नतिजा" },
  researchQuestion: { en: "Research question", ne: "अनुसन्धान प्रश्न" },
  motivation: { en: "Motivation", ne: "प्रेरणा" },
  approach: { en: "Approach", ne: "दृष्टिकोण" },
  methods: { en: "Methods & tools", ne: "विधि र उपकरणहरू" },
  datasets: { en: "Datasets", ne: "डेटासेटहरू" },
  evaluation: { en: "Evaluation", ne: "मूल्याङ्कन" },
  findings: { en: "Findings & lessons", ne: "निष्कर्ष र सिकाइ" },
  limitations: { en: "Limitations", ne: "सीमाहरू" },
  references: { en: "References", ne: "सन्दर्भहरू" },
  responsiblePractice: { en: "Responsible practice", ne: "जिम्मेवार अभ्यास" },
  myNotes: { en: "My notes", ne: "मेरा टिप्पणीहरू" },
  viewSource: { en: "View source", ne: "स्रोत हेर्नुहोस्" },
  filterByTech: { en: "Filter projects by technology", ne: "प्रविधि अनुसार परियोजना फिल्टर गर्नुहोस्" },
  allProjects: { en: "All", ne: "सबै" },
  noProjects: {
    en: "No projects match this filter.",
    ne: "यो फिल्टरसँग मेल खाने परियोजना भेटिएन।",
  },
  relevantCoursework: { en: "Relevant coursework", ne: "सम्बन्धित पाठ्यक्रम" },
  downloadCv: { en: "Download CV", ne: "CV डाउनलोड गर्नुहोस्" },
  close: { en: "Close", ne: "बन्द गर्नुहोस्" },
} satisfies Record<string, Bi>;

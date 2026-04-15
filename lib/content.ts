export const site = {
  name: "Yatharth Sharma",
  role: "Software Engineer · Full-Stack & UI",
  tagline:
    "Building precise, engaging web experiences — from design systems to production React. I ship across the full stack: REST API routes, LLM integrations, and backend services alongside polished, accessible UIs.",
  location: "Faridabad, Haryana, India",
  email: "yatharthsharma1309@gmail.com",
  linkedin: "https://www.linkedin.com/in/yatharth-sharma-32a1a1200",
  github: "https://github.com/YatharthSharma1309",
};

export const aboutParagraphs = [
  "I am a full-stack-leaning software engineer focused on shipping exceptional digital experiences: performance, accessibility, and craft at every layer.",
  "My day-to-day stack is React, TypeScript, Next.js (App Router + API Routes), and Node.js. I build responsive, fast UIs and the backend services that power them — REST endpoints, request validation, LLM integrations — so I own more of the vertical slice and need fewer hand-offs between layers.",
  "I translate Figma into code with Tailwind CSS, Styled Components, and Framer Motion. I care about user-centered design, clean state management (Redux, Context), and interfaces that are beautiful, intuitive, and inclusive.",
];

export const skillGroups = {
  core: [
    "React & TypeScript",
    "Next.js (App Router & API Routes)",
    "Node.js & REST API development",
    "LLM / OpenRouter API integration",
    "HTML5 / CSS3 / ES6+",
    "Tailwind · Styled Components",
    "Redux · Context API",
    "Framer Motion",
    "Design systems · Figma to code",
  ],
  deepening: [
    "SQL & relational modeling",
    "Auth patterns (sessions, JWT)",
    "Streaming APIs & real-time patterns",
    "Infrastructure & deployment (Vercel, CI/CD)",
    "UI & UX design",
  ],
} as const;

export const linkedInProfileSnapshot = {
  headline:
    "Software Engineer — full-stack-leaning, shipping React/TypeScript UIs and backend REST APIs in production.",
  about:
    "Strong work ethic, adaptability, and interpersonal collaboration. Comfortable working independently across the stack — from UI components to API endpoints — learning quickly, and delivering end-to-end features.",
  interests: ["Web Development", "Full-Stack Engineering", "AI & LLM Integration", "React"],
  currentlyLearning: ["SQL & relational modeling", "Auth patterns (JWT, sessions)", "Streaming APIs & real-time patterns", "Infrastructure & deployment"],
  achievements: ["Pull Shark x2", "Quickdraw", "YOLO"],
} as const;

export type JourneyItem = {
  title: string;
  org: string;
  period: string;
  location: string;
  description?: string[];
  current?: boolean;
};

export const journey: JourneyItem[] = [
  {
    title: "Software Engineer",
    org: "Whilter.AI",
    period: "Dec 2025 — Present",
    location: "Gurugram, Haryana",
    current: true,
    description: [
      "Shipping production front-end features — React, TypeScript, component systems — in a fast-moving AI product environment.",
      "Contributing to backend API development: building and maintaining REST endpoints, integrating third-party and LLM services.",
      "Owning full-stack feature slices end-to-end, from UI through API contracts to data layer.",
    ],
  },
  {
    title: "Student Intern",
    org: "Ernst & Young Global Consulting Services",
    period: "Feb 2025 — May 2025",
    location: "Noida, Uttar Pradesh",
    description: [
      "Consulting exposure alongside engineering practices in a global delivery setup.",
    ],
  },
  {
    title: "Data Analyst",
    org: "Honeywell",
    period: "Jan 2023",
    location: "—",
    description: [
      "Analyzed customer feedback for product and service performance.",
      "Worked cross-functionally on analytical solutions, dashboards, and market research.",
    ],
  },
  {
    title: "Web Development Intern",
    org: "Arctic Innovage Pvt. Ltd.",
    period: "Jul 2022 — Sep 2022",
    location: "—",
    description: [
      "Built and maintained responsive sites with HTML, CSS, and JavaScript.",
      "Improved UX and performance using analytics; structured content with strong UI focus.",
    ],
  },
];

export const education = [
  {
    degree: "Master of Computer Applications (MCA), Data Analytics",
    school: "Birla Institute of Technology, Mesra",
    period: "Aug 2023 — Jul 2025",
  },
  {
    degree: "Bachelor of Computer Science",
    school: "Manav Rachna International University, Faridabad",
    period: "2020 — 2023",
  },
];

export const certifications = [
  "Microsoft Certified: Azure AI Fundamentals",
  "Data Encryption using AWS KMS (UST)",
  "Managing Your Personal Finances — Foundations",
  "Foundations: Data, Data, Everywhere",
  "NPTEL — E-Business",
];

export type PortfolioLink = {
  title: string;
  description: string;
  href: string;
  status: "Coming soon" | "Add URL" | "Profile" | "Live";
  external?: boolean;
};

export const portfolioLinks: PortfolioLink[] = [
  {
    title: "Personal Portfolio & AI Digital Twin",
    description:
      "Full-stack Next.js portfolio site featuring an AI-powered chat interface (Digital Twin) that answers as me — built with TypeScript, Tailwind CSS, Framer Motion, and OpenRouter LLM API integration via server-side API routes.",
    href: site.github,
    status: "Live" as const,
    external: true,
  },
  {
    title: "Case studies",
    description:
      "Deep dives into product work, metrics, and technical decisions.",
    href: "#",
    status: "Coming soon" as const,
  },
  {
    title: "GitHub",
    description:
      "Repositories, forks, and experiments — code and activity in one place.",
    href: site.github,
    status: "Profile" as const,
    external: true,
  },
];

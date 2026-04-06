export const site = {
  name: "Yatharth Sharma",
  role: "Software Engineer · Front-End & UI",
  tagline:
    "Building precise, engaging web experiences — from design systems to production React. Behind the UI, I am deliberately building fluency with APIs, SQL, and how data moves through a stack — still front-end first, but less blind to the server.",
  location: "Faridabad, Haryana, India",
  email: "yatharthsharma1309@gmail.com",
  linkedin: "https://www.linkedin.com/in/yatharth-sharma-32a1a1200",
  github: "https://github.com/YatharthSharma1309",
};

export const aboutParagraphs = [
  "I am a web and UI developer focused on exceptional digital experiences: performance, accessibility, and craft at every layer.",
  "My day-to-day stack is HTML5, CSS3, JavaScript (ES6+), React, and TypeScript. I ship responsive, fast applications that feel seamless across devices — and I am intentionally going deeper on the other side of the wire: request/response contracts, validation, auth flows, and how data is stored and queried, so I can collaborate with backend engineers with fewer hand-offs and eventually own more of the vertical slice.",
  "I translate Figma into code with design systems, Tailwind CSS, Styled Components, and motion (e.g. Framer Motion). I care about user-centered design, clear state management (Redux, Context), and interfaces that are beautiful, intuitive, and inclusive.",
];

export const skillGroups = {
  core: [
    "React & TypeScript",
    "HTML5 / CSS3 / ES6+",
    "UI & UX design",
    "Tailwind · Styled Components",
    "Design systems · Figma to code",
    "Redux · Context API",
    "Framer Motion",
  ],
  /** Honest “in progress” — no inflated titles */
  deepening: [
    "HTTP APIs & REST",
    "Node.js & server-side basics",
    "SQL & relational modeling",
    "Auth patterns (sessions, JWT)",
  ],
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
      "Shipping front-end features and polished UI in a fast-moving product environment.",
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
  status: "Coming soon" | "Add URL" | "Profile";
  external?: boolean;
};

export const portfolioLinks: PortfolioLink[] = [
  {
    title: "Case studies",
    description:
      "Deep dives into product work, metrics, and technical decisions.",
    href: "#",
    status: "Coming soon" as const,
  },
  {
    title: "Labs & experiments",
    description: "Interactive demos, UI patterns, and prototypes.",
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

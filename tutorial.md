# Building a portfolio site with Next.js, React, and an AI “Digital Twin” — beginner tutorial

This document walks through **what this project is**, **which technologies it uses**, **how the pieces fit together**, and **how the important code works**. It is written for someone **new to front-end development**; basic computer literacy (files, folders, typing commands in a terminal) is enough to follow along.

---

## Table of contents

1. [What you are looking at](#1-what-you-are-looking-at)
2. [Technology summary](#2-technology-summary)
3. [How the project is organized](#3-how-the-project-is-organized)
4. [High-level walkthrough: request to screen](#4-high-level-walkthrough-request-to-screen)
5. [Detailed code review with examples](#5-detailed-code-review-with-examples)
6. [Five ways the code could be improved](#6-five-ways-the-code-could-be-improved)

---

## 1. What you are looking at

A **personal portfolio website** is a small web app whose job is to present who you are professionally: headline, about text, work history, links, and (in this project) an **AI chat** that answers questions **as if it were you**, using text you have defined in the codebase and optional extra profile text from environment variables.

This repo is a **Next.js** application. Next.js is a framework for building React apps that can render **on the server** and **in the browser**, and it can expose **API routes** (small backend endpoints) in the same project.

---

## 2. Technology summary

| Technology | What it is (in plain terms) | How this project uses it |
|------------|-----------------------------|---------------------------|
| **HTML** | The structure of pages (headings, sections, links) | React components output HTML when they render. |
| **CSS** | Styling (colors, layout, fonts) | Mostly via **Tailwind CSS** utility classes in `className` strings. |
| **JavaScript (JS)** | The language browsers run | The app logic is written in **TypeScript** (JS + types). |
| **React** | A library for building UI out of reusable **components** | Each section (`Hero`, `AboutSection`, …) is a component. |
| **Next.js** | A React framework: routing, layouts, API routes, bundling | `app/` folder = **App Router**; `npm run dev` runs the dev server. |
| **TypeScript** | JavaScript with optional static types | Catches mistakes early; better editor hints. |
| **Tailwind CSS** | Utility-first CSS: small class names map to styles | Defined in `app/globals.css` with `@import "tailwindcss"` and `@theme`. |
| **Framer Motion** | Animation library for React | `Reveal` scroll-in animations; `Hero` intro motion. |
| **OpenRouter** | A service that routes requests to various LLM models | Server calls OpenRouter’s HTTP API with your API key. |

**Commands you will use:**

- `npm install` — install dependencies (once, or after pulling changes).
- `npm run dev` — local development server (usually `http://localhost:3000`).
- `npm run build` — production build (checks types and bundles the app).
- `npm run lint` — run ESLint for code quality rules.

---

## 3. How the project is organized

Rough map of folders and what they mean:

```text
Site/
├── app/                    # Next.js App Router: pages, layout, global CSS, API routes
│   ├── layout.tsx          # Wraps every page: fonts, metadata, <body>
│   ├── page.tsx            # Home page (single-page portfolio)
│   ├── globals.css         # Global styles + design tokens (CSS variables, Tailwind theme)
│   └── api/
│       └── digital-twin/
│           └── route.ts    # POST /api/digital-twin — talks to OpenRouter
├── components/             # React UI pieces (Hero, sections, chat UI, …)
├── lib/
│   └── content.ts         # Your text data: site info, journey, skills, LinkedIn snapshot
├── package.json           # Dependencies and npm scripts
├── next.config.ts         # Next.js configuration
└── .env                   # Secrets (NOT committed to git): API keys, optional profile text
```

**Beginner mental model:**

- **`app/page.tsx`** = “what appears on `/`”.
- **`components/*`** = “building blocks” you compose on the page.
- **`lib/content.ts`** = “copy deck” and structured career data — easy to edit without touching UI code.
- **`app/api/.../route.ts`** = “mini backend” living next to the front-end.

---

## 4. High-level walkthrough: request to screen

### 4.1 Loading the portfolio in a browser

1. You run `npm run dev`.
2. Next.js serves the site at a local URL.
3. The browser requests `/`.
4. Next.js renders `app/layout.tsx` (shell: fonts, global wrappers) and inside it `app/page.tsx` (all sections).
5. React turns those components into HTML sent to the browser, then “hydrates” interactive parts on the client.

### 4.2 Using the Digital Twin chat

1. The chat UI lives in `components/DigitalTwinSection.tsx` and is marked `"use client"` because it uses **browser state** (`useState`, `fetch`).
2. When you send a message, the browser sends a **POST** request to `/api/digital-twin` with a JSON body: `{ messages: [...] }`.
3. `app/api/digital-twin/route.ts` runs **on the server** (your machine in dev, or the host in production). It:
   - Reads `OpenRouter_API_KEY` / `OPENROUTER_API_KEY` from the environment.
   - Builds a large “career context” string from `lib/content.ts`.
   - Optionally adds `LINKEDIN_PROFILE_FULL_TEXT` from `.env` if you set it.
   - Calls OpenRouter’s REST API.
   - Returns `{ reply: "..." }` as JSON.
4. The chat UI appends the assistant reply to the message list and scrolls the transcript.

**Why the API key never appears in the browser:** only server code reads `process.env.*`. The browser only sees your own `/api/digital-twin` endpoint.

---

## 5. Detailed code review with examples

### 5.1 Root layout, fonts, and SEO metadata (`app/layout.tsx`)

The layout wraps the entire site. It imports global CSS, configures Google fonts (`next/font/google`), and exports `metadata` for title/description used by search engines and social previews.

```tsx
// app/layout.tsx (illustrative excerpt)
import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: `${site.name} · ${site.role}`,
  description: site.tagline,
  // keywords, OpenGraph, Twitter cards…
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable} h-full antialiased`}>
      <body className="relative min-h-full overflow-x-hidden">
        <div className="noise" aria-hidden />
        {children}
      </body>
    </html>
  );
}
```

**Beginner takeaway:** `children` is whatever page Next.js is rendering (here, mostly `app/page.tsx`). The layout is the shared frame around every page.

---

### 5.2 Composing the home page (`app/page.tsx`)

The portfolio is a **single page** assembled like Lego: import components and list them in order.

```tsx
// app/page.tsx (illustrative excerpt)
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { DigitalTwinSection } from "@/components/DigitalTwinSection";
// …other sections

export default function Home() {
  return (
    <div className="bg-bg-deep relative z-[1] min-h-full">
      <a href="#about" className="sr-only focus:not-sr-only …">Skip to content</a>
      <div className="bg-grid pointer-events-none fixed inset-0 z-0" aria-hidden />
      <Navigation />
      <main>
        <Hero />
        {/* About, Journey, Certifications, Portfolio… */}
        <DigitalTwinSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
```

**Beginner takeaway:**

- `className` strings are Tailwind utilities (`flex`, `py-28`, `border-border-subtle`, …).
- `id` attributes on sections pair with navigation links like `#digital-twin`.

---

### 5.3 Central content (`lib/content.ts`)

Instead of scattering your bio across many files, most **copy and structured resume data** live in one module. That makes updates safer and keeps the AI context aligned with the visible site.

```ts
// lib/content.ts (illustrative excerpt)
export const site = {
  name: "Yatharth Sharma",
  role: "Software Engineer · Front-End & UI",
  tagline: "…",
  linkedin: "https://www.linkedin.com/in/…",
  github: "https://github.com/YatharthSharma1309",
};

export const skillGroups = {
  core: ["React & TypeScript", /* … */],
  deepening: ["HTTP APIs & REST", /* … */],
} as const;

export const linkedInProfileSnapshot = {
  headline: "…",
  about: "…",
  interests: ["Web Development", /* … */],
  currentlyLearning: ["APIs and backend fundamentals", /* … */],
  achievements: ["Pull Shark x2", "Quickdraw", "YOLO"],
} as const;
```

**Beginner takeaway:** `as const` tells TypeScript “these arrays/objects are fixed shapes,” which improves autocomplete and catches typos when you reuse them elsewhere.

---

### 5.4 Global design tokens and utilities (`app/globals.css`)

This file defines **CSS variables** (colors, borders) and connects them to Tailwind’s theme. Custom classes like `.surface-card` add reusable “card” styling.

```css
/* app/globals.css (illustrative excerpt) */
@import "tailwindcss";

:root {
  --bg-deep: #050508;
  --accent: #3ee8c8;
  /* … */
}

.surface-card {
  background: linear-gradient(
      165deg,
      rgba(255, 255, 255, 0.04) 0%,
      transparent 42%
    ),
    var(--bg-card);
  box-shadow: var(--shadow-card);
}
```

**Beginner takeaway:** change tokens once; the whole site shifts visually. Utility classes reference theme colors like `bg-bg-deep`, `text-accent`, etc.

---

### 5.5 Scroll reveals (`components/Reveal.tsx`)

Framer Motion wraps children in a `motion.div` that animates when it enters the viewport.

```tsx
// components/Reveal.tsx (illustrative excerpt)
"use client";

import { motion } from "framer-motion";

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
```

**Beginner takeaway:** `"use client"` is required when a file uses hooks or browser-only features (Framer Motion does).

---

### 5.6 Digital Twin UI (`components/DigitalTwinSection.tsx`)

This component manages:

- **State:** list of messages, input text, loading flag, error string.
- **Effects:** after new messages, scroll the transcript to the bottom.
- **Network:** `fetch("/api/digital-twin", { method: "POST", body: JSON.stringify({ messages }) })`.

```tsx
// components/DigitalTwinSection.tsx (illustrative excerpt)
"use client";

import { useEffect, useRef, useState } from "react";

type ChatMessage = { role: "user" | "assistant"; content: string };

export function DigitalTwinSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hi, I am Yatharth's Digital Twin…" },
  ]);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!messagesContainerRef.current) return;
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  }, [messages, isLoading]);

  async function sendMessage(text: string) {
    const nextMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(nextMessages);

    const response = await fetch("/api/digital-twin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: nextMessages }),
    });
    const data = await response.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
  }

  // JSX: fixed-height transcript, starter chips, textarea + send…
}
```

**Beginner takeaway:** the UI is **dumb about the AI provider**. It only knows “call my API and show text.” All provider-specific logic stays on the server.

---

### 5.7 Digital Twin API route (`app/api/digital-twin/route.ts`)

This is a **Route Handler**: `export async function POST(request: Request)`. It:

1. Validates the API key exists.
2. Parses JSON `{ messages }` safely (filters bad entries, keeps last 12 turns).
3. Builds `CAREER_CONTEXT` by stringifying structured fields from `lib/content.ts`.
4. Optionally appends `LINKEDIN_PROFILE_FULL_TEXT` from `.env`.
5. Calls OpenRouter with `fetch` and returns JSON `{ reply }`.

```ts
// app/api/digital-twin/route.ts (illustrative excerpt)
export async function POST(request: Request) {
  const apiKey = process.env.OpenRouter_API_KEY ?? process.env.OPENROUTER_API_KEY;
  if (!apiKey) return Response.json({ error: "…" }, { status: 500 });

  const body = await request.json();
  const linkedInFullText = process.env.LINKEDIN_PROFILE_FULL_TEXT?.trim();

  const safeMessages = /* validate + slice last 12 */;

  const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b:free",
      temperature: 0.5,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "system", content: `Career context:\n${CAREER_CONTEXT}` },
        ...(linkedInFullText
          ? [{ role: "system", content: `Additional LinkedIn profile details:\n${linkedInFullText}` }]
          : []),
        ...safeMessages,
      ],
    }),
  });

  const data = await openRouterResponse.json();
  const reply = data?.choices?.[0]?.message?.content;
  return Response.json({ reply });
}
```

**Prompt rules** matter for product quality: the system text tells the model to stay grounded, admit gaps, and not invent details (especially for title-only LinkedIn badges).

**Environment variables you should know:**

- `OpenRouter_API_KEY` or `OPENROUTER_API_KEY` — required for chat.
- `LINKEDIN_PROFILE_FULL_TEXT` — optional paste of a fuller LinkedIn profile for richer answers.

---

## 6. Five ways the code could be improved

These are intentional “next steps” — none of them mean the current code is wrong; they are how a real product would evolve.

1. **Streaming responses** — Today the API waits for the full model reply, then returns JSON. For long answers, **streaming tokens** to the browser (Server-Sent Events or a streaming fetch body) feels much snappier and more like ChatGPT.

2. **Input validation with a schema library** — The route uses light manual checks. Tools like **Zod** can define `{ messages: z.array(z.object({ … })) }` and return consistent 400 errors with clear messages, which is important if the API is ever called from more than one client.

3. **Rate limiting and abuse protection** — A public `/api/digital-twin` endpoint can be spammed, costing API credits. Add **rate limits** (per IP), **CAPTCHA** for anonymous users, or require authentication for heavy use.

4. **Single source of truth for “twin knowledge”** — Career text exists in `lib/content.ts` and optionally in `.env`. A cleaner approach might be one **Markdown file** or **CMS** parsed at build time, so marketing copy and twin context never drift apart.

5. **Tests and monitoring** — Add a small integration test (or script) that POSTs a fixed prompt and asserts a 200 response. In production, log OpenRouter errors (without logging secrets) and track latency/cost.

---

## Closing

You now have a mental model of this repo: **Next.js + React** for the UI, **Tailwind** for styling, **content modules** for copy, **Route Handlers** for a private AI proxy, and **OpenRouter** as the model provider. Start experiments by editing `lib/content.ts` and refreshing the page; iterate on AI behavior by adjusting the system prompt in `app/api/digital-twin/route.ts`.

Enjoy building.

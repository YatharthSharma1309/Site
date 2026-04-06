"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/content";

const links = [
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#digital-twin", label: "AI Twin" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-[background,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? "border-border-subtle border-b bg-bg-deep/78 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="#top"
          className="font-display text-text-primary hover:text-accent text-lg font-bold tracking-tight transition-colors"
        >
          YS<span className="text-accent">.</span>
        </Link>
        <ul className="text-text-muted flex max-w-[55vw] items-center gap-0.5 overflow-x-auto sm:max-w-none sm:gap-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {links.map((l) => (
            <li key={l.href} className="shrink-0">
              <Link
                href={l.href}
                className="text-text-muted hover:text-text-primary relative px-3 py-2 text-[10px] font-medium tracking-[0.14em] uppercase transition-colors after:absolute after:bottom-1 after:left-3 after:h-px after:w-[calc(100%-1.5rem)] after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:after:scale-x-100 sm:text-[11px]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border-highlight bg-bg-card text-text-primary hover:border-accent/40 hover:text-accent rounded-xl border px-3 py-2.5 text-xs font-semibold tracking-wide transition-colors sm:px-4"
          >
            GitHub
          </Link>
          <Link
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border-highlight bg-bg-card text-text-primary hover:border-accent/40 hover:text-accent rounded-xl border px-3 py-2.5 text-xs font-semibold tracking-wide transition-colors sm:px-4"
          >
            LinkedIn
          </Link>
        </div>
      </nav>
    </header>
  );
}

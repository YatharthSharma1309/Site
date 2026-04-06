import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: `${site.name} · ${site.role}`,
  description: site.tagline,
  keywords: [
    "front-end",
    "React",
    "TypeScript",
    "UI developer",
    "UX",
    "APIs",
    "India",
  ],
  openGraph: {
    title: `${site.name} · ${site.role}`,
    description: site.tagline,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.role}`,
    description: site.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${syne.variable} h-full antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <body className="relative min-h-full overflow-x-hidden">
        <div className="noise" aria-hidden />
        {children}
      </body>
    </html>
  );
}

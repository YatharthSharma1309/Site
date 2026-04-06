import { AboutSection } from "@/components/AboutSection";
import { CertificationsSection } from "@/components/CertificationsSection";
import { ContactSection } from "@/components/ContactSection";
import { Hero } from "@/components/Hero";
import { JourneySection } from "@/components/JourneySection";
import { Navigation } from "@/components/Navigation";
import { PortfolioSection } from "@/components/PortfolioSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <div className="bg-bg-deep relative z-[1] min-h-full">
      <a
        href="#about"
        className="focus:bg-accent focus:text-bg-deep sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <div
        className="bg-grid pointer-events-none fixed inset-0 z-0"
        aria-hidden
      />
      <Navigation />
      <main>
        <Hero />
        <AboutSection />
        <JourneySection />
        <CertificationsSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}

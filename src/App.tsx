import { useEffect, useRef, useState } from "react";
import { usePortfolioMotion } from "./hooks/usePortfolioMotion";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Education } from "./components/Education";
import { Contact } from "./components/Contact";
import { PageBackground } from "./components/PageBackground";
import { PortfolioProvider } from "./content/PortfolioProvider";
import { getPortfolioContent, type Locale } from "./content/locales";

export default function App() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [locale, setLocale] = useState<Locale>("en");
  const { profile, labels } = getPortfolioContent(locale);

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
    document.title = `${profile.name} | ${profile.role}`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", `${profile.name} — ${profile.role}. ${profile.introduction}`);
  }, [locale, profile]);

  usePortfolioMotion(pageRef);

  return (
    <PortfolioProvider locale={locale} setLocale={setLocale}>
      <PageBackground />
      <div className="site-shell" ref={pageRef}>
        <a className="skip-link" href="#main">
          {labels.skip}
        </a>
        <div className="reading-progress" aria-hidden="true" />
        <Header />
        <main id="main">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Education />
          <Contact />
        </main>
        <footer>
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <a href="#home">{labels.backToTop}</a>
        </footer>
      </div>
    </PortfolioProvider>
  );
}

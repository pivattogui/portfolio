import { useEffect, useState, type CSSProperties } from "react";
import { usePortfolioContent } from "../content/PortfolioContext";

export function Header() {
  const { locale, setLocale, content: { profile, labels } } = usePortfolioContent();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = [
    { label: labels.navigation[0], href: "#about" },
    { label: labels.navigation[1], href: "#experience" },
    { label: labels.navigation[2], href: "#projects" },
    { label: labels.navigation[3], href: "#contact" },
  ];

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  return (
    <>
      <header className="site-header" data-menu-open={isMenuOpen}>
        <a className="wordmark" href="#home" aria-label={`${profile.name}, home`}>
          gp<span>.</span>
        </a>
        <p className="header-discipline">{labels.headerDiscipline}</p>
        <nav className="desktop-navigation" aria-label={labels.mainNavigation}>
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="locale-switch" role="group" aria-label={locale === "pt" ? "Idioma" : "Language"}>
          <button type="button" aria-label="English" aria-pressed={locale === "en"} onClick={() => setLocale("en")}><span aria-hidden="true">🇺🇸</span></button>
          <button type="button" aria-label="Português" aria-pressed={locale === "pt"} onClick={() => setLocale("pt")}><span aria-hidden="true">🇧🇷</span></button>
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? labels.closeMenu : labels.openMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </header>
      <div className="menu-overlay" aria-hidden={!isMenuOpen} data-menu-open={isMenuOpen}>
        <nav id="mobile-navigation" aria-label={labels.mobileNavigation}>
          {navigation.map((item, index) => (
            <a
              href={item.href}
              key={item.href}
              onClick={() => setIsMenuOpen(false)}
              style={{ "--menu-index": index } as CSSProperties}
              tabIndex={isMenuOpen ? 0 : -1}
            >
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <p>{labels.availability}</p>
      </div>
    </>
  );
}

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { usePortfolioContent } from "../content/PortfolioContext";

export function Hero() {
  const { content: { profile, labels } } = usePortfolioContent();
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero-caption">
        <span>{labels.portfolio} / {new Date().getFullYear()}</span>
        <span>{profile.location}</span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-signature"><span className="status-dot" /> {profile.name}</p>
          <h1 id="hero-title">
            <span className="name-line">
              <span>{labels.heroTitle[0]}</span>
            </span>
            <span className="name-line accent-line">
              <span>{labels.heroTitle[1]}</span>
            </span>
          </h1>
          <p className="hero-specialty">{labels.specialty[0]} <span>/</span> {labels.specialty[1]} <span>/</span> {labels.specialty[2]}</p>
        </div>
        <div className="hero-introduction-depth">
          <div className="hero-introduction">
            <p>{profile.introduction}</p>
            <div className="hero-links">
              <a className="primary-link" href="#contact">
                <span>{labels.contactAction}</span>
                <span className="link-icon"><ArrowDownRight size={18} strokeWidth={1} aria-hidden="true" /></span>
              </a>
              <a className="text-link" href={profile.resume} target="_blank" rel="noopener noreferrer">
                {labels.resume} <ArrowUpRight size={16} strokeWidth={1} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <nav className="hero-socials" aria-label={labels.profiles}>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={15} strokeWidth={1} aria-hidden="true" /></a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={15} strokeWidth={1} aria-hidden="true" /></a>
          <a href={`mailto:${profile.email}`}>{labels.email} <ArrowUpRight size={15} strokeWidth={1} aria-hidden="true" /></a>
        </nav>
        <a href="#about" className="scroll-cue">
          <span>{labels.moreAbout}</span>
          <ArrowDownRight size={20} strokeWidth={1} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

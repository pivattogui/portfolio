import { DecryptedText } from "./ui/DecryptedText";
import { usePortfolioContent } from "../content/PortfolioContext";

export function Experience() {
  const { content: { experience, labels } } = usePortfolioContent();
  return (
    <section
      id="experience"
      className="section"
      aria-labelledby="experience-title"
    >
      <p className="section-index eyebrow">
        <DecryptedText text={labels.experienceIndex} />
      </p>
      <div className="section-heading">
        <h2 id="experience-title">{labels.experienceTitle}</h2>
        <p className="section-note">{labels.experienceNote}</p>
      </div>
      {experience.map((position) => (
        <div className="experience-shell" key={`${position.company}-${position.period}`}>
          <article className="experience-row">
            <div className="experience-meta">
              <p className="period">{position.period}</p>
              <h3>{position.company}</h3>
              <p>{position.industry}</p>
            </div>
            <div className="experience-body">
              <h3 className="role-title">{position.role}</h3>
              <p className="experience-summary">{position.summary}</p>
              <ol className="highlights">
                {position.highlights.map((highlight, index) => (
                  <li key={highlight}><span>0{index + 1}</span><p>{highlight}</p></li>
                ))}
              </ol>
            </div>
          </article>
        </div>
      ))}
    </section>
  );
}

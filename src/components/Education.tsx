import { DecryptedText } from "./ui/DecryptedText";
import { usePortfolioContent } from "../content/PortfolioContext";

export function Education() {
  const { content: { education, labels } } = usePortfolioContent();
  return (
    <section
      id="education"
      className="section split-section"
      aria-labelledby="education-title"
    >
      <div>
        <p className="section-index eyebrow">
          <DecryptedText text={labels.educationIndex} />
        </p>
        <h2 id="education-title">{labels.educationTitle[0]}<br /><em>{labels.educationTitle[1]}</em></h2>
      </div>
      <div className="education-list">
        {education.map((qualification, index) => (
          <article
            className={`education-row${index === 0 ? " education-row-featured" : ""}`}
            key={qualification.institution}
          >
            <div className="education-row-inner">
              <p className="education-institution">{qualification.institution}</p>
              <h3>{qualification.degree}</h3>
              <p className="education-description">{qualification.description}</p>
              <div className="education-details">
                <p className="period">{qualification.period}</p>
                {qualification.note && <p>{qualification.note}</p>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

import { DecryptedText } from "./ui/DecryptedText";
import { usePortfolioContent } from "../content/PortfolioContext";

export function Experience() {
  const { content: { experience, labels } } = usePortfolioContent();
  return (
    <section
      id="experience"
      className="section experience-section"
      aria-labelledby="experience-title"
    >
      <h2 id="experience-title" className="section-index eyebrow">
        <DecryptedText text={labels.experienceIndex} />
      </h2>
      {experience.map((position) => (
        <article className="experience-entry" key={`${position.company}-${position.period}`}>
          <header className="experience-meta">
            <p className="period">{position.period}</p>
            <h3>{position.company}</h3>
            <p>{position.industry}</p>
          </header>
          <div className="experience-body">
            <h3 className="role-title">{position.role}</h3>
            <p className="experience-summary">{position.summary}</p>
          </div>
          <div className="experience-chapters">
            {position.chapters.map((chapter, chapterIndex) => {
              const chapterOffset = position.chapters
                .slice(0, chapterIndex)
                .reduce((total, previousChapter) => total + previousChapter.highlights.length, 0);

              return (
                <section className="experience-chapter" key={chapter.title}>
                  <p className="experience-chapter-title">{chapter.title}</p>
                  <ol className="experience-highlights" start={chapterOffset + 1}>
                    {chapter.highlights.map((highlight, highlightIndex) => (
                      <li key={highlight}>
                        <span aria-hidden="true">{String(chapterOffset + highlightIndex + 1).padStart(2, "0")}</span>
                        <p>{highlight}</p>
                      </li>
                    ))}
                  </ol>
                </section>
              );
            })}
          </div>
        </article>
      ))}
    </section>
  );
}

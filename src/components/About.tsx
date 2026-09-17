import { DecryptedText } from "./ui/DecryptedText";
import { Skills } from "./Skills";
import { usePortfolioContent } from "../content/PortfolioContext";

export function About() {
  const { content: { profile, labels } } = usePortfolioContent();
  return (
    <section
      id="about"
      className="section split-section"
      aria-labelledby="about-title"
    >
      <div>
        <p className="section-index eyebrow">
          <DecryptedText text={labels.aboutIndex} />
        </p>
        <h2 id="about-title">
          {labels.aboutTitle[0]}<br />
          <em>{labels.aboutTitle[1]}</em>
        </h2>
      </div>
      <div className="prose">
        {profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <div className="about-signature">
          <span>{labels.yearsCount}</span>
          <p>{labels.years}</p>
        </div>
      </div>
      <Skills />
    </section>
  );
}

import { DecryptedText } from "./ui/DecryptedText";
import {
  ArrowUpRight,
  CodeXml,
  BriefcaseBusiness,
  Mail,
  FileDown,
} from "lucide-react";
import { usePortfolioContent } from "../content/PortfolioContext";

export function Contact() {
  const { content: { profile, labels } } = usePortfolioContent();
  return (
    <section
      id="contact"
      className="section contact"
      aria-labelledby="contact-title"
    >
      <p className="section-index eyebrow">
        <DecryptedText text={labels.contactIndex} />
      </p>
      <h2 id="contact-title">{labels.contactTitle[0]}<br /><em>{labels.contactTitle[1]}</em></h2>
      <div className="contact-bottom">
        <p>
          {labels.contactIntro[0]}
          <br />
          {labels.contactIntro[1]}
        </p>
        <a className="email-link primary-link" href={`mailto:${profile.email}`}>
          <span>{profile.email}</span>
          <span className="link-icon"><ArrowUpRight size={20} strokeWidth={1} aria-hidden="true" /></span>
        </a>
      </div>
      <div className="social-links">
        <a href={profile.github}>
          <CodeXml size={17} strokeWidth={1} aria-hidden="true" />
          GitHub
        </a>
        <a href={profile.linkedin}>
          <BriefcaseBusiness size={17} strokeWidth={1} aria-hidden="true" />
          LinkedIn
        </a>
        <a href={`mailto:${profile.email}`}>
          <Mail size={17} strokeWidth={1} aria-hidden="true" />
          {labels.email}
        </a>
        <a href={profile.resume} target="_blank" rel="noopener noreferrer">
          <FileDown size={17} strokeWidth={1} aria-hidden="true" />
          {labels.resumePdf}
        </a>
      </div>
    </section>
  );
}

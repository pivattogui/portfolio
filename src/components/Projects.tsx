import { ArrowUpRight } from "lucide-react";
import { usePortfolioContent } from "../content/PortfolioContext";
import { DecryptedText } from "./ui/DecryptedText";

export function Projects() {
  const { content: { profile, projects, labels } } = usePortfolioContent();
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <p className="section-index eyebrow">
        <DecryptedText text={labels.projectsIndex} />
      </p>
      <div className="section-heading projects-heading">
        <div>
          <h2 id="projects-title">{labels.projectsTitle}</h2>
          <p>{labels.projectsIntro}</p>
        </div>
        <a className="text-link" href={profile.github} target="_blank" rel="noopener noreferrer">
          {labels.allRepositories} <ArrowUpRight size={16} strokeWidth={1} aria-hidden="true" />
        </a>
      </div>
      <div className="project-list">
        {projects.map((project, index) => (
          <article className={`project-entry${project.image ? " project-entry-featured" : ""}`} key={project.repository}>
            <div className="project-entry-inner">
              <div className="project-entry-copy">
                <p className="project-entry-meta">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {project.category}
                </p>
                <h3>{project.name}</h3>
                <p className="project-entry-lead">{project.description}</p>
                <p className="project-entry-context">{project.technicalOverview}</p>
                <ul className="project-entry-highlights">
                  {project.technicalHighlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div className="project-entry-footer">
                  <ul className="tags" aria-label={`${project.name} ${labels.technologies}`}>
                    {project.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                  <a href={project.repository} target="_blank" rel="noopener noreferrer">
                    {labels.viewRepository} <span className="link-icon"><ArrowUpRight size={16} strokeWidth={1} aria-hidden="true" /></span>
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      {labels.liveDemo} <span className="link-icon"><ArrowUpRight size={16} strokeWidth={1} aria-hidden="true" /></span>
                    </a>
                  )}
                </div>
              </div>
              {project.image && (
                <figure className="project-entry-visual">
                  <div className="project-entry-image">
                    <img src={project.image.src} alt={project.image.alt} loading="lazy" />
                  </div>
                  <figcaption>{project.image.caption}</figcaption>
                </figure>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { usePortfolioContent } from "../content/PortfolioContext";
import { DecryptedText } from "./ui/DecryptedText";

export function Projects() {
  const { content: { profile, projects, labels } } = usePortfolioContent();
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const selectedProject = projects[selectedProjectIndex] ?? projects[0];

  if (!selectedProject) return null;

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
      <div className="project-showcase">
        <nav className="project-selector" aria-label={labels.projectNavigation}>
          {projects.map((project, index) => (
            <button
              type="button"
              aria-pressed={selectedProjectIndex === index}
              onClick={() => setSelectedProjectIndex(index)}
              key={project.repository}
            >
              <span className="project-selector-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="project-selector-copy">
                <strong>{project.name}</strong>
                <small>{project.category}</small>
              </span>
              <span className="project-selector-indicator" aria-hidden="true" />
            </button>
          ))}
        </nav>
        <article className="project-stage" key={selectedProject.repository} aria-labelledby={`project-${selectedProjectIndex}-title`}>
          <header className="project-stage-header">
            <p className="project-stage-meta">
              <span>{String(selectedProjectIndex + 1).padStart(2, "0")}</span>
              {selectedProject.category}
            </p>
            <h3 id={`project-${selectedProjectIndex}-title`}>{selectedProject.name}</h3>
            <p className="project-stage-lead">{selectedProject.description}</p>
            <div className="project-stage-actions">
              <ul className="tags" aria-label={`${selectedProject.name} ${labels.technologies}`}>
                {selectedProject.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
              <a href={selectedProject.repository} target="_blank" rel="noopener noreferrer">
                {labels.viewRepository} <span className="link-icon"><ArrowUpRight size={16} strokeWidth={1} aria-hidden="true" /></span>
              </a>
              {selectedProject.demo && (
                <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                  {labels.liveDemo} <span className="link-icon"><ArrowUpRight size={16} strokeWidth={1} aria-hidden="true" /></span>
                </a>
              )}
            </div>
          </header>
          <div className="project-stage-body">
            <div className="project-stage-overview">
              <p className="project-stage-kicker">{labels.underTheHood}</p>
              <p>{selectedProject.technicalOverview}</p>
            </div>
            {selectedProject.image && (
              <figure className="project-entry-visual">
                <div className="project-entry-image">
                  <img src={selectedProject.image.src} alt={selectedProject.image.alt} loading="lazy" />
                </div>
                <figcaption>{selectedProject.image.caption}</figcaption>
              </figure>
            )}
            {selectedProject.architecture && (
              <figure className="project-architecture">
                <div className="architecture-window" role="img" aria-label={selectedProject.architecture.ariaLabel}>
                  <div className="architecture-window-bar" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <p>production.delivery</p>
                  </div>
                  <ol>
                    {selectedProject.architecture.stages.map((stage, stageIndex) => (
                      <li key={stage.label}>
                        <span>{String(stageIndex + 1).padStart(2, "0")}</span>
                        <div>
                          <strong>{stage.label}</strong>
                          <small>{stage.detail}</small>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <div className="architecture-status">
                    <span aria-hidden="true" />
                    {selectedProject.architecture.status}
                  </div>
                </div>
                <figcaption>{selectedProject.architecture.caption}</figcaption>
              </figure>
            )}
            {!selectedProject.image && !selectedProject.architecture && (
              <div className="project-stage-mark" aria-hidden="true">
                <span>{selectedProject.name.slice(0, 2)}</span>
                <p>{selectedProject.technologies.join(" · ")}</p>
              </div>
            )}
          </div>
          <ol className="project-stage-highlights">
            {selectedProject.technicalHighlights.map((highlight, index) => (
              <li key={highlight}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{highlight}</p>
              </li>
            ))}
          </ol>
        </article>
      </div>
    </section>
  );
}

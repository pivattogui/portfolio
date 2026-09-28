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
        {projects.map((project, projectIndex) => (
          <article className="project-row" key={project.repository}>
            <div className="project-row-main">
              <div className="project-row-copy">
                <p className="project-row-meta">
                  <span>{String(projectIndex + 1).padStart(2, "0")}</span>
                  {project.category}
                </p>
                <h3>{project.name}</h3>
                <p className="project-row-lead">{project.description}</p>
                <p className="project-row-overview">{project.technicalOverview}</p>
                <ul className="tags" aria-label={`${project.name} ${labels.technologies}`}>
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
                <div className="project-row-actions">
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
              {project.architecture && (
                <figure className="project-architecture">
                  <div className="architecture-window" role="img" aria-label={project.architecture.ariaLabel}>
                    <div className="architecture-window-bar" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <p>production.delivery</p>
                    </div>
                    <ol>
                      {project.architecture.stages.map((stage, stageIndex) => (
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
                      {project.architecture.status}
                    </div>
                  </div>
                  <figcaption>{project.architecture.caption}</figcaption>
                </figure>
              )}
              {project.preview && (
                <figure className="project-transform-preview" aria-label={project.preview.ariaLabel}>
                  <div className="project-transform-shell">
                    <div className="project-transform-toolbar">
                      <span aria-hidden="true" />
                      <span aria-hidden="true" />
                      <span aria-hidden="true" />
                      <code>{project.preview.endpoint}</code>
                    </div>
                    <div className="project-transform-content">
                      <div className="project-transform-pane">
                        <div className="project-transform-pane-header">
                          <p>{project.preview.inputLabel}</p>
                          <span>{project.preview.inputMetric}</span>
                        </div>
                        <pre><code>{project.preview.input}</code></pre>
                      </div>
                      <span className="project-transform-arrow" aria-hidden="true">→</span>
                      <div className="project-transform-pane project-transform-output">
                        <div className="project-transform-pane-header">
                          <p>{project.preview.outputLabel}</p>
                          <span>{project.preview.outputMetric}</span>
                        </div>
                        <pre><code>{project.preview.output}</code></pre>
                      </div>
                    </div>
                  </div>
                  <figcaption>
                    <strong>{project.preview.savings}</strong>
                    <span>{project.preview.caption}</span>
                  </figcaption>
                </figure>
              )}
            </div>
            <ul className="project-row-highlights">
              {project.technicalHighlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

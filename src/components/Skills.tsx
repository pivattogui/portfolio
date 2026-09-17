import { useEffect, useRef } from "react";
import {
  siApachekafka,
  siDocker,
  siElixir,
  siGithubactions,
  siGo,
  siGooglecloud,
  siLangchain,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPhoenixframework,
  siPython,
  siReact,
  siRedis,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { featuredTechnologies } from "../content/portfolio";
import { usePortfolioContent } from "../content/PortfolioContext";

const technologyIcons: Record<(typeof featuredTechnologies)[number], SimpleIcon> = {
  TypeScript: siTypescript,
  "Node.js": siNodedotjs,
  Elixir: siElixir,
  Phoenix: siPhoenixframework,
  Go: siGo,
  Python: siPython,
  React: siReact,
  "Next.js": siNextdotjs,
  GCP: siGooglecloud,
  Docker: siDocker,
  "Apache Kafka": siApachekafka,
  MongoDB: siMongodb,
  Redis: siRedis,
  "GitHub Actions": siGithubactions,
  LangChain: siLangchain,
};

export function Skills() {
  const { content: { labels } } = usePortfolioContent();
  const technologyListRef = useRef<HTMLDivElement>(null);
  const technologySequenceRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const technologyList = technologyListRef.current;
    const technologySequence = technologySequenceRef.current;
    if (!technologyList || !technologySequence) return;

    let sequenceWidth = technologySequence.offsetWidth + 12;
    technologyList.scrollLeft = sequenceWidth;

    const wrapScroll = () => {
      if (technologyList.scrollLeft >= sequenceWidth * 2) technologyList.scrollLeft -= sequenceWidth;
      if (technologyList.scrollLeft < sequenceWidth) technologyList.scrollLeft += sequenceWidth;
    };

    const scrollTechnologies = (event: WheelEvent) => {
      const wheelDistance = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      let distanceMultiplier = 1;
      if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) distanceMultiplier = 16;
      if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) distanceMultiplier = technologyList.clientWidth;
      event.preventDefault();
      technologyList.scrollLeft += wheelDistance * distanceMultiplier;
      wrapScroll();
    };

    let animationFrame = 0;
    let previousFrame = 0;
    let isVisible = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const advanceTechnologies = (currentFrame: number) => {
      if (previousFrame) technologyList.scrollLeft += Math.min(currentFrame - previousFrame, 64) * .035;
      previousFrame = currentFrame;
      wrapScroll();
      animationFrame = requestAnimationFrame(advanceTechnologies);
    };

    const updateMotion = () => {
      if (isVisible && !reducedMotion.matches && !animationFrame) {
        previousFrame = 0;
        animationFrame = requestAnimationFrame(advanceTechnologies);
      } else if ((!isVisible || reducedMotion.matches) && animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      updateMotion();
    });
    const sizeObserver = new ResizeObserver(() => {
      const previousWidth = sequenceWidth;
      sequenceWidth = technologySequence.offsetWidth + 12;
      technologyList.scrollLeft += sequenceWidth - previousWidth;
    });

    technologyList.addEventListener("wheel", scrollTechnologies, { passive: false });
    reducedMotion.addEventListener("change", updateMotion);
    visibilityObserver.observe(technologyList);
    sizeObserver.observe(technologySequence);
    return () => {
      cancelAnimationFrame(animationFrame);
      technologyList.removeEventListener("wheel", scrollTechnologies);
      reducedMotion.removeEventListener("change", updateMotion);
      visibilityObserver.disconnect();
      sizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="skill-band" aria-labelledby="skill-band-title">
      <div className="skill-band-heading">
        <div>
          <p className="skill-band-label">{labels.skillsLabel}</p>
          <h3 id="skill-band-title">{labels.skillsTitle[0]}<br /><em>{labels.skillsTitle[1]}</em></h3>
        </div>
        <p>{labels.skillsAreas}<br /><span>{labels.scrollExplore}</span></p>
      </div>
      <div className="skill-marquee" aria-label={labels.skillsAria} ref={technologyListRef} tabIndex={0}>
        <div className="skill-marquee-track">
          {[0, 1, 2].map((sequence) => (
            <ul key={sequence} ref={sequence === 1 ? technologySequenceRef : undefined} aria-hidden={sequence !== 1}>
              {featuredTechnologies.map((technology) => {
                const icon = technologyIcons[technology];
                const iconColor = technology === "Apache Kafka" ? "#fff" : icon.hex === "000000" ? "var(--ink)" : `#${icon.hex}`;
                return (
                  <li key={technology}>
                    <svg viewBox="0 0 24 24" aria-hidden="true" style={{ color: iconColor }}>
                      <path fill="currentColor" d={icon.path} />
                    </svg>
                    <span>{technology}</span>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

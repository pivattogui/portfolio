import { useLayoutEffect, type RefObject } from "react";

const revealSelector = [
  ".section h2",
  ".section-index",
  ".section-note",
  ".projects-heading p",
  ".projects-heading > a",
  ".prose",
  ".skill-band",
  ".experience-entry",
  ".education-row",
  ".contact-bottom",
  ".social-links",
  ".project-showcase",
].join(", ");

export function usePortfolioMotion(pageRef: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const readingProgress = page.querySelector<HTMLElement>(".reading-progress");
    let animationFrame = 0;

    const updateReadingProgress = () => {
      animationFrame = 0;
      if (!readingProgress) return;
      const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollRange > 0 ? window.scrollY / scrollRange : 0;
      readingProgress.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    };
    const requestProgressUpdate = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(updateReadingProgress);
    };

    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate, { passive: true });
    requestProgressUpdate();

    if (reducedMotion.matches) {
      return () => {
        cancelAnimationFrame(animationFrame);
        window.removeEventListener("scroll", requestProgressUpdate);
        window.removeEventListener("resize", requestProgressUpdate);
      };
    }

    page.classList.add("motion-enabled");
    const openingFrame = requestAnimationFrame(() => page.classList.add("motion-ready"));
    const revealElements = Array.from(page.querySelectorAll<HTMLElement>(revealSelector));
    revealElements.forEach((element) => element.classList.add("reveal-on-scroll"));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.05 },
    );
    revealElements.forEach((element) => revealObserver.observe(element));

    return () => {
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(openingFrame);
      revealObserver.disconnect();
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
      page.classList.remove("motion-enabled", "motion-ready");
      revealElements.forEach((element) => element.classList.remove("reveal-on-scroll", "is-revealed"));
    };
  }, [pageRef]);
}

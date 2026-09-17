import { useEffect, useState, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const activeMotionCleanups = new Set<() => void>();
if (import.meta.hot) {
  // Clear active effects before Fast Refresh replaces their target elements.
  import.meta.hot.on("vite:beforeUpdate", () => {
    activeMotionCleanups.forEach((cleanup) => cleanup());
  });
}

export function usePortfolioMotion(pageRef: RefObject<HTMLDivElement | null>) {
  const [fontsReady, setFontsReady] = useState(false);
  useEffect(() => {
    let isMounted = true;
    document.fonts.ready.then(() => {
      if (isMounted) setFontsReady(true);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useGSAP(
    () => {
      if (!fontsReady || !pageRef.current) return;
      const page = pageRef.current;
      const media = gsap.matchMedia();
      const cleanupMotion = () => media.revert();
      activeMotionCleanups.add(cleanupMotion);
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const smoothScroll = new Lenis({
          anchors: { offset: -96 },
          smoothWheel: true,
          syncTouch: false,
          stopInertiaOnNavigate: true,
        });
        const updateScrollTriggers = () => ScrollTrigger.update();
        const advanceSmoothScroll = (time: number) => smoothScroll.raf(time * 1000);
        smoothScroll.on("scroll", updateScrollTriggers);
        gsap.ticker.add(advanceSmoothScroll);
        gsap.ticker.lagSmoothing(0);

        const revealOnScroll = (elements: Element | Element[] | NodeListOf<Element>, trigger: Element, stagger = 0) => {
          gsap.from(elements, {
            y: 48,
            autoAlpha: 0,
            duration: 1.15,
            stagger,
            ease: "expo.out",
            scrollTrigger: { trigger, start: "top 88%", once: true },
          });
        };
        const nameLines = page.querySelectorAll(".name-line > span");
        const opening = gsap.timeline({ defaults: { ease: "power3.out" } });
        nameLines.forEach((line, index) => {
          opening.from(
            line,
            {
              yPercent: 105,
              opacity: 0,
              duration: 1.1,
              ease: "expo.out",
            },
            index * 0.18,
          );
        });
        opening.from(
          page.querySelector(".hero-caption"),
          { opacity: 0, duration: 0.8 },
          0,
        );
        opening.from(
          page.querySelector(".hero-introduction"),
          { opacity: 0, y: 30, duration: 1 },
          0.55,
        );
        opening.from(
          page.querySelectorAll(".hero-socials a"),
          { opacity: 0, y: 24, duration: 0.9, stagger: 0.1 },
          0.75,
        );
        opening.from(
          page.querySelector(".scroll-cue"),
          { scaleX: 0, transformOrigin: "left", duration: 0.9 },
          0.7,
        );

        const hero = page.querySelector(".hero");
        if (hero) {
          gsap.to(page.querySelector(".hero-copy"), {
            yPercent: -12,
            opacity: 0.35,
            ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.7 },
          });
          gsap.to(page.querySelector(".hero-introduction-depth"), {
            yPercent: -22,
            opacity: 0.25,
            ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.7 },
          });
        }

        page.querySelectorAll<HTMLElement>(".section").forEach((section) => {
          const heading = section.querySelector("h2");
          const headingDetails = section.querySelectorAll(".section-index, .section-note, .projects-heading p, .projects-heading > a");
          if (heading) revealOnScroll(heading, heading);
          headingDetails.forEach((detail) => revealOnScroll(detail, detail));

          section.querySelectorAll(".prose, .skill-band, .experience-shell, .education-row, .contact-bottom, .social-links")
            .forEach((element) => revealOnScroll(element, element));

          section.querySelectorAll(".highlights").forEach((list) => {
            const entries = list.querySelectorAll(":scope > li");
            if (entries.length) revealOnScroll(entries, list, 0.12);
          });
        });
        gsap.fromTo(
          page.querySelector(".reading-progress"),
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
          },
        );
        page.querySelectorAll(".project-entry").forEach((card) => {
          revealOnScroll(card, card);
          const image = card.querySelector(".project-entry-image img");
          if (image) {
            gsap.from(image, {
              scale: 1.13,
              duration: 1.8,
              ease: "expo.out",
              scrollTrigger: { trigger: card, start: "top 88%", once: true },
            });
          }
        });
        ScrollTrigger.refresh();
        return () => {
          gsap.ticker.remove(advanceSmoothScroll);
          smoothScroll.destroy();
        };
      });
      return () => {
        cleanupMotion();
        activeMotionCleanups.delete(cleanupMotion);
      };
    },
    { scope: pageRef, dependencies: [fontsReady], revertOnUpdate: true },
  );
}

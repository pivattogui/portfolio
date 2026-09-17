import { useRef, type PropsWithChildren, type PointerEvent } from "react";

// Adapted from React Bits SpotlightCard; see public/licenses/react-bits.txt.
export function SpotlightCard({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  const cardRef = useRef<HTMLElement>(null);

  function moveSpotlight(event: PointerEvent<HTMLElement>) {
    const card = cardRef.current;
    if (
      !card ||
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--mouse-y", `${event.clientY - bounds.top}px`);
  }

  return (
    <article
      ref={cardRef}
      onPointerMove={moveSpotlight}
      className={`card-spotlight ${className}`}
    >
      {children}
    </article>
  );
}

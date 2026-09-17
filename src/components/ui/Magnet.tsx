import { useEffect, useRef, type PropsWithChildren } from "react";

// Adapted from React Bits Magnet; see public/licenses/react-bits.txt.
export function Magnet({ children }: PropsWithChildren) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;
    const motion = window.matchMedia(
      "(prefers-reduced-motion: no-preference) and (pointer: fine)",
    );
    const resetPosition = () => {
      content.style.transform = "translate3d(0, 0, 0)";
    };
    const moveMagnet = (event: PointerEvent) => {
      if (!motion.matches || event.pointerType !== "mouse") return;
      const bounds = wrapper.getBoundingClientRect();
      const x = (event.clientX - bounds.left - bounds.width / 2) / 10;
      const y = (event.clientY - bounds.top - bounds.height / 2) / 10;
      content.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    wrapper.addEventListener("pointermove", moveMagnet);
    wrapper.addEventListener("pointerleave", resetPosition);
    motion.addEventListener("change", resetPosition);
    return () => {
      wrapper.removeEventListener("pointermove", moveMagnet);
      wrapper.removeEventListener("pointerleave", resetPosition);
      motion.removeEventListener("change", resetPosition);
    };
  }, []);
  return (
    <div className="magnet" ref={wrapperRef}>
      <div className="magnet-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}

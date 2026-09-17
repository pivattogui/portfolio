import { useEffect, useRef, useState } from "react";

// Adapted from React Bits DecryptedText, limited to one reveal on entering view.
export function DecryptedText({ text }: { text: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState(text);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    setDisplayText(text);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const finishReveal = () => {
      clearInterval(intervalId);
      setDisplayText(text);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (reducedMotion.matches) return;
        let iteration = 0;
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        intervalId = setInterval(() => {
          iteration++;
          const revealedCount = Math.ceil((iteration / 16) * text.length);
          setDisplayText(
            Array.from(text, (character, index) =>
              index < revealedCount || character === " " || character === "/"
                ? character
                : characters[Math.floor(Math.random() * characters.length)],
            ).join(""),
          );
          if (iteration >= 16) finishReveal();
        }, 45);
      },
      { threshold: 0.5 },
    );
    observer.observe(container);
    reducedMotion.addEventListener("change", finishReveal);
    return () => {
      clearInterval(intervalId);
      observer.disconnect();
      reducedMotion.removeEventListener("change", finishReveal);
    };
  }, [text]);
  return (
    <span ref={containerRef} className="decrypted-text">
      <span className="sr-only">{text}</span>
      <span className="text-reserve" aria-hidden="true">
        {text}
      </span>
      <span aria-hidden="true">{displayText}</span>
    </span>
  );
}

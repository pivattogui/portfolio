import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const Plasma = lazy(() => import("./react-bits/backgrounds/Plasma/Plasma"));

class BackgroundErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

export function PageBackground() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () =>
      setPrefersReducedMotion(motionPreference.matches);

    motionPreference.addEventListener("change", updateMotionPreference);
    return () =>
      motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);

  return (
    <div className="page-background" aria-hidden="true">
      <div className="react-bits-background-stage">
        <BackgroundErrorBoundary>
          <Suspense fallback={null}>
            {!prefersReducedMotion && (
              <Plasma
                color="#a9c4ea"
                secondaryColor="#8f9fd0"
                iterations={44}
                opacity={1}
                renderScale={0.45}
                targetFps={30}
              />
            )}
          </Suspense>
        </BackgroundErrorBoundary>
      </div>
    </div>
  );
}

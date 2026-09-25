import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const Plasma = lazy(() => import("./react-bits/backgrounds/Plasma/Plasma"));

type NavigatorWithPerformanceHints = Navigator & {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
};

function hasEnoughResourcesForPlasma() {
  const performanceHints = navigator as NavigatorWithPerformanceHints;
  return (
    window.matchMedia("(min-width: 900px) and (pointer: fine)").matches &&
    !performanceHints.connection?.saveData &&
    (performanceHints.deviceMemory ?? 8) >= 4 &&
    navigator.hardwareConcurrency >= 6
  );
}

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
  const [shouldRenderPlasma, setShouldRenderPlasma] = useState(false);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const devicePreference = window.matchMedia("(min-width: 900px) and (pointer: fine)");
    const idleWindow = window as unknown as {
      cancelIdleCallback?: Window["cancelIdleCallback"];
      requestIdleCallback?: Window["requestIdleCallback"];
    };
    let idleCallback = 0;
    let fallbackTimer = 0;

    const updateBackground = () => {
      idleWindow.cancelIdleCallback?.(idleCallback);
      window.clearTimeout(fallbackTimer);
      setShouldRenderPlasma(false);
      if (motionPreference.matches || !hasEnoughResourcesForPlasma()) return;

      if (idleWindow.requestIdleCallback) {
        idleCallback = idleWindow.requestIdleCallback(() => setShouldRenderPlasma(true), { timeout: 1_500 });
      } else {
        fallbackTimer = window.setTimeout(() => setShouldRenderPlasma(true), 800);
      }
    };

    updateBackground();
    motionPreference.addEventListener("change", updateBackground);
    devicePreference.addEventListener("change", updateBackground);
    return () => {
      idleWindow.cancelIdleCallback?.(idleCallback);
      window.clearTimeout(fallbackTimer);
      motionPreference.removeEventListener("change", updateBackground);
      devicePreference.removeEventListener("change", updateBackground);
    };
  }, []);

  return (
    <div className="page-background" aria-hidden="true">
      <div className="react-bits-background-stage">
        <BackgroundErrorBoundary>
          <Suspense fallback={null}>
            {shouldRenderPlasma && (
              <Plasma
                color="#a9c4ea"
                secondaryColor="#8f9fd0"
                iterations={36}
                opacity={1}
                renderScale={0.4}
                targetFps={30}
              />
            )}
          </Suspense>
        </BackgroundErrorBoundary>
      </div>
    </div>
  );
}

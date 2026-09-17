import { createContext, useContext } from "react";
import { getPortfolioContent, type Locale } from "./locales";

interface PortfolioContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  content: ReturnType<typeof getPortfolioContent>;
}

export const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function usePortfolioContent() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error("PortfolioProvider is missing");
  return context;
}

import type { ReactNode } from "react";
import { PortfolioContext } from "./PortfolioContext";
import { getPortfolioContent, type Locale } from "./locales";

export function PortfolioProvider({ locale, setLocale, children }: { locale: Locale; setLocale: (locale: Locale) => void; children: ReactNode }) {
  return <PortfolioContext.Provider value={{ locale, setLocale, content: getPortfolioContent(locale) }}>{children}</PortfolioContext.Provider>;
}

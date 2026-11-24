"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";
/** Viewport point (px) the circle grows from, e.g. the center of the toggle button */
type Origin = { x: number; y: number };

type ThemeContextValue = {
  theme: Theme;
  toggle: (origin?: Origin) => void;
  setTheme: (t: Theme, origin?: Origin) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "mesa-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const stored =
      (typeof window !== "undefined" &&
        (localStorage.getItem(STORAGE_KEY) as Theme | null)) ||
      null;
    const system =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    const initial: Theme = stored ?? system;
    setThemeState(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    requestAnimationFrame(() =>
      document.documentElement.classList.add("theme-ready"),
    );
  }, []);

  // The actual theme change: state, <html> class, and storage
  const apply = (t: Theme) => {
    setThemeState(t);
    document.documentElement.classList.toggle("dark", t === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {}
  };

  const setTheme = useCallback((t: Theme, origin?: Origin) => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // No click position, reduced motion, or no browser support: switch instantly
    if (!origin || reduceMotion || !document.startViewTransition) {
      apply(t);
      return;
    }

    // Pause the "theme-ready" CSS color transitions so they don't blur the snapshots
    root.classList.remove("theme-ready");

    const transition = document.startViewTransition(() => {
      flushSync(() => apply(t)); // the new theme must be in the DOM before the browser captures it
    });

    // radius needed for the circle to reach the farthest corner of the screen
    const { x, y } = origin;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    transition.ready.then(() => {
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 600,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });

    transition.finished.finally(() => root.classList.add("theme-ready"));
  }, []);

  const toggle = useCallback(
    (origin?: Origin) => setTheme(theme === "dark" ? "light" : "dark", origin),
    [theme, setTheme],
  );

  const value = useMemo(
    () => ({ theme, toggle, setTheme }),
    [theme, toggle, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

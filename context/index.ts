import { createContext } from "react";

interface _LazyImageContext {
  io: IntersectionObserver,
  callbacks: { [p: string]: () => void }
}

export const LazyImageContext = createContext<_LazyImageContext | null>(null);

export const BigImageContext = createContext<(src: string) => void>(() => {});

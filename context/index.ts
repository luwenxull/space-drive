import { createContext } from "react";

interface _LazyImageContext {
  io: IntersectionObserver,
  callbacks: { [p: string]: () => void }
}

export interface ImageChainRoot {
  start?: ImageChainNode,
  end?: ImageChainNode,
}

export interface ImageChainNode {
  prev?: ImageChainNode,
  next?: ImageChainNode,
  root: ImageChainRoot,
  url: string,
}

export function removeNode(node: ImageChainNode) {
  const { prev, next, root } = node;
  if (prev) {
    prev.next = next;
  } else {
    root.start = next;
  }
  if (next) {
    next.prev = prev;
  } else {
    root.end = prev;
  }
}

export const LazyImageContext = createContext<_LazyImageContext | null>(null);

export const BigImageContext = createContext<
  ((src: string) => {
    // node: ImageChainNode,
    remove: () => void,
    display: () => void,
  }) | null
>(null);

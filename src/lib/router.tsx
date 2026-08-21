import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { getLenis } from "./lenis";

export function scrollToHash(hash: string) {
  const el = document.getElementById(hash);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function scrollToTop(immediate = true) {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(0, { immediate });
  else window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
}

interface RouterContextValue {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue>({
  path: "/",
  navigate: () => undefined,
});

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => window.location.pathname);

  const navigate = useCallback((to: string) => {
    const [pathname, hash] = to.split("#");
    const target = pathname || "/";
    if (target !== window.location.pathname) {
      window.history.pushState({}, "", to);
      setPath(target);
      if (hash) {
        // Wait for the new page to paint before scrolling to the section.
        requestAnimationFrame(() =>
          requestAnimationFrame(() => scrollToHash(hash))
        );
      }
    } else if (hash) {
      scrollToHash(hash);
    } else {
      scrollToTop(false);
    }
  }, []);

  useEffect(() => {
    const onPop = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export const useRouter = () => useContext(RouterContext);

interface LinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  onNavigate?: () => void;
  style?: CSSProperties;
  role?: string;
}

export function Link({ to, children, className, ariaLabel, onNavigate, style, role }: LinkProps) {
  const { navigate } = useRouter();
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onNavigate?.();
    navigate(to);
  };
  return (
    <a href={to} onClick={onClick} className={className} aria-label={ariaLabel} style={style} role={role}>
      {children}
    </a>
  );
}

"use client";

import { headerMenuList } from "@/utils/menuList";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useHooks = () => {
  const path = usePathname();
  const route = useRouter();

  const useRoute = (path: string) => {
    route.push(path);
  };

  const useMoveBack = () => {
    route.back();
  };

  const getPageName = () => {
    for (const m of headerMenuList) {
      if (m.subMenu) {
        for (const s of m.subMenu) {
          if (path.startsWith(`${m.href}${s.href}`)) {
            return {
              title: m.menu,
              sub: s.submenu,
            };
          }
        }
      } else {
        if (path.startsWith(m.href)) {
          return {
            title: m.menu,
          };
        }
      }
    }
    return undefined;
  };

  const useScroll = () => {
    const [state, setState] = useState({ x: 0, y: 0 });
    const onScroll = () => {
      setState({ x: window.scrollX, y: window.scrollY });
    };

    useEffect(() => {
      window.addEventListener("scroll", onScroll);

      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    }, []);

    return state;
  };

  const useResize = () => {
    const [state, setState] = useState<number | null>(null);

    useEffect(() => {
      const handleResize = () => {
        setState(window.innerWidth);
      };

      handleResize();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return state;
  };

  const useOnClickOutSide = (ref: React.RefObject<HTMLElement | null>, handler: () => void, isGlobModalOpen?: boolean) => {
    useEffect(() => {
      if (isGlobModalOpen) return;
      const listener = (e: MouseEvent) => {
        if (!ref.current || ref.current.contains(e.target as Node)) return;
        handler();
      };

      document.addEventListener("mousedown", listener);
      return () => document.removeEventListener("mousedown", listener);
    }, [ref, handler]);
  };

  const useClearBodyScroll = (modal: any) => {
    useEffect(() => {
      if (modal) {
        window.document.body.style.overflow = "hidden";
      } else {
        window.document.body.removeAttribute("style");
      }
    }, [modal]);
  };

  return { getPageName, useRoute, useMoveBack, useScroll, useResize, useOnClickOutSide, useClearBodyScroll };
};

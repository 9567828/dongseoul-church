'use client';

import { headerMenuList } from '@/utils/menuList';
import { addrMap } from '@/utils/propType';
import { usePathname, useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { handlers } from '@/utils/handlers';

export const useHooks = () => {
  const path = usePathname();
  const route = useRouter();
  const { handlePageSizeQuery } = handlers();

  const useRoute = (path: string, setScroll?: boolean) => {
    if (!setScroll) {
      route.push(path);
    } else {
      route.push(path, { scroll: false });
    }
  };

  const useMoveBack = () => {
    route.back();
  };

  const useReplace = (path: string) => {
    route.replace(path);
  };

  const useRefresh = () => {
    route.refresh();
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
      window.addEventListener('scroll', onScroll);

      return () => {
        window.removeEventListener('scroll', onScroll);
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

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return state;
  };

  const useOnClickOutSide = (
    ref: React.RefObject<HTMLElement | null>,
    handler: () => void,
    btn?: React.RefObject<HTMLElement | null>,
    isGlobModalOpen?: boolean,
  ) => {
    useEffect(() => {
      if (isGlobModalOpen) return;

      if (btn?.current) return;

      const listener = (e: MouseEvent) => {
        if (!ref.current || ref.current.contains(e.target as Node)) return;
        handler();
      };

      document.addEventListener('mousedown', listener);
      return () => document.removeEventListener('mousedown', listener);
    }, [ref, handler]);
  };

  const useClearBodyScroll = (modal: any) => {
    useEffect(() => {
      if (modal) {
        window.document.body.style.overflow = 'hidden';
      } else {
        window.document.body.removeAttribute('style');
      }
    }, [modal]);
  };

  const useOpenAddr = (setState: Dispatch<SetStateAction<addrMap>>) => {
    useEffect(() => {
      const handler = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;

        const { type, payload } = event.data || {};

        if (type !== 'ADDRESS_SELECT') return;

        const { address, zonecode } = payload;
        setState({ address, zonecode });
      };

      window.addEventListener('message', handler);
      return () => window.removeEventListener('message', handler);
    }, []);
  };

  const useBeforeUnload = (path: string) => {
    useEffect(() => {
      const preventGoBack = () => {
        history.pushState(null, '', location.href);
        if (confirm('변경사항이 저장되지 않을 수 있습니다')) {
          route.push(path);
        }
      };

      history.pushState(null, '', location.href);

      window.addEventListener('popstate', preventGoBack);
      return () => window.removeEventListener('popstate', preventGoBack);
    }, []);
  };

  const useResetFilter = (fn: () => void) => {
    useEffect(() => {
      fn();
    }, []);
  };

  type FilterDate = {
    start: string;
    end: string;
  };

  return {
    getPageName,
    useRoute,
    useMoveBack,
    useReplace,
    useRefresh,
    useScroll,
    useResize,
    useOnClickOutSide,
    useClearBodyScroll,
    useOpenAddr,
    useBeforeUnload,
    useResetFilter,
  };
};

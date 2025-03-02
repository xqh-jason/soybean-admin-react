import type { RouterNavigateOptions, To } from 'react-router-dom';
import { createBrowserRouter, matchRoutes } from 'react-router-dom';

import { routes } from '@/router';
import { store } from '@/store';

import { getIsLogin } from '../auth/authStore';

import { initAuthRoutes } from './routerHooks';

function initRouter() {
  const authRouteMode = import.meta.env.VITE_AUTH_ROUTE_MODE;

  const isStaticSuper = true;

  let isAlreadyPatch = false;

  function getIsNeedPatch(path: string) {
    if (isAlreadyPatch) return false;

    const matchRoute = matchRoutes(routes, { pathname: path }, import.meta.env.VITE_BASE_URL);

    if (!matchRoute) return true;

    if (matchRoute) {
      return matchRoute[1].route.path === '*';
    }

    return false;
  }

  const reactRouter = createBrowserRouter(routes, {
    basename: import.meta.env.VITE_BASE_URL,
    patchRoutesOnNavigation: ({ patch, path }) => {
      if (getIsNeedPatch(path)) {
        if (authRouteMode === 'static') {
          // 超级管理员
          if (isStaticSuper) {
            initAuthRoutes(patch);
          }
        }
        isAlreadyPatch = true;
      }
    }
  });

  if (getIsLogin(store.getState())) {
    initAuthRoutes(reactRouter.patchRoutes);

    isAlreadyPatch = true;
  }

  return reactRouter;
}

export function navigator() {
  const reactRouter = initRouter();

  async function navigate(path: To | null, options?: RouterNavigateOptions) {
    reactRouter.navigate(path, options);
  }

  function back() {
    reactRouter.navigate(-1);
  }

  function forward() {
    reactRouter.navigate(1);
  }

  function go(delta: number) {
    reactRouter.navigate(delta);
  }

  function replace(path: To) {
    reactRouter.navigate(path, { replace: true });
  }

  function reload() {
    reactRouter.navigate(0);
  }

  function navigateUp() {
    reactRouter.navigate('..');
  }

  function goHome() {
    reactRouter.navigate('/');
  }

  return {
    back,
    forward,
    go,
    goHome,
    navigate,
    navigateUp,
    reactRouter,
    reload,
    replace
  };
}

export const router = navigator();

export type RouterContextType = ReturnType<typeof navigator>;

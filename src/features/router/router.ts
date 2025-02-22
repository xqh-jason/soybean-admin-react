import { emitter } from '@sa/hooks';
import type { RouteObject, RouterNavigateOptions, To } from 'react-router-dom';
import { createBrowserRouter, matchRoutes } from 'react-router-dom';

import { authRoutes, routes } from '@/router';

import { filterRoutesToMenus } from '../menu/MenuUtil';

import { mergeValuesByParent } from './shared';

export function navigator() {
  const authRouteMode = import.meta.env.VITE_AUTH_ROUTE_MODE;

  const isStaticSuper = true;

  let isAlreadyPatch = false;

  function getIsNeedPatch(path: string) {
    if (isAlreadyPatch) return false;

    const matchRoute = matchRoutes(routes, { pathname: path }, import.meta.env.VITE_BASE_URL);

    if (!matchRoute) return true;

    if (matchRoute) {
      return matchRoute[0].route.path === '*';
    }
    return false;
  }

  const reactAuthRoutes = mergeValuesByParent(authRoutes).reverse();

  const reactRouter = createBrowserRouter(routes, {
    basename: import.meta.env.VITE_BASE_URL,
    patchRoutesOnNavigation: ({ patch, path }) => {
      if (getIsNeedPatch(path)) {
        if (authRouteMode === 'static') {
          // 超级管理员
          if (isStaticSuper) {
            reactAuthRoutes.forEach(route => {
              if (route.parent?.includes('base')) {
                emitter.emit('ADD_MENUS', filterRoutesToMenus(route.route));

                console.log('route.route', route.route);
              }

              patch(route.parent, route.route);
            });
          }
        }

        isAlreadyPatch = true;
      }
      console.log('patchRoutesOnNavigation', path);
    }
  });

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

  function addRoutes(newRoutes: RouteObject[], parent: string | null = null) {
    reactRouter.patchRoutes(parent, newRoutes);
  }

  return {
    addRoutes,
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

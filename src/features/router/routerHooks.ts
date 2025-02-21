import { emitter } from '@sa/hooks';

import { authRoutes } from '@/router';

import { filterRoutesToMenus } from '../menu/MenuUtil';

import type { RouterContextType } from './router';
import { filterAuthRoutesByRoles, mergeValuesByParent } from './shared';

export function useInitAuthRoutes() {
  const authRouteMode = import.meta.env.VITE_AUTH_ROUTE_MODE;

  const reactAuthRoutes = mergeValuesByParent(authRoutes).reverse();

  function initAuthRoutes(isStaticSuper: boolean, roles: string[], addRoutes: RouterContextType['addRoutes']) {
    // 静态模式
    if (authRouteMode === 'static') {
      // 超级管理员
      if (isStaticSuper) {
        reactAuthRoutes.forEach(route => {
          if (route.parent?.includes('base')) {
            emitter.emit('ADD_MENUS', filterRoutesToMenus(route.route));
          }

          addRoutes(route.route, route.parent);
        });
      } else {
        // 非超级管理员
        const filteredRoutes = filterAuthRoutesByRoles(reactAuthRoutes, roles);
        filteredRoutes.forEach((route, index) => {
          addRoutes(route, reactAuthRoutes[index].parent);
        });
      }
    } else {
      // 动态模式
      // await dispatch(initDynamicAuthRoute());
    }

    // const routeHomeName = getRouteHome(getState());

    // const homeRoute = router.getRouteByName(routeHomeName);

    // if (homeRoute) dispatch(initHomeTab({ homeRouteName: routeHomeName as LastLevelRouteKey, route: homeRoute }));
  }

  return initAuthRoutes;
}

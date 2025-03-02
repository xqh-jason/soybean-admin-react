import type { RouteObject } from 'react-router-dom';

export function filterCacheRoutes(routes: RouteObject[]) {
  const cacheRoutes: string[] = [];

  for (const route of routes) {
    const { children, handle, path } = route;
    // 如果节点存在 path（注意：这里假设空字符串或 undefined 均视为无 path）
    if (path) {
      if (handle?.keepAlive) {
        cacheRoutes.push(path);
      }

      if (children && children.length) {
        cacheRoutes.push(...filterCacheRoutes(children));
      }
    } else if (children && children.length) {
      // 如果当前节点没有 path，但有 children，则递归处理 children，
      cacheRoutes.push(...filterCacheRoutes(children));
      // 如果既没有 path 也没有 children，则该节点直接被过滤掉
    }
  }

  return cacheRoutes;
}

/**
 * Merge routes by parent
 *
 * @param data Auth routes
 * @returns Merged routes
 */
export function mergeValuesByParent(data: Router.SingleAuthRoute[]) {
  const merged: Record<string, Router.AuthRoute> = {};
  data.forEach(item => {
    // 使用一个变量作为 key，若 parent 为 null，则转换为字符串 "null"
    const key = item.parent === null ? 'null' : item.parent;
    if (!merged[key]) {
      merged[key] = {
        parent: item.parent, // 保持原始 parent 值，包括 null
        route: []
      };
    }
    merged[key].route.push(item.route);
  });
  return Object.values(merged);
}

/**
 * Filter auth routes by roles
 *
 * @param routes Auth routes
 * @param roles Roles
 */
export function filterAuthRoutesByRoles(routes: { parent: string | null; route: RouteObject[] }[], roles: string[]) {
  return routes.flatMap(route => {
    const filteredRoutes = route.route.map(item => filterAuthRouteByRoles(item, roles));

    return filteredRoutes;
  });
}

/**
 * Filter auth route by roles
 *
 * @param route Auth route
 * @param roles Roles
 */
function filterAuthRouteByRoles(route: RouteObject, roles: string[]) {
  const routeRoles: string[] = (route.handle && route.handle.roles) || [];

  // if the route's "roles" is empty, then it is allowed to access
  const isEmptyRoles = !routeRoles.length;

  // if the user's role is included in the route's "roles", then it is allowed to access
  const hasPermission = routeRoles.some(role => roles.includes(role));

  const filterRoute = { ...route };

  if (filterRoute.children?.length) {
    filterRoute.children = filterRoute.children.flatMap(item => filterAuthRouteByRoles(item, roles));
  }

  return hasPermission || isEmptyRoles ? [filterRoute] : [];
}

import type { ElegantConstRoute } from '@soybean-react/vite-plugin-react-router';
import type { RouteObject } from 'react-router-dom';

import { configs, errors, layouts, pages } from '../elegant/imports';
import { generatedRoutes } from '../elegant/routes';
import { transformElegantRoutesToReactRoutes } from '../elegant/transform';

import { BaseChildrenRoutes } from './builtin';

export type AuthRoute = {
  parent: string | null;
  route: RouteObject;
};

/**
 * Get auth react routes
 *
 * @param routes Elegant routes
 */
function getReactRoutes(route: ElegantConstRoute[]) {
  return transformElegantRoutesToReactRoutes(route, layouts, pages, errors, configs);
}

/**
 * 过滤路由并收集需要权限的路由
 *
 * @param {Array} routes - 当前路由数组
 * @param {Object | null} parent - 当前节点的父路由，根节点时为 null
 * @param {Array} authRoutes - 用于记录需要权限的路由和对应父级的数组
 * @returns {Array} 返回过滤后的路由数组
 */
// eslint-disable-next-line max-params
function filterRoutes(
  routes: RouteObject[],
  parent: string | null = null,
  authRoutes: AuthRoute[] = [],
  cacheRoutes: string[] = []
) {
  return routes.reduce((acc, route) => {
    // 判断是否需要权限：假设 handles.constant 为 true 表示有权限要求
    const noPermission = route.handle && route.handle.constant;

    const isRouteGroup = route.id?.startsWith('(') && route.id.endsWith(')');

    // 递归处理子路由：注意，此处传递当前路由作为父级
    if (route.children && route.children.length > 0) {
      if (noPermission || isRouteGroup) {
        route.children = filterRoutes(route.children, route.id, authRoutes, cacheRoutes);
      }
    }

    if (!noPermission) {
      // 将当前路由及其父级（如果没有父级，则为 null）记录到 authRoutes 数组中
      if (isRouteGroup) {
        const children = route.children
          ?.map(item => {
            if (item.handle?.constant) {
              return item;
            }
            authRoutes.push({
              parent: parent || null,
              route
            });
            return null;
          })
          .filter(Boolean) as RouteObject[];

        if (children && children.length > 0) {
          route.children = children;
          acc.push(route);
        } else {
          authRoutes.push({
            parent: parent || null,
            route
          });
        }
      } else {
        authRoutes.push({
          parent: parent || null,
          route
        });
      }
    } else {
      if (route.handle?.keepAlive) {
        cacheRoutes.push(route.path || '');
      }
      // 放入结果数组
      acc.push(route);
    }

    // 如果没有权限，则该路由不加入结果数组
    return acc;
  }, [] as RouteObject[]);
}

/**
 * - 初始化路由
 * - 生成所有路由
 * - 生成权限路由
 * - 生成常量路由
 *
 * @returns {Object} 返回路由对象
 */
function initRoutes() {
  // 获取所有文件夹生成的路由并转换成 react-router 路由
  const customRoutes = getReactRoutes(generatedRoutes);

  // 获取基础路由
  const baseRoute = customRoutes.find(route => route.id === '(base)');
  // 添加自定义复用路由至基础路由
  baseRoute?.children?.push(...BaseChildrenRoutes);

  const authRoutes: AuthRoute[] = [];

  const cacheRoutes: string[] = [];

  const constantRoutes = filterRoutes(customRoutes, null, authRoutes, cacheRoutes);

  return { authRoutes, cacheRoutes, constantRoutes };
}

export const { authRoutes, cacheRoutes, constantRoutes } = initRoutes();

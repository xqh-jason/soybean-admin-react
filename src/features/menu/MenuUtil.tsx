import type { RouteObject } from 'react-router-dom';

import BeyondHiding from '@/components/BeyondHiding';
import { $t } from '@/locales';

/**
 * Get global menus by auth routes
 *
 * @param routes Auth routes
 */
export function filterRoutesToMenus(routes: RouteObject[]) {
  const menus: App.Global.Menu[] = [];

  const cacheRoutes: string[] = [];

  for (const route of routes) {
    // 如果节点存在 path（注意：这里假设空字符串或 undefined 均视为无 path）
    if (route.handle?.keepAlive) {
      cacheRoutes.push(route.path as string);
    }
    if (route.path && !route.handle?.hideInMenu && route.id?.includes('base')) {
      // 如果存在 children，则递归处理
      const newNode = getGlobalMenuByBaseRoute(route);

      if (route.children && route.children.length) {
        const filteredChildren = filterRoutesToMenus(route.children);

        if (filteredChildren?.length) {
          newNode.children = filteredChildren;
        }
      }
      menus.push(newNode);
    } else if (route.children && route.children.length) {
      // 如果当前节点没有 path，但有 children，则递归处理 children，
      menus.push(...filterRoutesToMenus(route.children));
      // 如果既没有 path 也没有 children，则该节点直接被过滤掉
    }
  }

  return menus;
}

/**
 * Get global menu by route
 *
 * @param route
 */
export function getGlobalMenuByBaseRoute(route: RouteObject): App.Global.Menu {
  const { path } = route;

  const { i18nKey, icon = import.meta.env.VITE_MENU_ICON, localIcon, title } = route.handle ?? {};

  const label = i18nKey ? $t(i18nKey) : title;

  const menu: App.Global.Menu = {
    icon: (
      <SvgIcon
        icon={icon}
        localIcon={localIcon}
        style={{ fontSize: '20px' }}
      />
    ),
    key: path || '',
    label: <BeyondHiding title={label} />,
    title: label
  };

  return menu;
}

/**
 * Get active first level menu key
 *
 * @param route
 */
export function getActiveFirstLevelMenuKey(route: App.Global.TabRoute) {
  const { activeMenu, hideInMenu } = route.handle;

  const name = route.pathname;

  const routeName = (hideInMenu ? activeMenu : name) || name;

  const [firstLevelRouteName] = routeName;

  return firstLevelRouteName;
}

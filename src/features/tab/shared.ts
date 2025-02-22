import type { LastLevelRouteKey, RouteMap } from '@soybean-react/vite-plugin-react-router';

import { getRouteName, getRoutePath } from '@/router/elegant/transform';

/**
 * Filter tabs by id
 *
 * @param tabId
 * @param tabs
 */
export function filterTabsById(tabId: string, tabs: App.Global.Tab[]) {
  return tabs.filter(tab => tab.id !== tabId);
}

/**
 * Get default home tab
 *
 * @param router
 * @param homeRouteName routeHome in useRouteStore
 */
export function getDefaultHomeTab({
  homeRouteNamePath,
  route
}: {
  homeRouteNamePath: string;
  route: RouteRecordNormalized | false;
}) {
  const homeRoutePath = getRoutePath(homeRouteName);

  const i18nLabel = $t(`route.${homeRouteName}`);

  let homeTab: App.Global.Tab = {
    fullPath: homeRoutePath,
    id: getRoutePath(homeRouteName),
    label: i18nLabel || homeRouteName,
    routeKey: homeRouteName,
    routePath: homeRoutePath
  };

  if (route) {
    homeTab = getTabByRoute(route);
  }

  return homeTab;
}

/**
 * Get fixed tab ids
 *
 * @param tabs
 */
export function getFixedTabIds(tabs: App.Global.Tab[]) {
  const fixedTabs = getFixedTabs(tabs);

  return fixedTabs.map(tab => tab.id);
}

/**
 * Get fixed tabs
 *
 * @param tabs
 */
export function getFixedTabs(tabs: App.Global.Tab[]) {
  return tabs.filter(tab => tab.fixedIndex !== undefined);
}

/**
 * The vue router will automatically merge the meta of all matched items, and the icons here may be affected by other
 * matching items, so they need to be processed separately
 *
 * @param route
 */
export function getRouteIcons(route: Router.Route) {
  // Set default value for icon at the beginning
  let icon: string = route?.handle?.icon || import.meta.env.VITE_MENU_ICON;
  let localIcon: string | undefined = route?.handle?.localIcon;

  // Route.matched only appears when there are multiple matches,so check if route.matched exists
  if (route.matched) {
    // Find the handle of the current route from matched
    const currentRoute = route.matched.find(r => r.id === route.id);
    // If icon exists in currentRoute.handle, it will overwrite the default value
    icon = currentRoute?.handle?.icon || icon;
    localIcon = currentRoute?.handle?.localIcon;
  }

  return { icon, localIcon };
}

/**
 * Get tab by route
 *
 * @param route
 */
export function getTabByRoute(route: Router.Route) {
  const { fullPath, handle, id, pathname } = route;

  const { fixedIndexInTab, i18nKey, title } = handle;

  let fixedIndex = fixedIndexInTab;

  if (pathname === import.meta.env.VITE_ROUTE_HOME) {
    fixedIndex = 0;
  }

  console.log('fixedIndex', fixedIndex, pathname, import.meta.env.VITE_ROUTE_HOME);

  // Get icon and localIcon from getRouteIcons function
  const { icon, localIcon } = getRouteIcons(route);

  const tab: App.Global.Tab = {
    fixedIndex,
    fullPath,
    i18nKey,
    icon,
    id: fullPath,
    label: title,
    localIcon,
    newLabel: '',
    oldLabel: i18nKey || title,
    routeKey: id as LastLevelRouteKey,
    routePath: pathname as RouteMap[LastLevelRouteKey]
  };

  return tab;
}

/**
 * Is tab in tabs
 *
 * @param tab
 * @param tabs
 */
export function isTabInTabs(tabId: string, tabs: App.Global.Tab[]) {
  return tabs.some(tab => tab.id === tabId);
}

/**
 * extract tabs by all routes
 *
 * @param router
 * @param tabs
 */
export function extractTabsByAllRoutes(routeNames: string[], tabs: App.Global.Tab[]) {
  return tabs.filter(tab => routeNames.includes(tab.routeKey));
}

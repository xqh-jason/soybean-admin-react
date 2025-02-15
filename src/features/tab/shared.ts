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

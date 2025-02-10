export function useInitAuth() {
  if (authRouteMode === 'static') {
    dispatch(initStaticAuthRoute());
  } else {
    await dispatch(initDynamicAuthRoute());
  }
  const routeHomeName = getRouteHome(getState());

  const homeRoute = router.getRouteByName(routeHomeName);

  if (homeRoute) dispatch(initHomeTab({ homeRouteName: routeHomeName as LastLevelRouteKey, route: homeRoute }));
}

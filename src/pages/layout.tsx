import type { RoutePath } from '@soybean-react/vite-plugin-react-router';
import { Outlet, matchRoutes } from 'react-router-dom';

import { isStaticSuper, selectUserInfo } from '@/features/auth/authStore';
import { useRoute } from '@/features/router';
import { routeMap } from '@/router/elegant/routeMap';
import { localStg } from '@/utils/storage';

const allRoutes = Object.values(routeMap)
  .slice(1)
  .map(route => ({
    path: route
  }));

/**
 * initialize route
 *
 * @param to to route
 */
function initRoute(to: Router.Route) {
  const notFoundRoute = 'notFound';

  const isNotFoundRoute = to.id === notFoundRoute;

  const isLogin = Boolean(localStg.get('token'));

  if (!isLogin) {
    // if the user is not logged in and the route is a constant route but not the "not-found" route, then it is allowed to access.
    if (to.handle.constant && !isNotFoundRoute) {
      return null;
    }

    // if the user is not logged in, then switch to the login page
    const loginRoute: RoutePath = '/login';
    const query = to.fullPath;

    const location = `${loginRoute}?redirect=${query}`;

    return location;
  }

  // the auth route is initialized
  // it is not the "not-found" route, then it is allowed to access
  if (!isNotFoundRoute) {
    return null;
  }

  // it is captured by the "not-found" route, then check whether the route exists
  const exist = matchRoutes(allRoutes, to.pathname);

  const noPermissionRoute = '/403';

  if (exist && exist.length > 0) {
    const fullPath = noPermissionRoute;

    return fullPath;
  }

  return null;
}

function handleRouteSwitch(to: Router.Route, from: Router.Route | null) {
  // route with href
  if (to.handle.href) {
    window.open(to.handle.href, '_blank');

    return { path: from?.fullPath, replace: true };
  }

  return null;
}

function createRouteGuard(to: Router.Route, roles: string[], isSuper: boolean) {
  const rootRoute: RoutePath = '/';
  const loginRoute: RoutePath = '/login';
  const noAuthorizationRoute: RoutePath = '/403';

  const isLogin = Boolean(localStg.get('token'));
  const needLogin = !to.handle.constant;
  const routeRoles = to.handle.roles || [];

  const hasRole = roles.some(role => routeRoles.includes(role));

  const hasAuth = isSuper || !routeRoles.length || hasRole;

  // if it is login route when logged in, then switch to the root page
  if (to.fullPath.includes('login') && isLogin) {
    return rootRoute;
  }

  if (to.id === 'notFound') {
    const exist = matchRoutes(allRoutes, to.pathname);

    if (exist && exist.length > 0) {
      return noAuthorizationRoute;
    }

    return null;
  }

  if (!needLogin) return handleRouteSwitch(to, to.redirect);

  // the route need login but the user is not logged in, then switch to the login page
  if (!isLogin) return `${loginRoute}?redirect=${to.fullPath}`;

  // if the user is logged in but does not have authorization, then switch to the 403 page
  if (!hasAuth) return noAuthorizationRoute;

  return handleRouteSwitch(to, to.redirect);
}

const RootLayout = () => {
  const route = useRoute();

  const inInit = useRef(false);

  const { fullPath, handle } = route;

  const { roles } = useAppSelector(selectUserInfo);

  const isSuper = useAppSelector(isStaticSuper);

  const { t } = useTranslation();

  useEffect(() => {
    const { i18nKey, title } = handle;

    document.title = i18nKey ? t(i18nKey) : title;

    window.NProgress?.done?.();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullPath]);

  if (!inInit.current) {
    inInit.current = true;

    const location = initRoute(route);

    if (location) {
      return <Navigate to={location} />;
    }
  }

  const location = createRouteGuard(route, roles, isSuper);

  if (location && inInit.current) {
    if (typeof location === 'string') {
      return <Navigate to={location} />;
    }

    if (location.path) {
      return (
        <Navigate
          replace={location.replace}
          to={location.path}
        />
      );
    }
  }

  return <Outlet />;
};

export const loader = () => {
  window.NProgress?.start?.();

  return null;
};

export const shouldRevalidate = () => {
  return true;
};

export default RootLayout;

import { createBrowserRouter } from 'react-router';

import { routes } from './routes';

export { routes };

export const router = createBrowserRouter(routes, { basename: import.meta.env.VITE_BASE_URL });

/** create routes when the auth route mode is static */
export function createStaticRoutes() {
  const constantRoutes: ElegantRoute[] = [];

  const authRoutes: ElegantRoute[] = [];

  [...customRoutes, ...generatedRoutes].forEach(item => {
    if (item.meta?.constant) {
      constantRoutes.push(item);
    } else {
      authRoutes.push(item);
    }
  });

  return {
    authRoutes,
    constantRoutes
  };
}

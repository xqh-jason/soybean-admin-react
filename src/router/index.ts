import type { ElegantConstRoute } from '@soybean-react/vite-plugin-react-router';
import { createBrowserRouter } from 'react-router';

import { configs, errors, layouts, pages } from './elegant/imports';
import { generatedRoutes } from './elegant/routes';
import { transformElegantRoutesToReactRoutes } from './elegant/transform';

/**
 * Get auth react routes
 *
 * @param routes Elegant routes
 */
function getReactRoutes(route: ElegantConstRoute[]) {
  return transformElegantRoutesToReactRoutes(route, layouts, pages, errors, configs);
}

export const routes = getReactRoutes(generatedRoutes);

export const router = createBrowserRouter(routes, { basename: import.meta.env.VITE_BASE_URL });

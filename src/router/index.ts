import type { ElegantConstRoute } from '@ohh-889/react-auto-route';
import { createRouter } from '@sa/simple-router';

import { builtinRoutes } from './routes/builtin';

const { VITE_BASE_URL, VITE_ROUTER_HISTORY_MODE = 'history' } = import.meta.env;

/**
 * Get auth react routes
 *
 * @param routes Elegant routes
 */
function getReactRoutes(route: ElegantConstRoute) {
  return transformElegantRouteToReactRoute(route, layouts, pages);
}

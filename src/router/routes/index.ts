import type { ElegantConstRoute } from '@soybean-react/vite-plugin-react-router';

import { configs, errors, layouts, pages } from '../elegant/imports';
import { generatedRoutes } from '../elegant/routes';
import { transformElegantRoutesToReactRoutes } from '../elegant/transform';

import { BaseChildrenRoutes } from './builtin';

/**
 * Get auth react routes
 *
 * @param routes Elegant routes
 */
function getReactRoutes(route: ElegantConstRoute[]) {
  return transformElegantRoutesToReactRoutes(route, layouts, pages, errors, configs);
}

function getFinalRoutes() {
  const customRoutes = getReactRoutes(generatedRoutes);

  customRoutes[0].children?.push(...BaseChildrenRoutes);

  return customRoutes;
}

export const routes = getFinalRoutes();

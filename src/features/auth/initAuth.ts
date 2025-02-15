import type { RouterContextType } from '@/features/router';
import { useInitAuthRoutes } from '@/features/router';

const { VITE_AUTH_ROUTE_MODE, VITE_STATIC_SUPER_ROLE } = import.meta.env;

export function useInitAuth() {
  const { initAuthRoutes } = useInitAuthRoutes();

  function initAuth(roles: string[], addRoutes: RouterContextType['addRoutes']) {
    const isStaticSuper = VITE_AUTH_ROUTE_MODE === 'static' && roles.includes(VITE_STATIC_SUPER_ROLE);

    if (isStaticSuper) {
      initAuthRoutes(isStaticSuper, roles, addRoutes);
    }
  }

  return {
    initAuth
  };
}

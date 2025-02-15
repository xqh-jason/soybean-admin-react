import type { RouteObject, RouterNavigateOptions, To } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

import { routes } from '@/router';

export function navigator() {
  const reactRouter = createBrowserRouter(routes, { basename: import.meta.env.VITE_BASE_URL });

  async function navigate(path: To | null, options?: RouterNavigateOptions) {
    reactRouter.navigate(path, options);
  }

  function back() {
    reactRouter.navigate(-1);
  }

  function forward() {
    reactRouter.navigate(1);
  }

  function go(delta: number) {
    reactRouter.navigate(delta);
  }

  function replace(path: To) {
    reactRouter.navigate(path, { replace: true });
  }

  function reload() {
    reactRouter.navigate(0);
  }

  function navigateUp() {
    reactRouter.navigate('..');
  }

  function goHome() {
    reactRouter.navigate('/');
  }

  function addRoutes(newRoutes: RouteObject[], parent: string | null = null) {
    reactRouter.patchRoutes(parent, newRoutes);
  }

  return {
    addRoutes,
    back,
    forward,
    go,
    goHome,
    navigate,
    navigateUp,
    reactRouter,
    reload,
    replace
  };
}

export const router = navigator();

export type RouterContextType = ReturnType<typeof navigator>;

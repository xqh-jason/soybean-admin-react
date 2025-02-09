import type { RouterNavigateOptions, To } from 'react-router-dom';

import { router as reactRouter } from '@/router';

export function navigator() {
  function navigate(path: To | null, options?: RouterNavigateOptions) {
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

  return {
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

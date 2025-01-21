import type { RouterNavigateOptions, To } from 'react-router-dom';

import { router } from '@/router';

export function useRouter() {
  function navigate(path: To | null, options?: RouterNavigateOptions) {
    router.navigate(path, options);
  }

  function back() {
    router.navigate(-1);
  }

  function forward() {
    router.navigate(1);
  }

  function go(delta: number) {
    router.navigate(delta);
  }

  function replace(path: To) {
    router.navigate(path, { replace: true });
  }

  function reload() {
    router.navigate(0);
  }

  function navigateUp() {
    router.navigate('..');
  }

  function goHome() {
    router.navigate('/');
  }

  return {
    back,
    forward,
    go,
    goHome,
    navigate,
    navigateUp,
    reload,
    replace
  };
}

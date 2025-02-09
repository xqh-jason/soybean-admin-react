import { RouterProvider as Provider } from 'react-router';

import { router } from './router';
import { RouterContext } from './router-context';
import { useCacheRoutes } from './routerHooks';

export const RouterProvider = () => {
  useCacheRoutes();

  return (
    <RouterContext.Provider value={router}>
      <Provider router={router.reactRouter} />
    </RouterContext.Provider>
  );
};

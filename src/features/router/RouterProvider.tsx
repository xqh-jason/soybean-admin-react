import { RouterProvider as Provider } from 'react-router';

import { router } from './router';
import { RouterContext } from './router-context';

export const RouterProvider = () => {
  console.log('router', router);

  return (
    <RouterContext.Provider value={router}>
      <Provider router={router.reactRouter} />
    </RouterContext.Provider>
  );
};

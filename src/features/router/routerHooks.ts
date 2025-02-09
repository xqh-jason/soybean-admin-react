import type { RouteObject } from 'react-router';

import { routes as allRoutes } from '@/router';
import { setCacheRoutes } from '@/store/slice/route';

function filterCacheRoutes(routes: RouteObject[]) {
  const cacheRoutes: string[] = [];

  for (const route of routes) {
    const { children, handle, path } = route;
    // 如果节点存在 path（注意：这里假设空字符串或 undefined 均视为无 path）
    if (path) {
      if (handle?.keepAlive) {
        cacheRoutes.push(path);
      }

      if (children && children.length) {
        cacheRoutes.push(...filterCacheRoutes(children));
      }
    } else if (children && children.length) {
      // 如果当前节点没有 path，但有 children，则递归处理 children，
      cacheRoutes.push(...filterCacheRoutes(children));
      // 如果既没有 path 也没有 children，则该节点直接被过滤掉
    }
  }

  return cacheRoutes;
}

export function useCacheRoutes() {
  const dispatch = useAppDispatch();

  const cacheRoutes = filterCacheRoutes(allRoutes);

  console.log(cacheRoutes, 'cacheRoutes');

  useEffect(() => {
    dispatch(setCacheRoutes(cacheRoutes));
  }, [cacheRoutes]);
}

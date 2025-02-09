import type { PayloadAction } from '@reduxjs/toolkit';

import { createAppSlice } from '../../createAppSlice';

interface InitialStateType {
  cacheRoutes: string[];
  removeCacheKey: string | null;
  routeHome: string;
}

const initialState: InitialStateType = {
  /** - 需要进行缓存的页面 */
  cacheRoutes: [],
  /** - 需要删除的缓存页面 */
  removeCacheKey: null,
  /** - 首页路由 */
  routeHome: import.meta.env.VITE_ROUTE_HOME
};

export const routeSlice = createAppSlice({
  initialState,
  name: 'route',
  reducers: create => ({
    resetRouteStore: create.reducer(() => initialState),
    setCacheRoutes: create.reducer((state, { payload }: PayloadAction<string[]>) => {
      state.cacheRoutes = payload;
    }),
    setRemoveCacheKey: create.reducer((state, { payload }: PayloadAction<string | null>) => {
      state.removeCacheKey = payload;
    })
  }),
  selectors: {
    selectCacheRoutes: route => route.cacheRoutes,
    selectRemoveCacheKey: route => route.removeCacheKey
  }
});

export const { resetRouteStore, setCacheRoutes, setRemoveCacheKey } = routeSlice.actions;

export const { selectCacheRoutes, selectRemoveCacheKey } = routeSlice.selectors;

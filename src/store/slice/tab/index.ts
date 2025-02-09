import type { RoutePath } from '@elegant-router/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface InitialStateType {
  activeFirstLevelMenuKey: string;
  activeTabId: string;
  homeTab: App.Global.Tab | null;
  removeCacheKey: RoutePath | null;
  tabs: App.Global.Tab[];
}

const initialState: InitialStateType = {
  /** - 当前一级菜单 */
  activeFirstLevelMenuKey: '',
  /** - 当前标签页 */
  activeTabId: '',
  /** - 首页标签页 */
  homeTab: null,
  /** - 需要删除的缓存页面 */
  removeCacheKey: null,
  /** - 标签页 */
  tabs: []
};

export const tabSlice = createSlice({
  initialState,
  name: 'tab',
  reducers: {
    setActiveFirstLevelMenuKey: (state, action: PayloadAction<string>) => {
      state.activeFirstLevelMenuKey = action.payload;
    }
  },
  selectors: {
    selectActiveFirstLevelMenuKey: tab => tab.activeFirstLevelMenuKey,
    selectTabs: tab => tab.tabs
  }
});

export const { setActiveFirstLevelMenuKey } = tabSlice.actions;

export const { selectActiveFirstLevelMenuKey, selectTabs } = tabSlice.selectors;

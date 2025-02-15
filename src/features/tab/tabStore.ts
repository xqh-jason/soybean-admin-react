import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RoutePath } from '@soybean-react/vite-plugin-react-router';

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
    initHomeTab(state, { payload }: PayloadAction<Rou>) {
      state.homeTab = payload;
    },
    setActiveFirstLevelMenuKey: (state, action: PayloadAction<string>) => {
      state.activeFirstLevelMenuKey = action.payload;
    },
    setActiveTabId: (state, action: PayloadAction<string>) => {
      state.activeTabId = action.payload;
    },
    setTabs: (state, action: PayloadAction<App.Global.Tab[]>) => {
      state.tabs = action.payload;
    }
  },
  selectors: {
    selectActiveFirstLevelMenuKey: tab => tab.activeFirstLevelMenuKey,
    selectActiveTabId: tab => tab.activeTabId,
    selectHomeTab: tab => tab.homeTab,
    selectTabs: tab => tab.tabs
  }
});

export const { setActiveFirstLevelMenuKey, setActiveTabId, setTabs } = tabSlice.actions;

export const { selectActiveFirstLevelMenuKey, selectActiveTabId, selectHomeTab, selectTabs } = tabSlice.selectors;

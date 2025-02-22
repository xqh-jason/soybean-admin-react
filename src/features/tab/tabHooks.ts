import { useOn } from '@sa/hooks';

import { useRoute, useRouter } from '@/features/router';
import {
  addTab,
  selectActiveTabId,
  selectTabs,
  setActiveFirstLevelMenuKey,
  setActiveTabId,
  setTabs
} from '@/features/tab/tabStore';
import { localStg } from '@/utils/storage';

import { getActiveFirstLevelMenuKey } from '../menu/MenuUtil';
import { useThemeSettings } from '../theme';

import { filterTabsById, filterTabsByIds, getFixedTabs, getTabByRoute, isTabInTabs } from './shared';
import { TabEvent } from './tabEnum';

export function useTabActions() {
  const dispatch = useAppDispatch();

  const tabs = useAppSelector(selectTabs);

  const _route = useRoute();

  const isInit = useRef(false);

  const _fixedTabs = getFixedTabs(tabs);

  const _tabIds = tabs.map(tab => tab.id);

  const themeSettings = useThemeSettings();

  const { navigate } = useRouter();

  const activeTabId = useAppSelector(selectActiveTabId);

  /**
   * 更新标签页
   *
   * @param newTabs
   */
  function updateTabs(newTabs: App.Global.Tab[]) {
    dispatch(setTabs(newTabs));
  }

  /**
   * 切换激活的标签页
   *
   * @param tabId
   */
  function changeActiveTabId(tabId: string) {
    dispatch(setActiveTabId(tabId));
  }

  /**
   * 根据标签页切换路由
   *
   * @param tab
   */
  async function switchRouteByTab(tab: App.Global.Tab) {
    navigate(tab.fullPath);

    changeActiveTabId(tab.id);
  }

  /**
   * 清除标签页
   *
   * @param excludes
   */
  function _clearTabs(excludes: string[] = []) {
    const remainTabIds = [..._fixedTabs.map(tab => tab.id), ...excludes];

    const removedTabsIds = _tabIds.filter(id => !remainTabIds.includes(id));

    const isRemoveActiveTab = removedTabsIds.includes(activeTabId);

    const updatedTabs = filterTabsByIds(removedTabsIds, tabs);

    if (!isRemoveActiveTab) {
      updateTabs(updatedTabs);
    } else {
      const activeTab = updatedTabs.at(-1);

      if (activeTab) {
        switchRouteByTab(activeTab);

        updateTabs(updatedTabs);
      }
    }
  }

  /**
   * 清除左侧标签页
   *
   * @param tabId
   */
  function _clearLeftTabs(tabId: string) {
    const index = _tabIds.indexOf(tabId);

    if (index === -1) return;

    const excludes = _tabIds.slice(index);

    _clearTabs(excludes);
  }

  /**
   * 清除右侧标签页
   *
   * @param tabId
   */
  function _clearRightTabs(tabId: string) {
    const index = _tabIds.indexOf(tabId);

    if (index === 0) {
      _clearTabs();
      return;
    }

    if (index === -1) return;

    const excludes = _tabIds.slice(0, index + 1);

    _clearTabs(excludes);
  }

  function _initTabs() {
    const storageTabs = localStg.get('globalTabs');

    if (themeSettings.tab.cache && storageTabs) {
      // const tabs = extractTabsByAllRoutes(router.getAllRouteNames(), storageTabs);
      // dispatch(setTabs(tabs));
      updateTabs(storageTabs);
      return storageTabs;
    }

    return [];
  }

  function _cacheTabs() {
    if (!themeSettings.tab.cache) return;

    localStg.set('globalTabs', tabs);
  }

  function _addTab(route: Router.Route) {
    const tab = getTabByRoute(route);

    if (!isInit.current) {
      isInit.current = true;

      const initTabs = _initTabs();

      if (initTabs.length > 0 && !isTabInTabs(tab.id, initTabs)) {
        dispatch(addTab(tab));
      }
    } else if (!isTabInTabs(tab.id, tabs)) {
      dispatch(addTab(tab));
    }

    dispatch(setActiveTabId(tab.id));

    const firstLevelRouteName = getActiveFirstLevelMenuKey(route);
    dispatch(setActiveFirstLevelMenuKey(firstLevelRouteName));
  }

  /**
   * 删除标签页
   *
   * @param tabId
   */
  function removeTabById(tabId: string) {
    const isRemoveActiveTab = activeTabId === tabId;

    const updatedTabs = filterTabsById(tabId, tabs);

    if (!isRemoveActiveTab) {
      // 如果删除的不是激活的标签页，则更新标签页
      updateTabs(updatedTabs);
    } else {
      // 如果删除的是激活的标签页，则切换到最后一个标签页或者首页标签页
      const activeTab = updatedTabs.at(-1);

      if (activeTab) {
        switchRouteByTab(activeTab);

        updateTabs(updatedTabs);
      }
    }
  }

  /**
   * 判断标签页是否保留
   *
   * @param tabId
   * @returns
   */
  function isTabRetain(tabId: string) {
    return _fixedTabs.some(tab => tab.id === tabId);
  }

  useEffect(() => {
    _addTab(_route);
  }, [_route.fullPath]);

  useEventListener(
    'beforeunload',
    () => {
      _cacheTabs();
    },
    { target: window }
  );

  useOn(TabEvent.UPDATE_TABS, (eventName: TabEvent, id: string) => {
    // 清除左侧标签页
    if (eventName === TabEvent.CLEAR_LEFT_TABS) return _clearLeftTabs(id);

    // 清除右侧标签页
    if (eventName === TabEvent.CLEAR_RIGHT_TABS) return _clearRightTabs(id);

    // 关闭当前标签页
    if (eventName === TabEvent.CLOSE_CURRENT) return removeTabById(id);

    // 关闭其他标签页
    if (eventName === TabEvent.CLOSE_OTHER) return _clearTabs([id]);

    // 清除所有标签页
    return _clearTabs();
  });

  return {
    activeTabId,
    dispatch,
    isTabRetain,
    navigate,
    removeTabById,
    tabs,
    themeSettings
  };
}

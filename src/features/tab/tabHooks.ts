import { useArray } from '@sa/hooks';

import { routeMap } from '@/router/elegant/transform';
import { localStg } from '@/utils/storage';

import { useRoute, useRouter } from '../router';
import { useThemeSettings } from '../theme';

import { extractTabsByAllRoutes, filterTabsById, getFixedTabIds, getTabByRoute, isTabInTabs } from './shared';
import { selectActiveTabId, setActiveTabId, setTabs } from './tabStore';

export function useTabActions() {
  const dispatch = useAppDispatch();

  const route = useRoute();

  const update = useUpdate();

  const themeSettings = useThemeSettings();

  const tabs = useRef<App.Global.Tab[]>([]);

  const { navigate } = useRouter();

  const activeTabId = useAppSelector(selectActiveTabId);

  function updateTabs(newTabs: App.Global.Tab[]) {
    tabs.current = newTabs;
    update();
  }

  function isTabRetain(tabId: string) {
    if (tabId.includes(import.meta.env.VITE_ROUTE_HOME)) return true;

    return getFixedTabIds(tabs.current).includes(tabId);
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

  function clearTabs() {}

  /**
   * 清除左侧标签页
   *
   * @param tabId
   */
  function clearLeftTabs(tabId: string) {
    const tabIndex = tabs.current.findIndex(tab => tab.id === tabId);

    if (tabIndex === -1) return;

    const restTabs = tabs.current.slice(tabIndex);

    updateTabs(restTabs);
  }

  /**
   * 清除右侧标签页
   *
   * @param tabId
   */
  function clearRightTabs(tabId: string) {}

  /**
   * 删除标签页
   *
   * @param tabId
   */
  function removeTab(tabId: string) {
    const isRemoveActiveTab = activeTabId === tabId;

    const updatedTabs = filterTabsById(tabId, tabs.current);

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

  function _addTab() {
    if (route.fullPath) {
      if (!isTabInTabs(route.fullPath, tabs.current)) {
        const tab = getTabByRoute(route);

        const { fixedIndex } = tab;
        if (fixedIndex || fixedIndex === 0) {
          tabs.current.splice(fixedIndex, 0, tab);
        } else {
          tabs.current.push(tab);
        }
      }
      dispatch(setActiveTabId(route.fullPath));
    }
  }

  function _initTabs() {
    const storageTabs = localStg.get('globalTabs');

    if (themeSettings.tab.cache && storageTabs) {
      // const initTabs = extractTabsByAllRoutes(Object.keys(routeMap), storageTabs);

      updateTabs(storageTabs);
    }
  }

  function _cacheTabs() {
    if (!themeSettings.tab.cache) return;

    localStg.set('globalTabs', tabs.current);
  }

  useMount(() => {
    window.addEventListener('beforeunload', () => {
      _cacheTabs();
    });

    return () => {
      window.removeEventListener('beforeunload', () => {
        _cacheTabs();
      });
    };
  });

  useLayoutEffect(() => {
    _initTabs();
  }, []);

  useEffect(() => {
    _addTab();
  }, [route.fullPath]);

  return {
    activeTabId,
    clearLeftTabs,
    clearRightTabs,
    clearTabs,
    isTabRetain,
    removeTab,
    tabs: tabs.current,
    updateTabs
  };
}

import { useRouter } from '@/features/router';
import { selectActiveTabId, selectHomeTab, selectTabs, setActiveTabId, setTabs } from '@/store/slice/tab';

import { filterTabsById } from './shared';

export function useTabActions() {
  const dispatch = useAppDispatch();

  const tabs = useAppSelector(selectTabs);

  const { navigate } = useRouter();

  const activeTabId = useAppSelector(selectActiveTabId);

  const homeTab = useAppSelector(selectHomeTab);

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
   * 清除左侧标签页
   *
   * @param tabId
   */
  function clearLeftTabs(tabId: string) {
    const tabIndex = tabs.findIndex(tab => tab.id === tabId);

    if (tabIndex === -1) return;

    const restTabs = tabs.slice(tabIndex);

    dispatch(setTabs(restTabs));
  }

  /**
   * 删除标签页
   *
   * @param tabId
   */
  function removeTab(tabId: string) {
    const isRemoveActiveTab = activeTabId === tabId;

    const updatedTabs = filterTabsById(tabId, tabs);

    if (!isRemoveActiveTab) {
      // 如果删除的不是激活的标签页，则更新标签页
      updateTabs(updatedTabs);
    } else {
      // 如果删除的是激活的标签页，则切换到最后一个标签页或者首页标签页
      const activeTab = updatedTabs.at(-1) || homeTab;

      if (activeTab) {
        switchRouteByTab(activeTab);

        updateTabs(updatedTabs);
      }
    }
  }

  return {
    clearLeftTabs,
    removeTab,
    updateTabs
  };
}

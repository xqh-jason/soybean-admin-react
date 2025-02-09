import { useCreation } from 'ahooks';
import type { FC, PropsWithChildren } from 'react';

import { routes } from '@/router';
import { selectActiveFirstLevelMenuKey, setActiveFirstLevelMenuKey } from '@/store/slice/tab';
import { getActiveFirstLevelMenuKey } from '@/store/slice/tab/shared';

import { useLang } from '../lang';
import { useRoute } from '../router';

import { filterRoutesToMenus } from './MenuUtil';
import { MixMenuContext } from './menuContext';

const MenuProvider: FC<PropsWithChildren> = ({ children }) => {
  const route = useRoute();

  const dispatch = useAppDispatch();

  const { locale } = useLang();

  const menus = useCreation(() => filterRoutesToMenus(routes[0].children || []), [locale]);

  const firstLevelMenu = menus.map(menu => {
    const { children: _, ...rest } = menu;
    return rest;
  }) as App.Global.Menu[];

  const activeFirstLevelMenuKey = useAppSelector(selectActiveFirstLevelMenuKey);

  const childLevelMenus = menus.find(menu => menu.key === activeFirstLevelMenuKey)?.children as App.Global.Menu[];

  const selectKey = (() => {
    const { activeMenu, hideInMenu } = route.handle;

    const name = route.pathname as string;

    const routeName = (hideInMenu ? activeMenu : name) || name;

    return [routeName];
  })();

  /** - 可以手动指定菜单或者是默认当前路由的一级菜单 */
  function changeActiveFirstLevelMenuKey(key?: string) {
    let routeKey = key;

    if (!routeKey) {
      routeKey = getActiveFirstLevelMenuKey(route);
    }

    dispatch(setActiveFirstLevelMenuKey(routeKey));
  }

  const mixMenuContext = useCreation(
    () => ({
      activeFirstLevelMenuKey,
      allMenus: menus,
      childLevelMenus: childLevelMenus || [],
      firstLevelMenu,
      isActiveFirstLevelMenuHasChildren: activeFirstLevelMenuKey ? Boolean(childLevelMenus) : false,
      route,
      selectKey,
      setActiveFirstLevelMenuKey: changeActiveFirstLevelMenuKey
    }),
    [activeFirstLevelMenuKey, route]
  );

  return <MixMenuContext value={mixMenuContext}>{children}</MixMenuContext>;
};

export default MenuProvider;

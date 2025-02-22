import { useCreation } from 'ahooks';
import type { FC, PropsWithChildren } from 'react';

import { selectActiveFirstLevelMenuKey, setActiveFirstLevelMenuKey } from '@/features/tab/tabStore';

import { useLang } from '../lang';
import { useRoute, useRouter } from '../router';

import { filterRoutesToMenus, getActiveFirstLevelMenuKey } from './MenuUtil';
import { MixMenuContext } from './menuContext';

const MenuProvider: FC<PropsWithChildren> = ({ children }) => {
  const route = useRoute();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const { locale } = useLang();

  const menus = useMemo(
    () => filterRoutesToMenus(router.reactRouter.routes.find(r => r.id === '(base)')?.children || []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.reactRouter.routes, locale]
  );

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

    dispatch(setActiveFirstLevelMenuKey(routeKey || ''));
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
    [activeFirstLevelMenuKey, route.fullPath]
  );

  return <MixMenuContext value={mixMenuContext}>{children}</MixMenuContext>;
};

export default MenuProvider;

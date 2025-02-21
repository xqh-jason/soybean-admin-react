import { emitter, useArray } from '@sa/hooks';
import { useCreation } from 'ahooks';
import type { FC, PropsWithChildren } from 'react';

import { selectActiveFirstLevelMenuKey, setActiveFirstLevelMenuKey } from '@/features/tab/tabStore';
import { routes } from '@/router';

import { useLang } from '../lang';
import { useRoute } from '../router';

import { filterRoutesToMenus, getActiveFirstLevelMenuKey, mergeMenus } from './MenuUtil';
import { MixMenuContext } from './menuContext';

const MenuProvider: FC<PropsWithChildren> = ({ children }) => {
  const route = useRoute();

  const dispatch = useAppDispatch();

  const { locale } = useLang();

  const [menus, { updateState }] = useArray<App.Global.Menu, 'key'>(
    filterRoutesToMenus(routes.find(r => r.id === '(base)')?.children || [])
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

  useMount(() => {
    emitter.on('ADD_MENUS', (newMenus: App.Global.Menu[]) => {
      console.log('newMenus', newMenus);
      updateState(old => mergeMenus(old, newMenus));
    });
  });

  useUpdateEffect(() => {
    updateState(menus);
  }, [locale]);

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

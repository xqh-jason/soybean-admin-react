import { AdminLayout } from '@sa/materials';

import './index.scss';
import { Suspense } from 'react';

import {
  LAYOUT_MODE_HORIZONTAL,
  LAYOUT_MODE_HORIZONTAL_MIX,
  LAYOUT_MODE_VERTICAL,
  LAYOUT_MODE_VERTICAL_MIX
} from '@/constants/common';
import { MenuProvider } from '@/features/menu';
import GlobalTab from '@/features/tab/GlobalTab';
import { getThemeSettings } from '@/features/theme';
import { getSiderCollapse } from '@/layouts/appStore';

import GlobalContent from '../modules/GlobalContent';
import GlobalSider from '../modules/GlobalSider';
import GlobalHeader from '../modules/global-header/GlobalHeader';
import GlobalMenu from '../modules/global-menu';
import ThemeDrawer from '../modules/theme-drawer';

const BaseLayout = () => {
  const themeSettings = useAppSelector(getThemeSettings);

  const siderCollapse = useAppSelector(getSiderCollapse);

  const siderVisible = themeSettings.layout.mode !== LAYOUT_MODE_HORIZONTAL;

  const isVerticalMix = themeSettings.layout.mode === LAYOUT_MODE_VERTICAL_MIX;

  const isHorizontalMix = themeSettings.layout.mode === LAYOUT_MODE_HORIZONTAL_MIX;

  return (
    <MenuProvider>
      <AdminLayout
        scrollMode={themeSettings.layout.scrollMode}
        siderCollapse={siderCollapse}
        Tab={<GlobalTab />}
        Header={
          <GlobalHeader
            mode={themeSettings.layout.mode}
            reverse={themeSettings.layout.reverseHorizontalMix}
            siderWidth={themeSettings.sider.width}
          />
        }
        Sider={
          <GlobalSider
            headerHeight={themeSettings.header.height}
            inverted={themeSettings.sider.inverted}
            isHorizontalMix={isHorizontalMix}
            isVerticalMix={isVerticalMix}
            siderCollapse={siderCollapse}
          />
        }
      >
        <GlobalContent />

        <GlobalMenu
          mode={themeSettings.layout.mode}
          reverse={themeSettings.layout.reverseHorizontalMix}
        />

        <Suspense fallback={null}>
          <ThemeDrawer />
        </Suspense>
      </AdminLayout>
    </MenuProvider>
  );
};

export default BaseLayout;

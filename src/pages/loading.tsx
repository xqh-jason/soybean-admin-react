// @unocss-include
import { getRgb } from '@sa/color';
import clsx from 'clsx';

import SystemLogo from '@/components/SystemLogo';
import { DARK_CLASS } from '@/constants/app';
import { toggleHtmlClass } from '@/utils/common';
import { localStg } from '@/utils/storage';

const GlobalLoading = memo(() => {
  const { t } = useTranslation();

  const themeColor = localStg.get('themeColor') || '#646cff';

  const darkMode = localStg.get('darkMode') || false;

  if (darkMode) {
    toggleHtmlClass(DARK_CLASS).add();
  }

  const { b, g, r } = getRgb(themeColor);

  const primaryColor = `--primary-color: ${r} ${g} ${b}`;

  const loadingClasses = [
    'left-0 top-0',
    'left-0 bottom-0 animate-delay-500',
    'right-0 top-0 animate-delay-1000',
    'right-0 bottom-0 animate-delay-1500'
  ];

  return (
    <div
      className="fixed-center flex-col bg-layout"
      style={primaryColor as React.CSSProperties}
    >
      <SystemLogo className="size-128px text-primary" />
      <div className="my-36px h-56px w-56px">
        <div className="relative h-full animate-spin">
          {loadingClasses.map(item => {
            return (
              <div
                className={clsx('absolute w-16px h-16px bg-primary rounded-8px animate-pulse ', item)}
                key={item}
              />
            );
          })}
        </div>
      </div>
      <h2 className="text-28px text-primary font-500">{t('system.title')}</h2>
    </div>
  );
});

export default GlobalLoading;

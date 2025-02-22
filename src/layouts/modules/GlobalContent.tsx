import clsx from 'clsx';
import KeepAlive, { useKeepAliveRef } from 'keepalive-for-react';

import { selectCacheRoutes, selectRemoveCacheKey } from '@/features/router';
import { getReloadFlag } from '@/layouts/appStore';
import './transition.css';

interface Props {
  /** Show padding for content */
  closePadding?: boolean;
}

const GlobalContent: FC<Props> = memo(({ closePadding }) => {
  const currentOutlet = useOutlet();

  const { pathname } = useLocation();

  const aliveRef = useKeepAliveRef();

  const removeCacheKey = useAppSelector(selectRemoveCacheKey);

  const cacheKeys = useAppSelector(selectCacheRoutes);

  const reload = useAppSelector(getReloadFlag);

  // const themeSetting = useAppSelector(getThemeSettings);

  // const transitionName = themeSetting.page.animate ? themeSetting.page.animateMode : '';

  useUpdateEffect(() => {
    if (!aliveRef.current || !removeCacheKey) return;

    aliveRef.current.destroy(removeCacheKey);
  }, [removeCacheKey]);

  useUpdateEffect(() => {
    aliveRef.current?.refresh();
  }, [reload]);

  return (
    <div className={clsx('h-full flex-grow bg-layout', { 'p-16px': !closePadding })}>
      <KeepAlive
        activeCacheKey={pathname}
        aliveRef={aliveRef}
        include={cacheKeys}
      >
        {currentOutlet}
      </KeepAlive>
    </div>
  );
});

export default GlobalContent;

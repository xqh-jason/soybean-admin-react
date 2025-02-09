import clsx from 'clsx';
import KeepAlive, { useKeepAliveRef } from 'keepalive-for-react';

import { getReloadFlag } from '@/store/slice/app';
import { getRemoveCacheKey, selectCacheRoutes } from '@/store/slice/route';
import { getThemeSettings } from '@/store/slice/theme';
import './transition.css';

interface Props {
  /** Show padding for content */
  closePadding?: boolean;
}

const useGetCacheKey = () => {
  const { pathname, search } = useLocation();

  const cacheKey = useMemo(() => {
    return (pathname + search).slice(1).split('/').join('_');
  }, [pathname, search]);

  return cacheKey;
};

const GlobalContent: FC<Props> = memo(({ closePadding }) => {
  const currentOutlet = useOutlet();

  const aliveRef = useKeepAliveRef();

  const removeCacheKey = useAppSelector(getRemoveCacheKey);

  const cacheKeys = useAppSelector(selectCacheRoutes);

  const reload = useAppSelector(getReloadFlag);

  const cacheKey = useGetCacheKey();

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
        activeCacheKey={cacheKey}
        aliveRef={aliveRef}
        include={cacheKeys}
      >
        {currentOutlet}
      </KeepAlive>
    </div>
  );
});

export default GlobalContent;

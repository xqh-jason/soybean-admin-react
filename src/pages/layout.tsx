import { Outlet } from 'react-router-dom';
import type { LoaderFunctionArgs } from 'react-router-dom';

import { useRoute } from '@/features/router';

const RootLayout = () => {
  const { fullPath, handle } = useRoute();

  const { t } = useTranslation();

  useLayoutEffect(() => {}, []);

  useEffect(() => {
    const { i18nKey, title } = handle;

    document.title = i18nKey ? t(i18nKey) : title;

    window.NProgress?.done?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullPath]);

  return <Outlet />;
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  window.NProgress?.start?.();

  return null;
};

export const shouldRevalidate = () => {
  return true;
};

export default RootLayout;

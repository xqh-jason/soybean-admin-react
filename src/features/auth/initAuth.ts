import { useLoading } from '@sa/hooks';

import { useInitAuthRoutes, useRouter } from '@/features/router';

import { login } from './authStore';

const { VITE_AUTH_ROUTE_MODE, VITE_STATIC_SUPER_ROLE } = import.meta.env;

export function useInitAuth() {
  const { endLoading, loading, startLoading } = useLoading();

  const [searchParams] = useSearchParams();

  const { t } = useTranslation();

  const initAuthRoutes = useInitAuthRoutes();

  const dispatch = useAppDispatch();

  const { addRoutes, navigate } = useRouter();

  const redirectUrl = searchParams.get('redirect');

  async function toLogin(params: { password: string; userName: string }, redirect = true) {
    startLoading();
    const res = await dispatch(login(params));

    const info = res.payload as Api.Auth.Info;

    if (info.token) {
      const isStaticSuper = VITE_AUTH_ROUTE_MODE === 'static' && info.userInfo.roles.includes(VITE_STATIC_SUPER_ROLE);

      initAuthRoutes(isStaticSuper, info.userInfo.roles, addRoutes);

      if (redirectUrl && redirect) {
        await navigate(redirectUrl);
      } else {
        navigate('/');
      }

      window.$notification?.success({
        description: t('page.login.common.welcomeBack', { userName: info.userInfo.userName }),
        message: t('page.login.common.loginSuccess')
      });
    }

    endLoading();
  }

  return {
    loading,
    toLogin
  };
}

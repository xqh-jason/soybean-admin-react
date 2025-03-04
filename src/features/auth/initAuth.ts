import { useLoading } from '@sa/hooks';

import { useRouter } from '@/features/router';

import { login } from './authStore';

export function useInitAuth() {
  const { endLoading, loading, startLoading } = useLoading();

  const [searchParams] = useSearchParams();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { navigate } = useRouter();

  const redirectUrl = searchParams.get('redirect');

  async function toLogin(params: { password: string; userName: string }, redirect = true) {
    startLoading();
    const res = await dispatch(login(params));

    const info = res.payload as Api.Auth.Info;

    if (info.token) {
      if (redirect) {
        if (redirectUrl) {
          await navigate(redirectUrl);
        } else {
          navigate('/');
        }
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

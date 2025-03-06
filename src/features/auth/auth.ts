import { useLoading } from '@sa/hooks';

import { getIsLogin, selectUserInfo } from '@/features/auth/authStore';
import { useRoute, useRouter } from '@/features/router';

import { useCacheTabs } from '../tab/tabHooks';

import { login, resetAuth as resetAuthAction } from './authStore';
import { clearAuthStorage } from './shared';

export function useAuth() {
  const userInfo = useAppSelector(selectUserInfo);

  const isLogin = useAppSelector(getIsLogin);

  function hasAuth(codes: string | string[]) {
    if (!isLogin) {
      return false;
    }

    if (typeof codes === 'string') {
      return userInfo.buttons.includes(codes);
    }

    return codes.some(code => userInfo.buttons.includes(code));
  }

  return {
    hasAuth
  };
}

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

export function useResetAuth() {
  const dispatch = useAppDispatch();

  const {
    fullPath,
    handle: { constant }
  } = useRoute();

  const cacheTabs = useCacheTabs();

  const { push, resetRoutes } = useRouter();

  function resetAuth() {
    clearAuthStorage();

    dispatch(resetAuthAction());

    resetRoutes();

    cacheTabs();

    if (!constant) {
      push('/login', { redirect: fullPath });
    }
  }

  return resetAuth;
}
